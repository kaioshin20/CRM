import React, { useCallback } from "react";
import ReactDOM from "react-dom";
// import { useDropzone } from "react-dropzone";
import { DropzoneArea, DropzoneAreaBase } from 'material-ui-dropzone';
// import excelToJson from 'convert-excel-to-json';
// import fs from 'fs';
import csv from "csv";
import { createStyles, makeStyles } from '@material-ui/core/styles';
// const excelToJson = require('convert-excel-to-json');
// var fs = require('fs');
import XLSX from 'xlsx'
import { TYPE_ICD_Rates, renderArrayToJSON } from "./ExcelTemplates";


// import "./styles.css";

const useStyles = makeStyles(theme => createStyles({
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },
}));

export default function ExcelUpload(props) {
  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0], acceptedFiles[0].name.indexOf(".xlsx") > -1)
	props.setFileObjects(acceptedFiles)
	
    if (acceptedFiles[0].name.indexOf(".xlsx") > -1) {

      var f = acceptedFiles[0]
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        console.log("Parsed XLSX data: ", workbook)
        var csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]])
        console.log("Parsed XLSX rows: ", csvData)
        csv.parse(csvData, (err, data) => {
          var newData = renderArrayToJSON(data, TYPE_ICD_Rates)
          console.log("Parsed CSV data: ", data, newData);
          props.setData(newData)	
        });

        /* DO SOMETHING WITH workbook HERE */
      };
      reader.readAsArrayBuffer(f);
    }
    else if (acceptedFiles[0].name.indexOf(".csv") > -1) {
      	const reader = new FileReader();
      	reader.onabort = () => console.log("file reading was aborted");
      	reader.onerror = () => console.log("file reading failed");
      	reader.onload = () => {
          // Parse CSV file
          console.log(reader.result)
          csv.parse(reader.result, (err, data) => {
            var newData = renderArrayToJSON(data, TYPE_ICD_Rates)
            console.log("Parsed CSV data: ", newData);
            props.setData(newData)	
          });
        };
        acceptedFiles.forEach(file => reader.readAsBinaryString(file));
    }


  };

  const classes = useStyles();

  return (
    <DropzoneAreaBase
      acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
      clearOnUnmount={false}
      initialFiles={props.fileObjects}
      filesLimit={1}
      // showPreviews={true}
      // showPreviewsInDropzone={true}
      // useChipsForPreview
      // previewGridProps={{container: { spacing: 1, direction: 'row' }}}
      // previewChipProps={{classes: { root: classes.previewChip } }}
      previewText="Selected files"
      onAdd={(fileObjs) => console.log('Added Files:', fileObjs)}
      onDelete={(fileObj) => console.log('Removed File:', fileObj)}
      onDrop={(files) => onDrop(files)}
      onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
    />
  );
}



