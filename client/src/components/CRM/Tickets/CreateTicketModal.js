import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, InputAdornment, Input, Checkbox, ListItemText } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { createTicket, setTicketLoading, setActivitiesLoading, getAllTickets, getAllActivities, getAllContacts, getAllCompanies, getAllDeals } from '../../../actions/crmActions'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Alert from '@material-ui/lab/Alert';
// import CreateTiModal from '../Companies/CreateCompanyModal';

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



const CreateTicketModal = (props) => {
    const classes = styles();
    const companies = useSelector(state => state.crm.companies)
    const contacts = useSelector(state => state.crm.contacts);
    const deals = useSelector(state => state.crm.deals)
    const dispatch = useDispatch()
    const [error, setError] = useState('-1')

    const initialTicket = {
        name: "",
        description: "",
        source: "Call",
        priority: "medium",
        contacts: [],
        companies: [],
        deals: [],
        status: "Stage1",
        ownerId: "-1"
    }
    const [ticket, setTicket] = useState( (props.type == "edit" || props.type == "view") ? props.data : initialTicket )
    const [ viewOnly, setViewOnly ] = useState( props.type == "view" ? true : false )

    
    useEffect(() => {
        dispatch(getAllContacts())
        dispatch(getAllCompanies())
        dispatch(getAllDeals())
    },[])

    useEffect(() => {
        console.log(ticket)
    },[ticket])


    const handleSubmit = () =>{
        if(props.type == 'view'){
            close();
        }
        else if(props.type == 'create'){
            createTicket(ticket)
        }
    }

    const setFieldValue = () => e => {
        e.persist();
        setTicket({
            ...ticket,
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


    const createTicket = (data) => {
        console.log("Reached Action Create Ticket")
        dispatch(setTicketLoading())
        dispatch(setActivitiesLoading())
        axios.post('/api/tickets/create/', data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllTickets())
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating ticket ", data.name , err.response.data.message)
                setError(err.response.data.message)
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
                    { props.type=="edit" ? "Modify Ticket" : (props.type=="view" ? "Preview Ticket" : "Create a Ticket") }
                    </Typography>
                    <Typography variant="h5" align='center'>
                        { error !="-1" ? (<Alert severity="error">{error}</Alert>) :  null }
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid container spacing={2} className={classes.formRow}>
                            <Grid item>
                                <TextField id="name" name="name" disabled={viewOnly} defaultValue={ticket.name} label="Ticket Name" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="sourceLabel">Source</InputLabel>
                                    <Select
                                        labelId="sourceLabel"
                                        id="source"
                                        name="source" disabled={viewOnly} defaultValue={ticket.source}
                                        style={{width:"195px"}}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                    >
                                        <MenuItem value="Call">Call</MenuItem>
                                        <MenuItem value="Chat">Chat</MenuItem>
                                        <MenuItem value="Email">Email</MenuItem>
                                        <MenuItem value="Meeting">Meeting</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={classes.formRow}>
                            <Grid item xs={12}>
                                <TextField id="description" name="description" disabled={viewOnly} defaultValue={ticket.description} fullWidth label="Ticket Description" onChange={setFieldValue()} />
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
                                        value= {ticket.contacts} disabled={viewOnly} 
                                        onChange={setFieldValue()} 
                                        fullWidth
                                        multiple
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {contacts.map(contact => {
                                            return <MenuItem key={contact._id} value={contact._id}>
                                                    <Checkbox checked={ticket.contacts.indexOf(contact._id) > -1} />
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
                                        value= {ticket.companies} disabled={viewOnly} 
                                        onChange={setFieldValue()} 
                                        fullWidth
                                        multiple
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {companies.map(company => {
                                            return <MenuItem key={company._id} value={company._id}>
                                                    <Checkbox checked={ticket.companies.indexOf(company._id) > -1} />
                                                    <ListItemText primary= {company.name} />
                                                </MenuItem>
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={classes.formRow} alignItems="center">
                            <Grid item >
                                <FormControl >
                                    <InputLabel id="deal-label">Deals</InputLabel>
                                    <Select
                                        labelId="deal-label"
                                        id="deals"
                                        name="deals"
                                        style={{width:"170px"}}
                                        value= {ticket.deals} disabled={viewOnly} 
                                        onChange={setFieldValue()} 
                                        fullWidth
                                        multiple
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {deals.map(deal => {
                                            return <MenuItem key={deal._id} value={deal._id}>
                                                    <Checkbox checked={ticket.deals.indexOf(deal._id) > -1} />
                                                    <ListItemText primary= {deal.name} />
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
                                    <InputLabel id="statusLabel">Status</InputLabel>
                                    <Select
                                        labelId="statusLabel"
                                        id="status"
                                        name="status" disabled={viewOnly} defaultValue={ticket.status}
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
                                    <InputLabel id="priorityLabel">Priority</InputLabel>
                                    <Select
                                        labelId="priorityLabel"
                                        id="priority"
                                        name="priority" disabled={viewOnly} defaultValue={ticket.priority}
                                        style={{width:"195px"}}
                                        onChange={setFieldValue()} 
                                        fullWidth
                                    >
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}  className={classes.formRow}>

                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="company-label">Owner</InputLabel>
                                    <Select
                                        labelId="owner-label"
                                        id="owner"
                                        name="ownerId" disabled={viewOnly} defaultValue={ticket.ownerId}
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
                    { props.type=="edit" ? "Save Changes" : (props.type=="view" ? "Close" : "Create a Ticket" ) }
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

export default CreateTicketModal
