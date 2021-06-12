import React, { useState } from 'react'
import {withStyles, makeStyles, useTheme, fade} from '@material-ui/core/styles'
import { Paper, Grid, Typography, Tooltip, Avatar, IconButton } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LaunchIcon from '@material-ui/icons/Launch';
import Moment from 'react-moment';
import CreateDealModal from './CreateDealModal';
import { Link } from 'react-router-dom';


const styles = makeStyles(theme => ({
    dealPaper:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    }

}))

const DealBox = (props) => {
    const classes = styles();
    const [ createDealModelOpen, setCreateDealModelOpen] = useState(false);
    const handleCreateDealButton = () => {
        setCreateDealModelOpen(true)
    }

    const handleCreateDealModalClose = () => {
        setCreateDealModelOpen(false)
    }

    const { deal } = props
    return (
            <Paper variant="outlined" className={classes.dealPaper}>
                <Grid container spacing={1} direction='column'>
                    <Grid item xs={12} >
                        <Grid container direction="column">
                            <Grid item xs={12} >
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography variant="h6" align="left">
                                            { deal.name } 
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="primary" aria-label="view deal" component={Link} to= {{pathname:'/crm/deal/id/', state: deal._id}}>
                                            <LaunchIcon fontSize="small" style={{marginLeft:"100%"}} color="action" />
                                        </IconButton>    
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}  style={{alignSelf:"start"}}>
                                <Typography variant="subtitle2" align="left">
                                    Close Date: <Moment format="LLLL">{ deal.closeDate }</Moment>
                                </Typography>        
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Typography variant="subtitle1" align="left">
                                    Amount: { deal.amount }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" align="left">
                                    Stage: { deal.stage }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    {/* <AvatarGroup max={4}>
                        <Tooltip title={ data.contact.fname + " " + data.contact.lname  } arrow>
                            <Avatar alt="Remy Sharp"><PersonIcon /> </Avatar>
                        </Tooltip>
                        <Tooltip title={data.company.name} arrow>
                            <Avatar alt="Travis Howard"><BusinessIcon /> </Avatar>
                        </Tooltip>
                    </AvatarGroup> */}
                    </Grid>
                </Grid>

    {/* Modal */}
        <CreateDealModal open={createDealModelOpen} type="view" data ={deal} onClose={handleCreateDealModalClose} />
    {/* Modal Over */}
            </Paper>
    )
}

export default DealBox
