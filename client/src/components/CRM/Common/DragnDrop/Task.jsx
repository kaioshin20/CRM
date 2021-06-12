import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Paper, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles'
import Moment from 'react-moment';
import CreateDealModal from '../../Deals/CreateDealModal';
import CreateTicketModal from '../../Tickets/CreateTicketModal';

const Container = styled.div`
    // border: 1px solid lightgrey;
    border-radius: 2px;
    // padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`
const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;
const styles = theme => ({
    dealCard:{
        padding: theme.spacing(2)
    }
})

class Task extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            dealOpen: false,
            ticketOpen: false
        }
    }

    handleTaskClick = () => {
        console.log("Clicked handle")
        if(this.props.type == "deals"){
            this.setState({
                ...this.state,
                dealOpen : true    
            })
        }
        else if(this.props.type == "tickets"){
            this.setState({
                ...this.state,
                ticketOpen : true    
            })
        }
    }
    handleClose = () => {
        if(this.props.type == "deals"){
            this.setState({
                ...this.state,
                dealOpen : false    
            })
        }
        else if(this.props.type == "tickets"){
            this.setState({
                ...this.state,
                ticketOpen : false    
            })
        }
    }
    


    render() {
        const {classes} = this.props
        return (
            <Draggable draggableId={this.props.task._id} index={this.props.index}>
                {
                    (provided, snapshot) => (
                        <Container
                            { ...provided.draggableProps }
                            // { ...provided.dragHandleProps }
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            > 
                            <Paper elevation={1} className={classes.dealCard}>
                                <Handle { ...provided.dragHandleProps} onClick={() => this.handleTaskClick() } />
                                <Grid container spacing={1}   direction='column'>
                                    <Grid item>
                                        <Grid container spacing={2} justify="flex-start">
                                            <Grid item>
                                                { this.props.type == "deals"  && "Deal Name: "}
                                                { this.props.type == "tickets"  && "Ticket Name: "} 
                                            </Grid>
                                            <Grid item>
                                                { this.props.type == "deals" && <Link to={{pathname:'/crm/deal/id/', state: this.props.task._id}} > { this.props.task.name } </Link>}
                                                { this.props.type == "tickets"  &&  this.props.task.name } 
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2} justify="flex-start">
                                            <Grid item>
                                            { this.props.type == "deals"  && "Amount: "}
                                            { this.props.type == "tickets"  && "Source: "} 
                                            </Grid>
                                            <Grid item>
                                            { this.props.type == "deals"  && this.props.task.amount }
                                            { this.props.type == "tickets"  && this.props.task.source}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2} justify="flex-start">
                                            <Grid item>
                                            { this.props.type == "deals"  && "Close Date: "}
                                            { this.props.type == "tickets"  && "Created on: "} 
                                            </Grid>
                                            <Grid item>
                                            { this.props.type == "deals"  && <Moment format="MMM DD, YYYY">{ this.props.task.closeDate}</Moment> }
                                            { this.props.type == "tickets"  && <Moment format="MMM DD, YYYY">{ this.props.task.timestamp}</Moment> } 
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

        
                            </Paper>
                            {/* Modal */}
                                { this.state.dealOpen && <CreateDealModal open={this.state.dealOpen} type="view" data={this.props.task} onClose={this.handleClose} />}
                                { this.state.ticketOpen && <CreateTicketModal open={this.state.ticketOpen} type="view" data={this.props.task} onClose={this.handleClose} />}
                            {/* Modal Over */}
                        </Container>
                    )
                }

            </Draggable>
        )
    }
}

export default withStyles(styles)(Task)