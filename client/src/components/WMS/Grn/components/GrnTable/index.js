import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { lighten, makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import { InputBase, Grid, Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'grn_id', numeric: false, disablePadding: false, label: 'GRN ID' },
  { id: 'Warehouse_name', numeric: false, disablePadding: false, label: 'Warehouse_name' },
  { id: 'Depositor_name', numeric: false, disablePadding: false, label: 'Depositor_name' },
  { id: 'Supplier_name', numeric: false, disablePadding: false, label: 'Supplier_name' },
  { id: 'Shelf_code', numeric: false, disablePadding: false, label: 'Shelf_code' },
  { id: 'Zone_name', numeric: false, disablePadding: false, label: 'Zone_name' },
  { id: 'ReceiptDate', numeric: false, disablePadding: false, label: 'Receipt Date' },
  { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>


  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
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
      width: '20ch',
    },
  },
  rootRow: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [activeBtn, setActiveBtn] = useState(1)


  useEffect(() => {
    console.log("UseEffect at Table.js");
    props.filterRows(activeBtn, props.rows);

  })

  return (
    <Toolbar
      className={classes.root}
    >



      <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
        <b>GRN Table</b>
      </Typography>


      <Grid item style={{ alignSelf: "center" }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search your lead here…"
            onChange={props.findSearch()}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Grid>



    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  rootList: {
    flexGrow: 1,
  },
  paperList: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  console.log("--rows i n ROW", row)

  const AllList = (List) => {
    console.log("----list is", List)

    const result = List.map((e) => {

      return (

        <Grid container spacing={4} >

          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Item code:</b> {e.Item_code}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Item description:</b> {e.Item_description}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Container_quantity:</b> {e.Container_quantity}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Total_quantity:</b> {e.Total_quantity}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Unit_price:</b> {e.Unit_price}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Total_price:</b> {e.Total_price}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Product_status:</b> {e.Product_status}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Accepted_qty:</b> {e.Accepted_qty}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Rejected_qty:</b> {e.Rejected_qty}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Unit_price:</b> {e.Unit_price}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Unit_price:</b> {e.Unit_price}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Depositor_currency:</b> {e.Depositor_currency}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Exchange_rate:</b> {e.Exchange_rate}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>

            <Typography variant="subtitle2" gutterBottom component="div">
              <b>Created At:</b> {e.Created}
            </Typography>
          </Grid>
        </Grid>
      )
    })

    return result
  }
  return (
    <React.Fragment>
      <TableRow className={classes.rootRow}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>


        <TableCell component="th" id={row.grn_id} scope="row" padding="none">
          {row.grn_id}
        </TableCell>
        <TableCell align="left">{row.Warehouse_name}</TableCell>
        <TableCell align="left">{row.Depositor_name}</TableCell>
        <TableCell align="left">{row.Supplier_name}</TableCell>
        <TableCell align="left">{row.Shelf_code}</TableCell>
        <TableCell align="left">{row.Zone_name}</TableCell>
        <TableCell align="center">
          <Moment format="YYYY/MM/DD">{row.ReceiptDate}</Moment>
        </TableCell>
        <TableCell align="left">{row.edit}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>

            </Box>
            <div className={classes.rootRow}>

              {
                AllList(row.List)
              }

            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};



export default function GrnTable({ booking_rows }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [keyword, setKeyword] = React.useState('');
  const [filterType, setFilterType] = React.useState(1);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const filterRows = () => {

    if (filterType === 1) {
      return booking_rows
    }


    if (filterType === 4) {

      return booking_rows.filter((row) => { return row.grn_id.search(keyword) > -1 || (row.Warehouse_name).search(keyword) > -1 || (row.Depositor_name).search(keyword) > -1 || (row.Supplier_name).search(keyword) > -1 || (row.Shelf_code).search(keyword) > -1 || (row.ReceiptDate).search(keyword) > -1 })
    }
  }
  console.log("in booking table", booking_rows)
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const findSearch = () => event => {
    var keyword = event.target.value.trim()
    setKeyword(keyword)
    setFilterType(4)

  }


  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length}
          filterType={filterType}
          setFilterType={setFilterType}
          filterRows={filterRows}
          findSearch={findSearch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={booking_rows.length}
            />
            <TableBody>
              {stableSort(filterRows(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {


                  return (


                    <Row key={row.name} row={row} />

                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}





