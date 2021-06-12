import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import { FormControlLabel, TextField, InputBase, Tooltip, IconButton, Button } from "@material-ui/core";

import clsx from 'clsx';
import AddIcon from "@material-ui/icons/Add";
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import AddNew from "./AddNew";
import DeleteIcon from "@material-ui/icons/Delete";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { ICD_Rates, Excel_Data_Validation } from "./ExcelTemplates";


const customStyles = theme => ({
	BusinessAnalystRow: {
	  '& td': { backgroundColor: '#FAA' },
	},
	GreyLine: {
	  '& td': { backgroundColor: theme.palette.grey[200] },
	},
	NameCell: {
	  fontWeight: 900,
	},
});


class EditExcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		data: this.props.data.json,
		errors: this.props.data.errorList,
		formOpen: false,
		openType:-1,  // 0-create, 1-view, 2-edit, 3-multiple-edit
		selectedRows: [],
		dataToPass: undefined
    }
    this.componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data
        })
		console.log(nextProps)
    }
}
handleSave = () => {
    this.props.setData(this.state.data)
    console.log(this.state.data)
}
handleClick = () => {
    console.log("clicked on icon!");
  }


handleFormOpen = (selectedRows, openType, dataToPass) => {
	this.setState({
		...this.state,
		openType: openType,
		dataToPass: dataToPass,
		selectedRows: selectedRows,
		formOpen: true,

	});
};
handleFormClose = () => {
	this.setState({
		...this.state,
		formOpen: false,
		openType: -1,
		dataToPass: undefined,
		selectedRows: [],
	});
  };

  
