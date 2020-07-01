

import React, { Component } from 'react';
import elements from '../../resources/styles/elements.js';

export default class CloseButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      color: "#aaa",
    }
  }

  toggleColor = () =>{
    if (this.state.color === "#aaa")
      this.setState({color: "#353535"});
    else
      this.setState({color: "#aaa"});
  }
  render(){
      return(<span onClick={this.props.onClick}
        onMouseEnter={this.toggleColor}
        onMouseLeave={this.toggleColor}
        style={{...elements.closeButton,
      color: this.state.color}}>x</span>)
  }
}
