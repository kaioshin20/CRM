import React, { useState } from 'react'
import {makeStyles, fade} from '@material-ui/core/styles'
import { Grid, TextField, Typography, Button, Modal, Fade, Backdrop } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { createContact } from '../../../actions/crmActions'

const styles = makeStyles(theme => ({
    submitBtn:{
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px'
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000', 
           
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}))



const EditContactModal = (props) => {
    const classes = styles();
    const dispatch = useDispatch()
    const [contact, setContact] = useState({});


    const handleEditContact = () =>{
        // dispatch(editContact(contact))
        console.log(contact)
    }

    const setFieldValue = () => e => {
        e.persist();
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={props.open} style={{borderRadius:'10px'}}>
          <div className={classes.modalPaper}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h5" align='center'>
                        Edit Contact
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField id="fname" name="fname" label="First Name" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item>
                                <TextField id="lname" name="lname" label="Last Name" onChange={setFieldValue()} />
                            </Grid>
                        </Grid>
                        <TextField id="mobile" name="mobile" label="Mobile" onChange={setFieldValue()} />
                        <TextField id="email" name="email" label="Email" onChange={setFieldValue()} />
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <TextField id="designation" name="designation" label="Designation" onChange={setFieldValue()} />
                            </Grid>
                            <Grid item >
                            <Grid container spacing={1} alignItems="flex-end">
                              <Grid item>
                                <Typography variant="h6">@</Typography>
                              </Grid>
                              <Grid item>
                                <TextField id="company" name="company" label="Company" onChange={setFieldValue()} />
                              </Grid>
                            </Grid>
                            </Grid>
                        </Grid>
                        <TextField id="domain" name="domain" label="Company Domain" onChange={setFieldValue()} />
                        <TextField id="owner" name="owner" label="Owner" onChange={setFieldValue()} />
                        
                        
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid container justify="flex-end" style={{marginTop: '10px'}}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.submitBtn} onClick={() => handleEditContact()}>
                        Save & Close
                    </Button>
                </Grid>
            </Grid>
        </div>
      </Fade>
    </Modal>
</div>


    )
}

export default EditContactModal