handleFormSubmit = (newData, openType) => {
	console.log(newData, openType)
	let tempData = this.state.data
	if(openType === 0){
		// tempData.push([newData.name, newData.modifiedTitleLabel, newData.location, newData.age, newData.salary, ""])
		tempData.push(newData)
		console.log(newData, tempData)
		this.setState({
			...this.state,
			data: tempData
		})
	}
	else if(openType === 2){
		Object.keys(newData).map(key => {
			tempData[this.state.selectedRows[0]][key] = newData[key]
		})
		// tempData[this.state.selectedRows[0]] = [newData.name, newData.modifiedTitleLabel, newData.location, newData.age, newData.salary, ""]
		console.log(tempData)
		this.setState({
			...this.state,
			data: tempData
		})
	}
	else if(openType === 3){
		this.state.selectedRows.map(ele => {
			Object.keys(newData).map(key => {
				tempData[ele][key] = newData[key]
			})
			// tempData[ele] = [(newData.name != "" ? newData.name : tempData[ele][0] ), (newData.modifiedTitleLabel != "" ? newData.modifiedTitleLabel : tempData[ele][1]), (newData.location != "" ? newData.location : tempData[ele][2]), (newData.age != "" ? newData.age : tempData[ele][3]), (newData.salary != "" ? newData.salary : tempData[ele][4]), ""]
		})
		console.log(tempData)
		this.setState({
			...this.state,
			data: tempData
		})
	}
	this.handleSave()

  }
  handleSelectClick = async (type) => {
	console.log("click! current selected rows", this.state.selectedRows);

	if(type === "delete"){
    let tempData = this.state.data.filter((item,index) => {
						return !(this.state.selectedRows.includes(index))
					})
		
		console.log(tempData)
		this.setState({
			...this.state,
			data: tempData
		})
	}
	else if(type === "edit"){
		if(this.state.selectedRows.length === 1){
			console.log(this.state.data[this.state.selectedRows[0]])
			await this.handleFormOpen([this.state.selectedRows[0]], 2, this.state.data[this.state.selectedRows[0]])
			
		}
		else if(this.state.selectedRows.length > 1){
			await this.handleFormOpen(this.state.selectedRows, 3, undefined)
		}

	}
  };

  render() {
	// console.log(this.props.data)
	let errors = this.state.errors
	const checkErrorInCell = (i, j, value) => {
		var bgColor;
		// if(value !=="")
	
		//    return 

		var error = errors.filter(error => { return error.position[0] == i && error.position[1] == j })[0]
		bgColor = (( error && value === "") ? `${error.color}` : "transparent")
		// console.log("new cell props", (error ? error.position : ""))



		if(bgColor === "red"){
			var x = {
				backgroundColor: "#ff8d8d47",
				border: "2px solid #f84f4f",
				borderRadius: "5px" 
			}
			return x
		}
		else if(bgColor === "yellow"){
			var x = {
				backgroundColor: "#ffff5d4d",
				border: "2px solid #ffff00",
				borderRadius: "5px"
			}
			return x
		}
		else if(bgColor === "transparent"){
			var x = {}
			// value.props.style.backgroundColor = "transparent"
			// value.props.style.border = "none"
			// value.props.style.borderRadius = "0px"
			return x
		}			
	}
	  
	let columns = this.props.template.columns.map(column => {
		return {
			label: column.label,
            name: column.name,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => (
					// <React.Fragment>
						<FormControlLabel
						control={<InputBase
							value={value}
							// className={classes.margin}
							inputProps={{ 'aria-label': 'naked' }}
							style={{fontSize:"14px"}}
						/>}
						style={
							{
								...checkErrorInCell(tableMeta.rowIndex, tableMeta.columnIndex, value),
								marginRight:"0px", width: "max-content",

							}
						}
						onChange={event => {
							console.log(value, tableMeta, updateValue )
							// var error = errors.filter(error => { return error.position[0] == tableMeta.rowIndex && error.position[1] == tableMeta.columnIndex })[0]
							let tempData = this.state.data
							tempData[tableMeta.rowIndex][tableMeta.columnData.name] = event.target.value
							this.setState({
									...this.state,
									data: tempData
							})
							updateValue(event.target.value)

							var temp_errors = Excel_Data_Validation(tempData, this.props.template)
							this.setState({
								...this.state,
								errors: temp_errors
							})

						}}
						/>
					// </React.Fragment>
				)
            },
		}
	})

	// console.log(columns)
	// [

    //   {
    //     name: "Name",
    //     options: {
    //       filter: true, 
    //       customBodyRender: (value, tableMeta, updateValue) => (
    //         <FormControlLabel
    //         control={<InputBase
    //             value={value}
    //             // className={classes.margin}
    //             inputProps={{ 'aria-label': 'naked' }}
    //             style={{fontSize:"14px"}}
    //           />}
    //           style={{marginRight:"0px"}}
    //           onChange={event => {
    //             console.log(tableMeta)
    //             let tempData = this.state.data
    //             tempData[tableMeta.rowIndex][tableMeta.columnIndex] = event.target.value
    //             this.setState(tempData)
    //             updateValue(event.target.value)
    //           }}
    //         />
    //       )
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
	  filterType: 'dropdown',
	  download: false,
	  print: false,
	  selectableRows: 'multiple',
	  
    //   fixedSelectColumn: true,
      responsive: 'standard',
	  rowsPerPage: 10,
	  onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
		  this.setState({
			  ...this.state,
			  selectedRows : rowsSelected
		  })
		  console.log(currentRowsSelected, allRowsSelected, rowsSelected)
	  },
	  customToolbarSelect: (selectedRows) => { return (
        <div className={"custom-toolbar-select"}>
			<Tooltip title={"Edit Selected"}>
			<IconButton  onClick={() => this.handleSelectClick("edit")}>
				<EditSharpIcon  />
			</IconButton>
			</Tooltip>
			<Tooltip title={"Delete Selected"}>
			<IconButton  onClick={() => this.handleSelectClick( "delete")}>
				<DeleteIcon  />
			</IconButton>
			</Tooltip>
		</div>
      )
    },
      customToolbar: () => {
        return (
			<React.Fragment>
				<Tooltip title={"Add New Entry"}>
				<IconButton  onClick={() => this.handleFormOpen([], 0, undefined)}>
					<AddIcon  />
				</IconButton>
				</Tooltip>
			</React.Fragment>
        );
      }
    };
    
    return (
		<React.Fragment>
            <Button variant="contained" color="primary" onClick={this.handleSave}>
                Save Changes
            </Button>

            <MUIDataTable title={this.props.template.label} data={this.state.data} columns={columns}  options={options}/>

		{this.state.formOpen && <AddNew open={this.state.formOpen} preData={this.state.dataToPass} openType={this.state.openType} onClose={this.handleFormClose} handleFormSubmit ={(data, openType) => this.handleFormSubmit(data, openType) } template={this.props.template} />}
        </React.Fragment>
    );

  }
}

export default withStyles(customStyles)(EditExcel);
// withStyles(customStyles, { name: 'ExampleCard.js' })(Example)