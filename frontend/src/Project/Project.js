import './Project.css'

import React from "react";
import Task from '../Task/Task'
import { Container, Row, Col, FormText } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
class Project extends React.Component {


    testArr =
        [
            {
                "id": "1",
                "firstName": "John",
                "lastName": "Doe"
            },
            {
                "id": "2",
                "firstName": "Anna",
                "lastName": "Smith"
            },
            {
                "id": "3",
                "firstName": "Peter",
                "lastName": "Jones"
            }
        ];
    testArr2 =
        [
            { "id": "4", "firstName": "John", "lastName": "Doe" },
            { "id": "5", "firstName": "Anna", "lastName": "Smith" },
            { "id": "6", "firstName": "Peter", "lastName": "Jones" }
        ];

    constructor(props) {
        super(props);
        this.state = {
            new_tasks: this.testArr,
            working_tasks: this.testArr2
        }
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this)
    }

    handleOnDragEnd(result) {
        // debugger
        if (!result.destination) return;

        //TODO: Add Logic behind adding and removing elements
        // result = input & output
        // result.destination si result.source


        // const items = Array.from(this.testArr);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);

        this.setState({
            // new_tasks: this.state.new_tasks.concat(result.source),
            working_tasks: this.state.working_tasks.splice(result.source.index,1)
        });
    }

    render() {
        return (
            <Container>
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <Row>
                        <Col md={{ size: 4, offset: 5 }} className="column">
                            <div className="title">
                                New Tasks
                            </div>
                            <Droppable droppableId="new_tasks">
                                {(provided) => (
                                    <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.new_tasks.map(({ id, firstName, lastName }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <Task apiArg={id}></Task>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                        )}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </Col>
                        <Col md={{ size: 4, offset: 5 }} className="column">
                            <div className="title">
                                Working
                            </div>
                            <Droppable droppableId="workings_tasks">
                                {(provided) => (
                                    <ul className="working_tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.working_tasks.map(({ id, firstName, lastName }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <Task apirArg={id}></Task>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                        )}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </Col>
                        {/* <Col md={{ size: 4, offset: 5 }} className="column">
                            <div className="title">
                                Done
                            </div>
                            <Task apiArg="5"></Task>
                            <Task apiArg="5"></Task>
                            <Task apiArg="5"></Task>
                        </Col> */}
                    </Row>
                </DragDropContext>
            </Container>
        )

    }


}

export default Project;