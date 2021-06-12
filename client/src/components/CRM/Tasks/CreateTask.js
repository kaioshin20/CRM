import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, InputAdornment, Input, Checkbox, ListItemText } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, setActivitiesLoading, getAllActivities } from '../../../actions/crmActions';
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

const CreateTask = (props) => {

    const classes = styles();
    const {open, data, onClose, openType } = props
    const companies = useSelector(state => state.crm.companies)
    const contacts = useSelector(state => state.crm.contacts);
    const deals = useSelector(state => state.crm.deals);
    const tickets = useSelector(state => state.crm.tickets);
    const [ task , setTask] = useState(props.openType == "create" ? {
        name: "",
        description: "",
        due:"2017-05-24T10:30",
        priority: "medium",
        assignedTo: "-1",
        ownerId: "-1",
        type: "0",
        priority: "medium",
        associateContacts: data.associated.contacts.split(":;"),
        associateCompanies: data.associated.companies.split(":;"),
        associateDeals: data.associated.deals.split(":;"),
        associateTickets: data.associated.tickets.split(":;"),
        type: data.type
    } : props.openType == "view" ? props.data : null);
    
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

    const handleSubmit = () =>{
        if(props.openType == "view"){
            close();
        }
        else if(props.openType == "create"){
            createTask(task)
            console.log(task)
        }
    }

    const createTask = (data) => {
        console.log("Reached Action Create Task")
        dispatch(setActivitiesLoading())
        axios.post('/api/tasks/create/', data)
            .then(res => {
                console.log(res.data)
                dispatch(getAllActivities())
                close();
            })
            .catch(err => {
                console.log("error in creating task ", data.name, err.response.data.message)
                setError(err.response.data.message)
            })
    }

    const close = () => {
        props.onClose();
    }

    useEffect(() => {
        console.log(task)
    }, [task])

    const setFieldValue = () => e => {
        e.persist();
        var {name, value} = e.target
        setTask({
            ...task,
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
                                    Create a Task
                                </Typography>
                                <Typography variant="h5" align='center'>
                                    { error !="-1" ? (<Alert severity="error">{error}</Alert>) :  null }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="name" name="name" value={task.name} disabled={viewOnly} fullWidth label="Description" onChange={setFieldValue()} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <form className={classes.container} noValidate>
                                            <TextField
                                                id="timestamp"
                                                label="Due Date & Time"
                                                name="due" value={task.due} disabled={viewOnly}
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
                                        <TextField id="description" name="description" value={task.description} disabled={viewOnly} fullWidth label="Description" onChange={setFieldValue()} />
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
                                                value= {task.associateContacts}
                                                disabled={viewOnly}
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
                                                            <Checkbox checked={task.associateContacts.indexOf(contact._id) > -1} />
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
                                                value= {task.associateCompanies}
                                                disabled={viewOnly}
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
                                                            <Checkbox checked={task.associateCompanies.indexOf(company._id) > -1} />
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
                                                value= {task.associateDeals}
                                                disabled={viewOnly}
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
                                                            <Checkbox checked={task.associateDeals.indexOf(deal._id) > -1} />
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
                                                value= {task.associateTickets}
                                                disabled={viewOnly}
                                                fullWidth
                                                multiple
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {tickets.filter(ticket => {if(props.openType == "create"){return data.associated.tickets.split(":;").indexOf(ticket._id) > -1} else {return true}})
                                                        .map(ticket => {
                                                    return <MenuItem key={ticket._id} value={ticket._id}>
                                                            <Checkbox checked={task.associateTickets.indexOf(ticket._id) > -1} />
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
                                            <InputLabel id="company-label">Assigned To</InputLabel>
                                            <Select
                                                labelId="assignedTo-label"
                                                id="assignedTo"
                                                name="assignedTo"
                                                style={{width:"170px"}}
                                                value={task.assignedTo}
                                                disabled={viewOnly}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                            >
                                                <MenuItem value="-1">No Assignee</MenuItem>
                                                <MenuItem value="1">Myself</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="company-label">Owner</InputLabel>
                                            <Select
                                                labelId="owner-label"
                                                id="owner"
                                                name="ownerId"
                                                style={{width:"170px"}}
                                                value={task.ownerId}
                                                disabled={viewOnly}
                                                onChange={setFieldValue()} 
                                                fullWidth
                                            >
                                                <MenuItem value="-1">No Owner</MenuItem>
                                                <MenuItem value="1">Myself</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container  spacing={2} className={classes.formRow} alignItems="center">
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="outcome-label">Type</InputLabel>
                                            <Select
                                                labelId="outcome-label"
                                                id="type"
                                                name="type"
                                                value={task.type}
                                                disabled={viewOnly}
                                                style={{width:"170px"}}
                                                onChange={setFieldValue()}
                                            >
                                                <MenuItem value="0">To-do</MenuItem>
                                                <MenuItem value="1">Call</MenuItem>
                                                <MenuItem value="2">Chat</MenuItem>
                                                <MenuItem value="3">Email</MenuItem>
                                                <MenuItem value="4">Meeting</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="priorityLabel">Priority</InputLabel>
                                            <Select
                                                labelId="priorityLabel"
                                                id="priority"
                                                name="priority" disabled={viewOnly} value={task.priority}
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
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                            <Grid item>
                                <Button variant="contained" size="large" color="primary" className={classes.submitBtn} onClick={() => handleSubmit()}>
                                    { ( props.openType == "create") ? "Log it" : ( props.openType == "view") ? "Close" : ""}
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
            
        </div>
    )
}

export default CreateTask


// Types of data
// Difference between traditional approach and Big data approach
// Case Study Big Data solution
