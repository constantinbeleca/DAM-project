import './Project.css'

import React from "react";
import Task from '../Task/Task'
import { Container, Row,Col, FormText} from "react-bootstrap";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

class Project extends React.Component{

    testArr = [1,2,3,4,5]

    constructor(props) {
        super(props);
        this.state = {
            new_tickets: [],
            in_progress_tickets: [],
            done_tickets: []
        }
    }

    render() {
        return(
            <Container>
                <DragDropContext>
                    <Row>
                        <Col md={{size:4, offset:5}} className="column">
                            <div className="title">
                                New Tasks
                            </div>
                            <Droppable droppableId="new_tasks">
                                {(provided) => (
                                    <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.testArr.map()}
                                    </ul>
                                )}
                            </Droppable>

                        </Col>
                        <Col md={{size:4, offset:5}} className="column">
                            <div className="title">
                                Working
                            </div>
                            <Task apiArg="5"></Task>
                            <Task apiArg="5"></Task>
                            <Task apiArg="5"></Task>
                        </Col>
                        <Col md={{size:4, offset:5}} className="column">
                            <div className="title">
                                Done
                            </div>
                            <Task apiArg="5"></Task>
                            <Task apiArg="5"></Task>
                            <Task apiArg="5"></Task>
                        </Col>
                    </Row>
                </DragDropContext>
            </Container>
        )

    }
}

export default Project;