import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {logoutUser} from '../../../actions/authActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  allButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});



class Navbar extends Component {
 
  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();

  }
  onSignupClick(e){
    e.preventDefault()
   
  }

  onLoginClick(e){
    e.preventDefault()
  
  }

    render() {
     const { isAuthenticated, user }  = this.props.auth
     const { classes } = this.props

     console.log("this push",this.props)
     const authLinks = (

     <div  className={classes.allButton}>
      <Button onClick={this.onLogoutClick.bind(this)} color="inherit"  >
      Logout
</Button>
</div>

   
     )

     const guestLinks = (
<div  className={classes.allButton} >
      <Button style={{color:'white'}}   href="/register" variant="contained" color="primary" >
      Sign Up
</Button>
<Button  style={{color:'white'}}  href="/login" variant="contained" color="primary">
  Login
</Button>
</div> 
     )
        return (
            //return used JSX 

            <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                 {' '}
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                {' '}
                </Typography>
                {isAuthenticated ?authLinks : guestLinks}
              </Toolbar>
            </AppBar>
          </div>
           
        )
    }
}


Navbar.propTypes = {
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps,{logoutUser})(withStyles(styles)(Navbar));

