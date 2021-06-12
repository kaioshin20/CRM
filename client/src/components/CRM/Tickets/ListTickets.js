import React, { useEffect, useState } from 'react'
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx"
import DragnDrop from '../Common/DragnDrop/DragnDrop'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllDeals, getAllTickets, updateTicketStatus, getAllContacts, getAllCompanies } from '../../../actions/crmActions';
import SideBar from '../../AppLayout/SideBar';

import { makeStyles, fade, Paper, Grid, Breadcrumbs, Button, Typography, InputBase, TextField, Collapse, IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CreateTicketModal from './CreateTicketModal';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab';
// import Deal from './Deal';

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
  border: {
      border: "1px"
  },
  paper:{
      paddingTop:"10px",
      paddingBottom:"10px",
      paddingLeft:"30px",
      paddingRight:"30px"
  },
  ContainerBreadcrumb:{
      marginTop: "auto",
      marginBottom: "auto"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))



const ListTickets = () => {
  const classes = styles();
  const tickets = useSelector( state => state.crm.tickets);
  const tickets_loading = useSelector(state => state.crm.tickets_loading)
  const [ createTicketModelOpen, setCreateTicketModelOpen] = useState(false);
  const [ searchTicket, setSearchTicket ] = useState();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
        dispatch(getAllTickets())
        dispatch(getAllContacts())
        dispatch(getAllCompanies())
        dispatch(getAllDeals())
        console.log(tickets, tickets_loading)
    }, [dispatch]);

    const updateStage = (id, status) => {
        console.log(id, status)
        dispatch(updateTicketStatus(id, status))
    }

    const handleCreateTicketButton = () => {
        setCreateTicketModelOpen(true)
    }

    const handleCreateTicketModalClose = () => {
        setCreateTicketModelOpen(false)
    }

    const loadTicket = () => e => {
        setAlertOpen(false)
        e.persist();
        var x= e.target.innerHTML.split(", ")[1]
        setSearchTicket(tickets.filter(ticket => { return ticket._id == x})[0])
        setAlertOpen(true)

    }

    

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
                              <Link to="/crm/tickets" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                              Tickets
                              </Link>
                              <Typography color="textPrimary">All Tickets</Typography>
                          </Breadcrumbs>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                          <Grid container  justify="flex-end" spacing={2}>
                              <Grid item>
                                  <Button variant="outlined" size="large" color="primary" className={classes.margin}>
                                      Import
                                  </Button>
                              </Grid>
                              <Grid item>
                                  <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => handleCreateTicketButton()}>
                                      Create new Ticket
                                  </Button>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Paper>
          </Grid>
        </Grid>

        <Grid container direction="row" className={classes.section} >
            <Grid item xs={12}>
                <Paper elevation={2} className={clsx(classes.sectionPaper)}  >
                    <Grid container spacing={2}>
                        <Grid item>
                    { tickets.length !=0 &&
                        <Autocomplete
                            id="combo-box-demo"
                            options={tickets}
                            getOptionLabel={(option) => option.name+", "+option._id}
                            onChange={loadTicket()}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                        />}
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
        </Grid>

      <Grid container direction="row" className={classes.section} >
            <Grid item xs={12} sm={8} md={6}>
            <Collapse in={alertOpen}>
                <Alert severity="info" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                }>
                    <AlertTitle>Search Results:</AlertTitle>
                    { searchTicket &&
                        <Grid container spacing={4} direction="row" justify="flex-start">
                            <Grid item>
                                Ticket Name: {searchTicket.name ? searchTicket.name : "No data"}
                            </Grid>
                            <Grid item>
                                Status: {searchTicket.status ? searchTicket.status : "No data"}
                            </Grid>
                            <Grid item>
                                Priority: {searchTicket.priority ? searchTicket.priority : "No data"}
                            </Grid>
                            <Grid item>
                                Owner: {searchTicket.owner ? searchTicket.owner : "No data"}
                            </Grid>
                            <Grid item xs={12}>
                                Description: {searchTicket.description ? searchTicket.description : "No data"}
                            </Grid>

                    </Grid>}

                </Alert>
            </Collapse>
            </Grid>
        </Grid>


        <Grid container direction="row" className={classes.section} >
            <Grid item xs={12}>
                <Paper elevation = {2} className={clsx(classes.sectionPaper)} >
                    <Grid container>
                        { tickets.length != 0 && 
                            <DragnDrop data={
                                {tasks: tickets, columns:{
                                'Stage1':{
                                    id: 'Stage1',
                                    title: 'Stage 1',
                                    taskIds: tickets.filter(ticket => {
                                                    if(ticket.status == "Stage1")
                                                        return ticket._id
                                                    }).map(ticket => ticket._id),
                                },
                                'Stage2':{
                                    id: 'Stage2',
                                    title: 'Stage 2',
                                    taskIds: tickets.filter(ticket => {
                                        if(ticket.status == "Stage2")
                                            return ticket._id
                                        }).map(ticket => ticket._id),
                                },
                                'Stage3':{
                                    id: 'Stage3',
                                    title: 'Won',
                                    taskIds: tickets.filter(ticket => {
                                        if(ticket.status == "Stage3")
                                            return ticket._id
                                        }).map(ticket => ticket._id)   
                                },
                                },
                                // Facilitate reordering of columns
                                columnOrder: ['Stage1', 'Stage2', 'Stage3'],
                            }
                            }
                                updateStage={updateStage}
                                loading={tickets_loading}
                                type="tickets"
                            />
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>




    

      </div>


    {/* Modal */}
    <CreateTicketModal open={createTicketModelOpen} type="create" onClose={handleCreateTicketModalClose} />
    {/* Modal Over */}
    </div>
      
  
    )
}

export default ListTickets
