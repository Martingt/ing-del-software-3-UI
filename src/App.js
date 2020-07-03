import React, { Component } from 'react';
import axios from 'axios';
import Config from './chronos.config.js';
import Task from './components/Task.js';
import TopBar from './components/TopBar.js';
import { Container } from 'reactstrap';
import CreateTask from './components/NewTask.js';
import SearchBar from './components/SearchBar.js';
const currentProfile = Config.currentProfile;

class App extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    axios.get(Config[currentProfile].backendUrl+'tasks').then((response) => {
      this.setState({
        tasks: response.data
      })
    });
  }


  render() {
    /*
    let i = 0;
    let tasks = this.state.tasks.map((task) => {
      i += 1;
      return (<Task  title={task.title} key={i} description={task.description} />)
    });
    */
    console.log("tasks");
    return (
      <div>
      <TopBar />
      <Container style={{'marginTop':'10px'}}>
        <SearchBar />
        <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
          <CreateTask />
          <Task title={'Facturar horas'} description={'Esta es la descripcion de la tarea, en esta descripcion encontraras mucha informacion sobre lo que estas trabajando. Por ejemplo, historias de usuario o criterios de aceptacion'} state={'In Progress'}/>
          <Task title={'Prueba de ERP'} description={'Esta es la descripcion'} state={'To Do'}/>
        </div>
      </Container>
      </div>
    );
  }
}

export default App;
