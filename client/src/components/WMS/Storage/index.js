import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import { Typography, Avatar, FormControl, Input, InputLabel } from '@material-ui/core'
import {getAllFromStorage,createNewEntry} from '../../../actions/storageActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Navbar from '../Navbar'
import './Storage.scss'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import EditIcon from '@material-ui/icons/Edit';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';

import withStyles from '@material-ui/core/styles/withStyles';
import StorageTable from './components/StorageTable'
const styles = theme =>({
  root: {
    width: '100%',
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    maxHeight: 440,
  },
  allButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  modalForm:{
   
transform:'translate(100%,0%)',
marginLeft:20,
marginRight:20,
marginBottom:20,
marginTop:30,
    width: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});
 class Storage extends Component {

    constructor(){
        super();
        this.state={
            AllProducts:{},
            Backup:{},
            open:false,
            close:true,
            store_product_name:'',
            store_category:'',
            store_quantity:'',
            store_storage_no:''
        }
  
        this.onChange=this.onChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
        this.onOpening= this.onOpening.bind(this)
        this.onClosing= this.onClosing.bind(this)
      
    }


  componentDidMount(){
    this.props.getAllFromStorage();

  }


  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
}



onOpening(){

  console.log("adsfadfa")
  this.setState({open:true,close:false})

  };
  
  onClosing(){
  
    console.log("in handleclose")
    this.setState({open:false})
  };

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

// filterFurniture(e){
// e.preventDefault()
// console.log("filter")
// }


    render() {
        const { store_product_name,store_category, store_quantity, store_storage_no} = this.state;
      let AllProducts = {}
    
      let rows =[]
  

      console.log("this prop in storage",this.props)



if(this.state.AllProducts.length >0){
    AllProducts = this.state.AllProducts

    rows = AllProducts.map((data,index)=>{
      const edit =  <Link to =  {`/wms/storage/${data._id}/edit`} ><EditIcon/></Link>

        const {
          category,
        product_name,
        quantity, 
        created,
         storage_no,
         _id
      } = data
      
      return {product_name,category,quantity,storage_no,created,_id,edit}
      })
}
else if(this.props){
        const {storage} = this.props.storage
       
  //console.log("checking",storage)
  if(storage !== null){
   //this.setState({AllProducts:storage.AllProducts}) 
   AllProducts = storage
//    this.setState({AllProducts:storage})  
     //console.log("adsf",storage.AllProducts,typeof(storage.AllProducts))
     //this.setState({AllProducts:storage.AllProducts})
     
     
     rows = AllProducts.map((data,index)=>{
      const edit =  <Link to =  {`/wms/storage/${data._id}/edit`} ><EditIcon/></Link>

      const {
        category,
      product_name,
      quantity, 
       storage_no,
       created,
       _id
    } = data
    
    return {product_name,category,quantity,storage_no,created,_id,edit}
    })
  }
  
  }



  const filterFurniture=(values)=>{
      console.log("valies in fur",values)
      AllProducts = values.filter((e)=>{
          return e.category === 'furniture'
      })

      console.log(this.state.AllProducts)
      console.log(AllProducts)
        this.setState({AllProducts:AllProducts})
      console.log("stae is",this.state.AllProducts)
  }



  const filterCosmetics=(values)=>{
    console.log("vali0es coske",values)
    AllProducts = values.filter((e)=>{
        return e.category === 'cosmetics'
    })

    console.log(this.state.AllProducts)
    console.log(AllProducts)
      this.setState({AllProducts:AllProducts})
    console.log("stae is",this.state.AllProducts)
}


const filterMedicine=(values)=>{
    console.log("valies in fumedir",values)
 //   console.log("valies",values)
    AllProducts = values.filter((e)=>{
        return e.category === 'medicines'
    })

    console.log(this.state.AllProducts)
    console.log(AllProducts)
      this.setState({AllProducts:AllProducts})
    console.log("stae is",this.state.AllProducts)
}

const filterAll=(values)=>{
    console.log("valies",values)
    AllProducts = values.filter((e)=>{
        return e.category === 'lala'
    })

    console.log(this.state.AllProducts)
    console.log(AllProducts)
      this.setState({AllProducts:AllProducts})
    console.log("stae is",this.state.AllProducts)
}

const filterFootwear=(values)=>{
    console.log("valies",values)
    AllProducts = values.filter((e)=>{
        return e.category === 'footwear'
    })

    console.log(this.state.AllProducts)
    console.log(AllProducts)
      this.setState({AllProducts:AllProducts})
    console.log("stae is",this.state.AllProducts)
}

const filterClothing=(values)=>{
    console.log("valies",values)
    AllProducts = values.filter((e)=>{
        return e.category === 'clothing'
    })

    console.log(this.state.AllProducts)
    console.log(AllProducts)
      this.setState({AllProducts:AllProducts})
    console.log("stae is",this.state.AllProducts)
}




  


console.log("all products are",AllProducts)
      const columns = [
        { id: 'product_name', label: 'Product', minWidth: 170 },
        { id: 'category', label: 'Category', minWidth: 100 },
        {
          id: 'quantity',
          label: 'Quantity',
          minWidth: 170,
          align: 'right'
        },
        {
          id: 'storage_no',
          label: 'Storage No.',
          minWidth: 170,
          align: 'right'
       
        },
      ];

   


 const { classes } = this.props
 

        return (
 <div>
 <Navbar/>     
            <div className="dashboard-storage">   
            <div className="sidebar-storage">
            <Sidebar/>
            </div>
         
            <div className="workspace-storage">
            
            <Grid container spacing={3}>
            <Grid item  xs={12}>
            <Paper className={classes.paper}>
            <Grid container spacing={3}>
     
            <Grid item xs={6}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.ContainerBreadcrumb}>
            <Link  to="/wms" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
            WMS
            </Link>
          
            <Typography color="textPrimary">Storage</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
            Storage
            </Typography>
            </Grid>
           
         
    
    
    
            </Grid>
            </Paper>
            </Grid>
            <Grid item  xs={12}>
            <Paper className={classes.root}>
            <div className={classes.allButton}>

            <Button type="button" variant="contained" color="primary" href="/wms/storage/create">
           Create
          </Button>         
           
          <Button onMouseDown = {()=> filterFurniture(AllProducts)} onMouseUp = {()=> filterFurniture(AllProducts)} variant="contained" color="primary">
  See All furniture
</Button>
<Button variant="contained" onMouseDown = {()=> filterCosmetics(AllProducts)} onMouseUp = {()=> filterCosmetics(AllProducts)}  color="primary">
  See All cosmetics
</Button>
<Button variant="contained" onMouseDown = {()=> filterMedicine(AllProducts)} onMouseUp = {()=> filterMedicine(AllProducts)}  color="primary">
  See All Medicines
</Button>
<Button variant="contained" onMouseDown = {()=> filterFootwear(AllProducts)} onMouseUp = {()=> filterFootwear(AllProducts)}  color="primary">
  See All Footwear
</Button>
<Button variant="contained" onMouseDown = {()=> filterClothing(AllProducts)} onMouseUp = {()=> filterClothing(AllProducts)}  color="primary">
  See All Clothings
</Button>
            </div>

           <StorageTable Storage_rows = {rows} />
           
          </Paper>

            </Grid>
            </Grid>

            
          
            </div>



            </div>
            </div>
                
                
          
        )
    }
}


Storage.propTypes = {
  getAllFromStorage: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  storage: state.storage
});


export default connect(mapStateToProps,{getAllFromStorage,createNewEntry})(withStyles(styles)(Storage));

