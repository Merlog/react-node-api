import React, { Component } from "react";
// import axios from 'axios';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  addItem() {
    const newItem = {
      title: this.state.title.slice(),
      body: this.state.body.slice(),
    };

    fetch('/addpost', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    this.setState({
      title: "",
      body: "",
    });
    this.props.handlefetchMe()
  }

  render() {
    return (
      <div className="App">
        <h1>Add an item to the list</h1>

        <input
          type="text"
          placeholder="Type name"
          value={this.state.title}
          onChange={e => this.updateInput("title", e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Type surname"
          value={this.state.body}
          onChange={e => this.updateInput("body", e.target.value)}
        />
        <br/>
        <button onClick={() => this.addItem()}>
          create
        </button>
      </div>
    );
  }
}
