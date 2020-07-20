import React, { Component } from 'react';
import {
Row, Container
} from 'reactstrap';


class TopBar extends Component {


  constructor(props){
    super();
    this.state = {
      title: props.title,
      description: props.description,
      dropdownOpen: false,
    }
  }

  toggle = () => {
    this.setState({...this.state, dropdownOpen: !this.state.dropdownOpen })
  };

  render(){

    return(
      <div>
        <Container >
        <Row style={{'minHeight':'70px', justifyContent:'space-between'}}>
        <div style={{alignItems: 'flex-end','minHeight':'70px', display:'flex'}}>
        <h2 style={{'marginBottom':'5px', display:'inline-block'}}>Chronos </h2>
        <h5 style={{'color':'#656565','marginLeft':'20px', 'marginBottom':'6px', display:"inline-block"}}> a PSA tool</h5>
        </div>
        </Row>
        </Container>
        <div style={{'backgroundColor':'#757575', 'width':'100%', 'height':'2px'}}> </div>
      </div>
    )

  }
}

export default TopBar;
