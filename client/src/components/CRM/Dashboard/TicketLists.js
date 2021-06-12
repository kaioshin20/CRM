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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateTicketModal  from '../Tickets/CreateTicketModal';

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

export default function MeetingLists() {
  const classes = useStyles();
  const [ tickets, setTickets] = useState([])
  const [ open, setOpen ] = useState(false)
  const [ params, setParams ] =useState({})

  useEffect(() => {
         axios.get('/api/tickets/all')
            .then(res => {
                console.log(res.data)
                setTickets(res.data)
            })
            .catch(err => console.log(err))
        console.log(tickets)

  }, [])

  const openTicket = (id) => {
    console.log(id)
    setParams( tickets.filter(ticket=> ticket._id == id)[0] )
    setOpen(true)

  }
  const handleCloseCreateTicket = () => {
    
    setOpen(false)
    setParams( {} )

  }



  return (
    <React.Fragment>
        <CustomScrollbars className=" scrollbar">
        <List className={classes.root}>
            {
                tickets.filter(ticket => { return ticket.status != "Stage3"}).map(ticket => {
                    return (
                        <React.Fragment key={ticket._id}>
                            <ListItem alignItems="flex-start" onClick={() =>openTicket(ticket._id)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp"  />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ 
                                    <React.Fragment>
                                        <Grid container justify="space-between">
                                            <Grid item >
                                                {ticket.name}
                                            </Grid>
                                            <Grid item >
                                                <MoreHorizIcon 
                                                    style = {{color: 
                                                    (ticket.priority === "high") ? "red" : 
                                                            (ticket.priority === "medium") ? "orange" : 
                                                            (ticket.priority === "low") ? "yellow" : "primary" }} />
                                                
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                    
                                    }
                                    secondary={
                                    <React.Fragment>
                                        <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                        >
                                        <Moment format="DD-MM-YYYY"> {ticket.source} </Moment>
                                        </Typography>
                                        {" — "+ ticket.description}
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
        { open && <CreateTicketModal open={open} type="view" data= {params} onClose={handleCloseCreateTicket} />}
    </React.Fragment>
  );
}
