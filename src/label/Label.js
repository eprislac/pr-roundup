import React, { Component } from 'react';
import './Label.css';

class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      backgroundColor: '#' + props.color
    }
  }

  Label(props) {}

  render() {
    return (
      <div className="Label" style={{backgroundColor: this.state.backgroundColor}}>
        {this.state.name}
      </div>
    )
  }
}

export default Label;
