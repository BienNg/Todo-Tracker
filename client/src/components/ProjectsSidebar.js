import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setProjectModalState,
  setActiveProject,
} from "../actions/projectActions";
import ProjectsModal from "./ProjectsModal";

class ProjectsSidebar extends Component {
  getSidebarClass = () => {
    return this.props.sidebar.sidebarIsActive
      ? "projects-sidebar"
      : "projects-sidebar projects-sidebar-small";
  };

  openModal = () => {
    this.props.setProjectModalState(true);
  };

  setActiveProject = (projectId) => {
    this.props.setActiveProject(projectId);
  };

  setLiClass = (projectId) => {
    return projectId === this.props.project.activeProject
      ? "project-sidebar-flex active"
      : "project-sidebar-flex";
  };

  projectsSidebarList = () => {
    return (
      <ul>
        {this.props.project.projects.reverse().map((p) => (
          <li key={p._id} onClick={() => this.setActiveProject(p._id)}>
            <div className={this.setLiClass(p._id)}>
              <div
                className="project-cirlce-icon"
                style={{ backgroundColor: p.color }}
              ></div>
              <p>{p.title}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // RENDER
  render() {
    return (
      <div className={this.getSidebarClass()}>
        <i className="fas fa-plus add-icon" onClick={this.openModal}></i>

        <ProjectsModal
          className="modal"
          show={this.props.project.projectsModalState}
        />

        {this.projectsSidebarList()}
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  sidebar: state.sidebarReducer,
  project: state.projectReducer,
});
export default connect(mapStateToProps, {
  setProjectModalState,
  setActiveProject,
})(ProjectsSidebar);
