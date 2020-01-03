import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
      selected: props.selected
    };
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({selected: index});
  }

  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={'Tab-' + index}>
          <a href="#"
             className={activeClass}
             onClick={this.handleClick.bind(this, index)}>
             {child.props.projectName}
          </a>
        </li>
      )
    }

    return (
      <ul className="Tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    )
  }

    _selectedChild(){
      return (this.props.children[this.state.selected]);
    }

  _renderContent() {
    return (
      <div className="Tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    )
  }

  Tabs(props) {}

  render() {
    return (
      <div className="Tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    )
  }
}

export default Tabs;
