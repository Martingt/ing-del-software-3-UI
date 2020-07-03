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
        tareaTerminada: false,
        currentTr: -1
    }
  }

  componentDidMount(){
    let baseUrl = Config[currentProfile].backendUrl+'tasks/'+this.props.taskCode;


    axios.get(baseUrl).then((response) => {
        this.setState({...response.data});
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
    let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.taskCode+"/stop";
    let query = "?trcode="+this.state.currentTr;

    axios.get(baseUrl+query).then((response) => {
        console.log(response);
    });

    this.setState({chronometreActive:false, tareaTerminada:true});
    clearInterval(this.timer);
  }

  pauseTimer =() => {
    if(this.state.chronometreActive){
      let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.taskCode+"/pause";
      let query = "?trcode="+this.state.currentTr;

      axios.get(baseUrl+query).then((response) => {
          console.log(response);
      });


      clearInterval(this.timer);
      this.setState({timerPaused: true});
    }
  }

  playTimer = () =>{

    if(this.state.chronometreActive){
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.taskCode+"/resume";
      let query = "?day="+dd+"&month="+mm+"&year="+yyyy;

      let queryUrl = baseUrl + query;

      axios.get(queryUrl).then((response) => {
          this.setState({currentTr: response.data.tr_code});
          console.log(response.datatr_code);
      });

      this.activateTimer();
      this.setState({timerPaused: false});
    }
  }

  startTask = () =>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.taskCode+"/start";
    let query = "?day="+dd+"&month="+mm+"&year="+yyyy;

    let queryUrl = baseUrl + query;

    axios.get(queryUrl).then((response) => {
        this.setState({currentTr: response.data.tr_code});
        console.log(response);
    });

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
    let color = (this.state.state === 'To Do')? "#fcc107":
                (this.state.state === 'In Progress')? "#f06535":"green"

    return (<div>
      <div className="titleContent">
          <div className="backButton"
            onMouseEnter={this.toggleBackImg}
            onMouseLeave={this.toggleBackImg}
            onClick={this.props.onBackRequest()}>
            <img src={this.state.backImg} height={14} />
          </div>
          <span style={{fontFamily:'Avenir-Light'}}>Todas las tareas</span>
      </div>
      <div>
        <div style={{fontFamily:'Avenir Next', display:'flex', flex:1,
        flexWrap:'wrap', justifyContent:'flex-start',alignItems:'center'}}>
        <div style={{fontSize:'2rem', display:'flex',marginRight:'20px'}}>{this.state.title}</div>
        <div style={{fontSize:'1rem', display:'flex',
        border:"1px solid " +color,
        color:color, borderRadius:20,
        paddingLeft:10,paddingRight:10,
        paddingTop:3, paddingBottom:3, alignItems:'center'}}>{this.state.state}</div>
        </div>
      </div>
        {this.displayChronometer()}
      <div>
        <h5>Descripcion</h5>
        <span>{this.state.description}</span>

        <h5>Tiempo</h5>
        <div>Tiempo total: {this.state.totalTime}</div>
        <div>Tiempo de trabajo total: {this.state.workingTime}</div>

      </div>
    </div>);
  }

}
