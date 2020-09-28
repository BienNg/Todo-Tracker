import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getActivities,
  setActivityTrackModalState,
  setSelectedTrack,
  setTempStartCell,
  setTempEndCell,
} from "../actions/activityActions";
import { getTracks, deleteTrack, updateTrack } from "../actions/tracksActions";
import { addTrack } from "../actions/tracksActions";

class TimetableModal extends Component {
  state = {
    activityDropdownState: false,
    selectedActivity: "",
    selectedActivityId: "",
  };

  /* Sets the Visibility of the class based on Redux State "trackModalState"
   */
  setTimetableModalClass = () => {
    return this.props.activity.trackModalState
      ? "timetable-modal "
      : "timetable-modal-hidden";
  };
  setTransparentClass = () => {
    return this.props.activity.trackModalState
      ? "transparent flex-item"
      : "display-none flex-item";
  };

  setAddTrackModalClass = () => {
    return this.props.activity.trackModalState
      ? "add-track-modal flex-item"
      : "add-track-modal add-track-modal-hidden flex-item";
  };

  setFelxContainerClass = () => {
    return this.props.activity.trackModalState
      ? "flex-container"
      : "display-none";
  };
  closeModal = () => {
    this.props.setTempEndCell(-1);
    this.props.setTempStartCell(-1);
    this.props.setActivityTrackModalState(false);
    this.props.setSelectedTrack("");
  };
  getFirstActivity() {
    const activity = this.props.activity.activities[
      this.props.activity.activities.length - 1
    ];
    return activity ? activity.title : "null";
  }

  getEntryActivityDropdownClass() {
    return this.state.activityDropdownState
      ? ""
      : "entry-activity-dropdown-hidden";
  }

  onClickActivityContainer = () => {
    this.setState({
      activityDropdownState: !this.state.activityDropdownState,
    });
  };

  switchActiveStates = (selectedActivity, selectedActivityId) => {
    this.setState({
      activityDropdownState: false,
    });
    this.setState({
      selectedActivity: selectedActivity,
      selectedActivityId: selectedActivityId,
    });
  };

  getSelectedActivity = () => {
    let title = "";
    if (
      this.props.activity.activities[this.props.activity.activities.length - 1]
    ) {
      title = this.props.activity.activities[
        this.props.activity.activities.length - 1
      ].title;
    }

    this.state.selectedActivity !== ""
      ? (title = this.state.selectedActivity)
      : (title = title);

    if (this.props.activity.selectedTrack !== "") {
      const activeTrack = this.props.track.tracks.find(
        (t) => t._id === this.props.activity.selectedTrack
      );
      let activeActivity = this.props.activity.activities.find(
        (a) => a._id === activeTrack.activity
      );
      if (!activeActivity) {
        activeActivity = this.props.project.projects.find(
          (p) => p._id === activeTrack.activity
        );
      }
      title = activeActivity.title;
    }
    return title;
  };

  getDate = () => {
    let date = new Date();
    if (this.props.activity.selectedActivity === "") {
      date = new Date(
        this.props.activity.activeDate.getFullYear(),
        this.props.activity.activeDate.getMonth(),
        this.props.activity.activeDate.getDate() +
          (((this.props.activity.tempStartCell % 8) % 7) -
            this.props.activity.activeDate.getDay())
      );
    } else {
      if (this.props.track.tracks.length > 0) {
        date = this.getStartDate();
      }
    }
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  };

  getStartDate = () => {
    // Check if Modal is opened by a new Entry or an existing Entry
    if (this.props.activity.selectedTrack === "") {
      let startTime = 0;
      if (this.props.activity.tempStartCell < this.props.activity.tempEndCell) {
        startTime = (Math.floor(this.props.activity.tempStartCell / 8) - 1) / 2;
      } else {
        startTime = (Math.floor(this.props.activity.tempEndCell / 8) - 1) / 2;
      }
      const startDate = new Date(
        this.props.activity.activeDate.getFullYear(),
        this.props.activity.activeDate.getMonth(),
        this.props.activity.activeDate.getDate() +
          (((this.props.activity.tempStartCell % 8) % 7) -
            this.props.activity.activeDate.getDay()),
        Math.floor(startTime),
        60 * (startTime - Math.floor(startTime))
      );
      return startDate;
    }
    // Get Start Date of Existing Entry
    else {
      const selectedTrack = this.props.track.tracks.find(
        (t) => t._id === this.props.activity.selectedTrack
      );
      return new Date(selectedTrack.startDate);
    }
  };

