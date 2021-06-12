import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import { FormControlLabel, TextField, InputBase, Tooltip, IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { ICD_Rates } from "./ExcelTemplates";


const CreateQuotation = (props) => {
  const [data, setData] = useState([]) 
    
  useEffect(() => {
    setData(props.data.json)
    console.log(props.data.json)
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  
    const columns = props.template.columns
    // [
    //   {
    //     name: "Name",
    //     options: {
    //       filter: true, 
    //     }
    //   },
    //   {
    //     label: "Modified Title Label",
    //     name: "Title",
    //     options: {
    //       filter: true,
    //     }
    //   },
    //   {
    //     name: "Location",
    //     options: {
    //       filter: false,
    //     }
    //   },
    //   {
    //     name: "Age",
    //     options: {
    //       filter: true,
    //     }
    //   },
    //   {
    //     name: "Salary",
    //     options: {
    //       filter: true,
    //       sort: false,
    //     }
    //   }
    // ];

    const options = {
      filter: true,
      filterType: 'checkbox',
      fixedHeader: true,
      // isRowSelectable: false,
      responsive: 'standard',
      selectableRows: false,
      downloadOptions: {
        filename: `${ICD_Rates.label}.csv`,
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
      <MUIDataTable title={props.template.label} data={data} columns={columns} options={options} />
    );

  
}

export default CreateQuotation;