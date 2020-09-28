import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {
  setProjectModalState,
  updateModalInput,
  addProject,
  setProjectColor,
} from "../actions/projectActions";
import ProjectColorSelector from "./ProjectColorSelector";

class ProjectsModal extends Component {
  state = {
    validInput: false,
    addProjectClass: "invalid-button",
  };
  closeModal = () => {
    this.props.setProjectModalState(false);
    this.props.setProjectColor("");
    this.setState({
      validInput: false,
      addProjectClass: "invalid-button",
    });
  };

  updateInputValue = (evt) => {
    this.props.updateModalInput(evt.target.value);

    if (evt.target.value === "") {
      this.setState({
        validInput: false,
        addProjectClass: "invalid-button",
      });
    } else {
      this.setState({
        validInput: true,
        addProjectClass: "",
      });
    }
  };
  onClickAddProject = () => {
    if (this.props.project.modalInput !== "") {
      // Adding project to DB
      const newProject = {
        title: this.props.project.modalInput,
        color: this.props.project.projectColor,
      };
      this.props.addProject(newProject);

      this.closeModal();
    }
  };
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          id="addModalId"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Project name</p>
            <input
              type="text"
              onChange={(evt) => this.updateInputValue(evt)}
              spellCheck="false"
            ></input>

            <ProjectColorSelector />
          </Modal.Body>
          <Modal.Footer>
            <input
              type="button"
              value="Add Project"
              className={this.state.addProjectClass}
              onClick={this.onClickAddProject}
            ></input>
            <input
              type="button"
              value="Cancel"
              className="cancel-button"
              onClick={this.closeModal}
            ></input>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  project: state.projectReducer,
});

export default connect(mapStateToProps, {
  setProjectModalState,
  updateModalInput,
  addProject,
  setProjectColor,
})(ProjectsModal);
