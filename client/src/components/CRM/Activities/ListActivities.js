import React, {useEffect} from 'react'
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SideBar from '../../AppLayout/SideBar';
import { makeStyles, Paper, Grid, Breadcrumbs, Button, Typography } from '@material-ui/core';
import ActivityCard from './ActivityCard';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActivities } from '../../../actions/crmActions';


import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ActivityBox from './ActivityBox';
import Moment from 'react-moment';

const styles = makeStyles(theme => ({
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
    paper: {
        padding: '6px 16px',
      },
      secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
      },
}))


export default function ListActivities() {
    const classes = styles();

    const activities = useSelector(state => state.crm.activities);
    const activities_loading = useSelector(state => state.crm.activities_loading);
    const [createContactModelOpen, setCreateContactModelOpen] = React.useState(false);

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getAllActivities());
        console.log(activities)
    }, [dispatch]);


    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <SideBar />
            <div>
            <Grid container className={classes.section}>
                <Grid item xs={12}>
                    <Paper variant="outlined" className={clsx(classes.sectionPaper)}>
                        <Grid container justify="space-between">
                            <Grid item xs={12} sm={4} style={{alignSelf:"center"}}>
                                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.ContainerBreadcrumb}>
                                    <Link  to="/crm/" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                                    CRM
                                    </Link>
                                    <Link to="/crm/deals" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                                    Activities
                                    </Link>
                                    <Typography color="textPrimary">All Activities</Typography>
                                </Breadcrumbs>
                            </Grid>
                            {/* <Grid item xs={12} sm={7}>
                                <Grid container  justify="flex-end" spacing={2}>
                                    <Grid item>
                                        <Button variant="outlined" size="large" color="primary" className={classes.margin}>
                                            Import
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" size="large" color="primary" className={classes.margin}>
                                            Create new Deal
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container className={classes.section}>
                <Grid item xs={12}>
                   { false && activities && 
                        activities.map(activity => <ActivityCard key={activity._id} data={activity} />)
                   }
                    <Timeline align="alternate">
{   activities &&   activities.map((activity, index) => {
                        return (
                        <TimelineItem key={activity._id} >
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                <Moment format="LLLL">{activity.timestamp}</Moment>
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    { (activity.type.toLowerCase() == "deal") && <LocalOfferIcon />}
                                    { (activity.type.toLowerCase() == "contact") && <PersonIcon />}
                                    { (activity.type.toLowerCase() == "company") && <BusinessIcon />}
                                    { (activity.type.toLowerCase() == "ticket") && <ConfirmationNumberIcon />}
                                </TimelineDot>
                            { (activities.length - 1 != index) && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <ActivityBox activity={activity} index={index} />
                                
                             </TimelineContent>
                        </TimelineItem>
                     )})
    }
                   </Timeline>
                </Grid>
            </Grid>

            
            </div>
        </div>
        
    )
}
