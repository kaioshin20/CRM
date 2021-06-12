import React, { Component } from 'react'
// import { initialData } from './initial-data'
import styled from 'styled-components'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
    display: flex;
`;
export class DragnDrop extends Component {
    // state = initialData
    state = this.props.data
    
    onDragEnd = (result) => {
        
        document.body.style.color ='inherit'

        const { destination, source, draggableId } = result;
        if(!destination){
            return ;
        }
        
        if(destination.droppableId == source.droppableId &&
            destination.index === source.index
        ){
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start===finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            this.setState(newState);
            return;
        }


        //Moving from one list to another
        const startTaskIds =Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };
        // console.log(draggableId, newFinish.id)

        const newState = {
            ...this.state,
            columns:{
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        
        this.props.updateStage(draggableId, newFinish.id)

        this.setState(newState);
        return;
    }
    // componentWillMount(){
    //     console.log(this.state)
    // }
    componentWillMount(){
        console.log(this.props.data)
    }
    render() {
        return (
        
        <DragDropContext onDragEnd={this.onDragEnd} >
            <Container>
                {   this.props.loading && "status: Still Loading"
                }
                {   !this.props.loading &&
                    this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks.filter(task => { return task._id==taskId })[0]);
                        // console.log(tasks)
                        return <Column type={this.props.type} key={column.id} column={column} tasks={tasks} />
                    })
                }
            </Container>
        </DragDropContext> )
        
    }
}



export default DragnDrop
