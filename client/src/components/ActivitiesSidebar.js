import React, { Component } from "react";
import ActivitiesModal from "./ActivitiesModal";
import { connect } from "react-redux";
import {
  getActivities,
  setActivityModalState,
} from "../actions/activityActions";
import { getProjects } from "../actions/projectActions";
import {
  setActiveActivity,
  setActivityDuration,
  setActiveActivityStart,
  addTrack,
} from "../actions/tracksActions";

/** ActivitiesSidebar Class  */
class ActivitiesSidebar extends Component {
  state = {
    duration: "",
    interval: "",
  };
  getSidebarClass = () => {
    return this.props.sidebar.sidebarIsActive
      ? "activities-sidebar"
      : "activities-sidebar activities-sidebar-small";
  };

  getTimeDifference() {
    const currenteDate = new Date();
    const timeDiff = Math.abs(
      this.props.track.activeActivityStartTime - currenteDate
    );
    const seconds = Math.floor(timeDiff / 1000);
    this.setState({ duration: this.secondsToMSS(seconds) });
  }

  secondsToMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  onPlay = (id) => {
    if (this.props.track.activeActivity !== id) {
      this.props.setActiveActivity(id);
      this.props.setActiveActivityStart(new Date());

      // starting timer
      const interval = setInterval(() => {
        this.getTimeDifference();
      }, 1000);
      this.setState({
        interval: interval,
      });
    } else {
      this.props.setActiveActivity("");
      this.props.setActiveActivityStart(null);
      clearInterval(this.state.interval);
      const newTrack = {
        startDate: this.props.track.activeActivityStartTime,
        endDate: new Date(),
        activity: id,
      };
      this.props.addTrack(newTrack);
      this.setState({
        duration: "",
        interval: "",
      });
    }
  };

  getInnerFlexClass(id) {
    return this.props.track.activeActivity === id
      ? "inner-flex-container blink"
      : "inner-flex-container ";
  }

  getTimerIcon(id) {
    return this.props.track.activeActivity === id
      ? "far fa-pause-circle pause-icon"
      : "far fa-play-circle play-icon";
  }

  getTimerTextClass(id) {
    return this.props.track.activeActivity === id
      ? "timer-duration-text"
      : "timer-duration-text timer-duration-text-hidden";
  }

  renderSidebarActivites() {
    return (
      <ul>
        {this.props.project.projects.reverse().map((p) => (
          <div className="flex-container">
            <li key={p._id} className="flex-container-project-name">
              <div
                className="project-cirlce-icon"
                style={{ backgroundColor: p.color }}
              ></div>
              {p.title}
            </li>
            <div className={this.getInnerFlexClass(p._id)}>
              <span className={this.getTimerTextClass(p._id)}>
                {this.state.duration}
              </span>
            </div>
          </div>
        ))}
      </ul>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  // COMPONENT DID MOUNT
  componentDidMount() {
    this.props.getActivities();
    this.props.getProjects();

    if (
      this.props.track.activeActivity != null &&
      this.props.track.activeActivity !== ""
    ) {
      // starting timer
      const interval = setInterval(() => {
        this.getTimeDifference();
      }, 1000);
      this.setState({
        interval: interval,
      });
    }
  }

  // RENDER COMPONENT
  render() {
    return (
      <div className={this.getSidebarClass()}>
        {this.renderSidebarActivites()}
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  sidebar: state.sidebarReducer,
  project: state.projectReducer,
  track: state.trackReducer,
});

export default connect(mapStateToProps, {
  getActivities,
  getProjects,
  setActivityModalState,
  setActiveActivity,
  setActivityDuration,
  setActiveActivityStart,
  addTrack,
})(ActivitiesSidebar);
