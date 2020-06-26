import React, { Component } from 'react';
import axios from 'axios';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';


class App extends Component {
  state = {
    tasks: []
  }

  componentWillMount() {
    axios.get('http://127.0.0.1:8000/chronos/',{
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    
    }).then((response) => {
      this.setState({
        tasks: response.data
      })
    });
  }

  
  render() {
    let tasks = this.state.tasks.map((task) => {
      return(
      <Card>
          <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      )  
    });
    console.log("tasks");
    return (
      <div className="App container">
        { tasks }
      </div>
    );
  }
}

export default App;