  getStartTime = () => {
    const startDate = this.getStartDate();
    return (
      String(startDate.getHours()).padStart(2, "0") +
      ":" +
      String(startDate.getMinutes()).padStart(2, "0")
    );
  };

  getEndDate = () => {
    // Check if Modal is opened by a new Entry or an existing Entry
    if (this.props.activity.selectedTrack === "") {
      let endTime = 0;
      if (this.props.activity.tempStartCell < this.props.activity.tempEndCell) {
        endTime =
          (Math.floor((this.props.activity.tempEndCell + 8) / 8) - 1) / 2;
      } else {
        endTime =
          (Math.floor((this.props.activity.tempStartCell + 8) / 8) - 1) / 2;
      }
      const endDate = new Date(
        this.props.activity.activeDate.getFullYear(),
        this.props.activity.activeDate.getMonth(),
        this.props.activity.activeDate.getDate() +
          (((this.props.activity.tempStartCell % 8) % 7) -
            this.props.activity.activeDate.getDay()),
        Math.floor(endTime),
        60 * (endTime - Math.floor(endTime))
      );
      return endDate;
    }
    // Get Start Date of Existing Entry
    else {
      const selectedTrack = this.props.track.tracks.find(
        (t) => t._id === this.props.activity.selectedTrack
      );
      return new Date(selectedTrack.endDate);
    }
  };

  getEndTime = () => {
    const endDate = this.getEndDate();
    return (
      String(endDate.getHours()).padStart(2, "0") +
      ":" +
      String(endDate.getMinutes()).padStart(2, "0")
    );
  };

  saveEntry = () => {
    let activityId = this.state.selectedActivityId;
    if (activityId === "") {
      activityId = this.props.activity.activities[
        this.props.activity.activities.length - 1
      ]._id;
    }
    const track = {
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      activity: activityId,
    };
    // Creating new track if a new entry was created.
    // Otherwise, edit the existing entry.
    if (this.props.activity.selectedTrack === "") {
      this.props.addTrack(track);
    }
    // Editing existing track
    else {
      this.props.updateTrack(this.props.activity.selectedTrack, track);
    }

    this.closeModal();
  };

  deleteEntry = () => {
    if (this.props.activity.selectedTrack !== "") {
      this.props.deleteTrack(this.props.activity.selectedTrack);
    }
    this.closeModal();
  };

  // COMPONENT DID MOUNT
  componentDidMount() {
    this.props.getTracks();
  }

  // RENDER
  render() {
    return (
      <div className={this.setTimetableModalClass()}>
        <div className={this.setFelxContainerClass()}>
          <div
            className={this.setTransparentClass()}
            onClick={this.closeModal}
          ></div>
          <div className={this.setAddTrackModalClass()}>
            <h2>Edit time entry</h2>
            <p className="display">Activity</p>
            <p
              className="text flex-container-x"
              onClick={this.onClickActivityContainer}
            >
              {this.getSelectedActivity()}
              <i className="fas fa-chevron-down down-icon"></i>
            </p>
            <div
              id="entry-activity-dropdown"
              className={this.getEntryActivityDropdownClass()}
            >
              {this.props.activity.activities.map((act) => (
                <div
                  className="activity-dropdown-item"
                  onClick={() => this.switchActiveStates(act.title, act._id)}
                >
                  {act.title}
                </div>
              ))}
              {this.props.project.projects.map((p) => (
                <div
                  className="activity-dropdown-item"
                  onClick={() => this.switchActiveStates(p.title, p._id)}
                >
                  {p.title}
                </div>
              ))}
            </div>
            <div className="flex-container-date">
              <div>
                <p className="display">Start</p>
                <p className="text">{this.getDate()}</p>
              </div>
              <div>
                <p className="display">Time</p>
                <p className="text">{this.getStartTime()}</p>
              </div>
            </div>
            <div className="flex-container-date">
              <div>
                <p className="display">End</p>
                <p className="text">{this.getDate()}</p>
              </div>
              <div>
                <p className="display">Time</p>
                <p className="text">{this.getEndTime()}</p>
              </div>
            </div>
            <div className="add-entry-flex-container-buttons">
              <div
                className="add-entry-cancel-button"
                onClick={this.deleteEntry}
              >
                Delete
              </div>
              <div className="add-entry-safe-button" onClick={this.saveEntry}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  activity: state.activityReducer,
  project: state.projectReducer,
  track: state.trackReducer,
});

export default connect(mapStateToProps, {
  setActivityTrackModalState,
  getActivities,
  addTrack,
  setSelectedTrack,
  getTracks,
  setTempStartCell,
  setTempEndCell,
  deleteTrack,
  updateTrack,
})(TimetableModal);
