import { FormControlLabel, InputBase } from "@material-ui/core"
import { TextField } from 'formik-material-ui';
//import { DatePicker, KeyboardDatePicker } from 'formik-material-ui-pickers';
import React from 'react'
import * as Yup from 'yup';

export const TYPE_ICD_Rates = "ICD_Rates"
export const TYPE_FCL_Rates = "FCL_Rates"


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
    name: "ICD_Rates",
    columnPosition: 1,
    dataPosition: 2,
    separation: ',',
    createSchema: Yup.object().shape({
        ICDName: Yup.string().required("Required"),
        portOfLoading: Yup.string().required("Required"),
        equipmentSize: Yup.string().required("Required"),
        effectiveFromDate: Yup.string().required("Required"),
        effectiveToDate: Yup.string().required("Required"),
        currency: Yup.string().required("Required"),
        WTSlab: Yup.string().required("Required"),
        railFreightINR: Yup.string().required("Required"),
        ICDHandlingFactoryINR: Yup.string().required("Required"),
        ICDHandlingWarehouseINR: Yup.string().required("Required"),
        GST: Yup.string().required("Required"),
    }),
    multiEditSchema: Yup.object().shape({
          GST: Yup.string().required("Required"),
    })

}

export const FCL_Rates = {
    columns: [
        {
            label: "Carrier",
            name: "Carrier",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Rate Type",
            name: "RateType",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Contract Number",
            name: "ContractNumber",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Service",
            name: "Service",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Effective From",
            name: "EffectiveFrom",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Expiry Date",
            name: "ExpiryDate",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Customer",
            name: "Customer",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Source",
            name: "Source",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Agent / Office",
            name: "AgentOffice",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Type Of Move",
            name: "TypeOfMove",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Shipment Type",
            name: "ShipmentType",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Commodities",
            name: "Commodities",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Notes",
            name: "Notes",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Pol",
            name: "Pol",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Transhipment Port",
            name: "TranshipmentPort",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Pod",
            name: "Pod",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Transit Time Min",
            name: "TransitTimeMin",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Transit Time Max",
            name: "TransitTimeMax",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Free Time",
            name: "FreeTime",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Container Type",
            name: "ContainerType",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Maxpay Load",
            name: "MaxpayLoad",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Maxpay Load Unit",
            name: "MaxpayLoadUnit",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Freight Currency",
            name: "FreightCurrency",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Base Freight",
            name: "BaseFreight",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "Selling Freight",
            name: "SellingFreight",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "CSF Buying",
            name: "CsfBuying",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "CSF Selling",
            name: "CsfSelling",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "THD Buying",
            name: "ThdBuying",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },
        {
            label: "THD Selling",
            name: "ThdSelling",
            mandatory: true,
            type: String,
            component: TextField,
            options: {
                filter: true,
            },
            multipleEditAllowed: false
        },

    ],
    label: "FCL Buy Rates",
    name: "FCL_Rates",
    columnPosition: 0,
    dataPosition: 1,
    separation: ',',
    createSchema: Yup.object().shape({
        Carrier: Yup.string().required("Required"),
        RateType: Yup.string().required("Required"),
        ContractNumber: Yup.string().required("Required"),
        Service: Yup.string().required("Required"),
        EffectiveFrom: Yup.string().required("Required"),
        ExpiryDate: Yup.string().required("Required"),
        Customer: Yup.string().required("Required"),
        Source: Yup.string().required("Required"),
        AgentOffice: Yup.string().required("Required"),
        TypeOfMove: Yup.string().required("Required"),
        ShipmentType: Yup.string().required("Required"),
        Commodities: Yup.string().required("Required"),
        Notes: Yup.string().required("Required"),
        Pol: Yup.string().required("Required"),
        TranshipmentPort: Yup.string().required("Required"),
        Pod: Yup.string().required("Required"),
        TransitTimeMin: Yup.string().required("Required"),
        TransitTimeMax: Yup.string().required("Required"),
        FreeTime: Yup.string().required("Required"),
        ContainerType: Yup.string().required("Required"),
        MaxpayLoad: Yup.string().required("Required"),
        MaxpayLoadUnit: Yup.string().required("Required"),
        FreightCurrency: Yup.string().required("Required"),
        BaseFreight: Yup.string().required("Required"),
        SellingFreight: Yup.string().required("Required"),
        CsfBuying: Yup.string().required("Required"),
        CsfSelling: Yup.string().required("Required"),
        ThdBuying: Yup.string().required("Required"),
        ThdSelling: Yup.string().required("Required"),
    }),
    multiEditSchema: Yup.object().shape({
          GST: Yup.string().required("Required"),
    })

}

export const renderArrayToJSON = (arr, template) => {
    console.log(template)
    var columns = arr[template.columnPosition]
    console.log(arr, columns)
    
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

    errorList = errorList.concat(/*Excel_Columns_Validation(columns, template),*/ Excel_Data_Validation(json, template))
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
