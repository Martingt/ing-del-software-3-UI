import React, { Component } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button, Media,
} from 'reactstrap';
import plusImage from '../resources/images/plus.png';
import taskStyle from '../resources/styles/tasks.js';
class CreateTask extends Component {


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
      <Card style={{
        ...taskStyle.task,
        alignItems:'center',
        justifyContent:'center',
        'backgroundColor':"#fafafa",
        borderColor:'#f0f0f0',
        borderWidth:2
      }}>
              <img src={plusImage} height={25} alt="+" />
              <CardText style={{fontSize:'0.9rem', marginTop:10}}>
              Agregar Tarea
              </CardText>
      </Card>
    )

  }
}

export default CreateTask;
