import React, { Component } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import taskStyle from '../resources/styles/tasks.js';

class Task extends Component {


  constructor(props){
    super();
    this.state = {
      title: props.title,
      description: props.description,
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    }
  }

  handleWindowResize(){
    this.setState({
      winWidth: window.innerWidth,
      winHeight: window.innerheight});
  }

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize.bind(this));
  }

  render(){

    let maxWidth = (this.state.winWidth < 800)? '100%':this.state.winWidth*0.2;
    return(
      <Card style={{...taskStyle.task, 'maxWidth': maxWidth}}>
          <CardBody>
            <CardTitle>{this.state.title}</CardTitle>
            <div style={{height:"1px", backgroundColor:"#eee", width:"100%"}}></div>
            <CardText>{this.state.description}</CardText>
          </CardBody>
      </Card>
    )

  }
}

export default Task;
