import './App.css';
import React from 'react';
import { Link,NavLink, Routes, Route } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return <p>This is the <strong>Home</strong> page!</p>
  }
}

class TODO extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [
        { id: 0, text: " Walk the dog. " },
        { id: 1, text: " Pick up laudry. " },
        { id: 2, text: " Read book 30 minutes. " }
      ],
      maxId: 2,
      input: "",
      submitted: "",
      editStatus: "Add"
    };
  }

  deleteClicked(id) {
    let newTodoList = [];

    for (let i = 0; i < this.state.todoList.length; i++) {
      if (this.state.todoList[i].id !== id) {
        newTodoList.push(this.state.todoList[i]);
      }
    }

    this.setState({
      clicked: id,
      todoList: newTodoList
    });
  }

  editClicked(id) {
    let newTodoList = [];

    for (let i = 0; i < this.state.todoList.length; i++) {
      if (this.state.todoList[i].id !== id) {
        newTodoList.push(this.state.todoList[i]);
      }else{
        this.setState({
          input:this.state.todoList[i].text,
        });
      }
    }

    this.setState({
      editStatus:"Edit",
      todoList: newTodoList
    });
  }

  renderTodo({ id, text }) {
    return <li key={id}>
      <Link to="/todo" onClick={this.deleteClicked.bind(this, id)}>D</Link>
      {text}
      <Link to="/todo" onClick={this.editClicked.bind(this, id)}>E</Link>
    </li>
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleAdd() {
    let id = this.state.maxId + 1;
    this.setState({
      maxId: id,
      submitted: this.state.input,
      input: ""
    });
    this.state.todoList.push(
      { id: id, text: " " + this.state.input + " " });
  }

  render() {
    return (
      <div>
        <br/>
        <input type="text" value={this.state.input}
          onChange={this.handleChange.bind(this)} />

        <button onClick={this.handleAdd.bind(this)}>
          {this.state.editStatus}
        </button>

        <h1>TODO List:</h1>
        <ul>
          {this.state.todoList.map(this.renderTodo.bind(this))}
        </ul>
      </div>
    )
  }
}
class Contact extends React.Component {
  render() {
    return <p>This is the <strong>Contact</strong> page!</p>;
  }
}
class About extends React.Component {
  render() {
    return <p>This is the <strong>About</strong> page!</p>;
  }
}

function App() {
  return (
    <div>
      <h1>Todo List in React.js</h1>
      <ul className='nav'>
        <li className='nav_list'><NavLink to="/home">Home</NavLink></li>
        <li className='nav_list'><NavLink to="/todo">TODO</NavLink></li>
        <li className='nav_list'><NavLink to="/contact">Contact</NavLink></li>
        <li className='nav_list'><NavLink to="/about">About</NavLink></li>
      </ul>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="todo" element={<TODO />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Routes>

    </div>
  );
}

export default App;
