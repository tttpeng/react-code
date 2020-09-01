import React from "react";
import logo from "./logo.svg";
import { Provider, connect } from "react-redux";
import { bindActionCreators, createStore } from "redux";
import "./App.css";

const initialState = { todos: [] };

const todo = (state = initialState, action) => {
  if (action.type === "ADD_TODO") {
    return {
      todos: [...state.todos, action.text],
    };
  }
  if (action.type === "CLEAN_TODO") {
    return {
      todos: [],
    };
  }
  return state;
};

const store = createStore(todo);

function addTodo(text) {
  return { type: "ADD_TODO", text };
}

function cleanTodo() {
  return { type: "CLEAN_TODO" };
}

export class TodoList extends React.Component {
  render() {
    const { todos, addTodo, cleanTodo } = this.props;
    let input;
    return (
      <div className="App">
        <input type="text" ref={(node) => (input = node)} />
        <button
          onClick={() => {
            addTodo(input.value);
            console.log(input);
            input.value = "";
          }}
        >
          添加
        </button>
        <button onClick={cleanTodo}>清除</button>
        <div>
          {todos.map((todo) => (
            <li>{todo}</li>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo, cleanTodo }, dispatch);
}

const ConnectedTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

class App extends React.Component {
  state = {
    todos: [1, 2, 3],
  };
  add = (addButton) => {
    this.setState((state) => ({
      todos: [...state.todos, 2],
    }));
  };

  render() {
    return (
      <Provider store={store}>
        <ConnectedTodoList />
      </Provider>
    );
  }
}

export default App;
