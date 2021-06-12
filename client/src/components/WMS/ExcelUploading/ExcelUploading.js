// import React, { Component } from 'react'

// export default class ExcelUploading extends Component {
//     render() {
//         return (
//             <div>
//                 <h1></h1>
//             </div>
//         )
//     }
// }


// import React, { Component } from 'react'
// import Sidebar from '../Sidebar'
// import { Typography, Avatar, FormControl, Input, InputLabel } from '@material-ui/core'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Modal from '@material-ui/core/Modal';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Navbar from '../Navbar'
// import './ExcelUploading.scss'
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import EditIcon from '@material-ui/icons/Edit';

// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import { Link } from 'react-router-dom'

// import Grid from '@material-ui/core/Grid';

// import withStyles from '@material-ui/core/styles/withStyles';
// const styles = theme =>({
//   root: {
//     width: '100%',
//   },
//   root1: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   container: {
//     maxHeight: 440,
//   },
//   allButton: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },

//   modalForm:{
   
// transform:'translate(100%,0%)',
// marginLeft:20,
// marginRight:20,
// marginBottom:20,
// marginTop:30,
//     width: 400,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// });
//  class ExcelUploading extends Component {

//     constructor(){
//         super();
//         this.state={
         
//         }
  
     
//     }


  


  

//     render() {
     




   


//  const { classes } = this.props
 

//         return (
//  <div>
//  <Navbar/>     
//             <div className="dashboard-storage">   
//             <div className="sidebar-storage">
//             <Sidebar/>
//             </div>
         
//             <div className="workspace-storage">
            
//             <Grid container spacing={3}>
//             <Grid item  xs={12}>
//             <Paper className={classes.paper}>
//             <Grid container spacing={3}>
     
//             <Grid item xs={6}>
//             <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.ContainerBreadcrumb}>
//             <Link  to="/wms" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
//             WMS
//             </Link>
          
//             <Typography color="textPrimary">Excel Uploading</Typography>
//         </Breadcrumbs>
//             </Grid>
//             <Grid item xs={5} style={{textAlign:'right'}}>
//             <Typography variant="h5" >
//             Excel Uploading
//             </Typography>
//             </Grid>
           
         
    
    
    
//             </Grid>
//             </Paper>
//             </Grid>
           
//             </Grid>

            
          
//             </div>



//             </div>
//             </div>
                
                
          
//         )
//     }
// }


// Storage.propTypes = {
//   getAllFromStorage: PropTypes.func.isRequired
// };


// const mapStateToProps = state => ({
//   storage: state.storage
// });

//export default (withStyles(styles)(ExcelUploading)) 
//export default connect(mapStateToProps,{getAllFromStorage,createNewEntry})(withStyles(styles)(Storage));



import React, { useEffect } from 'react';
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
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import StepConnector from '@material-ui/core/StepConnector';
import PersonIcon from '@material-ui/icons/Person';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import FastForwardIcon from '@material-ui/icons/FastForward';

import EditExcel from './EditExcel';
import CreateQuotation from './CreateQuotation';
import ExcelUpload from './ExcelUpload';
import Example from './FileReader';
import AddNew from './AddNew';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_FILES, SET_DATA } from '../../../actions/types';
import { uploadRates } from '../../../actions/pricingAction';


import Sidebar from '../Sidebar'
import { Typography, Avatar, FormControl, Input, InputLabel } from '@material-ui/core'
import {connect} from 'react-redux'
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
import './ExcelUploading.scss'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import EditIcon from '@material-ui/icons/Edit';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
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
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CloudUploadIcon />,
    2: <EditSharpIcon />,
    3: <CheckCircleRoundedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.'
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


function getSteps() {
  return ['Upload .csv file', 'Make changes if needed', 'View and Submit'];
}




export default function ExcelUploading() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [formOpen, setFormOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const history = useHistory()

  const pricingState = useSelector(state => state.pricing)
  const dispatch = useDispatch();
  const [fileObjects, setFileObjects] = React.useState(pricingState.FilesUploaded);
  const [data, setData] = React.useState(pricingState.rateToUpload);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/pricing/rates")
  };


  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
	if(activeStep === 0){
		if(fileObjects.length != 0){
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
		else{
			console.log("Please upload a file to proceed")
		}
	}
    else if (activeStep === 2) {
		var tempData = data
		tempData.splice(0,0)
      if (tempData.length != 0) {
		tempData = tempData.map(ele => {
		return {
			name: ele[0],
			modifiedTitleLabel: ele[1],
			location: ele[2],
			age: ele[3],
			salary: ele[4],
			}
		})
		console.log("Uploading Rates into Database . . . ", tempData)
			if (dispatch(uploadRates(tempData))) {
				console.log("Upload dispatch ---> true")
				setData([]);
				setFileObjects([]);
			}
			else {
			setData([]);
			setFileObjects([]);
			console.log("Nothing to upload")
			}
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      else {
        console.log("Got error")
      }
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
	setActiveStep(0);
	setData([]);
	setFileObjects([]);
  };


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ExcelUpload fileObjects={fileObjects} setFileObjects={(files) => {
          dispatch({
            type: UPLOAD_FILES,
            payload: files
          })
          setFileObjects(files)
        }
        }
          data={data}
          setData={(data) => {
            dispatch({
              type: SET_DATA,
              payload: data
            })
            setData(data)
          }}
        />;
      case 1:
        return <EditExcel data={data} setData={(data) => {
          dispatch({
            type: SET_DATA,
            payload: data
          })
          setData(data)
        }} />;
      case 2:
        return <CreateQuotation data={data} />;
      default:
		  setData([]);
		  setFileObjects([]);
        return 'Unknown step';
    }
  }


  useEffect(() => {
    console.log(fileObjects, data)
  })

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
          
            <Typography color="textPrimary">Excel Uploading</Typography>
        </Breadcrumbs>
            </Grid>
            <Grid item xs={5} style={{textAlign:'right'}}>
            <Typography variant="h5" >
            Excel Uploading
            </Typography>
            </Grid>
           
          
         
    
    
    
            </Grid>
            </Paper>

            
            </Grid>
            <Grid item xs = {12} style={{overflowX: 'scroll'}}>
            {/**  uplaodong box  */}
            
            <Grid item xs = {12}> 
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step key={label}    >
                <StepLabel onClick={() => {
                  if (index == 0) {
                    setActiveStep(index)
                  }
                  else if ((index == 1 || index == 2) && fileObjects.length != 0 && data.length != 0) {
                    setActiveStep(index)
				  }
				}
                } StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

            </Grid>
            
            
            <Grid item xs = {12}>
                    {(activeStep != steps.length) ? getStepContent(activeStep) : ""}
  
            </Grid>
            
            <Grid item xs = {12}>
            <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  Data saved succesfully -Please click Finish to view all Rates
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleClose} endIcon={<FastForwardIcon />} className={classes.button}>
                  Finish
                </Button>
              </div>
            ) : (
                <div>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      startIcon={activeStep === steps.length - 1 ? <SaveRoundedIcon /> : null}
                    >
                      {activeStep === steps.length - 1 ? "Save" : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
          </div>
            </Grid>
            </Grid>
            </Grid>

            
          
            </div>



            </div>
            </div>
                
                
 
  );
}


