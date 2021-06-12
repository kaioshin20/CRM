import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, InputAdornment, Input, Checkbox, ListItemText } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCompanies, getAllContacts, getAllActivities, getAllDeals, setDealsLoading, setActivitiesLoading,  } from '../../../actions/crmActions'
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateCompanyModal from '../Companies/CreateCompanyModal';
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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formRow:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    formRowLabel:{
        marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1)
    },

}))



const CreateDealModal = (props) => {
    const classes = styles();
    const companies = useSelector(state => state.crm.companies)
    const contacts = useSelector(state => state.crm.contacts);
    const dispatch = useDispatch()
    const initialDeal = {
        name: "",
        description: "",
        amount: "",
        closeDate: "",
        companies: [],
        contacts: [],
        stage: "Stage1",
        owner: "-1"
    }
    const [ sync, setSync] = useState(true);
    const [deal, setDeal] = useState( (props.type == "edit" || props.type == "view") ? props.data : initialDeal )
    const [ viewOnly, setViewOnly ] = useState( props.type == "view" ? true : false )
    const [error, setError] = useState('-1')

    
    useEffect(() => {
        dispatch(getAllContacts())
        dispatch(getAllCompanies())
    },[])

    useEffect(() => {
        console.log(deal)
    },[deal])


    const handleSubmit = () =>{
        if(props.type == 'view'){
            close();
        }
        else if(props.type == 'create'){
            createDeal(deal)
        }
    }

    const createDeal = (data) => {
        console.log("Reached Action Create deal")
        dispatch(setDealsLoading())
        dispatch(setActivitiesLoading())
        axios.post('/api/deals/create/', data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllDeals())
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating deal ", data.name , err.response.data.message)
                setError(err.response.data.message)
            })
    }

    const close = () => {
        props.onClose();
    }

    const setFieldValue = () => e => {
        e.persist();
        setDeal({
            ...deal,
            [e.target.name]: e.target.value
        })
    }


    
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };


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
                        { props.type=="edit" ? "Modify Deal" : (props.type=="view" ? "Preview Deal" : "Create a Deal") }
                    </Typography>
                    <Typography variant="h5" align='center'>
                        { error !="-1" ? (<Alert severity="error">{error}</Alert>) :  null }
                    </Typography>

                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid container spacing={2} className={classes.formRow}>
                            <Grid item>
                                <TextField id="name" name="name" disabled={viewOnly} defaultValue={deal.name} label="Deal Name" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="amount" name="amount" disabled={viewOnly} defaultValue={deal.amount} label="Amount" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={classes.formRow}>
                            <Grid item>
                                <form className={classes.container} noValidate>
                                <TextField
                                    id="closeDate"
                                    label="Close Date"
                                    name="closeDate" disabled={viewOnly} defaultValue={deal.closeDate}
                                    type="datetime-local"
                                    onChange={setFieldValue()}
                                    
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                </form>
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={2} className={classes.formRow}>
                            <Grid item xs={12}>
                                <TextField id="description" name="description" disabled={viewOnly} defaultValue={deal.description} fullWidth label="Deal Description" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={2} className={classes.formRowLabel} alignItems="center">
                            <Typography variant="subtitle2">
                                Associated Links
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} className={classes.formRow} alignItems="center">
                            <Grid item>
                                <FormControl >
                                    <InputLabel id="contact-label">Contacts</InputLabel>
                                    <Select
                                        labelId="contact-label"
                                        id="contacts"
                                        name="contacts"
                                        style={{width:"170px"}}
                                        value= {deal.contacts}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                        multiple
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {contacts.map(contact => {
                                            return <MenuItem key={contact._id} value={contact._id}>
                                                    <Checkbox checked={deal.contacts.indexOf(contact._id) > -1} />
                                                    <ListItemText primary= {contact.fname + " " + contact.lname} />
                                                </MenuItem>
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item >
                                <FormControl >
                                    <InputLabel id="company-label">Company</InputLabel>
                                    <Select
                                        labelId="company-label"
                                        id="companies"
                                        name="companies"
                                        style={{width:"170px"}}
                                        value= {deal.companies}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                        multiple
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {companies.map(company => {
                                            return <MenuItem key={company._id} value={company._id}>
                                                    <Checkbox checked={deal.companies.indexOf(company._id) > -1} />
                                                    <ListItemText primary= {company.name} />
                                                </MenuItem>
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}  className={classes.formRow}>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="stageLabel">Lifecycle Stage</InputLabel>
                                    <Select
                                        labelId="stageLabel"
                                        id="stage"
                                        name="stage" disabled={viewOnly} defaultValue={deal.stage}
                                        style={{width:"195px"}}
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
                                        name="owner" disabled={viewOnly} defaultValue={deal.owner}
                                        style={{width:"195px"}}
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
                    { props.type=="edit" ? "Save Changes" : (props.type=="view" ? "Close" : "Create a Deal" ) }
                    </Button>
                </Grid>
            </Grid>
        </div>
      </Fade>
    </Modal>

    {/* Modal */}
        {/* <CreateCompanyModal open={companyOpen} onClose={handleCreateCompanyModalClose} /> */}
    {/* Modal Over */}
            
                

</div>


    )
}

export default CreateDealModal
