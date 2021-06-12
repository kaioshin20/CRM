import React,{Component} from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import {PersonAddIcon} from '@material-ui/icons';
import AdbIcon from '@material-ui/icons/Adb';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';

import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { registeruser} from '../../actions/authActions'



const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', 
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
	backgroundColor: theme.palette.primary.main,
	  width: theme.spacing(20),
	  height: theme.spacing(20)
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing.unit,
  },
  large:{
	width: theme.spacing(20),
	  height: theme.spacing(20) 
  },
	submit: {
		marginTop: theme.spacing.unit * 3,
	}
  })


class Register extends Component{
  constructor(){
      super();
      this.state={
          email:'',
          password:'',
         role:'',
          errors:''
      }

      this.onChange=this.onChange.bind(this)
      this.onSubmit= this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
	if(nextProps.auth.isAuthenticated){
		if(nextProps.auth.user.data.role === "crm"){
			this.props.history.push('/crm')
	   }
	   else if(nextProps.auth.user.data.role === "wms"){
		this.props.history.push('/wms')
	   }
	   }

  if(nextProps.errors){
	  console.log("error in loginn",nextProps.errors)
	this.setState({errors:nextProps.errors.message})
  }
}

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
		if(this.props.auth.user.data.role === "crm"){
		this.props.history.push('/crm')
	   }
	   else if(this.props.auth.user.data.role === "wms"){
		   this.props.history.push('/wms')
	   }
	   else{
		   this.props.history.push("/")
	   }
		 

	   }
	  
  }


  onChange(e){
       this.setState({ [e.target.name]:e.target.value })
  }

     onSubmit(e){
          e.preventDefault();
          const newUser = {
          email:this.state.email,
          password:this.state.password,
          role:this.state.role
           }
          console.log("register",newUser)

          this.props.registeruser(newUser,this.props.history)
         
     }

 
    render(){
		
		const { classes } = this.props
	

     const {email,password,role, errors } = this.state;
// equivalent of const errors = tchis.state.errors
   //console.log("-->render",this.state.errors)
  //const { user } = this.props.auth

        return (
          		<main className={classes.main}>
			<Paper className={classes.paper}>
      
      <Avatar   className={classes.avatar}>
      <AdbIcon  className={classes.large}/>
      </Avatar>
				<Typography component="h1" variant="h5">
				Registration Panel
				   </Typography>
				 {this.state.errors !== ''  ? 
					<Alert severity="error">{this.state.errors}</Alert>
					: null}
				<form className={classes.form}  noValidate onSubmit={this.onSubmit} >
				
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={this.onChange}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={this.onChange} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
					
						<InputLabel htmlFor="role">Your role</InputLabel>
						<Input name="role" type="text" id="role" autoComplete="off" value={role} onChange={this.onChange}  />
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Register
          			</Button>

				
                <Link href="#" 	color="Primary" 	to="/login">
             Already a member? Click here 
              </Link>
				</form>
			</Paper>
		</main>
        )
    }
}

Register.propType={
  registeruser : PropTypes.func.isRequired,//its a function that is required
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}


const mapStateToProps = (state)=>({
  auth:state.auth,
  errors:state.errors,

})

export default connect(mapStateToProps,{registeruser})(withRouter(withStyles(styles)(Register)))

