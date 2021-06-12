import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd';
import { Paper } from '@material-ui/core';

const Container = styled.div`
    margin: 8px;
    border:1px solid lightgrey;
    border-radius: 2px;
    min-width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    border-bottom: 1px solid lightgrey;
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;
const TotalBox = styled.h6`
    padding: 8px;
    border-top: 1px solid lightgrey;
    // border-bottom: 1px solid lightgrey;
`;




export default class Column extends React.Component {
    
    render() {
        return (
            <Container>

                    <Title> { this.props.column.title } </Title>
                    <Droppable droppableId={this.props.column.id}>
                        { (provided, snapshot) => (
                            <TaskList 
                                ref={provided.innerRef} {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >    
                            {/* {console.log(this.props.tasks)} */}
                                { this.props.tasks.map((task, index) => (
                                    <Task type={this.props.type} key={task._id} index={index} task={task} />
                                ))}
                                {provided.placeholder}
                            </TaskList>

                        )}

                    </Droppable>
                    <TotalBox>Total: {this.props.tasks.length}</TotalBox>
            </Container>
        ) 
    }
}
