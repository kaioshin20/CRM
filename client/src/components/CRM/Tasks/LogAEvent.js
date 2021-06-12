import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, InputAdornment, Input, Checkbox, ListItemText } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, setActivitiesLoading, getAllActivities, getAllContacts, getAllDeals, getAllTickets, getAllCompanies } from '../../../actions/crmActions';
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

const LogAEvent = (props) => {

    const classes = styles();
    const {open, data, onClose, openType } = props
    const companies = useSelector(state => state.crm.companies)
    const contacts = useSelector(state => state.crm.contacts);
    const deals = useSelector(state => state.crm.deals);
    const tickets = useSelector(state => state.crm.tickets);
    const [ event , setEvent] = useState(props.openType == "create" ? {
        contacted: "",
        outcome: "",
        timestamp: "2017-05-24T10:30",
        description: "",
        associateContacts: data.associated.contacts.split(":;"),
        associateCompanies: data.associated.companies.split(":;"),
        associateDeals: data.associated.deals.split(":;"),
        associateTickets: data.associated.tickets.split(":;"),
        ownerId: "-1",
        type: data.type
    } : props.data);
    const [ viewOnly, setViewOnly ] = useState( props.openType == "view" ? true : false )
    const [error, setError] = useState('-1')

    const enableEdit = () => {
        setViewOnly(false)
        props.openType = "edit"
    }
    
    const disableEdit = () => {
        setViewOnly(true)
        props.openType = "view"
    }

    const dispatch = useDispatch();

    const handleCreateEvent = () =>{
        createEvent(event)
        console.log(event)
    }

    const createEvent = (data) => {
        console.log("Reached Action Create Event")
        dispatch(setActivitiesLoading())
        axios.post('/api/events/create/', data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllActivities())
                close()
            })
            .catch(err => {
                console.log("error in creating event ", data.name, err.response.data.message)
                setError(err.response.data.message)
            })
    }

    const close = () => {
        props.onClose();
    }

    useEffect(() => {
        dispatch(getAllContacts())
        dispatch(getAllCompanies())
        dispatch(getAllDeals())
        dispatch(getAllTickets())
    }, [])

    useEffect(() => {
        console.log(event)
    }, [])

    const setFieldValue = () => e => {
        e.persist();
        var {name, value} = e.target
        setEvent({
            ...event,
            [name]: value
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
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                disableAutoFocus={true}
            >
                <Fade in={open} style={{borderRadius:'10px'}}>
                    <div className={classes.modalPaper}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h5" align='center'>
                                    Log a {event.type}
                                </Typography>
                                <Typography variant="h5" align='center'>
                                    { error !="-1" ? (<Alert severity="error">{error}</Alert>) :  null }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={2} className={classes.formRow}>
                                    <Grid item>
                                        <FormControl >
                                            <InputLabel id="contacts-label">Contacted</InputLabel>
                                            <Select
                                                labelId="contacts-label"
                                                id="contacts"
                                                name="contacted"
                                                value={event.contacted} disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                            >
                                                {contacts.map(contact => {
                                                    return <MenuItem key={contact._id} value={contact._id}>{contact.fname + " " + contact.lname}</MenuItem>
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="outcome-label">Outcome</InputLabel>
                                            <Select
                                                labelId="outcome-label"
                                                id="outcome"
                                                name="outcome"
                                                value={event.outcome}  disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()}
                                            >
                                                <MenuItem value="-1">No outcome</MenuItem>
                                                <MenuItem value="1">Yes outcome</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <form className={classes.container} noValidate>
                                            <TextField
                                                id="timestamp"
                                                label="Date & Time"
                                                name="timestamp"
                                                value={event.timestamp}  disabled={viewOnly}
                                                type="datetime-local"
                                                onChange={setFieldValue()}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                fullWidth
                                            />
                                        </form>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className={classes.formRow}>
                                    <Grid item xs={12}>
                                        <TextField id="description" name="description" value={event.description} disabled={viewOnly}fullWidth label="Description" onChange={setFieldValue()} />
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
                                                name="associateContacts"
                                                style={{width:"170px"}}
                                                value= {event.associateContacts}  disabled={viewOnly}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {contacts.filter(contact => {return data.associated.contacts.split(":;").indexOf(contact._id) > -1})
                                                        .map(contact => {
                                                    return <MenuItem key={contact._id} value={contact._id}>
                                                            <Checkbox checked={event.associateContacts.indexOf(contact._id) > -1} />
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
                                                id="company"
                                                name="associateCompanies"
                                                style={{width:"170px"}}
                                                value= {event.associateCompanies}  disabled={viewOnly}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {companies.filter(company => {return data.associated.companies.split(":;").indexOf(company._id) > -1})
                                                        .map(company => {
                                                    return <MenuItem key={company._id} value={company._id}>
                                                            <Checkbox checked={event.associateCompanies.indexOf(company._id) > -1} />
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
                                            <InputLabel id="deal-label">Deal</InputLabel>
                                            <Select
                                                labelId="deal-label"
                                                id="deal"
                                                name="associateDeals"
                                                style={{width:"170px"}}
                                                value= {event.associateDeals}  disabled={viewOnly}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {deals.filter(deal => {return data.associated.deals.split(":;").indexOf(deal._id) > -1})
                                                        .map(deal => {
                                                    return <MenuItem key={deal._id} value={deal._id}>
                                                            <Checkbox checked={event.associateDeals.indexOf(deal._id) > -1} />
                                                            <ListItemText primary= {deal.name} />
                                                        </MenuItem>
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item >
                                        <FormControl >
                                            <InputLabel id="ticket-label">Ticket</InputLabel>
                                            <Select
                                                labelId="ticket-label"
                                                id="ticket"
                                                name="tickets"
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                value= {event.associateTickets}  disabled={viewOnly}
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {tickets.filter(ticket => {return data.associated.tickets.split(":;").indexOf(ticket._id) > -1})
                                                        .map(ticket => {
                                                    return <MenuItem key={ticket._id} value={ticket._id}>
                                                            <Checkbox checked={event.associateTickets.indexOf(ticket._id) > -1} />
                                                            <ListItemText primary= {ticket.name} />
                                                        </MenuItem>
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container  spacing={2} className={classes.formRow} alignItems="center">
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="company-label">Owner</InputLabel>
                                            <Select
                                                labelId="owner-label"
                                                id="owner"
                                                name="ownerId"
                                                value={event.ownerId}  disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                            >
                                                <MenuItem value="-1">No Owner</MenuItem>
                                                <MenuItem value="1">Myself</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                            <Grid item>
                                <Button variant="contained" size="large" color="primary" className={classes.submitBtn} onClick={() => handleCreateEvent()}>
                                    Log it
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
            
        </div>
    )
}

export default LogAEvent


// Types of data
// Difference between traditional approach and Big data approach
// Case Study Big Data solution
