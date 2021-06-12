const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const User=require("../../models/userModels")
const Helpers=require("../../Helpers/helpers")
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");
const { roles } = require("../../Helpers/roles");

module.exports={
async CreateUser(req,res){
	 
	const schema=Joi.object().keys({
		email:Joi.string().email().required(),
		password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
		role:Joi.string(),
	});

	const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate

	if(error && error.details){
		return res.status(HttpStatus.BAD_REQUEST).json({message:"Either Email or password are not valid"});
	}

	const userEmail=await User.findOne({
		email:Helpers.lowerCase(req.body.email)
	});//to check if the email already exist
	if(userEmail){
		return res.status(HttpStatus.CONFLICT).json({message:"Email already exist"})
	}


	return bcrypt.hash(value.password,10,(err,hash)=>{
		if(err){
			return res.status(HttpStatus.BAD_REQUEST).json({message:"Error hashing password"})
		}

		const body={
			email:Helpers.lowerCase(value.email),
			password:hash,
			role:Helpers.lowerCase(value.role),
		}

		User.create(body).
			then((user)=>{
				const token=jwt.sign({data:user},dbConfig.secret,{
					 expiresIn:'5h'
				});
				res.cookie("auth",token);
				res.status(HttpStatus.CREATED).json({message:"User created successfully",user,token})
			})
			.catch(err=>{
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error occured"+err});
		})
	})
},

async LoginUser(req, res) {
	if (!req.body.email || !req.body.password) {
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ message: 'No empty fields allowed' });
	}

	await User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res
					.status(HttpStatus.NOT_FOUND)
					.json({ message: 'E-mail not found' });
			}

			return bcrypt.compare(req.body.password, user.password).then(result => {
				if (!result) {
					return res
						.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.json({ message: 'Password is incorrect' });
				}
				const token = jwt.sign({ data: user }, dbConfig.secret, {
					expiresIn: '5h'
				});
				res.cookie('token', token);
				return res
					.status(HttpStatus.OK)
					.json({ message: 'Login successful', user, token });
			});
		})
		.catch(err => {
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ message: 'Error occured'+err });
		});
},

grantAccess(action,resource){
	return async (req, res, next) => {
		try{
			const verified = jwt.verify(req.cookies.auth, dbConfig.secret);
			const permission = roles.can(verified.data.role)[action](resource);
			if(!permission.granted){
				return res.status(401).json({
					error: "You don't have enough permission to perform this action"
				});
			}
			next()
		}
		catch(error){
			next(error)
		}
	}
},

async allowIfLoggedIn(req, res, next){
	try{
		if(!req.cookies.auth){
			return res.status(401).json({
				error: "You need to be logged in to access this route"
			});
		}
		const verified = jwt.verify(req.cookies.auth, dbConfig.secret);
		if(!verified){
			return res.status(401).json({
				error: "Your session seems to be expired. You need to be logged in again to access this route."
			});
		}
		next()
	}
	catch(error){
		next(error)
	}
}

}