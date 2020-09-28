import React, { Component } from "react";
import AddTodoButton from "./AddTodoButton";
import AddNewTodo from "./AddNewTodo";
import SingleTask from "./SingleTask";
import { connect } from "react-redux";
import { getTodos } from "../actions/todoActions";

class TodosComponent extends Component {
  state = {
    addTaskIsActive: false,
    completedTasksIsActive: false,
    optionsIsActive: false,
  };
  addTaskActive = () => {
    this.setState({ addTaskIsActive: true });
  };
  addTaskInactive = () => {
    this.setState({ addTaskIsActive: false });
  };

  showAllTasks() {
    return (
      <ul>
        {this.props.todo.todos
          .filter((t) => t.project == null && t.completed !== true)
          .reverse()
          .map((t) => (
            <li key={t._id}>
              <SingleTask task={t} />
            </li>
          ))}
      </ul>
    );
  }

  showCompletedTasks() {
    return this.state.completedTasksIsActive ? (
      <ul>
        {this.props.todo.todos
          .filter((t) => t.project == null && t.completed === true)
          .reverse()
          .map((t) => (
            <li key={t._id}>
              <SingleTask task={t} />
            </li>
          ))}
      </ul>
    ) : (
      ""
    );
  }

  toggleOptions = () => {
    this.setState({
      optionsIsActive: !this.state.optionsIsActive,
    });
  };

  getDropdownContentClass = () => {
    return this.state.optionsIsActive
      ? "dropdown-content dropdown-content-active"
      : "dropdown-content";
  };

  onShowCompletedTasks = () => {
    this.toggleOptions();
    this.setState({
      completedTasksIsActive: !this.state.completedTasksIsActive,
    });
  };

  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    return (
      <div className="component component-small todos-component">
        <div className="flex-container">
          <h4>Todos</h4>
          <div className="dropdown">
            <i
              className="fas fa-ellipsis-h single-project-options-icon"
              onClick={this.toggleOptions}
            ></i>
            <div id="myDropdown" className={this.getDropdownContentClass()}>
              <div onClick={this.onShowCompletedTasks}>
                show completed tasks
              </div>
            </div>
          </div>
        </div>
        {this.showAllTasks()}
        {this.state.addTaskIsActive ? (
          <AddNewTodo
            addTaskInactive={this.addTaskInactive}
            addTodo={this.props.addTodo}
          />
        ) : (
          <AddTodoButton addTaskActive={this.addTaskActive} />
        )}
        {this.showCompletedTasks()}
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  todo: state.todoReducer,
});

export default connect(mapStateToProps, { getTodos })(TodosComponent);
