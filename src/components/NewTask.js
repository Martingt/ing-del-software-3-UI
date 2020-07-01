import React, { Component } from 'react';
import {
  Card,  CardText, FormGroup, Form, Input, Button
} from 'reactstrap';
import plusImage from '../resources/images/plus.png';
import taskStyle from '../resources/styles/tasks.js';
import CloseButton from './elements/CloseButton.js';

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
        state: ""
      }
    }
  }

  toggleTaskCreation = () =>{
    this.setState({taskCreationOpen: !this.state.taskCreationOpen});
  }

  handleTitleChange = (title) =>{
    this.setState({taskForm: {...this.state.taskForm, title:title }});
  }

  cancelTaskCreation = () => {
    this.setState({taskForm:{title: "", description:"", state: ""}});
    this.toggleTaskCreation();
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

  createTaskFrom(){

    return (<Form style={{...taskStyle.taskCreationForm}}>
        <FormGroup style={{display:'flex',
         flex:1, justifyContent:'space-between', flexDirection:'column'}}>
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
          onChange={(title)=>{this.handleTitleChange(title)}}
          name="title"
          id="taskTitle"
          placeholder="Descripcion de la tarea..." />
          </div>

          <div  style={{ display:'flex', justifyContent:'center'}}>
            <Button> Crear </Button>
          </div>
        </FormGroup>
      </Form>);
  }

  render(){

    let maxWidth = (this.state.winWidth < 800)? '100%':this.state.winWidth*0.2;

    return (<div>{
      (this.state.taskCreationOpen)?
        (<Card style={{...taskStyle.task,...taskStyle.taskCreationCard, 'maxWidth': maxWidth}}>
          {this.createTaskFrom()}
        </Card>) :
        (<Card onClick={this.toggleTaskCreation}
              style={{ ...taskStyle.task,...taskStyle.newTask, 'maxWidth': maxWidth}}>
            <img src={plusImage} height={25} alt="+" />
            <CardText style={{fontSize:'0.9rem', marginTop:10}}>
              Agregar Tarea
            </CardText>
        </Card>)
      }</div>)

  }
}


export default CreateTask;
