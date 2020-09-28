import React, { Component, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { getTodos } from "../actions/todoActions";
import {
  deleteProject,
  updateProject,
  getProjects,
} from "../actions/projectActions";
import SingleTask from "./SingleTask";
import AddTodoButton from "./AddTodoButton";
import AddNewTodo from "./AddNewTodo";
import ProjectColorSelector from "./ProjectColorSelector";

/** Delete Modal */
function DeleteModal(props) {
  return (
    <Modal
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {props.project.title}?</p>
      </Modal.Body>
      <Modal.Footer>
        <input
          type="button"
          value="Delete"
          onClick={props.deleteProject}
        ></input>
        <input
          type="button"
          value="Cancel"
          className="cancel-button"
          onClick={props.onHide}
        ></input>
      </Modal.Footer>
    </Modal>
  );
}
/**Edit Modal */
function EditModal(props) {
  const [input, setInput] = useState(props.project.title);
  const [projectId, setProjectId] = useState(props.project._id);
  if (projectId !== props.project._id) {
    setInput(props.project.title);
    setProjectId(props.project._id);
  }
  const editProject = () => {
    const newProject = {
      title: document.getElementById("editProjectname").value,
    };
    props.updateProject(props.project._id, newProject);
    props.getProjects();
    props.onHide();
  };
  const updateInputValue = (evt) => {
    setInput(evt.target.value);
  };

  const onCancel = () => {
    props.onHide();
  };

  return (
    <Modal
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      id="editModalId"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <input
            autoFocus
            type="text"
            id="editProjectname"
            name="editProjectname"
            value={input}
            onChange={(evt) => updateInputValue(evt)}
            spellCheck="false"
          ></input>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectColorSelector selectedProject={props.project} />
      </Modal.Body>
      <Modal.Footer>
        <input type="button" value="Save" onClick={editProject}></input>
        <input
          type="button"
          value="Cancel"
          className="cancel-button"
          onClick={onCancel}
        ></input>
      </Modal.Footer>
    </Modal>
  );
}

/** SingleProject Component */
class SingleProject extends Component {
  // STATES
  state = {
    addTaskIsActive: false,
    optionsIsActive: false,
    deleteModalShow: false,
    editModalShow: false,
    completedTasksIsActive: false,
  };

  addTaskActive = () => {
    this.setState({ addTaskIsActive: true });
  };
  addTaskInactive = () => {
    this.setState({ addTaskIsActive: false });
  };

  showAllTasks(projectId) {
    const projectTodos = this.props.todo.todos.filter(
      (t) => t.project == projectId && t.completed != true
    );
    return projectTodos.length != 0 ? (
      <ul>
        {projectTodos.reverse().map((t) => (
          <li key={t._id}>
            <SingleTask task={t} />
          </li>
        ))}
      </ul>
    ) : (
      <p>No Todos here</p>
    );
  }

  getSingleProjectClass() {
    return this.props.sidebar.sidebarIsActive
      ? "single-project"
      : "single-project single-project-small";
  }

  getDropdownContentClass = () => {
    return this.state.optionsIsActive
      ? "dropdown-content dropdown-content-active"
      : "dropdown-content";
  };

  toggleOptions = () => {
    this.setState({
      optionsIsActive: !this.state.optionsIsActive,
    });
  };

  handleKeyPress = (event) => {
    console.log("key pressed");
  };

  setModalShow = (state) => {
    this.setState({
      deleteModalShow: state,
    });
  };

  hideEditModal = () => {
    this.setState({
      editModalShow: false,
    });
  };

  onDelete = () => {
    this.setState({
      deleteModalShow: true,
      optionsIsActive: false,
    });
  };
  onEdit = () => {
    this.setState({
      editModalShow: true,
      optionsIsActive: false,
    });
  };

  showCompletedTasks(projectId) {
    return this.state.completedTasksIsActive ? (
      <ul>
        {this.props.todo.todos
          .filter((t) => t.project == projectId && t.completed == true)
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

  onShowCompletedTasks = () => {
    this.setState({
      optionsIsActive: false,
      completedTasksIsActive: !this.state.completedTasksIsActive,
    });
  };

  onMouseDown = () => {
    this.setState({
      optionsIsActive: false,
    });
  };

  componentDidMount() {
    this.props.getTodos();
    this.props.getProjects();
    document.addEventListener("mouseup", this.onMouseDown, false);
  }

  /** RENDER */
  render() {
    const activeProject = this.props.project.projects.find(
      (p) => p._id === this.props.activeProject
    );
    return (
      <div className={this.getSingleProjectClass()}>
        <div className="flex-container">
          <h4>{activeProject.title}</h4>
          <div className="dropdown">
            <i
              className="fas fa-ellipsis-h single-project-options-icon"
              onClick={this.toggleOptions}
            ></i>
            <div className={this.getDropdownContentClass()}>
              <div onClick={this.onEdit}>edit</div>
              <hr />
              <div onClick={this.onShowCompletedTasks}>
                show completed tasks
              </div>
              <hr />
              <div onClick={this.onDelete}>delete</div>
            </div>
          </div>
        </div>

        {this.showAllTasks(this.props.activeProject)}
        {this.state.addTaskIsActive ? (
          <AddNewTodo
            addTaskInactive={this.addTaskInactive}
            addTodo={this.props.addTodo}
            projectId={activeProject._id}
          />
        ) : (
          <AddTodoButton addTaskActive={this.addTaskActive} />
        )}

        <DeleteModal
          show={this.state.deleteModalShow}
          onHide={() => this.setModalShow(false)}
          project={activeProject}
          deleteProject={() => this.props.deleteProject(activeProject._id)}
        ></DeleteModal>
        {
          <EditModal
            show={this.state.editModalShow}
            onHide={this.hideEditModal}
            project={activeProject}
            updateProject={this.props.updateProject}
            getProjects={this.props.getProjects}
          ></EditModal>
        }

        {this.showCompletedTasks(this.props.activeProject)}
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  project: state.projectReducer,
  todo: state.todoReducer,
  sidebar: state.sidebarReducer,
});

export default connect(mapStateToProps, {
  getTodos,
  deleteProject,
  updateProject,
  getProjects,
})(SingleProject);
