import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {  Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import Navbar from '../Navbar'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GrnTable from './components/GrnTable'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import GRNform from './components/GRNform'
import './Dashboard.scss'
import {getAllGrn} from '../../../actions/grnActions'
const styles = theme => ({
    root: {
      display: 'flex',
    },
    root1: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      float:'right'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    hide: {
      display: 'none',
    },
   
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  });


class Grn extends Component {

constructor(){
  super()
    this.state = {
      grns:[]
    };
}


componentDidMount(){
  this.props.getAllGrn();
}

componentWillReceiveProps(nextProps){
  console.log("-- INside grn ",nextProps)
  let arr = []
  if(nextProps.grn){
    const {AllGrn} = nextProps.grn
    //this.setState({all_grn:AllGrn})
  
    AllGrn.forEach((element)=>{
      var obj = {};
  

      // obj.grn_id = element._id;
      // obj.Item_code =  e.Item_code
      // obj.Item_description = e.Item_description
      // obj.Container_quantity= e.Container_quantity
      // obj.Total_quantity = e.Total_quantity
      // obj.Unit_price = e.Unit_price
      // obj.Total_price = e.Total_price
      // obj.Product_status = e.Product_status
      // obj.Accepted_qty = e.Accepted_qty
      // obj.Rejected_qty = e.Rejected_qty
      // obj.Depositor_currency = e.Depositor_currency
      // obj.Exchange_rate = e.Exchange_rate
      // obj.Created = e.Created  
  
      // element.List.forEach((e)=>{
        obj.grn_id = element._id;
        obj.Warehouse_code =  element.Warehouse_code
        obj.Warehouse_name = element.Warehouse_name
        obj.Depositor_code= element.Depositor_code
        obj.Depositor_name = element.Depositor_name
        obj.Supplier_code = element.Supplier_code
        obj.Supplier_name = element.Supplier_name
        obj.Shelf_code = element.Shelf_code
        obj.Shelf_name = element.Shelf_name
        obj.Zone_code = element.Zone_code
        obj.Zone_name = element.Zone_name
        obj.ReceiptDate = element.ReceiptDate  
        obj.List = element.List 
        obj.edit = <Link href =  {`/wms/grn/${element._id}/edit`} ><EditIcon/></Link>
        obj.delete = <Link href =  {`/wms/grn/${element._id}/delete`} ><DeleteForeverIcon/></Link>
       
      // })

      //console.log("---",obj)
     arr.push(obj)
  
    })

 //  this.setState({all_grn:arr})

  
  }

 

  this.setState({ grns: arr }, () => {
    //console.log(this.state.grns, 'get updated');
  });    
     
     
     // console.log("newec",this.state)
    
    }





    render() {

const {grns} = this.state
      
console.log("----grns",grns)
        const {classes} = this.props
     const {opacity} = this.state
        return (

          <div>
          
          
          <Grid item  xs={12}>
            <Navbar/>
            </Grid>

            <div className="dashboard">
           
            <div className="sidebar">
            <Sidebar/>
            </div>
          
            <div className="workspace">
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
          
            <Typography color="textPrimary">Good-receipt-note</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
         Good-receipt-note section
            </Typography>
            </Grid>

            </Grid>
    
  
            </Paper>
            </Grid>
           


          
            <Grid container spacing={5}>
            
            <Grid item xs={12}>
           
            <Grid item style={{alignSelf:"center"}}>
            <Button variant="contained" color="primary" href="/wms/grn/create">
            Add GRN
          </Button>  
    </Grid>


           
           <GrnTable booking_rows = {grns} />
            
            </Grid>
            
            </Grid>
           
            
            </Grid>
          </div>
           
  
              </div>
          
             
            </div>
           
</div>
            
        


        )
    }
}



const mapStateToProps = (state) => ({
  errors:state.errors,
 grn:state.grn
})

export default connect(mapStateToProps,{getAllGrn})(withStyles(styles)(Grn));
