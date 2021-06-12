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
import CreateTask from '../Tasks/CreateTask';

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

export default function TaskLists() {
  const classes = useStyles();
  const [ tasks, setTasks] = useState([])
  const [ open, setOpen ] = useState(false)
  const [ params, setParams ] =useState({})

  useEffect(() => {
         axios.get('/api/tasks/all')
            .then(res => {
                console.log(res.data)
                setTasks(res.data)
            })
            .catch(err => console.log(err))
        console.log(tasks)

  }, [])

  const openTask = (id) => {
    console.log(id)
    setParams( tasks.filter(task=> task._id == id)[0] )
    setOpen(true)

  }
  const handleCloseCreateTask = (id) => {
    console.log(id)
    setOpen(false)
    setParams( {} )

  }



  return (
    <React.Fragment>
        <CustomScrollbars className=" scrollbar">
        <List className={classes.root}>
            {
                tasks.map(task => {
                    return (
                        <React.Fragment key={task._id}>
                            <ListItem  alignItems="flex-start" onClick={() =>openTask(task._id)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp"  />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ 
                                    <React.Fragment>
                                        <Grid container justify="space-between">
                                            <Grid item >
                                                {task.name}
                                            </Grid>
                                            <Grid item >
                                                {   
                                                (task.type === "0")  ?  "To-do" : (task.type === "1")  ?  "Call" : (task.type === "2")  ?  "Chat" : (task.type === "3")  ?  "Email" : (task.type === "4")  ?  "Meeting" :  ""
                                                }    
                                                
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
                                        <Moment format="DD-MM-YYYY"> {task.due} </Moment>
                                        </Typography>
                                        {" — "+ task.description}
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
        { open && <CreateTask open={open} openType="view" data= {params} onClose={handleCloseCreateTask} />}
    </React.Fragment>
  );
}
