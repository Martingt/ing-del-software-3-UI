import React, {Component} from 'react';
import axios from 'axios';
import Config from '../chronos.config.js';
import '../resources/styles/taskView.css';
import '../resources/styles/chronometre.css';
import back from '../resources/images/back.png';
import backLight from '../resources/images/back-light.png';
import {Button, Col} from 'reactstrap';
const currentProfile = Config.currentProfile;

export default class TaskView extends Component {
  constructor(props){
    super(props);

    this.state = {
        code: '',
        description: 'Sample description',
        title: 'Sample Title',
        state: 'Sample State',
        timeIntervals: '',
        backImg: backLight,
        backActive: false,
        tareaComenzada: false,
        chronometreActive: false,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        timerPaused:false,
        tareaTerminada: false
    }
  }

  componentDidMount(){
    let baseUrl = Config[currentProfile].backendUrl+'tasks';
    let query = "?code=" +  this.props.taskCode;

    let queryUrl = baseUrl + query;

    axios.get(queryUrl).then((response) => {
        this.setState({...response.data['0']});
    });

  }

  toggleBackImg = () =>{
    if (this.state.backActive){
      this.setState({ backActive: !this.state.backActive, backImg: backLight});
    }
    else {
      this.setState({ backActive: !this.state.backActive, backImg: back});
    }
  }

  endTask = () => {
    this.setState({chronometreActive:false, tareaTerminada:true});
    clearInterval(this.timer);
  }

  pauseTimer =() => {
    if(this.state.chronometreActive){
      clearInterval(this.timer);
      this.setState({timerPaused: true});
    }
  }

  playTimer = () =>{
    if(this.state.chronometreActive){
      this.activateTimer();
      this.setState({timerPaused: false});
    }
  }

  startTask = () =>{
    this.activateTimer();
  }

  activateTimer = () =>{
    var hours =0;
    var minutes = 0;
    var totalSeconds = 0;
    this.setState({chronometreActive:true, tareaComenzada:true});
    this.timer = setInterval(()=>{
      totalSeconds = this.state.totalSeconds+1;
      hours = Math.floor(totalSeconds / 3600);
      minutes = Math.floor(totalSeconds / 60);

      if(this.state.seconds === 59)
        this.setState({seconds: 0});
      else
        this.setState({seconds: this.state.seconds+1});

      this.setState({totalSeconds: totalSeconds,
        hours:hours, minutes:minutes});

    },1000);
  }

  displayChronometer = (taskConrtrols) =>{

    let taskControls = null;
    if (this.state.tareaComenzada && this.state.tareaTerminada){
      taskControls = (<span>Tarea finalizada con exito. </span>);
    }
    else if (this.state.tareaComenzada && !this.state.tareaTerminada){
      taskControls = (<Button className="cButton"
        onClick={this.endTask}
        style={{minWidth:'124px'}}> Finalizar Tarea</Button>)
    }
    else {
      taskControls = (<Button className="cButton"
        onClick={this.startTask} color="success">Comenzar Tarea</Button>)
    }

    return (<div className='chronometre'>

      <Col className='timer'>
        <h3 className='tnumber'>{
          (this.state.hours < 10)?
          '0' + this.state.hours :
          this.state.hours }:</h3>
        <h3 className='tnumber'>{
          (this.state.minutes<10)?
          '0' + this.state.minutes :
          this.state.minutes}:</h3>
        <h3 className='tnumber'>{
          (this.state.seconds < 10)?
          '0' + this.state.seconds :
          this.state.seconds
         }</h3>
      </Col>


      <Col className='options'>
      { (this.state.timerPaused)?
            (<span
              className={(this.state.chronometreActive)? "cButton" : "disabledButton"}
              onClick={this.playTimer}>Continuar</span>):
            (<span
              className={(this.state.chronometreActive)? "cButton" : "disabledButton"}
              onClick={this.pauseTimer}>Pausar</span>)}
      {taskControls}
      </Col>
      </div>)
  }

  render(){
    let color = this.state.state == 'To Do'? "warning": this.state.state == 'In Progress'? 'danger': 'success';
    return (
    <div>
      <div className="titleContent" style={{display:'flex' ,flexDirection:'row', justifyContent:'flex-start',alignItems:'center',paddingTop: '5px', paddingBottom:'10px'}}>
          <div className="backButton"
            onMouseEnter={this.toggleBackImg}
            onMouseLeave={this.toggleBackImg}
            onClick={this.props.onBackRequest()}
            style={{alignItems:'center',justifyContent:'center',display:'inline-block'}}>
            <img src={this.state.backImg} height={14} />
          </div>
          <p style={{fontFamily:'Avenir-Light',fontSize:'0.5rem',alignItems:'center',justifyContent:'center',display:'inline-block'}}>Todas las tareas</p>
      </div>
      <div style={{display:'flex' ,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
        <p style={{fontFamily:'Avenir Next',fontSize:'2rem',alignItems:'center',justifyContent:'center',display:'inline-block'}}>{this.state.title}</p>
        <Button color={color} style={{alignItems:'center',justifyContent:'center', display:'inline-block'}} >{this.state.state}</Button>
      </div>
        {this.displayChronometer()}
      <div>
        <p style={{fontFamily:'Avenir Next',fontSize:'1rem'}}>Descripcion</p>
        <p style={{fontFamily:'Avenir Next',fontSize:'0.8rem'}}>{this.state.description}</p>
        Total time: {this.state.totalSeconds}
        <h5>Tiempo</h5>
        <span>Tiempo trabajado total {this.state.totalTime}</span>
        <span>Tiempo de trabajo total {this.state.workingTime}</span>
      </div>
    </div>);
  }

}
