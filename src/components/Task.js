import React, { Component } from 'react';
import {
  Card, CardText, CardBody
} from 'reactstrap';
import { Link } from "react-router-dom";
import  '../resources/styles/task.css';
import taskStyle from '../resources/styles/tasks.js';
import clock from '../resources/images/clock.png';
import edit from '../resources/images/edit.png';
class Task extends Component {

  constructor(props){
    super(props);
    this.state = {
      totalSeconds: props.totalTime
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

  activateTimer = () => {
    var totalSeconds = 0;
    this.setState({chronometreActive:true});

    this.timer = setInterval(()=> {
      totalSeconds = this.state.totalSeconds+1;
      this.setState({totalSeconds: totalSeconds});

    }, 1000);
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

    return(
      <Link to={this.props.onClickGoTo} className="noStyleLink" >
        <Card className={cardStyle} style={{...taskStyle.taskCard}}  >
          <CardBody style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
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
            <div style={{flex:1, display:'flex', justifyContent:'flex-end', maxHeight:'20px'}}>
              <img alt="edit" src={edit} height={19} width={19} style={{opacity:0.42}}></img>
            </div>
          </CardBody>
          </Card>
        </Link>)
  }
}

export default Task;
