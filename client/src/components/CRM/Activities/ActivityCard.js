import React from 'react'
import { Paper, Grid, Avatar, makeStyles } from '@material-ui/core'

const styles = makeStyles(theme => ({
    body:{
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }

}))

export default function ActivityCard(props) {
    const classes = styles();


    return (
        <div>
            <Paper elevation={2} className={classes.body}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar >AG</Avatar>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid container justify="space-between">
                            <Grid item >
                                { props.data.type +" "}{props.data.details}
                            </Grid>
                            <Grid item>
                                { props.data.timestamp }
                            </Grid>
                        </Grid>
                        
                        <Grid container>
                            <Grid item>
                                asd
                            </Grid>
                            <Grid item>
                                asd
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Paper>
            
        </div>
    )
}
