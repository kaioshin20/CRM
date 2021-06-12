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
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import FastForwardIcon from '@material-ui/icons/FastForward';

import EditExcel from './EditExcel';
import CreateQuotation from './CreateQuotation';
import ExcelUpload from './ExcelUpload';
import Example from './FileReader';
import AddNew from './AddNew';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_FILES, SET_DATA } from '../../actions/types';
import { uploadRates } from '../../actions/pricingAction';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: "800px"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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




export default function QuotationUpload() {

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

  const sideBar = {
    Rates: [
      {
        label: "Upload Rate",
        component: Link,
        icon: <PersonIcon />,
        to: "/pricing/rate/upload",
        state: {}
      },
      {
        label: "Create Rate",
        component: Button,
        icon: <PersonIcon />,
        to: "/pricing/rate/add",
        state: {}
      },
      {
        label: "View Rate",
        component: Link,
        icon: <PersonIcon />,
        to: "/pricing/rate",
        state: {}
      },
    ],
    Query: [
      {
        label: "Upload Query",
        component: Link,
        to: "/pricing/query/upload",
        icon: <PersonIcon />,
        state: {}
      },
      {
        label: "Create Query",
        component: Button,
        icon: <PersonIcon />,
        to: "/pricing/query/add",
        state: {}
      },
      {
        label: "View Query",
        component: Link,
        icon: <PersonIcon />,
        to: "/pricing/query",
        state: {}
      },
    ]
  }

  useEffect(() => {
    console.log(fileObjects, data)
  })

  return (
    <div>
      {/* <SideBar sideBar={sideBar} /> */}
      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
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
        </DialogTitle>
        <DialogContent>
          {(activeStep != steps.length) ? getStepContent(activeStep) : ""}
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>

    </div>
  );
}
