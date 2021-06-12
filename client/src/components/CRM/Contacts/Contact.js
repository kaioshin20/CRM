import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import SideBar from '../../AppLayout/SideBar'
import clsx from "clsx"
import {withStyles, makeStyles, useTheme, fade} from '@material-ui/core/styles'
import {Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Paper, Breadcrumbs, Typography, Button, Avatar, Badge, Card, CardContent, CardMedia, TextField, FormControl, InputLabel, Input, InputBase, Select, MenuItem, Tooltip, Fab, Tabs, Tab, ButtonGroup, AppBar } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import TextsmsIcon from '@material-ui/icons/Textsms';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LaunchIcon from '@material-ui/icons/Launch';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import LogAEvent from '../Tasks/LogAEvent'
import MakeNote from '../Tasks/MakeNote';
import CreateDealModal from '../Deals/CreateDealModal';
import DealBox from '../Deals/DealBox';
import ActivityBox from '../Activities/ActivityBox';
import Moment from 'react-moment';
import NoteBox from '../Tasks/NoteBox';
import CreateTicketModal from '../Tickets/CreateTicketModal';
import CreateTask from '../Tasks/CreateTask';
import { getAllContacts, getAllDeals, getAllActivities, getAllTickets, getAllCompanies } from '../../../actions/crmActions';

const styles = makeStyles(theme => ({
    
    tempBorder:{
        border: "2px solid black"
    },
    sectionContainer:{
        margin: theme.spacing(2),
    },
    section:{
        margin: theme.spacing(2),
    },
    sectionPaper:{
        padding:theme.spacing(2),
    },
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
      },
    purple: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
    },
    cardRoot: {
        display: 'flex',
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 151,
        minHeight: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    contactFields:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    contactTextFields:{
        borderBottom: '0px',
        paddingTop: theme.spacing(2),
        
    },
    table:{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatarLarge: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    contactHeader:{
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(1)*13,
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        backgroundColor: '#2c387e',
        color: '#ffffff'

    },
    contactContent:{
        marginTop:theme.spacing(-10),
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
    },
    countContainer:{
        width: theme.spacing(2)*15,
    },
    paperSection:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        paddingTop: theme.spacing(1)
    },
    paper2:{
        minWidth:"290px"
    },
    paper2CardHeading:{
        marginBottom: theme.spacing(1),
        borderBottom: "1px solid ",
        borderBottomColor: indigo[500],
        color: indigo[500]

    },
    dealPaper:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    }

}))

