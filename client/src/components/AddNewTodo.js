import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todoActions";

class AddNewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      validInput: false,
      addTaskClass: "invalid-button",
    };
  }
  onCklickAddTask = () => {
    if (this.state.validInput) {
      const newTodo = {
        title: this.state.inputValue,
      };
      if (this.props.projectId != null) {
        console.log("PROJECTID " + this.props.projectId);
        newTodo["project"] = this.props.projectId;
      }
      this.props.addTodo(newTodo);
      this.props.addTaskInactive();
    } else {
      console.log("Invalid input");
    }
  };

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value,
    });

    if (evt.target.value === "") {
      this.setState({
        validInput: false,
        addTaskClass: "invalid-button",
      });
    } else {
      this.setState({
        validInput: true,
        addTaskClass: "",
      });
    }
  }
  render() {
    return (
      <div className="add-new-todo">
        <input
          type="text"
          id="inputTodoContent"
          name="inputTodoContent"
          placeholder="e.g Do the dishes"
          value={this.state.inputValue}
          onChange={(evt) => this.updateInputValue(evt)}
          spellCheck="false"
        ></input>
        <div className="container">
          <input
            type="button"
            value="Add Task"
            className={this.state.addTaskClass}
            onClick={this.onCklickAddTask}
          ></input>
          <input
            type="button"
            value="Cancel"
            className="cancel-button"
            onClick={this.props.addTaskInactive}
          ></input>
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  todo: state.todoReducer,
});

export default connect(mapStateToProps, { addTodo })(AddNewTodo);
