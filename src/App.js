import React, { Component } from 'react';
import TopBar from './components/TopBar.js';
import { Container } from 'reactstrap';
import TaskView from './scenes/TaskView.js';
import TaskList from './scenes/TaskList.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {

  render() {
    return (
      <Router>
      <TopBar />
        <Switch>
            <Route path="/task/:taskCode" children={
              <Container style={{'marginTop':'10px'}}>
                <TaskView />
              </Container>} />
            <Route path="/" >
              <TaskList />
            </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
