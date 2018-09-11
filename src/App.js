import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes,
  faComment,
  faExclamationTriangle,
  faExclamationCircle,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import {PROJECTS} from './constants.js';
import Project from './project/Project.js';
import Tabs from './tabs/Tabs.js';

library.add(
  faCheck,
  faTimes,
  faComment,
  faExclamationTriangle,
  faExclamationCircle,
  faCheckCircle,
  faTimesCircle
);

class App extends Component {
  constructor() {
    super();
    this.state = {projectList: []}
  }

  componentDidMount() {
    this.App();
    this.projectList = PROJECTS.map((project_name, index) => {
      return (
        <Project projectName={project_name} key={index}/>
      );
    });
    this.setState({projectList: this.projectList})
  }

  App() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PR-Roundup</h1>
        </header>
        <div className="legend">
          <b>Legend</b>
          <ul>
            <li><FontAwesomeIcon icon="exclamation-circle" /> - Build Pending</li>
            <li><FontAwesomeIcon icon="check-circle" /> - Build Passing</li>
            <li><FontAwesomeIcon icon="times-circle" /> - Build Failing</li>
            <li><FontAwesomeIcon icon="comment" /> - Comments Posted</li>
            <li><FontAwesomeIcon icon="exclamation-triangle" /> - Needs Review</li>
            <li><FontAwesomeIcon icon="check" /> - Approved Review</li>
            <li><FontAwesomeIcon icon="times" /> - Changes Requested</li>
      </ul>

        </div>
        <Tabs selected={0} children={this.state.projectList} />
      </div>
    );
  }
}

export default App;
