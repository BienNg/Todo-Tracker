import React, { Component } from "react";

class AddTodoButton extends Component {
  render() {
    return (
      <div className="add-todo" onClick={this.props.addTaskActive}>
        <i className="fas fa-plus"></i>
        <span>Add task</span>
      </div>
    );
  }
}

export default AddTodoButton;
