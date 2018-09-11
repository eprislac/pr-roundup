import React, { Component } from 'react';
import './Project.css';
import {ORG_URL, API_KEY, USER} from '../constants.js';
import Pull from '../pull/Pull.js';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {pulls: [], projectName: props.projectName};
  }


  componentDidMount() {
    this.Project(this.props);
    const url =
      ORG_URL +
      this.state.projectName +
      '/pulls?username=' +
      USER +
      '&access_token=' +
      API_KEY +
      '&sort=created&direction=asc';
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({pulls: json});
      })

  }

  Project(props) {
  }

  render() {
    function parseDate(str) {
      return new Date(str);
    }

    function daydiff(first, second) {
      return Math.ceil((parseDate(second)-parseDate(first))/(1000*60*60*24));
    }

    const today = new Date();

    return (
      <div className="Project">
        <h3>{this.state.projectName}</h3>
        <h4>Open pull-requests: {this.state.pulls.length}</h4>
        <ol>
          {
            this.state.pulls.map((pull, index) => {
              const milestone =
                pull.milestone === null ? 'none' : pull.milestone.title;
              return (<Pull title={pull.title}
                    key={index}
                    author={pull.user.login}
                    url={pull.html_url}
                    number={pull.number}
                    open={daydiff(pull.created_at, today)}
                    labels={pull.labels}
                    milestone={milestone}
                    statuses_url={pull.statuses_url}
                    projectName={this.state.projectName}
                    pullId={pull.id}
              />
            )})
          }
        </ol>
      </div>
    );
  }
}

export default Project;
