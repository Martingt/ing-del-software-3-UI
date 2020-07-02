import React, { Component } from 'react';
import {
  Card,  CardText, FormGroup, Form, Input, Button
} from 'reactstrap';
import plusImage from '../resources/images/plus.png';
import taskStyle from '../resources/styles/tasks.js';
import CloseButton from './elements/CloseButton.js';
import axios from 'axios';
import Config from '../chronos.config.js';
const currentProfile = Config.currentProfile;

class CreateTask extends Component {


  constructor(props){
    super();
    this.state = {
      title: props.title,
      description: props.description,
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
      taskCreationOpen: false,
      taskForm: {
        title: "",
        description: "",
        state: "To Do"
      },
      taskCreationTried: false,
      creationResult: null
    }
  }

  toggleTaskCreation = () =>{
    this.setState({taskCreationOpen: !this.state.taskCreationOpen});
  }

  handleTitleChange = (event) =>{
    this.setState({taskForm: {...this.state.taskForm, title: event.target.value }});
  }

  handleDescriptionChange = (event) =>{
    this.setState({taskForm: {...this.state.taskForm, description: event.target.value }});
  }

  cancelTaskCreation = () => {
    this.setState({taskForm:{title: "", description:"", state: "To Do"}, taskCreationTried: false});
    this.toggleTaskCreation();
  }

  createTask = () => {
    axios.post(Config[currentProfile].createTask, this.state.taskForm)
    .then((response) => {
      this.setState({
        creationResult: response.data,
        taskCreationTried: true
      })
    });
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

  taskCreatedConfirmation(){
    return (<div style={{flex:1, flexDirection:'column'}}>
      <div style={{flex:1,
        display:'flex',
        justifyContent:'flex-end',
        marginRight:10}}>
        <CloseButton  onClick={this.cancelTaskCreation}/>
      </div>
      <div style={{flex:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'}}><span>La tarea se ha creado con exito :)</span>
        <Button onClick={this.cancelTaskCreation}>Aceptar</Button></div>
    </div>);
  }

  createTaskFrom(){

    return (
        <FormGroup style={{display:'flex',
         flex:1, justifyContent:'space-between', padding:10, flexDirection:'column'}}>
          <div>
            <div style={{...taskStyle.taskCreationFormTop}}>
              <span style={{...taskStyle.taskCreationFormTitle}}>Crear tarea</span>
              <CloseButton onClick={this.cancelTaskCreation}/>
            </div>

            <Input type="text"
            onChange={(title)=>{this.handleTitleChange(title)}}
            name="title"
            id="taskTitle"
            placeholder="Titulo de la tarea" />

          <Input type="textarea"
          style={{marginTop:10}}
          onChange={(desc)=>{this.handleDescriptionChange(desc)}}
          name="description"
          id="taskTitle"
          placeholder="Descripcion de la tarea..." />
          </div>

          <div  style={{ display:'flex', justifyContent:'center'}}>
            <Button onClick={this.createTask}> Crear </Button>
          </div>
        </FormGroup>);
  }

  render(){

    let maxWidth = (this.state.winWidth < 800)? '100%':this.state.winWidth*0.2;
    let card = null;
    if (this.state.taskCreationOpen && !this.state.taskCreationTried){
      card = (
        <Card style={{...taskStyle.task,...taskStyle.taskCreationCard, 'maxWidth': maxWidth}}>
        {this.createTaskFrom()}
        </Card>);
    }
    else if (this.state.taskCreationOpen && this.state.taskCreationTried){
      card = (
        <Card style={{...taskStyle.task,...taskStyle.taskCreationCard, 'maxWidth': maxWidth}}>
        {this.taskCreatedConfirmation()}
        </Card>);
    }
    else {
      card = (
        <div><Card onClick={this.toggleTaskCreation}
            style={{ ...taskStyle.task,...taskStyle.newTask, 'maxWidth': maxWidth}}>
          <img src={plusImage} height={25} alt="+" />
          <CardText style={{fontSize:'0.9rem', marginTop:10}}>
            Agregar Tarea
          </CardText>
      </Card></div>);
    }

    return card;

  }
}


export default CreateTask;
