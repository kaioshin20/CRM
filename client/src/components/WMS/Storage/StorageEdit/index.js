import React, { Component } from 'react'
import Sidebar from '../../Sidebar'
import {connect } from 'react-redux';


import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';

import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import './StorageEdit.scss'
import {getEntryById} from '../../../../actions/storageActions'
import PropTypes from 'prop-types';
import Navbar from '../../Navbar';


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

 class StorageEdit extends Component {

    constructor(){
        super();
        this.state={
            store_product_name:'',
            store_category:'',
            store_quantity:'',
            store_storage_no:'',
            errors:''
        }
  
        this.onChange=this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
    }

    componentDidMount(){

        if(this.props.match.params.id) 
         //    this.props.getBookingById()
         console.log("in book edit",this.props.match.params.id)
         this.props.getEntryById(this.props.match.params.id,this.props.history)
    
    }


    componentWillReceiveProps(nextProps){
    
        
        if(nextProps.booking.storageById[0]){

            const {
                product_category,
            product_name,
            product_quantity,
            shipping_address,
            shipping_email,
            shipping_status
        }= nextProps.booking.bookById[0];
    
            this.setState({
                id:nextProps.booking.bookById[0]._id,
                product_category:product_category,
                product_name:product_name,
                product_quantity:product_quantity,
                shipping_address:shipping_address,
                shipping_email:shipping_email,
                shipping_status:shipping_status
            })
        }


      if(nextProps.errors){
		  console.log("error in creating booking",nextProps.errors)
        this.setState({errors:nextProps.errors.message})
      }
    }

 

    onChange(e){
        this.setState({ [e.target.name]:e.target.value })
    }

   
onSubmit(e){
    e.preventDefault();
    const newEntry = {
    product_name:this.state.store_product_name,
    category:this.state.store_category,
    quantity:parseInt(this.state.store_quantity),
     storage_no:this.state.store_storage_no}
    // alert("asd",newEntry)
    console.log("register",newEntry)
this.setState({open:false})
    this.props.createNewEntry(newEntry,this.props.history)
   
}


    render() {

        const { classes } = this.props
        
        const { store_product_name,store_category, store_quantity, store_storage_no} = this.state;



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
Edit The Entry
</Typography>
{this.state.errors !== ''   ? 
<Alert severity="error">{this.state.errors}</Alert>
: null}
<form onSubmit= {this.onSubmit} noValidate autoComplete="off">

<FormControl margin="normal" required fullWidth>
<InputLabel htmlFor="store_product_name">Product name</InputLabel>
<Input id="store_product_name" name="store_product_name" autoComplete="off" autoFocus value={store_product_name} onChange={this.onChange} />
</FormControl>

<FormControl margin="normal" required fullWidth>
<InputLabel htmlFor="store_category">Product Category</InputLabel>
<Input id="store_category" name="store_category" autoComplete="off" autoFocus value={store_category} onChange={this.onChange} />
</FormControl>

<FormControl margin="normal" required fullWidth>
<InputLabel htmlFor="store_quantity">Quantity</InputLabel>
<Input type="number" id="store_quantity" name="store_quantity" autoComplete="off" autoFocus value={store_quantity} onChange={this.onChange} />
</FormControl>

<FormControl margin="normal" required fullWidth>
<InputLabel htmlFor="store_storage_no">Storage No.</InputLabel>
<Input id="store_storage_no" name="store_storage_no" autoComplete="off" autoFocus value={store_storage_no} onChange={this.onChange} />
</FormControl>






<Button
type="submit"
 
variant="contained"
color="primary">
Create A New Entry
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


// StorageEdit.propType={
//     getEntryById : PropTypes.func.isRequired,
//     errors:PropTypes.object.isRequired,
//     editEntry: PropTypes.func.isRequired,
//     cancelEntry: PropTypes.func.isRequired,
//     classes: PropTypes.object.isRequired,
//   }

// const mapStateToProps = (state) => ({
//     errors:state.errors,
//     storage:state.storage
// })


export default connect(null,{getEntryById})(withRouter(withStyles(styles)(StorageEdit)));
