import React, { useEffect } from 'react'
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx"
import SideBar from '../../AppLayout/SideBar'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, Paper, Typography, Breadcrumbs, Button, Modal, Fade, Backdrop } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import EnhancedTable from './ContactTable';
import { getAllContacts, deleteContactsWithId, getAllDeals, getAllCompanies, getAllActivities, getAllTickets } from '../../../actions/crmActions';
import { useSelector, useDispatch } from 'react-redux';
import CreateContactModal from './CreateContactModal'
import EditContactModal from './EditContactModal';

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
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
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
          width: '35ch',
        },
      },
      table:{
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
      },

    
}))


const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
    { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
    { id: 'leadStatus', numeric: true, disablePadding: false, label: 'Lead Stage' },
    { id: 'timestamp', numeric: true, disablePadding: false, label: 'Date Created' },
];



export const ListContacts = () => {
    const classes = styles();
    const contacts = useSelector(state => state.crm.contacts);
    const companies = useSelector(state => state.crm.companies);
    const contacts_loading = useSelector(state => state.crm.contacts_loading);
    const [createContactModelOpen, setCreateContactModelOpen] = React.useState(false);
    const [editContactModelOpen, setEditContactModelOpen] = React.useState(false);

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getAllContacts());
        dispatch(getAllCompanies());
        dispatch(getAllDeals())
        dispatch(getAllActivities());
        dispatch(getAllTickets());

        console.log(contacts)
      }, [dispatch]);

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'leadStatus', numeric: true, disablePadding: false, label: 'Lead Stage' },
        { id: 'timestamp', numeric: true, disablePadding: false, label: 'Date Created' },
    ];
    const rows = contacts

    const deleteContacts = (ids) => {
        console.log(ids)
        dispatch(deleteContactsWithId(ids));
        console.log(contacts)   
    }
    // const editContact = (id) => {
    //     console.log(id)
        
    // }

    const handleCreateContactButton = () => {
        setCreateContactModelOpen(true)
    }

    const handleCreateContactModalClose = () => {
        setCreateContactModelOpen(false)
    }

    const handleEditContactModalClose = () => {
        setEditContactModelOpen(false)
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
                                        <Link to="/crm/contacts" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                                        Contacts
                                        </Link>
                                        <Typography color="textPrimary">All Contacts</Typography>
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
                                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => handleCreateContactButton()}>
                                                Create new Contact
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            

                <Grid container className={classes.section}>
                    <Grid item xs={12} >
                        <Paper elevation={3} className={clsx(classes.sectionPaper)}>
                            <Grid container>
                                <Grid item xs={12} className={classes.table} >
            
                                    <EnhancedTable rows={rows}  headCells={headCells} loading={contacts_loading} deleteContacts={deleteContacts} />

            

                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid item xs={12}>
                        Status : { contacts_loading.toString()}
                        

                    </Grid>
                </Grid>
                <div>
                
            </div>
        </div>


        

  {/* Modal */}


    <CreateContactModal open={createContactModelOpen} type="create" onClose={handleCreateContactModalClose} />
            

  {/* Modal Over */}
    </div>

            
                
    )
}

// const mapStateToProps = state => ({
//     contacts: state.contacts
//   });
  
export default withRouter(ListContacts)

