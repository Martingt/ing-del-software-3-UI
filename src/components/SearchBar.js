

import React, { Component } from 'react';
import {Input, Row, Col  } from 'reactstrap';
import '../resources/styles/searchBar.css';
import axios from 'axios';
import dropdownActiveArrow from  '../resources/images/bottom-arrow.png';
import dropdownInactiveArrow from '../resources/images/front-arrow.png';
import dropdownActiveArrowLight from  '../resources/images/bottom-arrow-light.png';
import dropdownInactiveArrowLight from '../resources/images/front-arrow-light.png';
import Config from '../chronos.config.js';
const currentProfile = Config.currentProfile;

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchActive: false,
      titleColor: "#999",
      title: '',
      description: '',
      code: '',
      state: 'Estado'
    }
  }

  updateInput = (event) => {
    let newState = {...this.state, [event.target.name]: event.target.value};
    this.setState({[event.target.name]: event.target.value});
    this.doSearch(newState);
  }

  doSearch = (state) => {
    let baseUrl = Config[currentProfile].backendUrl+'tasks';
    let query = "?title=" + state.title + "&description=" +  state.description
            + "&code=" +  state.code;
    if(state.state !== "Estado") query = query + "&state=" + state.state;
    let queryUrl = baseUrl + query;
    axios.get(queryUrl).then((response) => {
        this.props.onTaskSearch(response.data);
    });
  }


  activateSearch = () =>{
    this.setState({searchActive: !this.state.searchActive, titleColor:'black'});
  }

  highlightSearchText = () => {
    if(this.state.titleColor === "#999")
      this.setState({titleColor: "black"});
  }
  undoSearchTextHighlight = () => {
    if(this.state.titleColor === "black" && !this.state.searchActive)
      this.setState({titleColor: "#999"});
  }

  render(){
      let searchDropdownImage = (this.state.searchActive)?
          dropdownActiveArrow:dropdownInactiveArrow;
      let searchDropdownImageLight = (this.state.searchActive)?
          dropdownActiveArrowLight:dropdownInactiveArrowLight;
      return(
        <div className="searchBar">
        <span className="searchBarTitle" style={{color:this.state.titleColor}}
        onClick={this.activateSearch}
        onMouseEnter={this.highlightSearchText}
        onMouseLeave={this.undoSearchTextHighlight}>
        <img
          src={(this.state.titleColor == "black" || this.state.searchActive)?
              searchDropdownImage : searchDropdownImageLight}

          height={13} />
        <span className="linkTitle" style={{marginLeft:5}}>Filtrar tareas por título, descripción o estado</span></span>
        {
          (this.state.searchActive)?
          (<div style={{marginTop:'8px'}}>
            <Row>
              <Col style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
               <Input className="searchInput titleInput"
                type="text" name="title" id="titleSearch"
                placeholder="Buscar por titulo"
                onChange={(event)=>this.updateInput(event)} />
                  <Input type='select' name='state'
                      className='searchInput stateSelector'
                      onChange={(event)=>this.updateInput(event)}>
                  <option>Estado</option>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col>
                 <Input className="searchInput description" type="text"
                   name="description"
                   id="descriptionSearch"
                   placeholder="Buscar por descripcion"
                   onChange={(event)=>this.updateInput(event)}/></Col>
              </Row>

           </div>)
          :null
        }
        </div>)
  }
}
