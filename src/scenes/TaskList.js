import React, {Component} from 'react';
import axios from 'axios';
import Config from '../chronos.config.js';
import '../resources/styles/taskView.css';
import '../resources/styles/chronometre.css';
import Task from '../components/Task.js';
import { Container } from 'reactstrap';
import CreateTask from '../components/NewTask.js';
import SearchBar from '../components/SearchBar.js';
const currentProfile = Config.currentProfile;

export default class TaskList extends Component {

  state = {
    currentView: "tasksPanel",
    taskRequest: {tasks:[]},
    taskViewTaskCode: null,
    tasksUpdated:false
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.loadTasks(), 1000);
  }
  componentWillMount(){
    clearInterval(this.timer)
    this.timer = null;
  }

  loadTasks = () => {
    axios.get(Config[currentProfile].backendUrl+'tasks').then((response) => {
      this.setState({
        taskRequest: response.data
      })
    });
  }

  updateTasks = (data) => {
    clearInterval(this.timer)
    this.timer = null;
    this.setState({taskRequest: data, tasksUpdated: true});
    
  }

  render() {

    let tasks = null;
    let noResultsMsg = null;

    if (this.state.taskRequest.results === "SIN_RESULTADOS" && this.state.tasksUpdated){
        tasks = <div className="noResultsMessage">
        <span className="noResultsMessageText">
        No se han encontrado resultados con los criterios de busqueda.</span></div>;
    }
    else if(this.state.taskRequest.results !== "SIN_RESULTADOS"){

          tasks = this.state.taskRequest.tasks.map((task) => {
          let taskUrl = "/task/" + task.code;
          return (<Task
              onClickGoTo={taskUrl}
              title={task.title} key={task.code} code={task.code}
              totalTime={task.totalTime}
              description={task.description}
              ongoing={task.ongoing}
              state={task.state}/>)
          });
    }

    return <Container style={{'marginTop':'10px'}}>
      <SearchBar onTaskSearch={this.updateTasks}/>
        {noResultsMsg}
        <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
          <CreateTask onCreation={()=>this.loadTasks()}/>
          {tasks}
        </div>
    </Container>;
  }
}
