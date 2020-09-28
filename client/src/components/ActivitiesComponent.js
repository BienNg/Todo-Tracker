import { connect } from "react-redux";
import React, { Component } from "react";
import ActivitiesSidebar from "./ActivitiesSidebar";
import TimetableData from "./TimetableData";
import TimetableModal from "./TimetableModal";
import { getActivities, setActiveDate } from "../actions/activityActions";
import { getTracks } from "../actions/tracksActions";

class ActivitiesComponent extends Component {
  state = {
    activeDate: new Date(),
  };
  gridContent = [];
  getComponentClass() {
    return this.props.sidebar.sidebarIsActive
      ? " activities-component sidebar-extended"
      : " activities-component sidebar-collapsed";
  }

  generateGridCellNumbers() {
    if (this.gridContent.length === 0) {
      for (var i = 0; i < 384; i++) {
        this.gridContent.push(i);
      }
    }
  }

  getNextWeek = () => {
    let nextWeek = new Date(
      this.props.activity.activeDate.getFullYear(),
      this.props.activity.activeDate.getMonth(),
      this.props.activity.activeDate.getDate() + 7
    );
    this.setState({
      activeDate: nextWeek,
    });
    this.props.setActiveDate(nextWeek);
  };

  getPreviousWeek = () => {
    let previousWeek = new Date(
      this.props.activity.activeDate.getFullYear(),
      this.props.activity.activeDate.getMonth(),
      this.props.activity.activeDate.getDate() - 7
    );
    this.setState({
      activeDate: previousWeek,
    });
    this.props.setActiveDate(previousWeek);
  };

  resetActiveDate = () => {
    let date = new Date();
    this.setState({
      activeDate: date,
    });
    this.props.setActiveDate(date);
  };

  // COMPONENT DID MOUNT
  componentDidMount() {
    this.props.getActivities();
    this.props.getTracks();
  }

  // RENDER
  render() {
    this.generateGridCellNumbers();
    return (
      <div className={this.getComponentClass()}>
        <ActivitiesSidebar />

        {/* HEADER SECTION*/}
        <div className="timetable-header">
          <div className="date">
            <i
              className="fas fa-chevron-left calendar-arrow-icon"
              onClick={this.getPreviousWeek}
            ></i>
            <h1>
              {this.props.activity.activeDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              <span> </span>
              {this.props.activity.activeDate.getFullYear()}
            </h1>
            <i
              className="fas fa-chevron-right calendar-arrow-icon"
              onClick={this.getNextWeek}
            ></i>
            <h2 onClick={this.resetActiveDate}>Today </h2>
          </div>
        </div>
        <div className="timetable">
          {this.gridContent.map((c) => (
            <TimetableData
              cellNumber={c}
              date={this.props.activity.activeDate}
            />
          ))}

          <TimetableModal />
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  sidebar: state.sidebarReducer,
  activity: state.activityReducer,
  track: state.trackReducer,
});

export default connect(mapStateToProps, {
  getActivities,
  setActiveDate,
  getTracks,
})(ActivitiesComponent);
