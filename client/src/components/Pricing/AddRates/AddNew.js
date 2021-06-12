import React, { useEffect, useState } from 'react';
// import { useField, Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, FormHelperText } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
// import { TextField } from 'formik-material-ui';

import * as Yup from 'yup';
import { ICD_Rates } from './ExcelTemplates';

// interface Values {
//   email: string;
//   password: string;
// }

const createSchema = Yup.object().shape({
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
});

const multiEditSchema = Yup.object().shape({
	GST: Yup.string().required("Required"),
});



export default function AddNew(props) {
  //  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState((props.openType === 2 || props.openType === 1) ? {		// 0-create, 1-view, 2-edit, 3-multiple-edit
								...props.preData  
							} : {   
								// name: "",
								// modifiedTitleLabel: "",
								// location: "",
								// age: "",
								// salary: "",
								})

  const handleSubmit = () => {
    props.handleFormSubmit(data, props.openType)
    props.onClose();
    console.log(data)
  }

  const fields = props.template.columns
  // [
  //   [{
  //     name: "name",
  //     label: "Name",
  //     component: TextField,
	//   type: "string",
	//   multipleEdit: true
  //   },
  //   {
  //     name: "modifiedTitleLabel",
  //     label: "Modified Title Label",
  //     component: TextField,
	//   type: "string",
	//   multipleEdit: false
  //   }],
  //   {
  //     name: "location",
  //     label: "Location",
  //     component: TextField,
	//   type: "string",
	//   multipleEdit: false
  //   },
  //   [{
  //     name: "age",
  //     label: "Age",
  //     component: TextField,
	//   type: "number",
	//   multipleEdit: false
  //   },
  //   {
  //     name: "salary",
  //     label: "Salary",
  //     type: "string",
	//   component: TextField,
	//   multipleEdit: false
  //   }]

  // ]

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })

  }

  useEffect(() => {
    console.log(props)
  }, [])
  return (
    <div>

      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent style={{marginBottom: "15px"}}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
           </DialogContentText>
          <Formik
            initialValues={
              (props.openType === 2 || props.openType === 1) ? {
                ...props.preData
                // name: props.preData[0],
                // modifiedTitleLabel: props.preData[1],
                // location: props.preData[2],
                // age: props.preData[3],
                // salary: props.preData[4],
              } : {   // 0-create, 1-view, 2-edit, 3-multiple-edit
                  
                }
            }
            validationSchema={(props.openType === 3 ) ? props.template.multiEditSchema : props.template.createSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                console.log(values)
                props.handleFormSubmit(values, props.openType)
                props.onClose();
                // alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      {
                        fields.map((field, index) => {
                          return ((props.openType === 3 && field.multipleEditAllowed) || (props.openType !== 3) ? <Grid key={field.name} item xs={12} md={6}>
                              <Field
                                component={field.component}
                                name={field.name}
                                // type={field.type}
                                label={field.label}
                                // InputProps={{fullwidth: true}}
                              // onChange={(e) => {onChange(e)}}
                              />   
                              </Grid> : null)   


                          //    console.log(Array.isArray(field),!Array.isArray(field) && typeof field === "object")
                          // if (!Array.isArray(field) && typeof field === "object") {
                            // console.log(data[field.name])
                            
                            
                              // <br />
                              {/* <TextField id="standard-basic" name={field.name} defaultValue={ data[field.name] } label={field.label} onChange={(e) => { onChange(e)}} />
                                                <FormHelperText id="standard-weight-helper-text">{field.validate(data[field.name])}</FormHelperText> */}
                            
                          
                        })
                      }
                    </Grid>

                  </Grid>
                </Grid>
                <br />
                {isSubmitting && <LinearProgress />}
                <br />
				
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
				  onClick={submitForm}
				  style={{marginRight: "10px"}}
                >
                  Submit
				</Button>
				<Button onClick={props.onClose} color="primary">
					Cancel
				</Button>
              </Form>
            )}
          </Formik>

        </DialogContent>
      </Dialog>
    </div>
  );
}
