import React, { Component } from 'react';
import {
  Card, CardText, CardBody
} from 'reactstrap';
import  '../resources/styles/task.css';
import taskStyle from '../resources/styles/tasks.js';
import clock from '../resources/images/clock.png';
import edit from '../resources/images/edit.png';
class Task extends Component {

  constructor(props){
    super();
    this.state = {
      title: props.title,
      description: props.description,
      state: props.state,
      totalTime: props.totalTime,
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    }
  }

  onCardClick(event){
    this.props.onClick(this.props.code);
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

    let color = this.props.state === 'To Do'? "#2095ff":
      this.props.state === 'In Progress'? "#fbc000": 'green';
    let cardType = this.props.state === 'To Do'? "toDo":
      this.props.state === 'In Progress'? 'inProgress': 'done';
    let cardStyle = "task " + cardType;

    let hours = Math.floor(this.props.totalTime / 3600);
    let minutes = Math.floor((this.props.totalTime - hours*3600) / 60);
    let seconds = Math.floor(this.props.totalTime % 60);

    return(
      <Card  onClick={(event)=>this.onCardClick(event)} className={cardStyle} style={{...taskStyle.taskCard}}  >
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
      </Card>)

  }
}

export default Task;
