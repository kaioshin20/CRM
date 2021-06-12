import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import SideBar from '../../AppLayout/SideBar'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from "react-router-dom";
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts, getAllDeals, getAllCompanies, getAllActivities, getAllTickets, deleteContactsWithId } from '../../../actions/crmActions';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import PieChartByDealCount from './PieChartByDealCount';
import PieChartByDealAmount from './PieChartByDealAmount';
import EnhancedTable from '../Contacts/ContactTable';
import DealsTable from './DealsTable';
import ContactsTable from './ContactsTable';
import CompanyTable from './CompanyTable'
import PieChartByContactsCount from './PieChartByContactsCount';
import ActivityLists from './ActivityLists';
import TaskLists from './TaskLists';
import MeetingLists from './MeetingLists';
import TicketLists from './TicketLists'

const styles = makeStyles(theme => ({
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
        background: "#f1f7f9"
    },
    topMargin:{
        marginTop: theme.spacing(3),
    },
    bottomMargin:{
        marginBottom: theme.spacing(3),
    },

    widgetRow: {
        padding: theme.spacing(2),
    },
    widgetPaper: {
        padding: theme.spacing(1),
    },
    widgetPaper1:{
        color: "#f0f0f0",
        // background-image: linear-gradient( 109.5deg,  rgba(76,221,242,1) 11.2%, rgba(92,121,255,1) 91.1% );
        background: "rgba(76,221,242,1)",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(109.5deg,  rgba(76,221,242,1) 11.2%, rgba(92,121,255,1) 91.1% ))",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient( 109.5deg,  rgba(76,221,242,1) 11.2%, rgba(92,121,255,1) 91.1% )" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    },
    widgetPaper2:{
        color: "#f0f0f0",
        background: "#0cebeb",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
    },
    widgetPaper3:{
        color: "#f0f0f0",
        background: "#FF5F6D",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #FFC371, #FF5F6D)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #FFC371, #FF5F6D)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
    },
    widgetPaper4:{
        color: "#f0f0f0",
        background: "#00B4DB",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #0083B0, #00B4DB)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #0083B0, #00B4DB)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
}))



