import React, { useEffect } from 'react';
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
import { Grid } from '@material-ui/core';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDeals } from '../../../actions/crmActions';
import CustomScrollbars from '../../AppLayout/CustomScrollbars';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow hover className={classes.root} style={{ color: (row.stage == 'Stage3') ? "green" : "red" }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }} onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }}>
          {row.name}
        </TableCell>
        <TableCell align="right" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }}>{row.amount}</TableCell>
        <TableCell align="right" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }}>{row.stage}</TableCell>
        <TableCell align="right" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }}> <Moment format="MMM DD, YYYY">{row.closeDate}</Moment> </TableCell>
        <TableCell align="right" style={{ color: (row.stage == 'Stage3') ? "green" : "red" }}>{(row.stage == 'Stage3') ? "Completed" : "In Pipeline"}</TableCell>
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
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                <strong>Description : </strong> { row.description }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <strong>Contacts</strong>
                            <AvatarGroup max={4}>
                                <Avatar alt="Contact" >{row.contactId}</Avatar>
                            </AvatarGroup>
                        </Grid>
                        <Grid item xs={5}>
                            <strong>Companies</strong>
                            <AvatarGroup max={4}>
                                <Avatar alt="Company" >{row.companyId}</Avatar>
                            </AvatarGroup>
                        </Grid>
                        <Grid item xs={2}>
                            <strong>Owner</strong>
                            <AvatarGroup max={4}>
                                <Avatar alt="Owner" >{row.owner}</Avatar>
                            </AvatarGroup>
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
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };


const useContainerStyles = makeStyles({
    
});

 const DealsTable = () => {
    const classes = useContainerStyles()
    const deals = useSelector(state => state.crm.deals)
    const dispatch = useDispatch(); 

    
    useEffect(() => {
        dispatch(getAllDeals())
    }, [])


  return (
    <TableContainer component={Paper} elevation={2} >

      <CustomScrollbars className=" scrollbar" style={{minHeight:"460px"}}>
        <Table stickyHeader  aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Deal Name</TableCell>
              <TableCell align="right">Amt&nbsp;(Rs.)</TableCell>
              <TableCell align="right">Stage</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals.map((row) => (
              <Row key={row._id} row={row} />
            ))}
            {deals.map((row) => (
              <Row key={row._id} row={row} />
              ))}
          </TableBody>
        </Table>
      </CustomScrollbars>
    </TableContainer>
  );
}

export default DealsTable
