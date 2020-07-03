import React, {Component} from 'react';
import axios from 'axios';
import Config from '../chronos.config.js';
import '../resources/styles/taskView.css';
import '../resources/styles/chronometre.css';
import back from '../resources/images/back.png';
import backLight from '../resources/images/back-light.png';
import {Button} from 'reactstrap';
const currentProfile = Config.currentProfile;

export default class TaskView extends Component {
  constructor(props){
    super(props);

    this.state = {
        code: '',
        description: '',
        title: '',
        state: '',
        timeIntervals: '',
        backImg: backLight,
        backActive: false,
        tareaComenzada: true
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

  render(){
    return (<div>
      <div className="titleContent">
        <div className="backButton"
        onMouseEnter={this.toggleBackImg}
        onMouseLeave={this.toggleBackImg}
        onClick={this.props.onBackRequest()} ><img
        src={this.state.backImg}
        height={14}  /></div>
        <h4 className='title'>{this.state.title}</h4>
      </div>
      <div className='division' />
      <div className='chronometre'>
        <div className='timer'>
        </div>
        <Button>Pausar Tiempo </Button>
        {(this.state.tareaComenzada)?
        (<Button> Finalizar Tarea</Button>):
        (<Button>Comenzar Tarea</Button>)}
      </div>
    </div>);
  }

}
