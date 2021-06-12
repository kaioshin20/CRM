import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, InputAdornment, Input, Checkbox, ListItemText } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { createMeeting, getAllActivities, setActivitiesLoading } from '../../../actions/crmActions';
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

const ScheduleMeeting = (props) => {

    const classes = styles();
    const {open, data, onClose } = props
    const companies = useSelector(state => state.crm.companies)
    const contacts = useSelector(state => state.crm.contacts);
    const deals = useSelector(state => state.crm.deals);
    const tickets = useSelector(state => state.crm.tickets);
    // const initialMeeting = 
    const [ meeting , setMeeting] = useState((props.openType==='create') ? {
                                        subject: "",
                                        startTime: "2017-05-24T10:30",
                                        description: "",
                                        priority: "",
                                        assignedTo: "",
                                        attendeeContacts: data.associated.contacts.split(":;"),
                                        associateContacts: data.associated.contacts.split(":;"),
                                        associateCompanies: data.associated.companies.split(":;"),
                                        associateDeals: data.associated.deals.split(":;"),
                                        associateTickets: data.associated.tickets.split(":;"),
                                        status: "scheduled",
                                        owner: "-1",
                                    } : (props.openType==='view') ? props.data: null);

    const [ viewOnly, setViewOnly ] = useState( props.openType == "view" ? true : false )
    const [error, setError] = useState('-1')

    const dispatch = useDispatch();

    const enableEdit = () => {
        setViewOnly(false)
        props.openType = "edit"
    }
    
    const disableEdit = () => {
        setViewOnly(true)
        props.openType = "view"
    }
    useEffect(() => {
        console.log(meeting)
    }, [])

    const handleSubmit = () =>{
        if(props.openType == 'view'){
            close();
        }
        else if(props.openType == 'create'){
            createMeeting(meeting)
            console.log(meeting)
        }
    }

    const close = () => {
        props.onClose();
    }

    const createMeeting = (data) => {
        console.log("Reached Action Create Meeting")
        dispatch(setActivitiesLoading())
        axios.post('/api/meetings/create/', data)
            .then(res => {
                console.log(res.data)
                var contactsEmail = contacts.filter(contact => {return res.data.meeting.associateContacts.indexOf(contact._id) > -1})
                                            .map(contact => {return contact.email})
                var companyEmail = companies.filter(company => {return res.data.meeting.associateCompanies.indexOf(company._id) > -1})
                                            .map(company => {return company.email})
                var mailbody ={ owner: 'amitnemade34@gmail.com', attendee: 'amitnemade34@gmail.com' , 
                                    associateContacts: contactsEmail.join(','),
                                    associateCompanies: companyEmail.join(','),
                                    meeting: res.data.meeting
                                }

                console.log(mailbody)
                 axios.post('/api/sendmail/',mailbody)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating meeting ", data.for, err.response.data.message)
                setError(err.response.data.message)
            })
    }

    useEffect(() => {
        console.log(meeting)
    }, [meeting])

    const setFieldValue = () => e => {
        e.persist();
        var {name, value} = e.target
        setMeeting({
            ...meeting,
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
                                    Schedule a Meeting
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <form className={classes.container} noValidate>
                                            <TextField
                                                id="timestamp"
                                                label="Date & Time"
                                                name="startTime" value={meeting.startTime} disabled={viewOnly}
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
                                        <TextField id="subject" name="subject" value={meeting.subject} disabled={viewOnly} fullWidth label="Subject" onChange={setFieldValue()} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className={classes.formRow}>
                                    <Grid item xs={12}>
                                        <TextField id="description" name="description" value={meeting.description} disabled={viewOnly} fullWidth label="Description" onChange={setFieldValue()} />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} className={classes.formRowLabel} alignItems="center">
                                    <Typography variant="subtitle2">
                                        Attendee Links
                                    </Typography>
                                </Grid>
                                <Grid container spacing={2} className={classes.formRow} alignItems="center">
                                    <Grid item>
                                        <FormControl >
                                            <InputLabel id="contact-label">Select Attendee</InputLabel>
                                            <Select
                                                labelId="contact-label"
                                                id="contacts"
                                                name="associateContacts" value={meeting.associateContacts} disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {contacts.filter(contact => {if(props.openType == "create"){return data.associated.contacts.split(":;").indexOf(contact._id) > -1} else {return true}})
                                                        .map(contact => {
                                                    return <MenuItem key={contact._id} value={contact._id}>
                                                            <Checkbox checked={meeting.associateContacts.indexOf(contact._id) > -1} />
                                                            <ListItemText primary= {contact.fname + " " + contact.lname} />
                                                        </MenuItem>
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid container  spacing={2} className={classes.formRow} alignItems="center">
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="assignedTo-label">Assigned To</InputLabel>
                                            <Select
                                                labelId="assignedTo-label"
                                                id="assignedTo"
                                                name="assignedTo" value={meeting.assignedTo} disabled={viewOnly}
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
                                <Grid container spacing={2}  className={classes.formRow}>
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="statusLabel">Status</InputLabel>
                                            <Select
                                                labelId="statusLabel"
                                                id="status"
                                                name="status" value={meeting.status} disabled={viewOnly}
                                                style={{width:"195px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                            >
                                                <MenuItem value="scheduled">Scheduled</MenuItem>
                                                <MenuItem value="completed">Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="priorityLabel">Priority</InputLabel>
                                            <Select
                                                labelId="priorityLabel"
                                                id="priority"
                                                name="priority" value={meeting.priority} disabled={viewOnly}
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
                                                name="associateContacts" value={meeting.associateContacts} disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {contacts.filter(contact => {if(props.openType == "create"){return data.associated.contacts.split(":;").indexOf(contact._id) > -1} else {return true}})
                                                        .map(contact => {
                                                    return <MenuItem key={contact._id} value={contact._id}>
                                                            <Checkbox checked={meeting.associateContacts.indexOf(contact._id) > -1} />
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
                                                name="associateCompanies" value={meeting.associateCompanies} disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {companies.filter(company => {if(props.openType == "create"){return data.associated.companies.split(":;").indexOf(company._id) > -1} else {return true}})
                                                        .map(company => {
                                                    return <MenuItem key={company._id} value={company._id}>
                                                            <Checkbox checked={meeting.associateCompanies.indexOf(company._id) > -1} />
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
                                                name="associateDeals" value={meeting.associateDeals} disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {deals.filter(deal => {if(props.openType == "create"){return data.associated.deals.split(":;").indexOf(deal._id) > -1} else {return true}})
                                                        .map(deal => {
                                                    return <MenuItem key={deal._id} value={deal._id}>
                                                            <Checkbox checked={meeting.associateDeals.indexOf(deal._id) > -1} />
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
                                                name="tickets" value={meeting.associateTickets} disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {tickets.filter(ticket => {if(props.openType == "create"){return data.associated.tickets.split(":;").indexOf(ticket._id) > -1} else {return true}})
                                                        .map(ticket => {
                                                    return <MenuItem key={ticket._id} value={ticket._id}>
                                                            <Checkbox checked={meeting.associateTickets.indexOf(ticket._id) > -1} />
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
                                                name="owner" value={meeting.owner} disabled={viewOnly}
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
                            <Button variant="contained" size="large" color="primary" className={classes.submitBtn} onClick={() => handleSubmit()}>
                                { props.type=="edit" ? "Save Changes" : (props.type=="view" ? "Close" : "Schedule a Meeting" ) }
                            </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
            
        </div>
    )
}

export default ScheduleMeeting


// Types of data
// Difference between traditional approach and Big data approach
// Case Study Big Data solution
