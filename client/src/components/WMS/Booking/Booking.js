import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import { Typography, Avatar, FormControl, Input, InputLabel } from '@material-ui/core'
import {getAllBookings} from '../../../actions/bookingActions'
import {connect} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Navbar from '../Navbar'
import './Booking.scss'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';

import withStyles from '@material-ui/core/styles/withStyles';
import BookingTable from './BookingTable'
const styles = theme =>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  allButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
});
 class Storage extends Component {

    constructor(){
        super();
        this.state={
            AllBookings:{},
            Backup:{}
        }
  
        this.onChange=this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
    
        
  
    }


  componentDidMount(){
    this.props.getAllBookings();

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

    this.props.createNewEntry(newEntry,this.props.history)
   
}

// filterBooked(e){
// e.preventDefault()
// console.log("filter")
// }


    render() {
        const { store_product_name,store_category, store_quantity, store_storage_no} = this.state;
      let AllBookings = {}
    
      let rows =[]
  




if(this.state.AllBookings.length >0){
    AllBookings = this.state.AllBookings

    rows = AllBookings.map((data,index)=>{

      const edit = <Link to =  {`/wms/booking/${data._id}/edit`} ><EditIcon/></Link>
        const {
          product_category,
  product_name,
  product_quantity,
  shipping_address,
  shipping_email,
  created,
  shipping_status,
         _id
      } = data
      
      return { product_category,
          product_name,
          product_quantity,
          created,
          shipping_address,
          shipping_email,
          shipping_status,
                 _id,
                 edit
                }
      })
}
else if(this.props){
        const {booking} = this.props.booking
       
  //console.log("checking",storage)
  if(booking !== null){
   //this.setState({AllBookings:storage.AllBookings}) 
   AllBookings = booking
   console.log("all")
//    this.setState({AllBookings:storage})  
     //console.log("adsf",storage.AllBookings,typeof(storage.AllBookings))
     //this.setState({AllBookings:storage.AllBookings})
      rows = AllBookings.map((data,index)=>{

        const edit =  <Link to =  {`/wms/booking/${data._id}/edit`} ><EditIcon/></Link>
      const {
        product_category,
product_name,
product_quantity,
shipping_address,
shipping_email,
shipping_status,
created,
      _id
    } = data
    
    return { product_category,
        product_name,
        product_quantity,
        shipping_address,
        shipping_email,
        shipping_status,
               _id,
               created,
               edit
              }
    })
  }
  
  }



  const filterBooked=(values)=>{
      console.log("valies in fur",values)
      AllBookings = values.filter((e)=>{
          return e.shipping_status === 'booked'
      })

      console.log(this.state.AllBookings)
      console.log(AllBookings)
        this.setState({AllBookings:AllBookings})
      console.log("stae is",this.state.AllBookings)
  }



  const filterReady=(values)=>{
    console.log("vali0es coske",values)
    AllBookings = values.filter((e)=>{
        return e.shipping_status === 'ready'
    })

    console.log(this.state.AllBookings)
    console.log(AllBookings)
      this.setState({AllBookings:AllBookings})
    console.log("stae is",this.state.AllBookings)
}


const filterShipped=(values)=>{
    console.log("valies in fumedir",values)
 //   console.log("valies",values)
    AllBookings = values.filter((e)=>{
        return e.shipping_status === 'shipped'
    })

    console.log(this.state.AllBookings)
    console.log(AllBookings)
      this.setState({AllBookings:AllBookings})
    console.log("stae is",this.state.AllBookings)
}

const filterAll=(values)=>{
    console.log("valies",values)
    AllBookings = values.filter((e)=>{
        return e.shipping_status === 'lala'
    })

    console.log(this.state.AllBookings)
    console.log(AllBookings)
      this.setState({AllBookings:AllBookings})
    console.log("stae is",this.state.AllBookings)
}






console.log("all products are",AllBookings)


      const columns = [
        { id: 'product_name', label: 'Product', minWidth: 170 },
        { id: 'product_category', label: 'Category', minWidth: 100 },
        {
          id: 'product_quantity',
          label: 'Quantity',
          minWidth: 120,
          align: 'right'
        },
        {
            id: 'shipping_email',
            label: 'shipping Email',
            minWidth: 100,
            align: 'right'
          },
          {
            id: 'shipping_address',
            label: 'Shipping Address',
            minWidth: 100,
            align: 'right'
          },
        {
          id: 'shipping_status',
          label: 'Shipping status',
          minWidth: 70,
          align: 'right'
       
        },
        {
          id: 'edit',
          label: 'Edit',
          minWidth: 170,
          align: 'right'
       
        }
      ];

  

 const { classes } = this.props


        return (
 <div>
            <Navbar/>
            <div className="dashboard-booking">   
            <div className="sidebar-booking">
            <Sidebar/>
            </div>
         
            <div className="workspace-booking">
            <div className={classes.root1}>
            <Grid container spacing={3}>
            <Grid item  xs={12}>
            <Paper className={classes.paper}>
            <Grid container spacing={3}>
     
            <Grid item xs={6}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.ContainerBreadcrumb}>
            <Link  to="/wms" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
            WMS
            </Link>
          
            <Typography color="textPrimary">Booking</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
            Booking
            </Typography>
            </Grid>

            </Grid>
            </Paper>
            </Grid>
            <Grid item  xs={12}>

            <Paper className={classes.root}>
            <div className={classes.allButton}>
           
            <Button variant="contained" style={{color:'white'}} color="primary" href = "/wms/booking/create">
            Add a New Booking
          </Button>

         

            <Button variant="contained" onMouseDown = {()=> filterAll(AllBookings)} onMouseUp = {()=> filterAll(AllBookings)}  color="primary">
  See whole Booking
</Button>

           

          <Button onMouseDown = {()=> filterBooked(AllBookings)} onMouseUp = {()=> filterBooked(AllBookings)} variant="contained" color="primary">
  See All Booked
</Button>
<Button variant="contained" onMouseDown = {()=> filterReady(AllBookings)} onMouseUp = {()=> filterReady(AllBookings)}  color="primary">
  See All Ready
</Button>
<Button variant="contained" onMouseDown = {()=> filterShipped(AllBookings)} onMouseUp = {()=> filterShipped(AllBookings)}  color="primary">
  See All Shipped
</Button>

            </div>


<BookingTable booking_rows = {rows} />
           
          </Paper>
            </Grid>
            </Grid>
            </div> 

          
            </div>




            </div>
            </div>
                
                
          
        )
    }
}


Storage.propTypes = {
    getAllBookings: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  booking: state.booking
});


export default connect(mapStateToProps,{getAllBookings})(withStyles(styles)(Storage));



// <TableContainer className={classes.container}>
// <Table stickyHeader aria-label="sticky table">
//   <TableHead>
//     <TableRow>
//       {columns.map((column) => (
//         <TableCell
//           key={column.id}
//           align={column.align}
//           style={{ minWidth: column.minWidth }}
//         >
//           {column.label}
//         </TableCell>
//       ))}
//     </TableRow>
//   </TableHead>
//   <TableBody>
  
//     {rows  ?(rows.map((row) => {
//       return (
//         <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
//           {columns.map((column) => {
//             const value = row[column.id];
          
//             return (
            
//               <TableCell key={column.id} align={column.align}>
//                <p>{value}</p>
//               </TableCell>
//             );
//           })}
//         </TableRow>
//       );
//     }))
//     : null

//   }
//   </TableBody>
// </Table>
// </TableContainer>