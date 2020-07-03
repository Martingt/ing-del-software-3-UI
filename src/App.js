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
    tasks: [],
    taskViewTaskCode: null
  }

  componentDidMount() {
    axios.get(Config[currentProfile].backendUrl+'tasks').then((response) => {
      this.setState({
        tasks: response.data
      })
    });
  }

  updateTasks = (data) => {
    this.setState({tasks: []});
    this.setState({tasks: data});
  }

  openOnTaskView = (code) => {

    this.setState({currentView: "taskView", taskViewTaskCode: code});
  }

  goToTasks = () => {
    this.setState({currentView:"tasksPanel"});
  }

  render() {
    let content = null;

    if (this.state.currentView === "tasksPanel"){
      let tasks = this.state.tasks.map((task) => {
        return (<Task onClick={(code)=>this.openOnTaskView(code)}
            title={task.title} key={task.code} code={task.code}
            description={task.description} 
            state={task.state}/>)
      });

      content = (
          <div>
            <SearchBar onTaskSearch={this.updateTasks}/>
            <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
            <CreateTask />
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


    console.log("tasks");
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
