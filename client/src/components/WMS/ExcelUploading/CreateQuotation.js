import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import { FormControlLabel, TextField, InputBase, Tooltip, IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";


const CreateQuotation = (props) => {
  const [data, setData] = useState([]) 
    
  useEffect(() => {
    setData(props.data)
    console.log(props.data)
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  
    const columns = [
      {
        name: "Name",
        options: {
          filter: true, 
        }
      },
      {
        label: "Modified Title Label",
        name: "Title",
        options: {
          filter: true,
        }
      },
      {
        name: "Location",
        options: {
          filter: false,
        }
      },
      {
        name: "Age",
        options: {
          filter: true,
        }
      },
      {
        name: "Salary",
        options: {
          filter: true,
          sort: false,
        }
      }
    ];

    const options = {
      filter: true,
      filterType: 'checkbox',
      fixedHeader: true,
      // isRowSelectable: false,
      responsive: 'standard',
      selectableRows: false,
      downloadOptions: {
        filename: 'ACME Employee list.csv',
        separator: ',',
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: true,
        }
      },
      draggableColumns: {
        enabled: true
      },
      onDownload: (buildHead, buildBody, columns, data) => {
        // if (this.state.downloadFile) {
          let val= `${buildHead(columns)}${buildBody(data)}`.trim();
          console.log(val)
          return val;
        // }

        // return false;
      },
      onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
      onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
      onChangePage: currentPage => console.log('currentPage: ', currentPage),
    //   onCellClick: (colData, cellMeta) => {
    //     window.alert(`Clicked "Edit" for row ${colData} with dataIndex of ${cellMeta.colIndex}-${cellMeta.rowIndex}`)
    //   }
    };

    return (
      <MUIDataTable title={"ACME Employee list"} data={data} columns={columns} options={options} />
    );

  
}

export default CreateQuotation;