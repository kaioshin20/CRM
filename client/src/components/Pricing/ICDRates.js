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
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRates } from '../../actions/pricingAction';
import { Grid, Paper, Breadcrumbs } from '@material-ui/core';
import { RatesTable } from './RatesTable';
import { ICD_Rates } from './AddRates/ExcelTemplates';



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

section:{
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
},
sectionPaper:{
  padding:theme.spacing(2),
},
paper:{
  paddingTop:"10px",
  paddingBottom:"10px",
  paddingLeft:"30px",
  paddingRight:"30px"
},
ContainerBreadcrumb:{
  marginTop: "auto",
  marginBottom: "auto"
},
}));




export default function ICDRates() {

  const classes = useStyles();
  const pricingState = useSelector(state => state.pricing)
  let location = useLocation();
  const [template, setTemplate] = React.useState(ICD_Rates)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRates({type: ICD_Rates.name}))
    // if(location.state === "ICDRates"){
    //   setTemplate(ICD_Rates)
    // }
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
        component : "Collapse",
        icon : <PersonIcon />,
        child : [
          {
            label : "ICD Rates",
            component : Link,
            icon : <PersonIcon />,
            to: "/pricing/rates/icd",
          },
          {
            label : "FCL Buy Rates",
            component : Link,
            icon : <PersonIcon />,
            to: "/pricing/rates/fcl",
          }
        ]
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
          <Button  onClick={() => console.log(pricingState)} >Show Data</Button>
          <Grid container className={classes.section}>
            <Grid item xs={12}>
                <Paper variant="outlined" className={clsx(classes.sectionPaper)}>
                    <Grid container justify="space-between">
                        <Grid item xs={12} sm={4} style={{alignSelf:"center"}}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.ContainerBreadcrumb}>
                                <Link  to="/pricing/rates" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                                Pricing
                                </Link>
                                <Typography color="textPrimary">ICD Rates</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Grid container  justify="flex-end" spacing={2}>
                                <Grid item>
                                    <Button component={Link} to="/pricing/rates/upload" variant="outlined" size="large" color="primary" className={classes.margin}>
                                        Import
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" size="large" color="primary" className={classes.margin} >
                                        Create new ICD Rate
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
          </Grid>
            
          <Grid container>
            <Grid item xs={12}>
              <RatesTable template={template} type={"ICDRates"}/>
            </Grid>

          </Grid>
      </main>
    </div>
  );
}
