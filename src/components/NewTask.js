import React, { Component } from 'react';
import {
  Card,  CardText, FormGroup, Input, Button
} from 'reactstrap';
import plusImage from '../resources/images/plus.png';
import taskStyle from '../resources/styles/tasks.js';
import '../resources/styles/task.css';
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
        state: "To Do",

      },
      taskCreationTried: false,
      creationResult: null,
      dropdownOpen: false,
    }
  }

  toggle = () => {
    this.setState({...this.state, dropdownOpen: !this.state.dropdownOpen })
  };

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
      console.log(response.status);
      this.setState({
        creationResult: "La tarea se ha creado con exito :)",
        taskCreationTried: true
      });
      
      this.props.onCreation();
    }).catch(e => {
      let errorEntries = Object.entries(e.response.data.errors)
      let i = 0;
      let resultsList = <div>{
          errorEntries.map((error) => {i++;
            return <span key={i}>{error[1]}</span>})
        }</div>;

      this.setState({
        creationResult:resultsList,
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

  taskCreationResult(){
    return <div style={{flex:1, flexDirection:'column', display:'flex',margin:10}}>
            <div style={{ display:'flex', justifyContent:'flex-end', height:20}}>
              <CloseButton  onClick={this.cancelTaskCreation}/>
            </div>
            <div style={{flex:1,
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column'}}><span
              className="ptext">{this.state.creationResult}</span>
              <div onClick={this.cancelTaskCreation} className='acceptButton'>Aceptar</div></div>
          </div>;
  }

  createTaskFrom(){
    return (
        <FormGroup style={{display:'flex',
         flex:1, justifyContent:'space-between', padding:10, flexDirection:'column',paddingBottom:3}}>

          <div className="taskCreationBody">
            <div className="taskCreationFormTop" style={{...taskStyle.taskCreationFormTop}}>
              <span style={{...taskStyle.taskCreationFormTitle}}></span>
              <CloseButton onClick={this.cancelTaskCreation}/>
            </div>
            <Input type="text"
              onChange={(title)=>{this.handleTitleChange(title)}}
              name="title"
              id="taskTitle"
              placeholder="Nombre de la tarea"
              style={{fontFamily:'AvenirNext-Regular', border: 'none', borderRadius:0, height:26}}/>

            <Input type="textarea"
              onChange={(desc)=>{this.handleDescriptionChange(desc)}}
              name="description"
              id="taskTitle"
              placeholder="Descripcion"
              style={{marginTop:10, fontFamily:'AvenirNext-Regular',border: 'none', resize:'none', height:'100%'}} />
          </div>

          <div  style={{ display:'flex', justifyContent:'center'}}>
            <Button size='sm' onClick={this.createTask} style={{...taskStyle.buttonCreate}}> Crear </Button>
          </div>
        </FormGroup>);
  }

  render(){

    let card = null;
    if (this.state.taskCreationOpen && !this.state.taskCreationTried){
      card = (
        <Card className="task taskCreationCard" style={{...taskStyle.taskCard, cursor:'default'}}>
        {this.createTaskFrom()}
        </Card>);
    }
    else if (this.state.taskCreationOpen && this.state.taskCreationTried){
      card = (
        <Card className="task taskCreationCard" style={{...taskStyle.taskCard, cursor:'default'}}>
        {this.taskCreationResult()}
        </Card>);
    }
    else {
      card = (
        <div>
          <Card onClick={this.toggleTaskCreation}
            className="task newTask" style={{...taskStyle.taskCard}}>
            <img src={plusImage} height={25} alt="+" />
            <CardText style={{fontSize:'0.9rem', marginTop:10, cursor:'default', fontFamily: 'AvenirNext-Regular'}}>
              Nueva Tarea
            </CardText>
          </Card>
      </div>);
    }

    return card;

  }
}


export default CreateTask;
