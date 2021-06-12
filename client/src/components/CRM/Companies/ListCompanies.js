import React, { useEffect, useState } from 'react'
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx"
import SideBar from '../../AppLayout/SideBar'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, Paper, Typography, Breadcrumbs, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import EnhancedTable from './CompanyTable';
import { getAllCompanies, deleteCompaniesWithId } from '../../../actions/crmActions';
import { useSelector, useDispatch } from 'react-redux';
import CreateCompanyModal from './CreateCompanyModal';
// import { createContact } from '../../../../../server/controllers/CRM/contact';

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
      }
    
}))



export const ListCompanies = () => {
    const classes = styles();
    const companies = useSelector(state => state.crm.companies);
    const companies_loading = useSelector(state => state.crm.companies_loading);
    const [createCompanyModalOpen, setCreateCompanyModalOpen ] = useState(false);
    const dispatch = useDispatch();

    // useEffect(()=> {
    //     dispatch(getAllContacts())
    //     console.log(contacts)
    // })
    useEffect( () => {
        dispatch(getAllCompanies());
        console.log(companies)
      }, [dispatch]);

    const handleCreateCompanyButton = () => {
        setCreateCompanyModalOpen(true)
    }

    const handleCreateCompanyModalClose = () => {
        setCreateCompanyModalOpen(false)
    }

    const headCells = [
        { id: 'name/industry', numeric: false, disablePadding: true, label: 'Name [industry]' },
        { id: 'domain', numeric: true, disablePadding: false, label: 'Domain' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
        { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
        { id: 'lifecyclestage', numeric: true, disablePadding: false, label: 'Lifecycle Stage' },
        { id: 'lastContacted', numeric: true, disablePadding: false, label: 'Last Contacted' },
    ];
    const rows = companies

    const deleteCompanies = (ids) => {
        console.log(ids)
        dispatch(deleteCompaniesWithId(ids));
        console.log(companies)   
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
                                <Grid item style={{alignSelf:"center"}}>
                                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.ContainerBreadcrumb}>
                                        <Link  to="/crm/" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                                        CRM
                                        </Link>
                                        <Link to="/crm/companies" style={{color:"#2c387e", textDecoration:"none", fontWeight:"500"}}>
                                        Companies
                                        </Link>
                                        <Typography color="textPrimary">All Companies</Typography>
                                    </Breadcrumbs>
                                </Grid>
                                <Grid item>
                                    <Grid container  justify="flex-end" spacing={2}>
                                        <Grid item>
                                            <Button variant="outlined" size="large" color="primary" className={classes.margin}>
                                                Import
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => handleCreateCompanyButton()}>
                                                Create new Company
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            

                <Grid container className={classes.section}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={clsx(classes.sectionPaper)}>
                            <Grid container>
                                <Grid item xs={12} className={classes.table}>
            
                                    <EnhancedTable rows={rows}  headCells={headCells} loading={companies_loading} deleteCompanies={deleteCompanies} />

            

                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
                <Grid container className={classes.section}>
                    <Grid item xs={12}>
                        Status : { companies_loading.toString()}
                        

                    </Grid>
                </Grid>
                <div>
                
            </div>
            </div>
              {/* Modal */}


    <CreateCompanyModal open={createCompanyModalOpen} type="create" onClose={handleCreateCompanyModalClose} />
            

            {/* Modal Over */}
            </div>
                
    )
}

// const mapStateToProps = state => ({
//     contacts: state.contacts
//   });
  
export default withRouter(ListCompanies)

