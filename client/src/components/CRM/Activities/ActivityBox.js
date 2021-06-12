import React from 'react'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const styles = makeStyles(theme => ({
    dealPaper:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    }
}))



const ActivityBox = (props) => {
    const classes = styles();
    const { activity, index } = props


    return (
        <Paper variant="outlined" className={classes.dealPaper}>
            <Grid container>
                <Grid item xs={12} >
                    <Grid container direction="column">
                            <Typography variant="subtitle2"  align={ index %2 == 0 ? "left" : "right" }>
                                { activity.type } Activity | { activity.subdetail}
                            </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid container spacing={3}>
                        { activity.subdetails && activity.subdetails.split(":;").map(subdetail => {
                            return <Grid item xs={8} >
                                    <Typography variant="subtitle1"  align={ index %2 == 0 ? "left" : "right" }>
                                        { activity.details.split(":;").map(ele => {
                                            console.log(activity.details)
                                            var x = ele.split("::")
                                            var type = x[0]
                                            var value = x[1]
                                            if(type == "Date"){
                                               return <Moment format="DD-MM-YYYY">{ value }</Moment>
                                            }
                                            else if(type === 'Link'){
                                                console.log("link")
                                                return (<Link to={{pathname:'/crm/'}} > owner </Link>)
                                            }
                                            else if( type === 'Text'){
                                                return value
                                            }
                                        }).join(" ") }
                                        <Moment duration="2018-11-1T5:59-0500"
                                        date="2018-11-1T12:59-0500"
                                />
                                    </Typography>               
                                </Grid>
                        }) }
                        <Grid item xs={4} >
                            <Typography variant="subtitle1"  align={ index %2 == 0 ? "left" : "right" }>
                                Owner: { activity.ownerId }
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





        // <Paper elevation={3} className={classes.paper}>
        //     <Grid container>

        //         <Grid item xs={12}>
        //             <Typography variant="h6" component="h1" align={ index %2 == 0 ? "left" : "right" }>
        //                 {activity.type} {activity.details}
        //             </Typography>
        //         </Grid>
        //         <Grid item xs={12}>
        //             <Grid container spacing={4}>
        //                 <Grid item>
        //                     <Typography align={ index %2 == 0 ? "left" : "right" }> {activity} </Typography>
        //                 </Grid>
        //                 <Grid item>
        //                     <Typography align={ index %2 == 0 ? "left" : "right" }>{activity.subdetails}</Typography>
        //                 </Grid>
        //             </Grid>

        //         </Grid>
        //     </Grid>
        // </Paper>
    )
}

export default ActivityBox
