import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import  Sidebar  from "../Sidebar";
import StickyHeadTable from '../ContentTable'
import './Shiping.scss'
import PropTypes from 'prop-types'
import {getAllBookings} from '../../../actions/bookingActions'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../Navbar'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
class Shipping extends Component {

    constructor(){
        super();
        this.state = {
            AllBooking:[]
        }
    }
    componentDidMount(){
        this.props.getAllBookings();
    }

    componentWillReceiveProps(nextProps){
console.log("insode the shipping",nextProps.booking.booking)

if(nextProps.booking.booking)
  this.setState({AllBooking:nextProps.booking.booking})

    }


    render() {

      const {classes} = this.props
        return (
            <div>
            <Navbar />
            <div className="dashboard-shipping">   
            <div className="sidebar-shipping">
            <Sidebar/>
            </div>
         
            <div className="workspace-shipping">
            
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
          
            <Typography color="textPrimary">Shipping-Tracker</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
            Shipping-Tracker
            </Typography>
            </Grid>

            </Grid>
            </Paper>
            </Grid>
            <Grid item  xs={12}>
            <StickyHeadTable cycles = {this.state.AllBooking}/>

            </Grid>
            </Grid>
          
            </div>



            </div>
            </div>
            </div>
        )
    }
}

Shipping.propTypes = {
    getAllBookings: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors:state.errors,
    booking:state.booking
})
export default connect(mapStateToProps,{getAllBookings})(withStyles(styles)(Shipping));