import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import {getAllFromStorage} from '../../../actions/storageActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme =>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
 class Storage extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //    AllProducts:{}
  //   };
  // }


  componentDidMount(){
    this.props.getAllFromStorage();

  }
    render() {

      let AllProducts = {}
      let rows =[]
  
      if(this.props){
        const {storage} = this.props.storage
        // this.setState({AllProducts:storage})  
  //console.log("checking",storage)
  if(storage !== null){
   //this.setState({AllProducts:storage.AllProducts}) 
   AllProducts = storage
     //console.log("adsf",storage.AllProducts,typeof(storage.AllProducts))
     //this.setState({AllProducts:storage.AllProducts})
      rows = AllProducts.map((data,index)=>{
      const {
        category,
      product_name,
      quantity, 
       storage_no,
       _id
    } = data
    
    return {product_name,category,quantity,storage_no,_id}
    })
  }
  
  }

console.log("all products are",AllProducts)
      const columns = [
        { id: 'product_name', label: 'Product', minWidth: 170 },
        { id: 'category', label: 'Category', minWidth: 100 },
        {
          id: 'quantity',
          label: 'Quantity',
          minWidth: 170,
          align: 'right'
        },
        {
          id: 'storage_no',
          label: 'Storage No.',
          minWidth: 170,
          align: 'right'
       
        },
      ];

    // console.log("--",this.state.AllProducts)


 console.log("rows are",rows )


 const { classes } = this.props
 
//  const [page, setPage] = React.useState(0);
//  const [rowsPerPage, setRowsPerPage] = React.useState(10);

//  const handleChangePage = (event, newPage) => {
//    setPage(newPage);
//  };

//  const handleChangeRowsPerPage = (event) => {
//    setRowsPerPage(+event.target.value);
//    setPage(0);
//  };


        return (

            
                
                <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows  ?(rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    console.log("values",value)
                    return (
                      <TableCell key={column.id} align={column.align}>
                       <p>{value}</p>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }))
            : null

          }
          </TableBody>
        </Table>
      </TableContainer>
     
    </Paper>
                
          
        )
    }
}


Storage.propTypes = {
  getAllFromStorage: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  storage: state.storage
});


export default connect(mapStateToProps,{getAllFromStorage})(withStyles(styles)(Storage));