import React,{Component} from 'react'
import Proptypes from 'prop-types'
import {connect } from 'react-redux';
import {loginUser} from '../../actions/authActions'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';

import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', 
		marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
	marginTop: theme.spacing.unit * 15,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		// marginTop: theme.spacing.unit * 8,
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
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	large:{
		width: theme.spacing(20),
		height: theme.spacing(20) 
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 2,
	},
});



class Login extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:''
        }
  
        this.onChange=this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
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

    onChange(e){
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        const userData={
            email:this.state.email,
            password:this.state.password
        }

        console.log("onsubmit login",userData)
     this.props.loginUser(userData)
      
    }

    render(){

    
	  const { classes } = this.props
	  const {email,password}= this.state;
        return (

           
		<main className={classes.main}>
		<Paper className={classes.paper}>
			<Avatar  className={classes.avatar}>
				<AccountCircleIcon className={classes.large} />
			</Avatar>

			<Typography component="h1" variant="h5">
			 Login Panel
			   </Typography>
			   {this.state.errors !== ''   ? 
				<Alert severity="error">{this.state.errors}</Alert>
				: null}
			<form className={classes.form}  onSubmit={this.onSubmit}>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="email">Email Address</InputLabel>
					<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={this.onChange} />
				</FormControl>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={this.onChange} />
				</FormControl>
				<Button
					type="submit"
				
					variant="contained"
					color="primary"
					
					className={classes.submit}>
				  Login
			</Button>
		   
		
	</form>
	<Link href="#" 	color="Primary" 	to="/register">
	Not a member? Click here 
	 </Link>
		</Paper>
	</main>
        )
    }
}

Login.propTypes={
  loginUser:Proptypes.func.isRequired,
  auth:Proptypes.object.isRequired,
  errors:Proptypes.object.isRequired
}

const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors

})
export default connect(mapStateToProps,{loginUser})(withStyles(styles)(Login));

