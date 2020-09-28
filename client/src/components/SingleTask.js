import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../actions/todoActions";

class SingleTask extends Component {
  state = {
    hoverActive: false,
    trashIconClass: "far fa-trash-alt icon-hidden",
    editIconClass: "far fa-edit icon-hidden",
    editStateActive: false,
    inputValue: this.props.task.title,
    singleTaskClass: "single-task",
    checkIconClass: "",
  };

  mouseOver = (e) => {
    this.setState({
      trashIconClass: "far fa-trash-alt icon-visible",
      editIconClass: "far fa-edit icon-visible",
    });
  };

  mouseOut = (e) => {
    this.setState({
      trashIconClass: "far fa-trash-alt icon-hidden",
      editIconClass: "far fa-edit icon-hidden",
    });
  };

  onDeleteClick = (e) => {
    console.log("Delete Click on item " + this.props.task._id);
    this.props.deleteTodo(this.props.task._id);
  };

  onClickEdit = (e) => {
    this.setState({
      editStateActive: true,
    });
  };

  onClickRadiobox = (e) => {
    const updatedTodo = this.props.task;
    updatedTodo.completed
      ? (updatedTodo.completed = false)
      : (updatedTodo.completed = true);
    console.log(updatedTodo.completed);
    this.props.updateTodo(updatedTodo._id, updatedTodo);
    this.setCompletedState();
  };

  showTask() {
    return (
      <div
        className={this.state.singleTaskClass}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
      >
        <div className="outer-flex-container">
          <div className="inner-flex-container">
            <div className="radio-box" onClick={this.onClickRadiobox}>
              <i className={this.state.checkIconClass}></i>
            </div>
            <p>{this.props.task.title}</p>
          </div>
          <div className="inner-flex-container">
            <i
              className={this.state.editIconClass}
              onClick={this.onClickEdit}
            ></i>
            <i
              className={this.state.trashIconClass}
              onClick={this.onDeleteClick}
            ></i>
          </div>
        </div>
      </div>
    );
  }

  setEditInactive = () => {
    this.setState({
      editStateActive: false,
    });
  };

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  saveEdit = () => {
    const updatedTodo = this.props.task;
    updatedTodo.title = this.state.inputValue;
    this.props.updateTodo(updatedTodo._id, updatedTodo);
    this.setState({
      editStateActive: false,
    });
  };

  showEdit() {
    return (
      <div className="add-new-todo">
        <input
          type="text"
          id="inputTodoContent"
          name="inputTodoContent"
          value={this.state.inputValue}
          onChange={(evt) => this.updateInputValue(evt)}
        ></input>
        <div className="container">
          <input
            type="button"
            value="Save"
            className={this.state.addTaskClass}
            onClick={this.saveEdit}
          ></input>
          <input
            type="button"
            value="Cancel"
            className="cancel-button"
            onClick={this.setEditInactive}
          ></input>
        </div>
      </div>
    );
  }

  setCompletedState() {
    this.props.task.completed
      ? this.setState({
          singleTaskClass: "single-task single-task-completed",
          checkIconClass: "fas fa-check fa-xs check-icon-visible",
        })
      : this.setState({
          singleTaskClass: "single-task",
          checkIconClass: "fas fa-check fa-xs check-icon-hidden",
        });
  }

  componentDidMount() {
    this.setCompletedState();
  }

  render() {
    return this.state.editStateActive ? this.showEdit() : this.showTask();
  }
}

// Redux States
const mapStateToProps = (state) => ({
  todo: state.todoReducer,
});

export default connect(mapStateToProps, { deleteTodo, updateTodo })(SingleTask);
