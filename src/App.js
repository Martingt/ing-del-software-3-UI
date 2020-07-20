import React, { Component } from 'react';
import axios from 'axios';
import Config from './chronos.config.js';
import Task from './components/Task.js';
import TopBar from './components/TopBar.js';
import { Container } from 'reactstrap';
import CreateTask from './components/NewTask.js';
import SearchBar from './components/SearchBar.js';
import TaskView from './scenes/TaskView.js';

const currentProfile = Config.currentProfile;

class App extends Component {
  state = {
    currentView: "tasksPanel",
    taskRequest: {tasks:[]},
    taskViewTaskCode: null
  }

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks = () => {
    axios.get(Config[currentProfile].backendUrl+'tasks').then((response) => {
      this.setState({
        taskRequest: response.data
      })
    });
  }

  updateTasks = (data) => {
    this.setState({taskRequest: data});
  }

  openOnTaskView = (code) => {

    this.setState({currentView: "taskView", taskViewTaskCode: code});
  }

  goToTasks = () => {
    this.setState({currentView:"tasksPanel"});
  }

  render() {
    let content = null;
    let tasks = null;
    let noResultsMsg = null;
    if (this.state.currentView === "tasksPanel"){
      if (this.state.taskRequest.results === "SIN_RESULTADOS"){
        tasks = <div className="noResultsMessage">
        <span className="noResultsMessageText">
        No se han encontrado resultados con los criterios de busqueda.</span></div>;
      }
      else {
          tasks = this.state.taskRequest.tasks.map((task) => {
          return (<Task onClick={(code)=>this.openOnTaskView(code)}
              title={task.title} key={task.code} code={task.code}
              totalTime={task.totalTime}
              description={task.description}
              state={task.state}/>)
          });
      }

      content = (
          <div>
            <SearchBar onTaskSearch={this.updateTasks}/>
            {noResultsMsg}
            <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
            <CreateTask onCreation={()=>this.loadTasks()}/>
              {tasks}
            </div>
          </div>);
    }
    else if (this.state.currentView === "taskView") {
        content = (
            <TaskView
            onBackRequest={()=>this.goToTasks}
            taskCode={this.state.taskViewTaskCode} />);
    }


    return (
      <div>
      <TopBar />
      <Container style={{'marginTop':'10px'}}>
        {content}
      </Container>
      </div>
    );
  }
}

export default App;
