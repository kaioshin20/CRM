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
import { TextField } from 'formik-material-ui';

import * as Yup from 'yup';

// interface Values {
//   email: string;
//   password: string;
// }

const createSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  modifiedTitleLabel: Yup.string()
    .required("Required"),
  location: Yup.string()
    .required("Required"),
  age: Yup.number("Only Numer")
    .required("Required"),
  salary: Yup.string()
    .required("Required")
});

const multiEditSchema = Yup.object().shape({
	name: Yup.string()
	  .required("Required")
  });



export default function AddNew(props) {
  //  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState((props.openType === 2 || props.openType === 1) ? {		// 0-create, 1-view, 2-edit, 3-multiple-edit
								name: props.preData[0],
								modifiedTitleLabel: props.preData[1],
								location: props.preData[2],
								age: props.preData[3],
								salary: props.preData[4],
							} : {   
								name: "",
								modifiedTitleLabel: "",
								location: "",
								age: "",
								salary: "",
								})

  const handleSubmit = () => {
    props.handleFormSubmit(data, props.openType)
    props.onClose();
    console.log(data)
  }

  const fields = [
    [{
      name: "name",
      label: "Name",
      component: TextField,
	  type: "string",
	  multipleEdit: true
    },
    {
      name: "modifiedTitleLabel",
      label: "Modified Title Label",
      component: TextField,
	  type: "string",
	  multipleEdit: false
    }],
    {
      name: "location",
      label: "Location",
      component: TextField,
	  type: "string",
	  multipleEdit: false
    },
    [{
      name: "age",
      label: "Age",
      component: TextField,
	  type: "number",
	  multipleEdit: false
    },
    {
      name: "salary",
      label: "Salary",
      type: "string",
	  component: TextField,
	  multipleEdit: false
    }]

  ]

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
                name: props.preData[0],
                modifiedTitleLabel: props.preData[1],
                location: props.preData[2],
                age: props.preData[3],
                salary: props.preData[4],
              } : {   // 0-create, 1-view, 2-edit, 3-multiple-edit
                  name: "",
                  modifiedTitleLabel: "",
                  location: "",
                  age: "",
                  salary: "",
                }
            }
            validationSchema={(props.openType === 3 ) ? multiEditSchema : createSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                props.handleFormSubmit(values, props.openType)
                props.onClose();
                console.log(values)
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
                          //    console.log(Array.isArray(field),!Array.isArray(field) && typeof field === "object")
                          if (Array.isArray(field)) {
                            return field.map((ele, index1) => {
                              // console.log(data[ele.name])
                              return ((props.openType === 3 && ele.multipleEdit) || (props.openType !== 3) ? <Grid key={ele.name} item xs={12} md={6}>
                                <Field
                                  component={ele.component}
                                  name={ele.name}
                                  type={ele.type}
                                  label={ele.label}
                                // onChange={(e) => {onChange(e)}}
                                />
                                {/* <TextField id="standard-basic" name={ele.name} defaultValue={ data[ele.name] } label={ele.label} onChange={(e) => {onChange(e)}} />
                                                <FormHelperText id="standard-weight-helper-text">{ele.validate(data[ele.name])}</FormHelperText> */}
                              </Grid> : null)

                            })
                          }

                          else if (!Array.isArray(field) && typeof field === "object") {
                            // console.log(data[field.name])
                            return ((props.openType === 3 && field.multipleEdit) || (props.openType !== 3) ? <Grid key={field.name} item xs={12} >
                              <Field
                                component={field.component}
                                name={field.name}
                                type={field.type}
								label={field.label}
                              // onChange={(e) => {onChange(e)}}
                              />
                              <br />
                              {/* <TextField id="standard-basic" name={field.name} defaultValue={ data[field.name] } label={field.label} onChange={(e) => { onChange(e)}} />
                                                <FormHelperText id="standard-weight-helper-text">{field.validate(data[field.name])}</FormHelperText> */}
                            </Grid> : null)
                          }
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
