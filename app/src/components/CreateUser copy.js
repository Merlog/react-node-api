import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      newSurname: "",
      newNickname: "",
      newDate: "",
      list: []
    };
  }

   componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      name: this.state.newName.slice(),
      surname: this.state.newSurname.slice(),
      nickname: this.state.newNickname.slice(),
      date: this.state.newDate.slice()
    };

    // copy current list of items
    const list = [...this.state.list];
    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newName: "",
      newSurname: "",
      newNickname: "",
      newDate: "",
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    console.log(this.state.list)
    return (
      <div className="App">
        <h1>Add an item to the list</h1>

      <input
          type="text"
          placeholder="Type name"
          value={this.state.newName}
          onChange={e => this.updateInput("newName", e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Type surname"
          value={this.state.newSurname}
          onChange={e => this.updateInput("newSurname", e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Type nick"
          value={this.state.newNickname}
          onChange={e => this.updateInput("newNickname", e.target.value)}
        />
        <br />
        <input
          type="date"
          placeholder="Type date"
          value={this.state.newDate}
          onChange={e => this.updateInput("newDate", e.target.value)}
        />
        <br />

          <br/>
          <button
          onClick={() => this.addItem()}
          >create</button>

        
        <div className="wrapper">
          {this.state.list.map(item => {
            console.log('mapa')
            return (
              <div className="box" key={item.id}>
                {item.name}    <br/>
                {item.surname}    <br/>
                {item.nickname}    <br/>
                {item.date}<br/>
                <button  onClick={() => this.deleteItem(item.id)} >delete</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