function CRMDashboard(props) {
    const classes = styles();
    const contacts = useSelector(state => state.crm.contacts);
    const contacts_loading = useSelector(state => state.crm.contacts_loading);
    const companies = useSelector(state => state.crm.companies);
    const deals = useSelector(state => state.crm.deals);
    const activities = useSelector(state => state.crm.activities);
    const tickets = useSelector(state => state.crm.tickets);
    const meetings = useSelector(state => state.crm.meetings);

    const [pieChartByDealCountData, setPieChartByDealCountData] = useState();



    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getAllContacts());
        dispatch(getAllCompanies());
        dispatch(getAllDeals())
        dispatch(getAllActivities());
        dispatch(getAllTickets());
        
    },[dispatch]);
    
    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
    }
    
    const deleteContacts = (ids) => {
        console.log(ids)
        dispatch(deleteContactsWithId(ids));
        console.log(contacts)   
    }

    const contactHeadCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'leadStatus', numeric: true, disablePadding: false, label: 'Lead Stage' },
        { id: 'timestamp', numeric: true, disablePadding: false, label: 'Date Created' },
    ];
    const contactRows = contacts
    
    return (
        <div>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <SideBar />
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container spacing={4} justify="space-between" className={ clsx(classes.topMargin, classes.bottomMargin)}>
                            <Grid item xs={12} md={8}>
                                <Grid container  spacing={4} justify="space-between"  direction="row" >
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={1} className={clsx(classes.widgetPaper1, classes.widgetPaper)}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={5}>
                                                    <PersonOutlineRoundedIcon style={{fontSize: "45px"}} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Grid container direction="row" justify="space-between">
                                                                <Grid item >
                                                                    <Typography align="left" variant="h4">
                                                                        { contacts.length}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item >
                                                                    <Typography align="left" variant="h6">
                                                                    <TrendingUpIcon /> { contacts.length}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography align="left" variant="body1">
                                                                CONTACTS
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item  xs={12} sm={6} md={3}>
                                        <Paper elevation="1" className={clsx(classes.widgetPaper2, classes.widgetPaper)}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={5}>
                                                    <BusinessOutlinedIcon style={{fontSize: "45px"}} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Grid container direction="row" justify="space-between">
                                                                <Grid item >
                                                                    <Typography align="left" variant="h4">
                                                                        { companies.length}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item >
                                                                    <Typography align="left" variant="h6">
                                                                        <TrendingUpIcon /> { contacts.length}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography align="left" variant="body1">
                                                                COMPANIES
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item  xs={12} sm={6} md={3}>
                                        <Paper elevation="1" className={clsx(classes.widgetPaper3, classes.widgetPaper)}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={5}>
                                                    <LocalOfferOutlinedIcon style={{fontSize: "45px"}} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Grid container direction="row" justify="space-between">
                                                                <Grid item >
                                                                    <Typography align="left" variant="h4">
                                                                        { deals.length}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item >
                                                                    <Typography align="left" variant="h6">
                                                                    <TrendingUpIcon /> { deals.length}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography align="left" variant="body1">
                                                                DEALS
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item  xs={12} sm={6} md={3}>
                                        <Paper elevation={1} className={clsx(classes.widgetPaper4, classes.widgetPaper)}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={5}>
                                                    <ConfirmationNumberOutlinedIcon style={{fontSize: "45px"}} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Grid container direction="row" justify="space-between">
                                                                <Grid item >
                                                                    <Typography align="left" variant="h4">
                                                                        { tickets.length}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item >
                                                                    <Typography align="left" variant="h6">
                                                                    <TrendingUpIcon /> { tickets.length}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography align="left" variant="body1">
                                                                TICKETS
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>                                                                                                
                                </Grid>
                                <Grid container  spacing={4} justify="space-between"  direction="row" >
                                    <Grid item  xs={12} sm={6} md={3}>
                                        <Paper elevation={3} className={clsx(classes.widgetPaper4, classes.widgetPaper)}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={5}>
                                                    <AttachMoneyOutlinedIcon style={{fontSize: "45px"}} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Grid container direction="column">
                                                        <Grid item xs={12}>
                                                            <Grid container direction="row" justify="space-between">
                                                                <Grid item >
                                                                    
                                                                        {/* {console.log(deals.length > 0)} */}
                                                                        { (deals.length > 0 ) ? (() => {
                                                                                console.log("entered")
                                                                                var sum =0;
                                                                                deals.map(deal => {
                                                                                    sum = sum + parseFloat(deal.amount)
                                                                                })
                                                                                return <Typography align="left" variant="h4">sum</Typography>
                                                                            }) : <Typography align="left" variant="h4">0</Typography>
                                                                        }
                                                                    
                                                                </Grid>
                                                                <Grid item >
                                                                    <Typography align="left" variant="h6">
                                                                    <TrendingUpIcon /> { tickets.length}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography align="left" variant="body1">
                                                                TOTAL POTENTIAL
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>        
                                
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ActivityLists />

                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={ clsx(classes.topMargin, classes.bottomMargin)} justify="space-between" >
                            <Grid item xs={12} lg={5}>
                                {/* <Paper elevation={0}> */}
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={12} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <DealsTable />
                                        </Grid>
                                    </Grid>
                                {/* </Paper> */}
                            </Grid>
                            <Grid item xs={12} lg={7}>
                                {/* <Paper elevation={2}> */}
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={12} md={6} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <PieChartByDealCount />
                                        </Grid>
                                        <Grid item xs={12} md={6} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <PieChartByDealAmount />
                                        </Grid>
                                    </Grid>
                                {/* </Paper> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={ clsx(classes.topMargin, classes.bottomMargin)} justify="space-between" >
                            <Grid item xs={12} lg={5}>
                                {/* <Paper elevation={0}> */}
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={12} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <CompanyTable />
                                        </Grid>
                                    </Grid>
                                {/* </Paper> */}
                            </Grid>
                            <Grid item xs={12} lg={7}>
                                {/* <Paper elevation={2}> */}
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={12} md={6} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <PieChartByDealCount />
                                        </Grid>
                                        <Grid item xs={12} md={6} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <PieChartByDealAmount />
                                        </Grid>
                                    </Grid>
                                {/* </Paper> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={ clsx(classes.topMargin, classes.bottomMargin)} justify="space-between" >
                            <Grid item xs={12} lg={7}>
                                <Grid container direction="row" spacing={3}>
                                    {/* <Paper elevation={2}> */}
                                        <Grid item xs={12} md={6} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <PieChartByContactsCount />
                                        </Grid>
                                    {/* </Paper>
                                    <Paper elevation={2}> */}
                                        <Grid item xs={12} md={6} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <PieChartByContactsCount />
                                        </Grid>
                                    {/* </Paper> */}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={5}>
                                {/* <Paper elevation={2}> */}
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={12} style={{paddingTop:"0px", paddingBottom: "0px"}}>
                                            <ContactsTable companyId="-1" />
                                        </Grid>
                                    </Grid>
                                {/* </Paper> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{height:"360px"}} direction='row' className={ clsx(classes.topMargin, classes.bottomMargin)} justify="space-between" >
                            <Grid item xs={12} md={4}>
                                <TaskLists />

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MeetingLists />

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TicketLists />

                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}

export default  withRouter(withStyles(styles)(CRMDashboard))
