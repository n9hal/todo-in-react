import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }
  componentDidMount() {
    this.hydrateStateWithLocalStorage();
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
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
 
    };
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
  }
  
  render() {
    return (
      <div class="App">
        <h1>ToDo List</h1>
        <br/>
            <form id="todo-Form">
              <input type="text" className="txtInput" placeholder="Enter Item..."
                value={this.state.newItem}
                onChange={e => this.updateInput("newItem", e.target.value)}
              />
              <button
                className="btnAdd"
                onClick={() => this.addItem()}
                disabled={!this.state.newItem.length}
              >
                ADD
              </button>
              <br /> <br />
              <ul>
                {this.state.list.map(item => {
                  return (
                    <li key={item.id}>
                      {item.value}
                      <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                        <i className="icon" alt="Delete">X</i>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </form>
      </div>
    );
  }
}
export default  App;