function Contact(props) {
    const classes = styles();
    let location = useLocation();
    const [data , setData] = useState();
    
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const [ openLogEvent, setOpenLogEvents] = useState(false);
    const [ openCreateTask, setOpenCreateTask] = useState(false);
    const [ noteOpen, setNoteOpen] = useState(false);
    const [ dealOpen , setDealOpen] = useState(false);
    const [ ticketOpen , setTicketOpen] = useState(false);

    const [ logEventParams, setLogEventParams ] = useState();
    const [ createTaskParams, setCreateTaskParams ] = useState();
    const [ noteParams, setNoteParams ] = useState();

    // const classes = useStyles();
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleLogEvent = (type) => {
    if( type === "call"){
        setLogEventParams({type: 'Call', for: 'contact', associated: {  contacts:  data.contact._id, companies: data.company._id , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    }
    if( type === "chat"){
        setLogEventParams({type: 'Chat', for: 'contact', associated: {  contacts:  data.contact._id, companies: data.company._id , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    }
    if( type === "email"){
        setLogEventParams({type: 'Email', for: 'contact', associated: {  contacts:  data.contact._id, companies: data.company._id , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    }
    setOpenLogEvents(true)
}
  const handleCloseLogEvent = () => {
      setOpenLogEvents(false);
      setLogEventParams('');
  }

  const handleCreateTask = () => {
    setCreateTaskParams({ display: "create", type: "contact", id: location.state,associated: {  contacts:  data.contact._id, companies: data.company._id , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")} })
    
    setOpenCreateTask(true)
}
  const handleCloseCreateTask = () => {
      setOpenCreateTask(false);
    setCreateTaskParams('');
}

  const handleCreateNote = () => {
    setNoteParams({for: 'contact', associated: {  contacts: data.contact._id, deals: data.deals.map((deal) => deal._id).join(":;"), companies: data.company._id, tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    
    setNoteOpen(true)
}
const handleCloseCreateNote = () => {
    setNoteOpen(false);
    setNoteParams('');
}
const handleCreateTicket = () => {
    // setNoteParams({for: 'contact', associated: {  contacts: data.contact._id, deals: data.deals.map((deal) => deal._id).join(":;"), companies: data.company._id, tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    
    setTicketOpen(true)
}
const handleCloseCreateTicket = () => {
    // setNoteParams('');
    setTicketOpen(false);
}
const handleCreateDeal = () => {
    setDealOpen(true)
}
const handleCloseCreateDeal = () => {
    setDealOpen(false);
}


    useEffect( () => {
        console.log(location.state)
        axios.get(`/api/contacts/id/${location.state}`)
        .then(res => 
            {
                console.log(res.data)
                setData(res.data)   
            }
        )
        .catch(err=>{
            console.log("error in fetching contacts",err)
            // this.setState({errors: err.response.data})
            console.log(err)
        })

        dispatch(getAllContacts())
        dispatch(getAllCompanies())
        dispatch(getAllDeals())
        dispatch(getAllTickets())
        dispatch(getAllActivities())
        
    }, []);

    // Table Data   
    const headCells = [
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'details', numeric: true, disablePadding: false, label: 'Details' },
        { id: 'ownerId', numeric: true, disablePadding: false, label: 'OwnerId' },
        { id: 'nameId', numeric: true, disablePadding: false, label: 'Name Id' },
        { id: 'timestamp', numeric: true, disablePadding: false, label: 'Timestamp' },
      ];

      //////////////////////////////////////////////////

      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                {children}
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
      }));
      

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <SideBar />
{ data &&   <div>
            <Grid container>
                <IconButton aria-label="add to shopping cart" style={{color:"#fff", marginBottom: "-50px"}} component={Link} to="/crm/contacts">
                    <KeyboardBackspaceRoundedIcon  color="action" style={{color:"#fff"}} />
                </IconButton>
                <Grid container className={clsx(classes.contactHeader)}>
                    <Grid item  xs={12} sm={6}>
                        <Grid container justify="space-around"  alignItems="flex-start">
                            <Grid item xs={12} sm={3}>
                                <Grid container justify="flex-end">
                                    <Avatar alt="Customer Name" src={require("../Common/avatar.jpeg")} className={classes.avatarLarge} />
                                </Grid>


                            </Grid>
                            <Grid item  xs={12} sm={8} justify="flex-start" >
                                <Typography variant="h5" align="left">
                                    {data.contact.fname + " " + data.contact.lname }
                                </Typography>
                                <Typography variant="subtitle1" align="left">
                                    CEO at { data.company.name }
                                </Typography>
                                <Grid container>
                                    <Grid item>
                                        <ButtonGroup aria-label="outlined  button group">
                                            <Tooltip title="Log a Call" arrow>
                                                <IconButton aria-label="add to shopping cart" style={{color:"white"}} onClick={ () => {handleLogEvent("call")}}>
                                                    <CallRoundedIcon  />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Log a Chat" arrow>
                                                <IconButton aria-label="add to shopping cart" style={{color:"white"}}  onClick={ () => {handleLogEvent("chat")}}>
                                                    <TextsmsIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Log an Email" arrow>
                                                <IconButton aria-label="add to shopping cart" style={{color:"white"}}  onClick={ () => {handleLogEvent("email")}}>
                                                    <MailRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Create a Task" arrow>
                                                <IconButton aria-label="create a task" style={{color:"white"}}  onClick={ () => {handleCreateTask()}}>
                                                    <AssignmentIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ButtonGroup>

                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item  xs={12} sm={6}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Grid container justify="flex-end">
                                    <Grid item className={clsx( classes.countContainer)}>

                                        <Typography variant="subtitle1" align="left">
                                            Contact Created: <Moment format="LLLL">{ data.contact.timestamp }</Moment>
                                        </Typography>
                                        {/* <Typography variant="subtitle1" align="left">
                                            Last Contacted: <Moment format="LLLL">{Date(data.contact.lastContacted) }</Moment>
                                        </Typography> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container spacing={2} justify="center" className={clsx(classes.contactContent, classes.paper1)}>
                    <Grid item xs={12} sm={10} md={7} lg={8} >
                        
                        <Paper elevation={3} className={classes.paperSection}>
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item >
                                    <Typography variant="h5">
                                        {
                                           (value==0) ? "All Deals": ((value==1) ? "Notes": ((value==2) ? "Activities" : ""))
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item  >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        
                                    >
                                        <Tab label="Deals" />
                                        <Tab label="Notes" />
                                        <Tab label="Activities" />
                                    </Tabs>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                <TabPanel value={value} index={0}>
                                            <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        <Button color="primary" onClick={ () => {handleCreateDeal()}}>
                                                            Create a Deal
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                        {
                                        data.deals.map(deal => { return <DealBox deal={deal} />
                                        })
                                    }
                                        {/* </Grid>
                                    </Grid> */}
                                    
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        <Button color="primary" onClick={ () => {handleCreateNote()}}>
                                                            Add a note
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            </Grid>
                                    </Grid>

                                        {
            data.notes.length > -1 &&   data.notes.map(note => { return( <NoteBox note={note} />) })
                                    }
                                    
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                        {
                                        data.activities.map((activity, index) => { return (
                                                <Paper variant="outlined" className={classes.dealPaper}>
                                                    <Grid container justify="space-between" style={{marginBottom: "10px"}}>
                                                        <Grid item >
                                                            <Typography variant="subtitle2"  align="left">
                                                                { activity.type } Activity | { activity.details}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item >
                                                            <Typography variant="subtitle2"  align="left">
                                                            <Moment format="LLLL">{Date(activity.timestamp) }</Moment>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container justify="space-between">
                                                        <Grid item xs={12} >
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={8} >
                                                                    <Typography variant="subtitle1"  align="left">
                                                                        { activity.subdetails }
                                                                    </Typography>               
                                                                </Grid>
                                                                <Grid item xs={4} >
                                                                    <Typography variant="subtitle1"  align="left">
                                                                        Owner: { activity.ownerId }
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        {/* <Grid item xs={12}>
                                                        <AvatarGroup max={4}>
                                                            <Tooltip title={ data.contact.fname + " " + data.contact.lname  } arrow>
                                                                <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                                                            </Tooltip>
                                                            <Tooltip title={data.company.name} arrow>
                                                                <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                            </Tooltip>
                                                        </AvatarGroup>
                                                        </Grid> */}
                                                    </Grid>
                                                </Paper>)
                                        })
                                    }
                                    {
            data.activities.length <= 0 &&   <Paper variant="outlined" className={classes.dealPaper}>
                                            <Grid container spacing={1} direction='column'>
                                                <Grid item xs={12} >
                                                    No activities recorded yet
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    }
                                </TabPanel>
                            </SwipeableViews>
                            </Grid>
                        </Paper>

                    </Grid>
                    
                    <Grid item className={classes.paper2} xs={12} sm={4} lg={3} >
                        <Paper elevation={2} className={classes.paperSection}>
                            <Grid container justify="flex-start">
                                <Grid item xs={12} className={clsx( classes.countContainer)}>
                                    <Typography variant="h6" align="left" className={classes.paper2CardHeading}>
                                        <BlurOnIcon /> Personal Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Typography variant="subtitle1" align="left">
                                                Mobile: 
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" align="left">
                                                { data.contact.mobile}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Typography variant="subtitle1" align="left">
                                                Email: 
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" align="left">
                                                { data.contact.email }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={2} className={classes.paperSection}>
                            <Grid container justify="flex-start">
                                <Grid item xs={12} className={clsx( classes.countContainer)}>
                                    <Typography variant="h6" align="left" className={classes.paper2CardHeading}>
                                        <BlurOnIcon /> Company Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Typography variant="subtitle1" align="left">
                                                Company Name: 
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" align="left">
                                                { data.company.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Typography variant="subtitle1" align="left">
                                                Domain: 
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" align="left">
                                                { data.company.domain }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={2} className={classes.paperSection}>
                            <Grid container justify="flex-start">
                                <Grid item xs={12} className={clsx( classes.countContainer)}>
                                    <Typography variant="h6" align="left" className={classes.paper2CardHeading}>
                                        <BlurOnIcon /> Active Deals
                                    </Typography>
                                    {
                                        data.deals.length > 0 && data.deals.filter(deal => deal.status == "0").map(deal => { 
                                            return (<DealBox deal={deal} />)} )
                                    }
                                    {
                data.deals.length <= 0 && <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        No Deals Made
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                    }

                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={2} className={classes.paperSection}>
                            <Grid container justify="flex-start">
                                <Grid item xs={12} className={clsx( classes.countContainer)}>
                                    <Typography variant="h6" align="left" className={classes.paper2CardHeading}>
                                        Tickets
                                    </Typography>
                                    {
                                        <Paper variant="outlined" className={classes.dealPaper}>
                                            <Grid container spacing={1} direction='column'>
                                                <Grid item xs={12} >
                                                    <Button color="primary" onClick={ () => {handleCreateTicket()}}>
                                                        Create a Ticket
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    }
                                    {
    data.tickets.length > 0 && data.tickets.map(ticket => { return(
                                            <Paper key={ticket._id} variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        <Grid container direction="column">
                                                            <Grid item>
                                                                <Typography variant="body1" align="left">
                                                                    { ticket.name } | {ticket.source}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item style={{alignSelf:"start"}}>
                                                                <Typography variant="caption" align="left">
                                                                    Status: { ticket.status }
                                                                </Typography>        
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle2" align="left">
                                                                    Description: { ticket.description }
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle2" align="left">
                                                                    Priority: { ticket.priority }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* <Grid item>
                                                    <AvatarGroup max={4}>
                                                        <Tooltip title={ data.ticket.contactId} arrow>
                                                            <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.ticket.companyID} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.ticket.dealId} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                    </AvatarGroup>
                                                    </Grid> */}
                                                </Grid>
                                            </Paper>)
                                        })
                                    }
                                    {
                data.tickets.length <= 0 && <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        No Tickets Created
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                    }

                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                </Grid>
            </Grid>
        </div>}

{/* Modal */}

   { openLogEvent && <LogAEvent open={openLogEvent} openType="create" data= {logEventParams} onClose={handleCloseLogEvent} />}
   { openCreateTask && <CreateTask open={openCreateTask} openType="create" data= {createTaskParams} onClose={handleCloseCreateTask} />}
   { noteOpen && <MakeNote open={noteOpen} data= {noteParams} onClose={handleCloseCreateNote} />}
   { dealOpen && <CreateDealModal open={dealOpen} type="create" onClose={handleCloseCreateDeal} />}
   { ticketOpen && <CreateTicketModal open={ticketOpen} type="create" onClose={handleCloseCreateTicket} />}
{/* Modal Over */}

        </div>
    )

}

export default withRouter(withStyles(styles)(Contact));