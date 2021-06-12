import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Grid, Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomScrollbars from '../../AppLayout/CustomScrollbars';


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




//Table Head
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{borderBottom:"2px solid #3f51b5"}}>
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
              style={{fontWeight:"600", color:"#6573c3"}}
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
}));


// Table ToolBar
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const [activeBtn, setActiveBtn] = useState(1)

  useEffect(() => {
    console.log("UseEffect at Table.js");
    props.filterRows(activeBtn, props.rows);

  })
  const handleSearchChange = () => {
    
  }



  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <ButtonGroup className={classes.title} color="primary" aria-label="outlined primary button group">
            <Button onClick={() => {
                props.setFilterType(1)
              }} variant={(props.filterType === 1 || props.filterType === 4) ? "contained" : "outlined"}>All</Button>
            <Button onClick={() => {
                props.setFilterType(2)
              }} variant={(props.filterType === 2) ? "contained" : "outlined"}>Calls</Button>
            <Button onClick={() => {
                props.setFilterType(3)
              }} variant={(props.filterType === 3) ? "contained" : "outlined"}>Mails</Button>
        </ButtonGroup>
        // <Typography className={classes.title} align="left" variant="h6" id="tableTitle" component="div">
        //   All Contacts
        // </Typography>
      )}
      {numSelected > 0 ? ( <Grid item></Grid>) : (
        <Grid item style={{alignSelf:"center"}}>
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
        </Grid>)}
      {numSelected > 0 ? (
          <Grid container alignContent="stretch" justify="flex-end">
              <Grid item>
                {numSelected == 1 ? (
                    <Grid item >
                        <Button variant="outlined">Edit</Button>
                        <Button variant="outlined">Preview</Button>
                        <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>    
                    </Grid>
                ) : 
                (
                    <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                )}

              </Grid>
          </Grid>
        ) : (
            <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
                <FilterListIcon />
            </IconButton>
            </Tooltip>
        )
          
      }
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
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterType, setFilterType] = React.useState(1);
  const [keyword, setKeyword] = React.useState('');


  const {rows, loading} = props

  const filterRows = () => {
    if(filterType===1){
      return rows
    }
    else if(filterType===2){
      return rows.filter((row) => {return  (row.type === "Call")})
    }
    else if(filterType===3){
      return rows.filter((row) => {return  (row.owner === "Mail")})
    }
    else if(filterType === 4){
      return rows.filter((row) => { return row._id.search(keyword) > -1 || (row.type).search(keyword) > -1 || row.details.search(keyword) > -1 || row.ownerId.search(keyword) > -1 || row.nameId.search(keyword) > -1 })
    }
  
  }

  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const findSearch = () => event=> {
    var keyword = event.target.value.trim()
    setKeyword(keyword)
    setFilterType(4)

  }


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
    
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} filterType={filterType} setFilterType={setFilterType} filterRows={filterRows} findSearch={findSearch}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            {/* <caption>A basic table example with a caption</caption> */}
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={props.headCells}
            />
            <TableBody>
                { loading && <TableRow key="loading">
                  <TableCell style={{color:"#d32f2f"}}></TableCell>
                  <TableCell style={{color:"#d32f2f"}}><CircularProgress color="primary" /></TableCell>
                  <TableCell align="right" style={{color:"#d32f2f"}}><CircularProgress color="primary" /></TableCell>
                  <TableCell align="right" style={{color:"#d32f2f"}}><CircularProgress color="primary" /></TableCell>
                  <TableCell align="right" style={{color:"#d32f2f"}}><CircularProgress color="primary" /></TableCell>
                  <TableCell align="right" style={{color:"#d32f2f"}}><CircularProgress color="primary" /></TableCell>
                </TableRow>

                }
                { !loading && stableSort(filterRows(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" >
                        <Link to={{pathname:'/crm/activity/id/', state: row._id}} > {row.type } </Link>
                      </TableCell>
                      <TableCell align="right" >{row.details}</TableCell>
                      <TableCell align="right" >{row.ownerId}</TableCell>
                      <TableCell align="right" >{row.nameId}</TableCell>
                      <TableCell align="right" > {row.timestamp}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justify="space-between">
            <Grid item style={{alignSelf:"center", paddingLeft:"15px"}}>
                <Typography variant="subtitle1" align="center">subtitle</Typography>
            </Grid>
            <Grid item>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />

            </Grid>
        </Grid>
      </Paper>

    </div>
  );
}
