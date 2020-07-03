import React, { Component } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import  '../resources/styles/task.css';

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

  onCardClick(event){
    this.props.onClick(this.props.code);
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
      <Card onClick={(event)=>this.onCardClick(event)} className="task" style={{'maxWidth': maxWidth}}>
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
