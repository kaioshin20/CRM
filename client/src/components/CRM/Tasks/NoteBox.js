import React, { useState } from 'react'
import {withStyles, makeStyles, useTheme, fade} from '@material-ui/core/styles'
import { Paper, Grid, Typography, Tooltip, Avatar, IconButton } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LaunchIcon from '@material-ui/icons/Launch';
import Moment from 'react-moment';


const styles = makeStyles(theme => ({
    notePaper:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    }

}))

const NoteBox = (props) => {
    const classes = styles();

    const { note } = props
    return (
        <Paper variant="outlined" className={classes.dealPaper}>
            <Grid container justify="space-between" style={{marginBottom: "10px"}}>
                <Grid item >
                    <Typography variant="subtitle2"  align="left">
                        Note | created
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="subtitle2"  align="left">
                        Created on: <Moment format=" MMM DD, YYYY">{ note.timestamp }</Moment>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <Grid item xs={12} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Typography variant="subtitle1"  align="left">
                                Description: { note.note }
                            </Typography>               
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                <AvatarGroup max={4}>
                    <Tooltip title={ data.contact.fname + " " + data.contact.lname  } arrow>
                        <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                    </Tooltip>
                    <Tooltip title={data.company.name} arrow>
                        <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                    </Tooltip>
                </AvatarGroup>
                </Grid> */}
            </Grid>
        </Paper>
    )
}

export default NoteBox
