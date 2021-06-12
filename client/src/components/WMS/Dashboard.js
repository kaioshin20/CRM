import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Navbar from './Navbar'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { NavLink } from "react-router-dom";
import ContentTable from './ContentTable'
import StorageDashboard from './Storage-Dashboard/StorageDashboard'
import AnnualBarGraph from './AnnualBarGraph'
import withStyles from '@material-ui/core/styles/withStyles'
import{ Card,Nav,Button} from 'react-bootstrap'
import './Dashboard.scss'
import DailySale from './DailySale'
import CircularGraph from './CircularGraph'
import StorageLineGraph from './StorageLineGraph';
import BookingGraph from './BookingGraph';

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


class wms extends Component {

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/1p40zzfe/';

  state = {
    opacity: {
      uv: 1,
      pv: 1,
    },
  };

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  }

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  }


    render() {

        const {classes} = this.props
     const {opacity} = this.state
        return (

          <div>
          <Navbar/>
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
          
            <Typography color="textPrimary">Dashboard</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
            Dashboard
            </Typography>
            </Grid>

            </Grid>
    
  
            </Paper>
            </Grid>
            <Grid item xs={6}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
            <h3>
            Storage
           </h3>
             
            <AnnualBarGraph/>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.paper}>
            

            <CircularGraph/>
            </Paper>
          </Grid>
            </Grid>


            <Grid item xs={6}>
            <StorageDashboard/>
            <Paper className={classes.paper}>
            <h3>
           Storage Space Variation
           </h3>
             
            <StorageLineGraph/>
            </Paper>
            </Grid>
            <Grid container spacing={8}>
            
            <Grid item xs={12}>
           
            <Paper className={classes.paper}>
         
            <BookingGraph/>
            </Paper>
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


export default withStyles(styles)(wms);

// <div className="table">


// </div>
