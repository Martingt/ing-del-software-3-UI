import React, { Component } from 'react';
import {
  Card, CardText, CardBody, FormGroup, Input, Button
} from 'reactstrap';
import { Link } from "react-router-dom";
import  '../resources/styles/task.css';
import taskStyle from '../resources/styles/tasks.js';
import clock from '../resources/images/clock.png';
import edit from '../resources/images/edit.png';
import CloseButton from './elements/CloseButton.js';
import axios from 'axios';
import Config from '../chronos.config.js';
const currentProfile = Config.currentProfile;

class Task extends Component {

  constructor(props){
    super(props);
    this.state = {
      totalSeconds: props.totalTime,
      taskEditionTried: false,
      taskForm: {
        title: props.title,
        description: props.description,
      },
      editionOpacity: 0.42
    }
  }


  componentDidMount(){
    if (this.props.ongoing){
      this.activateTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.ongoing !== prevProps.ongoing) {
      this.activateTimer();
    }
  }
  handleEditionMouseEnter = () => {
    this.setState({editionOpacity:0.9});
  }
  handleEditionMouseLeave = () => {
    this.setState({editionOpacity:0.42});
  }

  activateTimer = () => {
    var totalSeconds = 0;
    this.setState({chronometreActive:true});

    this.timer = setInterval(()=> {
      totalSeconds = this.state.totalSeconds+1;
      this.setState({totalSeconds: totalSeconds});

    }, 1000);
  }

  handleTitleChange = (event) =>{
    this.setState({taskForm: {...this.state.taskForm, title: event.target.value }});
  }

  handleDescriptionChange = (event) =>{
    this.setState({taskForm: {...this.state.taskForm, description: event.target.value }});
  }

  toggleTaskEdition = () =>{
    this.setState({taskEditionTried: !this.state.taskEditionTried, editionOpacity: 0.42});
  }

  cancelTaskCreation = () => {
    this.setState({taskForm:{title: "", description:""}, taskEditionTried: false});
    this.toggleTaskEdition();
  }

  editTask = () => {
    let baseUrl = Config[currentProfile].backendUrl+'tasks/'+this.props.code;
    axios.put(baseUrl, this.state.taskForm).then((response) => {
        console.log(response.status);
        this.props.title = this.state.taskForm.title;
        this.props.description = this.state.taskForm.description;
        this.setState({
          taskEditionTried: false
        })
      }).catch(e => {
        let errorEntries = Object.entries(e.response.data.errors)
        let i = 0;
        let resultsList = <div>{
            errorEntries.map((error) => {i++;
              return <span key={i}>{error[1]}</span>})
          }</div>;

        this.setState({
          taskEditionTried: false
        })
    });
  }

  render(){

    let color = this.props.state === 'To Do'? "#2095ff":
      this.props.state === 'In Progress'? "#fbc000": 'green';
    let cardType = this.props.state === 'To Do'? "toDo":
      this.props.state === 'In Progress'? 'inProgress': 'done';
    let cardStyle = "task " + cardType;

    let hours = Math.floor(this.state.totalSeconds / 3600);
    let minutes = Math.floor((this.state.totalSeconds - hours*3600) / 60);
    let seconds = Math.floor(this.state.totalSeconds % 60);

    let card = null;
    if(this.state.taskEditionTried) {
      card = (
        <Card className="task taskCreationCard" style={{...taskStyle.taskCard, cursor:'default'}}>
        <FormGroup style={{display:'flex',
        flex:1, justifyContent:'space-between', padding:10, flexDirection:'column',paddingBottom:3}}>

         <div className="taskCreationBody">
           <div className="taskCreationFormTop" style={{...taskStyle.taskCreationFormTop}}>
             <span style={{...taskStyle.taskCreationFormTitle}}></span>
             <CloseButton onClick={this.cancelTaskCreation}/>
           </div>
           <Input type="text"
             onChange={(title)=>{this.handleTitleChange(title)}}
             defaultValue={this.props.title}
             name="title"
             id="taskTitle"
             placeholder="Nombre de la tarea"
             style={{fontFamily:'AvenirNext-Regular', border: 'none', borderRadius:0, height:26}}/>

           <Input type="textarea"
             onChange={(desc)=>{this.handleDescriptionChange(desc)}}
             defaultValue={this.props.description}
             name="description"
             id="taskTitle"
             placeholder="Descripcion"
             style={{marginTop:10, fontFamily:'AvenirNext-Regular',border: 'none', resize:'none', height:'100%'}} />
         </div>

         <div  style={{ display:'flex', justifyContent:'center'}}>
           <Button size='sm' onClick={this.editTask} style={{...taskStyle.buttonCreate}}> EDITAR </Button>
         </div>
       </FormGroup>
        </Card>
      );
    }
    else {
      card = (
        <Card className={cardStyle} style={{...taskStyle.taskCard}}  >
          <CardBody style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <Link to={this.props.onClickGoTo} style={{display:"flex", flex:1}} className="noStyleLink" >
              <div style={{flex:1, display:'flex', flexDirection:'column'}}>
                <div style={{ paddingTop:5, paddingBottom:10 }}>
                  <CardText style={{fontSize:'1.1rem',fontFamily:'AvenirNext-Regular'}}>{
                    (this.props.title.length > 50)?
                    this.props.title.slice(0,50) + "...":
                    this.props.title
                  }</CardText>
                </div>
                <div style={{display:'flex' ,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                      <img  alt="clock" src={clock} height={16} width={16} style={{opacity:0.42,marginRight:5}} />
                      <span style={{fontFamily:'AvenirNext-Regular',
                          fontSize:'0.7rem',
                          marginRight:5,
                          alignItems:'center',
                          justifyContent:'center',
                          display:'inline-block'}}>
                          <span>{
                          (hours !== 0)?
                            hours + "h " + minutes + "min " + seconds + "s":
                          (minutes !== 0)?
                            minutes + "min " + seconds + "s":
                            seconds + "s"
                          }</span>
                      </span>
                  </div>
                  <div style={{fontFamily:'AvenirNext-Regular', display:'flex',
                      fontSize:'0.8rem',
                      marginRight:5,
                      color: color,
                      alignItems:'center',
                      justifyContent:'center'}}>{this.props.state}</div>
                </div>
                <div>
                  <CardText style={{textAlign:'justify',fontSize:'0.8rem',fontFamily:'AvenirNext-UltraLight',marginTop:10}}>
                  {this.props.description}
                  </CardText>
                </div>
            </div>
            </Link>
            <div onClick={this.toggleTaskEdition} style={{flex:1, display:'flex', justifyContent:'flex-end', maxHeight:'20px'}}>
              <img alt="edit"
              onMouseEnter = {this.handleEditionMouseEnter}
              onMouseLeave = {this.handleEditionMouseLeave}
              src={edit}
              height={19}
              width={19}
              style={{opacity:this.state.editionOpacity}}></img>
            </div>
          </CardBody>
          </Card>);
    }
    return card;
  }
}

export default Task;
