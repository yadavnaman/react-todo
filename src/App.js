import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Todo App',
      newTodo: '',
      todos: [{
        title: 'Task 1',
        done: false
      }, {
        title: 'Task 2',
        done: false
      }, {
        title: 'Task 3',
        done: false
      }]
    };
  }
  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  formSubmitted(event) {
    event.preventDefault();
    //console.log(this.state.newTodo);
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }]
    });
  }
  toggleTodoDone(event, index) {
    //console.log(event.target.checked);
    const todos = [...this.state.todos]; //copy the array
    todos[index] = {
      ...todos[index],
        done: event.target.checked // update done property on copied todo
    }; // copy the todo
     
    this.setState({
      todos
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos]; //copy the array
    todos.splice(index,1);
    this.setState({
      todos
    });

  }

  allDone() {
    const todos = this.state.todos.map(todo => {
      return {
        ...todo,
        done: true
      };
    });

    this.setState({
      todos
    });
  }


  render () {
    return (
    <div className="App">
      <h2>{this.state.message}</h2>
      <form onSubmit= {(event) => this.formSubmitted(event)}>
        <label htmlFor="newTodo">New Todo</label>
        <input onChange={(event) => this.newTodoChanged(event)} id="newTodo" name="newTodo" value={this.state.newTodo} />
        <button type="submit">Add Todo</button>
      </form>
      <button onClick={() => this.allDone()}>All Done</button>
      <ul>
        {this.state.todos.map((todo, index) => {
          return (<li key={todo.title}> 
            <input onChange={(event) => this.toggleTodoDone(event, index)}type="checkbox" checked={todo.done}/>

            {/* <span style={{
            //  textDecoration: todo.done?'line-through':'inherit'
            // }}>{todo.title}</span>*/}

            <span className={todo.done ? 'done' : ''}>{todo.title}</span>
            <button onClick={() => this.removeTodo(index)}>Remove</button>
            </li>)
        })}
      </ul>
    </div>
    );
  }
}

export default App;
