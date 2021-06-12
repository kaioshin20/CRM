import { FormControlLabel, InputBase } from "@material-ui/core"
import { TextField } from 'formik-material-ui';
//import { DatePicker, KeyboardDatePicker } from 'formik-material-ui-pickers';
import React from 'react'

export const TYPE_ICD_Rates = "ICD_Rates"


export const ICD_Rates ={
    columns: [
        {
            label: "ICD Name",
            name: "ICDName",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
                
            },
            multipleEditAllowed: false

        },
        {
            label: "Port of Loading",
            name: "portOfLoading",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "Equipment Size",
            name: "equipmentSize",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "Effective From Date",
            name: "effectiveFromDate",
            mandatory: true,
            type: Date,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "Effective To Date",
            name: "effectiveToDate",
            mandatory: true,
            type: Date,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "Currency",
            name: "currency",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "WT SLAB",
            name: "WTSlab",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "Rail freight (IN INR)",
            name: "railFreightINR",
            mandatory: true,
            type: Float32Array,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "ICD Handling in INR(FSC)",
            name: "ICDHandlingFactoryINR",
            mandatory: true,
            type: Float32Array,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "ICD Handling in INR(WSC)",
            name: "ICDHandlingWarehouseINR",
            mandatory: true,
            type: Float32Array,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false

        },
        {
            label: "GST (%)",
            name: "GST",
            mandatory: false,
            type: Number,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: true

        },
    ],
    label: "ICD Rail Ramps",
    columnPosition: 1,
    dataPosition: 2,
    separation: ','

}

export const renderArrayToJSON = (arr, type) => {
    var template;

    switch (type) {
        case TYPE_ICD_Rates: {
            template = ICD_Rates
            break;
        }
    }

    var columns = arr.slice(template.columnPosition, template.columnPosition + 1)
    var errorList = []

    let json = arr.slice(template.dataPosition).map((row,i_index) => {
        var newRow = {}
        row.forEach((val, j_index) => {
            newRow[template.columns[j_index].name] = val
            if(template.columns[j_index].type === Date && false){   //check date format
                errorList.push(
                    {
                        validationType: "date",
                        position: [i_index, j_index],
                        message: "Invalid Date format",
                        color: "red",
                        hint : "Change Date Format to dd/mm/yyyy"
                    }
                )
            }
        })
        return newRow
    })

    errorList = errorList.concat(Excel_Columns_Validation(columns, template), Excel_Data_Validation(json, template))
    // errorList.concat()
    console.log(errorList)

    return {json,errorList}
}

export const Excel_Columns_Validation = (columns, template) => {
    var errors = template.columns.map((column, index) => {
        if(columns.indexOf(column.label) === -1){
            console.log(columns.indexOf(column.label) === -1)
            return {
                validation: "columnNotFound",
                position: "column",
                message: "Column "+ column.label + " not found",
                color: "red",
                hint : "Add values for column "+ column.label + " in all rows"
            }
        }
    })
    return errors
}

export const Excel_Data_Validation = (json, template) => {
    var errors = []
    json.map((row, i_index) => {
        Object.keys(row).map((key, j_index) => {
            if(row[key] === undefined || row[key] === ""){
                if(template.columns[j_index].mandatory){
                    // console.log("reached", row[key] === undefined || row[key] === "")
                    errors.push( {
                        position: [i_index, j_index],
                        validationType: "mandatory",
                        message: "This column can't be empty",
                        color: "red",
                        hint : "Please Insert some details"
                    })
                }
                else {
                    errors.push( {
                        position: [i_index, j_index],
                        validationType: "empty",
                        message: "Empty Value",
                        color: "yellow",
                        hint : "Try Inserting some value"
                    })
                }
            }
        })
    })

    console.log(errors)

    return errors
}





















// export const ACME = [
//     {
//         label: "Name",
//         mandatory: true,
//         type: String
//     },
//     {
//         label: "Modified Title Label",
//         mandatory: true,
//         type: String
//     },
//     {
//         label: "Location",
//         mandatory: true,
//         type: String
//     },
//     {
//         label: "age",
//         mandatory: true,
//         type: Number
//     },
//     {
//         label: "Salary",
//         mandatory: true,
//         type: Float32Array
//     },
// ]
