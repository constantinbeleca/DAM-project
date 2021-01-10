import './Task.css';

import React from 'react';
import {Button, Card} from 'react-bootstrap';

class Task extends React.Component {
    apiArg;
    constructor(props) {
        super(props);
        this.state = {
            showDescription: false
        };
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://jsonplaceholder.typicode.com/todos/"+ this.props.apiArg; // site that doesn’t send Access-Control-*
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({result:data})
            })
            .catch(console.log)
    }

    toggle() {
        this.setState({
            showDescription: this.state.showDescription ^ true
        })
    }

    render() {
        return(
            <Card bg="info" className="task-body">
                <Card.Body>
                    <Card.Title>Test Title Card</Card.Title>
                    <Button onClick={this.toggle}>Short description</Button>
                    <Card.Text>
                        {this.state.showDescription ? (this.state.result['title']) : ""}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default Task;