import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Papa from 'papaparse'
import csv from "csv";

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SideBar from './SideBar'
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import EditExcel from './EditExcel';
import CreateQuotation from './CreateQuotation';
import ExcelUpload from './ExcelUpload';
import Example from './FileReader';
import AddNew from './AddNew';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRates } from '../../actions/pricingAction';
import { Grid } from '@material-ui/core';
import { RatesTable } from './RatesTable';



const useStyles = makeStyles((theme) => ({
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
    marginLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(9) + 1,
    },
    background: "#f1f7f9"
},
}));




export default function RatesLanding() {

  const classes = useStyles();
  const pricingState = useSelector(state => state.pricing)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRates())
  }, [])
  

  const sideBar = {
    Rates : [
      {
        label : "Upload Rate",
        component : Link,
        icon : <PersonIcon />,
        to: "/pricing/rates/upload",
        state: {}
      },
      {
        label : "Create Rate",
        component : Button,
        icon : <PersonIcon />,
        to: "/pricing/rates/add",
        state: {}
      },
      {
        label : "View Rate",
        component : Link,
        icon : <PersonIcon />,
        to: "/pricing/rates",
        state:{}
      },      
    ],
    Query : [
      {
        label : "Upload Query",
        component : Link,
        to: "/pricing/query/upload",
        icon : <PersonIcon />,
        state: {}
      },
      {
        label : "Create Query",
        component : Button,
        icon : <PersonIcon />,
        to: "/pricing/query/add",
        state: {}
      },
      {
        label : "View Query",
        component : Link,
        icon : <PersonIcon />,
        to: "/pricing/query",
        state:{}
      },      
    ]
  }

 

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <SideBar sideBar={sideBar} />
          <h1>Rates Landing</h1>
          <Button  onClick={() => console.log(pricingState)} >Show Data</Button>
          <Grid container>
            <Grid item xs={12}>
              <RatesTable />
            </Grid>

          </Grid>
      </main>
    </div>
  );
}
