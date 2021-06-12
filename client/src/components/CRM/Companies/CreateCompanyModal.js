import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { createContact, getAllCompanies, createCompany, editCompany, setCompaniesLoading, setActivitiesLoading, getAllActivities } from '../../../actions/crmActions'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Alert from '@material-ui/lab/Alert';

// import company from '../../../../../server/controllers/CRM/company';

const styles = makeStyles(theme => ({
    submitBtn:{
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px'
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000', 
           
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },

}))



const CreateCompanyModal = (props) => {
    const classes = styles();
    const initialCompany = {
        name : "",
        domain : "",
        description : "",
        industry : "",
        noOfEmployees : "",
        revenue : "",
        city : "",
        state : "",
        pin : "",
        email : "",
        mobile : "",
        lifecyclestage: "Stage1",
        owner: "-1"
    }

    const dispatch = useDispatch()
    const [company, setCompany] = useState( (props.type == "edit" || props.type == "view") ? props.data : initialCompany);
    const [ viewOnly, setViewOnly ] = useState( props.type == "view" ? true : false )
    const [error, setError] = useState('-1')

    const enableEdit = () => {
        setViewOnly(false)
        props.type = "edit"
    }
    
    const disableEdit = () => {
        setViewOnly(true)
        props.type = "view"
    }

    const handleSubmit = () =>{
        if( props.type == "edit"){
            console.log(company)
            editCompany(company)
        }
        else{
            createCompany(company)
        }
        console.log(company)
    }

    const createCompany = (data) => {
        console.log("Reached Action Create contact")
        dispatch(setCompaniesLoading())
        dispatch(setActivitiesLoading())
        axios.post('/api/companies/create/', data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllCompanies())
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating company ", data.name , err.response.data.message)
                setError(err.response.data.message)
            })
    }
    
    // EDIT
    const editCompany = (data) => {
        console.log("Reached Action Edit company", data)
        dispatch(setCompaniesLoading())
        dispatch(setActivitiesLoading())
        axios.post(`/api/companies/edit/${data._id}`, data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllCompanies())
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in editing contact ", data.name, err.response.data.message)
                setError(err.response.data.message)
            })
    }
    
    const setFieldValue = () => e => {
        e.persist();
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        })

    }

    const close = () => {
        props.onClose();
    }


    return (
        <div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={props.open} style={{borderRadius:'10px'}}>
          <div className={classes.modalPaper}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h5" align='center'>
                        { props.type=="edit" ? "Modify Company" : (props.type=="view" ? "Preview" : "Create a Company") }
                    </Typography>
                    <Typography variant="h5" align='center'>
                        { error !="-1" ? (<Alert severity="error">{error}</Alert>) :  null }
                    </Typography>

                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField id="name" name="name" disabled={viewOnly} defaultValue={company.name} label="Company Name" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="domain" name="domain" disabled={viewOnly} defaultValue={company.domain} label="Domain" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField id="mobile" name="mobile" disabled={viewOnly} defaultValue={company.mobile} label="Mobile" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="email" name="email" disabled={viewOnly} defaultValue={company.email} label="Email" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>

                        <TextField id="description" name="description"  disabled={viewOnly} defaultValue={company.description} label="Description" onChange={setFieldValue()} />
                        
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <TextField id="industry" name="industry" disabled={viewOnly} defaultValue={company.industry} label="Industry Type" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="noOfEmployees" name="noOfEmployees" disabled={viewOnly} defaultValue={company.noOfEmployees} label="No. Of Employees" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="revenue" name="revenue" disabled={viewOnly} defaultValue={company.revenue} label="Revenue" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField id="city" name="city" disabled={viewOnly} defaultValue={company.city} label="City" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="state" name="state" disabled={viewOnly} defaultValue={company.state} label="State" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="pin" name="pin" disabled={viewOnly} defaultValue={company.pin} label="pincode" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="lifecycleStageLabel">Lifecycle Stage</InputLabel>
                                    <Select
                                        labelId="lifecycleStageLabel"
                                        id="lifecycleStage"
                                        name="lifecyclestage"
                                        style={{width:"150px"}}
                                        disabled={viewOnly}
                                        defaultValue={company.lifecyclestage}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                    >
                                        <MenuItem value="Stage1">Stage 1</MenuItem>
                                        <MenuItem value="Stage2">Stage 2</MenuItem>
                                        <MenuItem value="Stage3">Stage 3</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="company-label">Owner</InputLabel>
                                    <Select
                                        labelId="owner-label"
                                        id="owner"
                                        name="owner"
                                        style={{width:"150px"}}
                                        disabled={viewOnly}
                                        defaultValue={company.owner}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                    >
                                        <MenuItem value="-1">No Owner</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                        
                        
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.submitBtn} onClick={() => handleSubmit()}>
                    { props.type=="edit" ? "Save Changes" : (props.type=="view" ? "View More" : "Create a Company" ) }
                    </Button>
                </Grid>
            </Grid>
        </div>
      </Fade>
    </Modal>
</div>


    )
}

export default CreateCompanyModal
