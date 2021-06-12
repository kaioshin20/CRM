import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, InputAdornment } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { getAllContacts, getAllCompanies, getAllActivities, setActivitiesLoading, setContactsLoading } from '../../../actions/crmActions'
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateCompanyModal from '../Companies/CreateCompanyModal';
import { useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';

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
        // margin: theme.spacing(1),
        minWidth: 120,
      },

}))



const CreateContactModal = (props) => {
    const classes = styles();
    const companies = useSelector(state => state.crm.companies)
    const dispatch = useDispatch()
    const history = useHistory();

    const initialContact = {
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        designation: "",
        companyId:"",
        lifecyclestage: "Stage1",
        leadstage: "Stage1",
        owner: "-1"
    }
    const contactState = useSelector(state => state.crm.contacts);
    const [contact, setContact] = useState( (props.type == "edit" || props.type == "view") ? props.data : initialContact );
    const [companyOpen, setCompanyOpen] = useState(false);
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


    
    useEffect(() => {
        console.log(contact)
    }, [contact])
    
    const openCreateCompanyModal = () => {
        setCompanyOpen(true)        
    }
    
    const handleCreateCompanyModalClose = () => {
        setCompanyOpen(false)
    }

    const editContact = (data) => dispatch => {
        console.log("Reached Action Edit contact", data)
        dispatch(setContactsLoading())
        dispatch(setActivitiesLoading())
        axios.post(`/api/contacts/edit/${data._id}`, data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllContacts())
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating contact ", data.fname+data.lname , err.response.data.message)
                setError(err.response.data.message)
            })
    }
    const createContact = (data) => {
        console.log("Reached Action Create contact")
        dispatch(setContactsLoading())
        dispatch(setActivitiesLoading())
        axios.post('/api/contacts/create/', data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllContacts())
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating contact ", data.fname+data.lname , err.response.data.message)
                setError(err.response.data.message)
            })
    }

    const handleSubmit = () =>{
        if( props.type == "edit"){
            console.log(contact)
            editContact(contact)
        }
        else if(props.type == "view"){
            console.log(props.data._id.toString())
            history.push('/crm/contact/id/', {state: props.data._id})
        }
        else{
            createContact(contact)
        }
        console.log(contact)
        
    }

    const close = () => {
        props.onClose();
    }

    const setFieldValue = () => e => {
        e.persist();
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })

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
                        { props.type=="edit" ? "Modify Contact" : (props.type=="view" ? "Preview" : "Create a Contact") }
                    </Typography>
                    <Typography variant="h5" align='center'>
                        { error !="-1" ? (<Alert severity="error">{error}</Alert>) :  null }
                    </Typography>
                    
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField id="fname" name="fname" label="First Name" disabled={viewOnly} defaultValue={contact.fname} onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="lname" name="lname" label="Last Name" disabled={viewOnly}  defaultValue={contact.lname} onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item>
                            <TextField id="mobile" name="mobile" label="Mobile" disabled={viewOnly}  defaultValue={contact.mobile} onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="email" name="email" label="Email" disabled={viewOnly} defaultValue={contact.email} onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        
                        
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <TextField id="designation" name="designation" label="Designation" disabled={viewOnly} defaultValue={contact.designation} onChange={setFieldValue()} />
                            </Grid>
                            <Grid item >
                            
                                    <FormControl >
                                        <InputLabel id="company-label">Company</InputLabel>
                                        <Select
                                            labelId="company-label"
                                            id="company"
                                            name="companyId"
                                            style={{width:"170px"}}
                                            defaultValue={contact.companyId}
                                            disabled={viewOnly}
                                            onChange={setFieldValue()} 
                                            startAdornment={<InputAdornment position="start">@</InputAdornment>}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Tooltip title="Add New Company" aria-label="add">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            disabled={viewOnly}
                                                            onClick={() => openCreateCompanyModal()}
                                                            style={{marginRight:"-40px"}}
                                                            edge="end"
                                                        >
                                                            <AddBoxIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </InputAdornment>
                                              }
                                            fullWidth
                                        >
                                            {companies.map(company => {
                                                return <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                                            })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* <Grid item>
                                    <Tooltip title="Add New Company" aria-label="add">
                                        <IconButton aria-label="delete">
                                            <AddBoxIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid> */}
                        </Grid>
                        {/* <TextField id="domain" name="domain" label="Company Domain" onChange={setFieldValue()} />
                        <TextField id="owner" name="owner" label="Owner" onChange={setFieldValue()} /> */}
                        <Grid container spacing={2} >
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="lifecyclestageLabel">Lifecycle Stage</InputLabel>
                                    <Select
                                        labelId="lifecyclestageLabel"
                                        id="lifecyclestage"
                                        name="lifecyclestage"
                                        style={{width:"195px"}}
                                        disabled={viewOnly}
                                        defaultValue={contact.lifecyclestage}
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
                                    <InputLabel id="leadstage-label">Lead Stage</InputLabel>
                                    <Select
                                        labelId="leadstage-label"
                                        id="leadstage"
                                        name="leadstage"
                                        style={{width:"195px"}}
                                        defaultValue={contact.leadstage}
                                        disabled={viewOnly}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                    >
                                        <MenuItem value="Stage1">Stage 1</MenuItem>
                                        <MenuItem value="Stage2">Stage 2</MenuItem>
                                        <MenuItem value="Stage3">Stage 3</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="company-label">Owner</InputLabel>
                                    <Select
                                        labelId="owner-label"
                                        id="owner"
                                        name="owner"
                                        style={{width:"195px"}}
                                        defaultValue={contact.owner}
                                        disabled={viewOnly}
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
            <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.submitBtn} onClick={() => handleSubmit()}>
                        { props.type=="edit" ? "Save Changes" : (props.type=="view" ? "View More" : "Create a Contact" ) }
                    </Button>
                </Grid>
            </Grid>
        </div>
      </Fade>
    </Modal>

    {/* Modal */}
        <CreateCompanyModal open={companyOpen} onClose={handleCreateCompanyModalClose} />
    {/* Modal Over */}
            
                

</div>


    )
}

export default CreateContactModal
