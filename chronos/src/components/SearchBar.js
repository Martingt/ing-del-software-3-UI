

import React, { Component } from 'react';
import {Input, Row, Col  } from 'reactstrap';
import '../resources/styles/searchBar.css';


export default class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchActive: false,
      titleColor: "#aaa"
    }
  }

  activateSearch = () =>{
    this.setState({searchActive: !this.state.searchActive});
  }

  changeTitleStyle = () => {
    if(this.state.titleColor === "#aaa")
      this.setState({titleColor: "#999"});
    else
      this.setState({titleColor: "#aaa"});
  }

  render(){
      return(
        <div className="searchBar">
        <span className="searchBarTitle" style={{color:this.state.titleColor}}
        onClick={this.activateSearch}
        onMouseEnter={this.changeTitleStyle}
        onMouseLeave={this.changeTitleStyle}>
        Filtrar tareas</span>
        {
          (this.state.searchActive)?
          (<div >
            <Row>
              <Col>
               <Input className="searchInput titleInput"
               type="text" name="titleSearch" id="titleSearch"
                placeholder="Buscar por titulo" /></Col>
               <Col style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                 <Input className="searchInput idInput"
                  type="text" name="idSearch" id="idSearch"
                  placeholder="Buscar por id de tarea" />

                  <Input type='select' name='selectState'
                      className='searchInput stateSelector'>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col>
                 <Input className="searchInput descInput" type="text"
                   name="title"
                   id="descriptionSearch"
                   placeholder="Buscar por descripcion" /></Col>
              </Row>

           </div>)
          :null
        }
        </div>)
  }
}
