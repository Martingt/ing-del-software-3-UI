import React, {Component} from 'react';
import axios from 'axios';
import Config from '../chronos.config.js';
import '../resources/styles/taskView.css';
import '../resources/styles/chronometre.css';
import back from '../resources/images/back.png';
import backLight from '../resources/images/back-light.png';
import {Button, Col} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
const currentProfile = Config.currentProfile;

class TaskView extends Component {
  constructor(props){
    super(props);

    this.state = {
        code: '',
        description: 'loading...',
        title: '',
        state: 'loading...',
        timeIntervals: '',
        backImg: backLight,
        backActive: false,
        chronometreActive: false,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        timerPaused:false,
        currentTr: -1
    }
  }

  componentDidMount(){
    this.updateTaskInfo();

  }

  updateTaskInfo = () => {
    let baseUrl = Config[currentProfile].backendUrl+'tasks/'+this.props.match.params.taskCode;
    axios.get(baseUrl).then((response) => {
      let seconds = Math.floor(response.data.totalTime % 60)
      let hours = Math.floor(response.data.totalTime / 3600)
      let minutes =  Math.floor((response.data.totalTime - hours*3600) / 60)
      this.setState({...response.data, totalSeconds: response.data.totalTime,
        seconds: seconds, minutes: minutes,
        hours: hours,currentTr:response.data.ongoingRecordCode});

      if (response.data.state === 'In Progress' && this.state.currentTr === -1){
        this.setState({chronometreActive:true});
      }
      else if (response.data.state === 'In Progress' && this.state.currentTr !== -1){
        this.activateTimer();
        this.setState({chronometreActive:true,timerPaused: false});
      }
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
    let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.match.params.taskCode+"/stop";
    let query = "?trcode="+this.state.currentTr;

    clearInterval(this.timer);
    axios.get(baseUrl+query).then((response) => {
        console.log(response);
        this.updateTaskInfo();
    });
    this.setState({chronometreActive:false});
  }

  pauseTimer =() => {
    if(this.state.chronometreActive){
      let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.match.params.taskCode+"/pause";
      let query = "?trcode="+this.state.currentTr;

      axios.get(baseUrl+query).then((response) => {
          console.log(response);
          this.updateTaskInfo();
      });

      clearInterval(this.timer);
      this.setState({timerPaused: true});
    }
  }

  playTimer = () => {

    if(this.state.chronometreActive ){
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.match.params.taskCode+"/resume";
      let query = "?day="+dd+"&month="+mm+"&year="+yyyy;

      let queryUrl = baseUrl + query;

      axios.get(queryUrl).then((response) => {
          this.setState({currentTr: response.data.tr_code});
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

    let baseUrl = Config[currentProfile].backendUrl+"tasks/" +this.props.match.params.taskCode+"/start";
    let query = "?day="+dd+"&month="+mm+"&year="+yyyy;

    let queryUrl = baseUrl + query;

    axios.get(queryUrl).then((response) => {
        this.setState({currentTr: response.data.tr_code, state:"In Progress"});
        console.log(response);
    });

    this.activateTimer();
  }

  activateTimer = () => {
    var hours = 0;
    var minutes = 0;
    var totalSeconds = 0;
    this.setState({chronometreActive:true});

    this.timer = setInterval(()=> {
      totalSeconds = this.state.totalSeconds+1;
      hours = Math.floor(totalSeconds / 3600);
      minutes = Math.floor(totalSeconds / 60);

      if(this.state.seconds === 59)
        this.setState({seconds: 0});
      else
        this.setState({seconds: this.state.seconds+1});

      this.setState({totalSeconds: totalSeconds,
        hours:hours, minutes:minutes});

    }, 1000);
  }

  displayChronometer = () => {

    let taskControls = null;
    if (this.state.state === 'Done'){
      taskControls = (<span>Tarea finalizada con exito. </span>);
    }

    else if (this.state.state === 'In Progress'){
      taskControls = (<Button className="cButton"
        onClick={this.endTask}
        style={{minWidth:'124px'}}> Finalizar Tarea</Button>)
    }
    else {
      taskControls = (<Button className="cButton"
        onClick={this.startTask} color="success">Comenzar Tarea</Button>)
    }

    return (<div className='chronometer'>
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
      {(this.state.timerPaused || (this.state.state === "In Progress" && this.state.currentTr === -1))?
            (<span
              className={
                (this.state.state === "In Progress" && (this.state.timerPaused || this.state.currentTr === -1))?
                "cButton" : "disabledButton"}
              onClick={this.playTimer}>Continuar</span>):
            (<span
              className={(this.state.chronometreActive)? "cButton" : "disabledButton"}
              onClick={this.pauseTimer}>Pausar</span>)}
      {taskControls}
      </Col>
      </div>)
  }

  render(){
    let color = this.state.state === 'To Do'? "#2095ff":
      this.state.state === 'In Progress'? "#fbc000": 'green';

    let totalHours = Math.floor(this.state.totalTime / 3600);
    let totalMinutes = Math.floor((this.state.totalTime - totalHours * 3600)/60);
    let totalSeconds = Math.floor(this.state.totalTime % 60);

    let workingHours = Math.floor(this.state.workingTime / 3600);
    let workingMinutes = Math.floor((this.state.workingTime - workingHours * 3600)/60);
    let workingSeconds = Math.floor(this.state.workingTime % 60);

    let restTime = this.state.totalTime - this.state.workingTime;
    if (restTime < 0) restTime = 0;
    let restingHours = Math.floor(restTime / 3600);
    let restingMinutes = Math.floor((restTime - restingHours * 3600)/60);
    let restingSeconds = Math.floor(restTime % 60);

    return (<div>
      <div className="titleContent">
          <div className="backButton"
            onMouseEnter={this.toggleBackImg}
            onMouseLeave={this.toggleBackImg}>
            <Link className="noStyleLink" to="/" >
              <img alt="back" src={this.state.backImg} height={14} />
            </Link>
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

        <div style={{marginTop:'10px'}}>
        <h5>Tiempo</h5>
        <div>Tiempo total:
          <span style={{marginLeft:'5px'}}>
            {(totalHours !== 0)? ' ' + totalHours + 'hs. ' : null}
            {(totalMinutes !== 0)? totalMinutes + ' min. ' : null}
            {totalSeconds} seg.
          </span>
        </div>
        <div>Tiempo de trabajo total:
          <span style={{marginLeft:'5px'}}>
            {(workingHours !== 0)? ' ' + workingHours + 'hs. ' : null}
            {(workingMinutes !== 0)? workingMinutes + ' min. ' : null}
            {workingSeconds} seg.
          </span>
        </div>
        <div>Tiempo de descanso total:
          <span style={{marginLeft:'5px'}}>
            {(restingHours !== 0)? ' ' + restingHours + 'hs. ' : null}
            {(restingMinutes !== 0)? restingMinutes + ' min. ' : null}
            {restingSeconds} seg.
          </span>
        </div>
        </div>
      </div>
    </div>);
  }

}

export default withRouter(TaskView);
