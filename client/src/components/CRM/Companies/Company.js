import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import SideBar from '../../AppLayout/SideBar'
import clsx from "clsx"
import {withStyles, makeStyles, useTheme, fade} from '@material-ui/core/styles'
import {Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Paper, Breadcrumbs, Typography, Button, Avatar, Badge, Card, CardContent, CardMedia, TextField, FormControl, InputLabel, Input, InputBase, Select, MenuItem, Tooltip, Fab, Tabs, Tab, ButtonGroup } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import TextsmsIcon from '@material-ui/icons/Textsms';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LaunchIcon from '@material-ui/icons/Launch';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import PlaceIcon from '@material-ui/icons/Place';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import GroupIcon from '@material-ui/icons/Group';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import LogAEvent from '../Tasks/LogAEvent'
import { getAllContacts, deleteContactsWithId, getAllDeals, getAllCompanies, getAllActivities, getAllTickets } from '../../../actions/crmActions';
import Moment from 'react-moment';
import CreateTicketModal from '../Tickets/CreateTicketModal';



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

function Company(props) {
    const classes = styles();
    let location = useLocation();
    const [data, setData] = useState();
    
    const [company, setCompany] = useState();
    const [deals, setDeals] = useState();
    const [activities, setActivities] = useState();
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const theme = useTheme();
    const [updateDate, setUpdateDate] = useState(true);

    const [ openLogEvent, setOpenLogEvents] = useState(false);
    const [ logEventParams, setLogEventParams ] = useState();
    const [ ticketOpen , setTicketOpen] = useState(false);

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
        setLogEventParams({type: 'Call', for: 'company', associated: {  companies:  data.company._id, contacts: data.contacts.map((contact) => contact._id).join(":;") , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    }
    if( type === "chat"){
        setLogEventParams({type: 'Chat', for: 'company', associated: {  companies:  data.company._id, contacts: data.contacts.map((contact) => contact._id).join(":;") , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    }
    if( type === "email"){
        setLogEventParams({type: 'Email', for: 'company', associated: {  companies:  data.company._id, contacts: data.contacts.map((contact) => contact._id).join(":;") , deals: data.deals.map((deal) => deal._id).join(":;"), tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    }
    setOpenLogEvents(true)
}

const handleCloseLogEvent = () => {
    setOpenLogEvents(false);
    setLogEventParams('');
}
const handleCreateTicket = () => {
    // setNoteParams({for: 'contact', associated: {  contacts: data.contact._id, deals: data.deals.map((deal) => deal._id).join(":;"), companies: data.company._id, tickets: data.tickets.map((ticket) => ticket._id).join(":;")}})
    
    setTicketOpen(true)
}
const handleCloseCreateTicket = () => {
    // setNoteParams('');
    setTicketOpen(false);
}

    useEffect( () => {
        if(updateDate) {
            getData()
            dispatch(getAllContacts());
            dispatch(getAllCompanies());
            dispatch(getAllDeals())
            dispatch(getAllActivities());
            dispatch(getAllTickets());
        }
        console.log(data)
    }, [data]);

    const getData = () => {
        axios.get(`/api/companies/id/${location.state}`)
        .then(res => 
            {
                console.log(res.data)
                setData(res.data)
                setUpdateDate(false)
            }
        )
        .catch(err=>{
            console.log("error in fetching contacts",err.response.data.message)
            // this.setState({errors: err.response.data})
            console.log(err)
        })
    }


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
          <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && <Box p={3}>{children}</Box>}
          </Typography>
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
{   data &&  <div>
            <Grid container>
                <IconButton aria-label="add to shopping cart" style={{color:"#fff", marginBottom: "-50px"}} component={Link} to="/crm/companies">
                    <KeyboardBackspaceRoundedIcon  color="action" style={{color:"#fff"}} />
                </IconButton>
                <Grid container className={clsx(classes.contactHeader)}>
                    <Grid item  xs={12} sm={6}>
                        <Grid container justify="space-around"  alignItems="flex-start">
                            <Grid item xs={12} sm={3} >
                                <Grid container justify="flex-end">
                                    <Avatar alt="Customer Name" className={classes.avatarLarge} > <BusinessIcon fontSize="large" /> </Avatar>
                                </Grid>


                            </Grid>
                            <Grid item  xs={12} sm={8} >
                                <Grid container direction="column">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" align="left">
                                            {data.company.name }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item>
                                                <Typography variant="subtitle1" align="left">
                                                    {data.company.domain }
                                                </Typography>
                                            </Grid>
                                            <IconButton aria-label="add to shopping cart" component={Link} to={data.company.domain} style={{color:"#fff", marginTop: "-10px"}}>
                                                <LaunchIcon fontSize="small" />
                                            </IconButton>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left">
                                           <PlaceIcon/> { data.company.city +", "+ data.company.state +", "+ data.company.pin }
                                        </Typography>

                                    </Grid>
                                </Grid>
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
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item  xs={12} sm={6}>
                        <Grid container direction="column" spacing={5}>
                            <Grid item>
                                <Grid container spacing={2} justify="flex-end">
                                    <Grid item>
                                    <Typography variant="subtitle1" align="left">
                                            Company Created: 
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                    <Typography variant="subtitle1" align="left">
                                        <Moment format="LLLL">{ data.company.timestamp }</Moment>
                                    </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={4} justify="flex-end">
                                    <Grid item spacing={4}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Typography >
                                                <LocalOfferIcon />
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography >
                                                    { data.deals.length }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Typography >
                                                <GroupIcon />
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography >
                                                    { data.contacts.length }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Typography >
                                                <ConfirmationNumberIcon />
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography >
                                                    { data.contacts.length }
                                                </Typography>
                                            </Grid>
                                        </Grid>
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
                                <BlurOnIcon /> 
                                        {
                                           (value==0) ? " All Deals": ((value==1) ? " Contacts": ((value==2) ? " Activities" : " "))
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
                                        <Tab label="Contacts" />
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
                                    <Grid container>
                                        <Grid item xs={12}>
                                        { data.deals.length == 0 ? "No deal made" :(
                                        data.deals.map(deal => { return(
                                            <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        <Grid container direction="column">
                                                            <Grid item xs={12} >
                                                                <Grid container spacing={3}>
                                                                    <Grid item>
                                                                        <Typography variant="h6" align="left">
                                                                            { deal.name } 
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <IconButton color="primary" aria-label="view deal" component={Link} to= {{pathname:'/crm/deal/id/', state: deal._id}}>
                                                                            <LaunchIcon fontSize="small" style={{marginLeft:"100%"}} color="action" />
                                                                        </IconButton>    
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                            <Grid item xs={12}  style={{alignSelf:"start"}}>
                                                                <Typography variant="subtitle2" align="left">
                                                                    Close Date: <Moment format="LLLL"> { deal.closeDate }</Moment>
                                                                </Typography>        
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={3}>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" align="left">
                                                                    Amount: { deal.amount }
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" align="left">
                                                                    Stage: { deal.stage }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                    {/* <AvatarGroup max={4}>
                                                        <Tooltip title={ data.contact.fname + " " + data.contact.lname  } arrow>
                                                            <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.company.name} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                    </AvatarGroup> */}
                                                    </Grid>
                                                </Grid>
                                            </Paper>)
                                        }))
                                    }
                                        </Grid>
                                    </Grid>
                                    
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                <Grid container>
                                        <Grid item xs={12}>
                                        {
                                        data.contacts.map(contact => {
                                              return(
                                            <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        <Grid container direction="column">
                                                            <Grid item xs={12} >
                                                                <Grid container spacing={3}>
                                                                    <Grid item>
                                                                        <Typography variant="h6" align="left">
                                                                            { contact.fname + " " + contact.lname} 
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                    <IconButton color="primary" aria-label="view deal" component={Link} to= {{pathname:'/crm/contact/id/', state: contact._id}}>
                                                                        <LaunchIcon fontSize="small" style={{marginLeft:"100%"}} color="action" />
                                                                    </IconButton>    
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                            <Grid item xs={12}  style={{alignSelf:"start"}}>
                                                                <Typography variant="subtitle2" align="left">
                                                                    Stage: { contact.stage }
                                                                </Typography>        
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={3}>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" align="left">
                                                                    email: { contact.email }
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" align="left">
                                                                    mobile: { contact.mobile }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={3}>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" align="left">
                                                                    owner: { contact.owner }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                    {/* <AvatarGroup max={4}>
                                                        <Tooltip title={ data.contact.fname + " " + data.contact.lname  } arrow>
                                                            <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.company.name} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                    </AvatarGroup> */}
                                                    </Grid>
                                                </Grid>
                                            </Paper>)
                                        })
                                    }
                                        </Grid>
                                    </Grid>
                                    
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                <Grid container>
                                        <Grid item xs={12}>
                                        {
                                        data.activities.map(activity => { return(
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
                                        </Grid>
                                    </Grid>
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
                                        data.deals.map(deal => { return(
                                            <Paper variant="outlined" className={classes.dealPaper}>
                                                <Grid container spacing={1} direction='column'>
                                                    <Grid item xs={12} >
                                                        <Grid container direction="column">
                                                            <Grid item>
                                                                <Typography variant="body1" align="left">
                                                                    { deal.name } 
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item style={{alignSelf:"start"}}>
                                                                <Typography variant="caption" align="left">
                                                                    Close Date: <Moment format="LLLL">{ deal.closeDate }</Moment>
                                                                </Typography>        
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle2" align="left">
                                                                    Amount: { deal.amount }
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle2" align="left">
                                                                    Stage: { deal.stage }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                    {/* <AvatarGroup max={4}>
                                                        <Tooltip title={ data.contact.fname + " " + data.contact.lname  } arrow>
                                                            <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.company.name} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                    </AvatarGroup> */}
                                                    </Grid>
                                                </Grid>
                                            </Paper>)
                                        })
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
                                                    <Grid item>
                                                    {/* <AvatarGroup max={4}>
                                                        <Tooltip title={ data.ticket.contactId} arrow>
                                                            <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.ticket.companyID} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title={data.ticket.dealId} arrow>
                                                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                                                        </Tooltip>
                                                    </AvatarGroup> */}
                                                    </Grid>
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

{ openLogEvent && <LogAEvent open={openLogEvent} openType="create"  data= {logEventParams} onClose={handleCloseLogEvent} />}
{ ticketOpen && <CreateTicketModal open={ticketOpen} type="create" onClose={handleCloseCreateTicket} />}
{/* Modal Over */}

        </div>
    )

}

export default withRouter(withStyles(styles)(Company));