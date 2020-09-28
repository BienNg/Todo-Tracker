import React, { Component } from "react";
import { connect } from "react-redux";
import { getSidebarActive } from "../actions/sidebarActions";

class SidebarLeft extends Component {
  componentDidMount() {
    this.props.getSidebarActive();
  }
  render() {
    let spanClass = "";
    let divClassname = "sidebar-left";
    let dashboardClass,
      todolistClass,
      activitiesClass,
      calendarClass,
      projectsClass = "";

    // Set Sidebar active or inactive
    if (!this.props.sidebar.sidebarIsActive) {
      spanClass = "hidden";
      divClassname = "sidebar-left inactive";
    }

    // Set active component
    if (this.props.activeComponent === 1) {
      dashboardClass = "component-active";
    } else if (this.props.activeComponent === 2) {
      todolistClass = "component-active";
    } else if (this.props.activeComponent === 3) {
      projectsClass = "component-active";
    } else if (this.props.activeComponent === 4) {
      activitiesClass = "component-active";
    } else if (this.props.activeComponent === 5) {
      calendarClass = "component-active";
    }

    return (
      <div className={divClassname}>
        <div
          className={dashboardClass}
          onClick={this.props.changeComponent.bind(this, 1)}
        >
          <i className="fas fa-desktop"></i>
          <span className={spanClass}>Dashboard</span>
        </div>
        <div
          className={todolistClass}
          onClick={this.props.changeComponent.bind(this, 2)}
        >
          <i className="far fa-sticky-note"></i>
          <span className={spanClass}>Todo List</span>
        </div>
        <div
          className={projectsClass}
          onClick={this.props.changeComponent.bind(this, 3)}
        >
          <i className="fas fa-list"></i>
          <span className={spanClass}>Projects</span>
        </div>
        <div
          className={activitiesClass}
          onClick={this.props.changeComponent.bind(this, 4)}
        >
          <i className="far fa-clock"></i>
          <span className={spanClass}>My Activites</span>
        </div>
        <div
          className={calendarClass}
          onClick={this.props.changeComponent.bind(this, 5)}
        >
          <i className="far fa-calendar-alt"></i>
          <span className={spanClass}>Calendar</span>
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  sidebar: state.sidebarReducer,
});

export default connect(mapStateToProps, { getSidebarActive })(SidebarLeft);
