import React, { Component } from 'react'
import Sidebar from '../../Sidebar'
import {connect } from 'react-redux';


import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';

import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import './BookingCreate.scss'
import {createNewBooking} from '../../../../actions/bookingActions'
import PropTypes from 'prop-types';


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

 class BookingCreate extends Component {

    constructor(){
        super();
        this.state={
            product_category:'',
            product_name:'',
            product_quantity:'',
            shipping_address:'',
            shipping_email:'',
            errors:''
        }
  
        this.onChange=this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
    }

    


    componentWillReceiveProps(nextProps){
	
      if(nextProps.errors){
		  console.log("error in creating booking",nextProps.errors)
        this.setState({errors:nextProps.errors.message})
      }
    }

    // componentWillReceiveProps(nextProps){
	
    // }

    onChange(e){
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        const { product_category,
            product_name,
            product_quantity,
            shipping_address,
            shipping_email}= this.state;


       const bookingData={
        category:product_category,
        product_name:product_name,
        quantity:parseInt(product_quantity),
        shipping_address:shipping_address,
        shipping_email:shipping_email,
        shipping_status:'booked'  
    }

        console.log("onsubmit login",bookingData)

        this.props.createNewBooking(bookingData,this.props.history)
      
    }




    render() {

        const { classes } = this.props
        
        const { product_category,
        product_name,
        product_quantity,
        shipping_address,
        shipping_email,
        shipping_status}= this.state;


        return (
            <div className="dashboard-bookcreate">
              
                            <div className="sidebar-bookcreate">
                            <Sidebar/>
                            </div>
                            <div className="workspace-bookcreate">
                           
                            <main className={classes.main}>
		<Paper className={classes.paper}>
			<Typography component="h1" variant="h5">
			Create A New Booking
			   </Typography>
			   {this.state.errors !== ''   ? 
				<Alert severity="error">{this.state.errors}</Alert>
				: null}
                <form onSubmit= {this.onSubmit} noValidate autoComplete="off">
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="product_name">Product name</InputLabel>
                <Input id="product_name" name="product_name" autoComplete="off" autoFocus value={product_name} onChange={this.onChange} />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="product_category">Product Category</InputLabel>
            <Input id="product_category" name="product_category" autoComplete="off" autoFocus value={product_category} onChange={this.onChange} />
        </FormControl>

          

        <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="product_quantity">Quantity</InputLabel>
        <Input type="number" id="product_quantity" name="product_quantity" autoComplete="off" autoFocus value={product_quantity} onChange={this.onChange} />
    </FormControl>

    <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="shipping_address">Shipping Address</InputLabel>
    <Input id="shipping_address" name="shipping_address" autoComplete="off" autoFocus value={shipping_address} onChange={this.onChange} />
</FormControl>
        

<FormControl margin="normal" required fullWidth>
<InputLabel htmlFor="shipping_email">Shipping Email</InputLabel>
<Input type="email" id="shipping_email" name="shipping_email" autoComplete="on" autoFocus value={shipping_email} onChange={this.onChange} />
</FormControl>




            <Button
                type="submit"
                 
                variant="contained"
                color="primary">
           Create A New Booking
        </Button>
</form>
	
		</Paper>
    </main>
    



                              </div>
                             
                        </div>
        )
    }
}


BookingCreate.propType={
    createNewBooking : PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

const mapStateToProps = (state) => ({
    errors:state.errors
})


export default connect(mapStateToProps,{createNewBooking})(withRouter(withStyles(styles)(BookingCreate)));

// <FormControl margin="normal" required fullWidth>
// <InputLabel htmlFor="product_category">Product Category</InputLabel>
// <Input id="product_category" name="product_category" autoComplete="off" autoFocus value={product_category} onChange={this.onChange} />
// </FormControl>