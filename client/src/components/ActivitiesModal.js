import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {
  setActivityModalState,
  updateActivityModalInput,
  addActivity,
} from "../actions/activityActions";
import ProjectColorSelector from "./ProjectColorSelector";

class ActivitiesModal extends Component {
  state = {
    validInput: false,
    addActivitiesClass: "invalid-button",
  };
  closeModal = () => {
    this.props.setActivityModalState(false);
    this.setState({
      validInput: false,
      addActivitiesClass: "invalid-button",
    });
  };

  updateInputValue = (evt) => {
    this.props.updateActivityModalInput(evt.target.value);

    if (evt.target.value === "") {
      this.setState({
        validInput: false,
        addActivityClass: "invalid-button",
      });
    } else {
      this.setState({
        validInput: true,
        addActivityClass: "",
      });
    }
  };
  onClickAddActivity = () => {
    if (this.props.activity.modalInput !== "") {
      const newActivity = {
        title: this.props.activity.modalInput,
        color: this.props.project.projectColor,
      };
      this.props.addActivity(newActivity);

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
          id="addActivityId"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add activity
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Activity name</p>
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
              value="Add Activity"
              className={this.state.addActivityClass}
              onClick={this.onClickAddActivity}
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
  activity: state.activityReducer,
  project: state.projectReducer,
});

export default connect(mapStateToProps, {
  setActivityModalState,
  updateActivityModalInput,
  addActivity,
})(ActivitiesModal);
