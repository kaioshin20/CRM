import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {  Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import Navbar from '../Navbar'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PickListTable from './components/PickListTable'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import './Dashboard.scss'
 import {getAllPickList} from '../../../actions/pickListActions'
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


class PickList extends Component {

constructor(){
  super()
    this.state = {
      pickLists:[]
    };
}


componentDidMount(){
 this.props.getAllPickList()
}

componentWillReceiveProps(nextProps){
  
//  console.log("nextprops picllist",nextProps)

  if(nextProps.pickList){
    const {AllPickList} = nextProps.pickList
    this.setState({pickLists:AllPickList})
console.log("AllpickList",AllPickList)
  AllPickList.forEach((e)=>{
    e.edit = <Link href =  {`/wms/picklist/${e._id}/edit`} ><EditIcon/></Link>

  })

  this.setState({pickLists:AllPickList})

  }
  }

 



    render() {

        const {classes} = this.props

     const {opacity} = this.state


     console.log("render of picklist",this.state.pickLists)
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
          
            <Typography color="textPrimary">Pick List</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
            Pick List Section
            </Typography>
            </Grid>

            </Grid>
    
  
            </Paper>
            </Grid>
           


          
            <Grid container spacing={5}>
            
            <Grid item xs={12}>
            <Grid item style={{alignSelf:"center"}}>
            <Button variant="contained" color="primary" href="/wms/picklist/create">
          Add new Pick list
          </Button>  
    </Grid>

            <PickListTable picklist_rows = {this.state.pickLists} />
         


            
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
  pickList:state.pickList
})

//export default (withStyles(styles)(PickList))
export default connect(mapStateToProps,{getAllPickList})(withStyles(styles)(PickList));


// <Grid item style={{alignSelf:"center"}}>
// <Button variant="contained" color="primary" href="/wms/grn/create">
// Add GRN
// </Button>  
// </Grid>