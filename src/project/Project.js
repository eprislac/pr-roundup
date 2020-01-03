import React, { Component } from 'react';
import './Project.css';
import {ORG_URL, API_KEY, USER} from '../constants.js';
import Pull from '../pull/Pull.js';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {pulls: [], projectName: props.projectName, milestones: [] };
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
        this.setState({
          pulls: json.map(item => {
            return {...item, ...{hidden: null}}
          })
        });
        this.setState({
          milestones : [...new Set(
            this.state.pulls.map((pull) => {
              return pull.milestone === null ? 'none' : pull.milestone.title;
            })
          )]
        })
      })

  }

  Project(props) {
  }

  handleSelect(event) {
    event.preventDefault()
    if (event.target.value === 'none') {
      this.setState({
        pulls: this.state.pulls.map(pull => ({...pull, ...{hidden: null}}))
      })
    } else {
      this.setState({
        pulls: this.state.pulls.map(pull => {
          return { ...pull, ...{ hidden: ((pull || {}).milestone || {}).title === event.target.value ? null : 'hidden'} }
        })
      })
    }
  }

  parseDate(str) {
    return new Date(str);
  }

  daydiff(first, second) {
    return Math.ceil((this.parseDate(second)-this.parseDate(first))/(1000*60*60*24));
  }

  _renderPulls() {
    const today = new Date();

    return (
      <div className="Project">
        <h3>{this.state.projectName}</h3>
        <h4>Open pull-requests: {this.state.pulls.length}</h4>
        <label> Milestone:&nbsp;
          <select onChange={this.handleSelect.bind(this)}>
            {
              this.state.milestones.map(ms => {
                return (<option value={ms}>{ms}</option>)
              })
            }
          </select>
        </label>
        <ol>
          {
            this.state.pulls.map((pull, index) => {
              const milestone =
                pull.milestone === null ? 'none' : pull.milestone.title;
              return (
                <Pull
                  title={pull.title}
                  key={'Pull-' + index}
                  author={pull.user.login}
                  url={pull.html_url}
                  number={pull.number}
                  open={this.daydiff(pull.created_at, today)}
                  labels={pull.labels}
                  milestone={milestone}
                  statuses_url={pull.statuses_url}
                  projectName={this.state.projectName}
                  pullId={pull.id}
                  hidden={pull.hidden}
                />
              )
            })
          }
        </ol>
      </div>
    )
  }

  render() {
    return this._renderPulls();
  }
}

export default Project;
