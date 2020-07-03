import React, { Component } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button, Input
} from 'reactstrap';
import  '../resources/styles/task.css';
import clock from '../resources/images/clock.png';
import edit from '../resources/images/edit.png';
import add from '../resources/images/plus.png';
class Task extends Component {

  constructor(props){
    super();
    this.state = {
      title: props.title,
      description: props.description,
      state: props.state,
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
    let border;
    let totalTime = 42;
    this.state.state == 'To Do'? border='warning': this.state.state == 'In Progress'? border = 'danger': border = 'success';  ;
    let maxWidth = (this.state.winWidth < 800)? '100%':this.state.winWidth*0.2;
    return(
      <Card onClick={(event)=>this.onCardClick(event)} className="task" style={{'maxWidth': maxWidth,...taskStyle.taskCard}} color={border}>
          <CardBody>
            <div style={{flex:1, flexDirection:'column', display:'flex',marginTop:15}}>
              <CardText style={{fontSize:'1.2rem',fontFamily:'AvenirNext-Regular'}}>{this.state.title}</CardText>
            </div>
            <div style={{marginTop:8,display:'flex' ,flexDirection:'row', alignItems:'center'}}>
              <img src={clock} height={16} width={16} style={{opacity:0.42,marginRight:5}} ></img>
              <CardText style={{fontFamily:'AvenirNext-Regular', fontSize:'0.6rem',marginRight:5}}>{totalTime} h</CardText>
              <img src={add} height={10} width={10} style={{opacity:0.42,marginRight:5}} ></img>
            </div>
            <div>
              <CardText style={{textAlign:'justify',fontSize:'0.8rem',fontFamily:'AvenirNext-UltraLight',marginTop:10,height:150 }}>{this.state.description}</CardText>
            </div>
            <div>
              <img src={edit} height={19} width={19} style={{opacity:0.42,float:'right'}}></img>
            </div>
          </CardBody>
      </Card>
    )

  }
}

export default Task;
