import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Grid, Modal, Fade, Backdrop } from '@material-ui/core';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDeals, getAllContacts, getAllCompanies } from '../../../actions/crmActions';
import CustomScrollbars from '../../AppLayout/CustomScrollbars';
import CreateCompanyModal from '../Companies/CreateCompanyModal';
import ContactsTable from './ContactsTable';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  
});


function Row(props) {
  const { row, openContacts, openCompany } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow hover className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }} onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right" >{row.domain}</TableCell>
        <TableCell align="right" >{row.email}</TableCell>
        <TableCell align="right" >{row.mobile}</TableCell>
        <TableCell align="right" >{row.city +", "+ row.state} </TableCell>
        <TableCell align="right" >{row.lifecyclestage} </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container direction="column">
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom component="div">
                        Details
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                <strong>Description : </strong> { row.description }
                            </Typography>
                        </Grid> 
                        <Grid item>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                <strong>All Details : </strong> <span onClick={() => openCompany(row._id)}>View All</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid container spacing={1} justify="space-between">
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                <strong>No. of Employees : </strong> { row.noOfEmployees }
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                <strong>Revenue : </strong> { row.revenue }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     history: PropTypes.object(
//       PropTypes.shape({
//         description: PropTypes.string.isRequired,
//         contactId: PropTypes.string.isRequired,
//         companyId: PropTypes.string.isRequired,
//         owner: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     fname: PropTypes.string.isRequired,
//     lname: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     mobile: PropTypes.string.isRequired,
//     leadstage: PropTypes.string.isRequired,
//     lastContacted: PropTypes.string.isRequired
//   }).isRequired,
// };

const useContainerStyles = makeStyles(theme =>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px'
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000', 
           
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CompanyTable() {
    const classes = useContainerStyles()
    const companies = useSelector(state => state.crm.companies)
    const dispatch = useDispatch(); 
    const [ openCompany, setOpenCompany] = useState(false)
    const [ paramsCompany, setParamsCompany] = useState({})
    // const [ openContacts, setOpenContacts] = useState(false)
    // const [ paramsContacts, setParamsContacts] = useState({})

    
    useEffect(() => {
        dispatch(getAllCompanies())
    }, [])

    const handleOpenCompany = (id) =>{
        setParamsCompany( companies.filter(company => { return company._id == id })[0] )
        setOpenCompany(true)
    }

    const closeCompany = () => {
        setOpenCompany(false);
        setParamsCompany({});
    }
    
    // const handleOpenContacts = (id) =>{
    //     setParamsContacts(id)
    //     setOpenContacts(true)
    // }

    // const closeContacts = () => {
    //     setOpenContacts(false);
    //     setParamsContacts({});
    // }


  return (
    <TableContainer component={Paper} elevation={2}  >
      <CustomScrollbars className=" scrollbar" style={{minHeight:"455px"}}>
        <Table stickyHeader aria-label="collapsible table" >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Company Name</TableCell>
              <TableCell align="right">domain</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Lifecycle Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((row) => (
              <Row key={row._id} row={row} openCompany={handleOpenCompany}/>
            ))}
          </TableBody>
        </Table>
      </CustomScrollbars>

      { openCompany && <CreateCompanyModal type="view"  data={paramsCompany} open={openCompany} onClose={() => closeCompany()} />}
    </TableContainer>
  );
}
