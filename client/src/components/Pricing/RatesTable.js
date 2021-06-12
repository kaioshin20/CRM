import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { getAllRates, uploadRates, editRates, deleteRates } from '../../actions/pricingAction';

import { Tooltip, IconButton } from '@material-ui/core';
import AddNew from './AddRates/AddNew';
import { useHistory } from 'react-router';
import axios from 'axios';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import EditSharpIcon from '@material-ui/icons/EditSharp';




export const RatesTable = (props) => {

    const rates = useSelector(state => state.pricing.rates)
    const ratesLoading = useSelector(state => state.pricing.ratesLoading)

    const [formOpen, setFormOpen] = useState(false)
    const [openType, setOpenType] = useState(-1)  // 0-create, 1-view, 2-edit, 3-multiple-edit
    const [dataToPass, setDataToPass] = useState(undefined)
    const [selectedRows, setSelectedRows] = useState([])

  
    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
      if(props.type === "ICDRates"){
        dispatch(getAllRates({type: props.template}))
      }
      console.log(props)
    }, [])


    const handleFormOpen = (openType, dataToPass) => {
      console.log("reached formOpen")
        setOpenType(openType)
        setDataToPass(dataToPass)
        setFormOpen(true)
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedRows([])
    }

    const handleFormSubmit = (data, type) => {
      console.log(data)  
      if(type === 0){
          dispatch(uploadRates({data, type: props.template.name}))
            
        }
        else if((type === 2) || (type === 3)) {
          let ids = selectedRows.map(index => rates[index]._id)
          let change = data
          let x = {}
          if(type ===2 ){
            x = change
          }
          else if(type === 3){
            Object.keys(data).forEach(key => {
                if(change[key] == ""){
                    delete change[key]
                  }
                  else{
                    x[key] = change[key]
                  
                }
              })

          }

            console.log(x)
          dispatch(editRates({ ids: ids, change: x, type: props.template.name}) ) 
        }
    }

    const handleSelectClick = (type) => {
      console.log(selectedRows, type)
        if(type === "Create"){
            handleFormOpen(0, undefined)
        }
        else if(type === "Edit") {
            if(selectedRows.length === 1){
                var value = rates[selectedRows[0]]
                handleFormOpen(2, rates[selectedRows[0]] )
            }
            else{
                handleFormOpen(3, undefined)
            }

        }
        else if(type === "Delete"){
          let ids = selectedRows.map(index => rates[index]._id)
          console.log({ ids : ids})
          dispatch(deleteRates({ ids : ids, type: props.template.name}))
          options.rowsSelected = []
          setSelectedRows([])
          
        }
        else if(type === "Upload"){
            history.push("/pricing/rates/upload")
        }
    }


    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        enableNestedDataAccess: '.', // allows nested data separated by "." (see column names and the data structure above)
        onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
            setSelectedRows(rowsSelected)
            console.log(currentRowsSelected, allRowsSelected, rowsSelected)
        },
        customToolbar: () => { return (
            <React.Fragment>
                <Tooltip title={"Create New Entry"}>
                <IconButton  onClick={() => handleSelectClick("Create")}>
                    <AddIcon  />
                </IconButton>
                </Tooltip>
                <Tooltip title={"Upload from CSV"}>
                <IconButton  onClick={() => handleSelectClick( "Upload")}>
                    <CloudUploadOutlinedIcon  />
                </IconButton>
                </Tooltip>
            </React.Fragment>
          )},
        customToolbarSelect: () => { return (
            <div className={"custom-toolbar-select"}>
                <Tooltip title={"Edit Selected"}>
                <IconButton  onClick={() => handleSelectClick("Edit")}>
                    <EditSharpIcon  />
                </IconButton>
                </Tooltip>
                <Tooltip title={"Delete Selected"}>
                <IconButton  onClick={() => handleSelectClick( "Delete")}>
                    <DeleteIcon  />
                </IconButton>
                </Tooltip>
            </div>
          )}
    };
    
    return (
        <React.Fragment >
            <MUIDataTable title={props.template.label} data={rates} columns={props.template.columns} options={options} />
            {formOpen && <AddNew open={formOpen} preData={dataToPass} openType={openType} onClose={handleFormClose} handleFormSubmit ={(data, openType) => handleFormSubmit(data, openType) } template={props.template} />}
        </React.Fragment>
    )
}
