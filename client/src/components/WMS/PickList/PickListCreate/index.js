import React, { Component } from 'react'
import Sidebar from '../../Sidebar'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {  Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withStyles from '@material-ui/core/styles/withStyles'


import Navbar from '../../Navbar'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import PickListform from '../components/PickListform'
import '../Dashboard.scss'
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


class PickListCreate extends Component {

constructor(){
  super()
    this.state = {
      PickLists:[]
    };
}


componentDidMount(){
  
}





    render() {
        const {classes} = this.props
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
            <Link  to="/wms/PickList" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                Good Receipt Note
            </Link>

            <Typography color="textPrimary">  Create PickList</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
         Create PickList
            </Typography>
            </Grid>

            </Grid>
          
    
  
            </Paper>
            </Grid>

            <Grid container spacing={5}>
            
            <Grid item xs={12}>
                      
    <PickListform/> 
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




export default (withStyles(styles)(PickListCreate));
