
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import {getBookingById,editBookingStatus} from '../../../actions/bookingActions'
import { connect } from 'react-redux';
import Sidebar from '../Sidebar'


import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import '../Booking/Booking.scss'
import Navbar from '../Navbar';



const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', 
		marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
	marginTop: theme.spacing.unit * 15,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 1000,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
    },
    allButton: {
        '& > *': {
          margin: theme.spacing(1),
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

class StatusEdit extends Component {

    constructor(){
        super();
        this.state={
            id:'',
            shipping_status:'',
            errors:''
        }
  
        this.onChange=this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
    }
    componentDidMount(){
        this.props.getBookingById(this.props.match.params.id,this.props.history)
    }

    componentWillReceiveProps(nextProps){
console.log("insode the shipping",nextProps.booking.bookById[0])
if(nextProps.booking.bookById[0])
{
    const {

    _id,
    shipping_status
}= nextProps.booking.bookById[0];

    this.setState({
        id:nextProps.booking.bookById[0]._id,
        shipping_status:shipping_status
    })   
}
// if(nextProps.booking.booking)
//   this.setState({AllBooking:nextProps.booking.booking})
if(nextProps.errors.message){
    console.log("error in eidt booking",nextProps.errors)
    if(nextProps.errors.message.length > 0)
    this.setState({errors:nextProps.errors.message})
}
    }

    
    onChange(e){
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        const { 
            shipping_status
        }= this.state;

        this.props.editBookingStatus(shipping_status,this.props.match.params.id,this.props.history)
  
    }

    render() {

        const { classes } = this.props
        const { id,
            shipping_status}= this.state;
        return (
            <div>
            <Navbar/>
            <div className="dashboard-bookcreate">
              
            <div className="sidebar-bookcreate">
            <Sidebar/>
            </div>
            <div className="workspace-bookcreate">
           
            <main className={classes.main}>
<Paper className={classes.paper}>
<Typography component="h1" variant="h5">
Changing shipping status for Order no. #{id}
</Typography>
{this.state.errors !== ''   ? 
<Alert severity="error">{this.state.errors}</Alert>
: null}
<form onSubmit= {this.onSubmit} noValidate autoComplete="off">
<FormControl margin="normal" required fullWidth>
<InputLabel htmlFor="shipping_status">Shipping Status</InputLabel>
<Input id="shipping_status" name="shipping_status" autoComplete="off" autoFocus value={shipping_status} onChange={this.onChange} />
</FormControl>



<Button
type="submit"
 
variant="contained"
color="primary">
Edit and Save
</Button>




</form>

</Paper>
</main>
              </div>
             
        </div>
            </div>
        
        )
    }
}


StatusEdit.propTypes = {
    getBookingById: PropTypes.func.isRequired,
    editBookingStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors:state.errors,
    booking:state.booking
})
export default connect(mapStateToProps,{getBookingById,editBookingStatus})(withStyles(styles)(StatusEdit));