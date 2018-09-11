import React, { Component } from 'react';
import './Pull.css';
import Label from '../label/Label.js'
import { USER, API_KEY, ORG_URL } from '../constants.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Pull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.pullId,
      projectName: props.projectName,
      title: props.title,
      author: props.author,
      url: props.url,
      number: props.number,
      daysOpen: props.open,
      labels: props.labels,
      milestone:  props.milestone,
      statuses_url: props.statuses_url,
      statuses: [],
      reviews: [],
      commentStatus: null,
      reviewsIcons: null,
      statusIcon: null
    }
  }

  componentDidMount() {
    this._fetchStatuses();
    this._fetchReviews();
  }

  _fetchStatuses() {
    const url =
      this.state.statuses_url +
      '?username=' +
      USER +
      '&access_token=' +
      API_KEY;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({statuses: json})
        return json;
      })
      .then(json => this._buildStatusIcon())
  }

  _fetchReviews() {
    const url =
      ORG_URL +
      this.state.projectName +
      '/pulls/' +
      this.state.number +
      '/reviews?username=' +
      USER +
      '&access_token=' +
      API_KEY;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({reviews: json});
        return this.state.reviews
      })
      .then(reviews => this._reviewStatus(reviews))
  }

  _setIcon(reviewState) {
    if (reviewState === 'DISMISSED') {
      return
    }
    const mapping = {
      'APPROVED': 'check',
      'CHANGES_REQUESTED': 'times',
      'COMMENTED': 'comment',
      'NEEDS_REVIEW': 'exclamation-triangle',
      'success': 'check-circle',
      'failure': 'times-circle',
      'pending': 'exclamation-circle'
    }
    return (<FontAwesomeIcon icon={mapping[reviewState]} />)
  }

  _reviewStatus(rawReviews) {
    const comments = rawReviews
      .filter(review => review.state === 'COMMENTED')
    const commentStatus = comments.length > 0 ? [comments.length, ' ',this._setIcon('COMMENTED')] : ('');
    const reviews = rawReviews
      .filter(review => review.state !== 'COMMENTED')
      .map(review => this._setIcon(review.state))
    const reviewsIcons = reviews.length > 0 ? reviews : this._setIcon('NEEDS_REVIEW')
    this.setState({commentStatus: commentStatus, reviewsIcons: reviewsIcons})
  }

  _buildStatusIcon() {
    const icon =
      this.state.statuses.length > 0 ? this.state.statuses[0].state : 'pending';
    this.setState({statusIcon:  this._setIcon(icon)});
  }

  Pull(props) {}

  render() {
    const labels = this.state.labels.map((label, index) => (
      <Label key={index} name={label.name} color={label.color} />
    ));

    return (
      <li className="Pull">
        <b>{this.state.title}</b>&nbsp;
        (<a target="_blank" href={this.state.url}>#{this.state.number}</a>)
        - {this.state.statusIcon} | {this.state.commentStatus} {this.state.reviewsIcons}
        <br />({this.state.author}) Open {this.state.daysOpen} days
        <br />Milestone: {this.state.milestone}
        <br/> {labels}
       </li>
    )
  }
}

export default Pull;
