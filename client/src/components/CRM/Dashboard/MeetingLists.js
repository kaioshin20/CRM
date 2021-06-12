import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CustomScrollbars from '../../AppLayout/CustomScrollbars';
import axios from 'axios';
import Moment from 'react-moment';
import { Grid } from '@material-ui/core';
import ScheduleMeeting from '../Tasks/ScheduleMeeting';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    minHeight: "360px",
    maxHeight: "360px",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const MeetingLists = () => {
  const classes = useStyles();
  let [ meetings, setMeetings] = useState([])
  const [ open, setOpen ] = useState(false)
  const [ params, setParams ] =useState({})

  useEffect(() => {
         axios.get('/api/meetings/all')
            .then(res => {
                console.log(res.data)
                var meetings = res.data
                meetings.forEach((meeting)=>{
                    meeting.startTime = new Date(meeting.startTime)
                }) 
                setMeetings(meetings)
//                setMeetings(res.data)
               // meeting.startTime = new Date(time)
            })
            .catch(err => console.log(err))
        console.log(meetings)
       
       console.log("--->",meetings)
           
  }, [])

  const openMeeting = (id) => {
    console.log(id)
    setParams( meetings.filter(meeting=> meeting._id == id)[0] )
    setOpen(true)

  }
  const handleCloseScheduleMeeting = () => {
    
    setOpen(false)
    setParams( {} )

  }



  return (
    <React.Fragment>
        <CustomScrollbars className=" scrollbar">
        <List className={classes.root}>
            {
                meetings.map(meeting => {
                    return (
                        <React.Fragment key={meeting._id}>
                            <ListItem alignItems="flex-start" onClick={() =>openMeeting(meeting._id)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp"  />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ 
                                    <React.Fragment>
                                        <Grid container justify="space-between">
                                            <Grid item >
                                                {meeting.subject}
                                            </Grid>
                                            <Grid item >
                                                <MoreHorizIcon 
                                                    style = {{color: 
                                                    (meeting.priority === "high") ? "red" : 
                                                            (meeting.priority === "medium") ? "orange" : 
                                                            (meeting.priority === "low") ? "yellow" : "primary" }} />
                                                
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                    
                                    }
                                    secondary={
                                    <React.Fragment>
                                        {/* {meeting.startTime} */}
                                        {" — "+ meeting.description}
                                    </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                        )
                    
                })
            }

        </List>
        </CustomScrollbars>
        { open && <ScheduleMeeting open={open} openType="view" data= {params} onClose={handleCloseScheduleMeeting} />}
    </React.Fragment>
  );
}

export default MeetingLists
