import React, { Component } from "react";
import ProjectsSidebar from "./ProjectsSidebar";
import SingleProject from "./SingleProject";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";

class ProjectsComponent extends Component {
  // COMPONENT DID MOUNT
  componentDidMount() {
    this.props.getProjects();
  }

  projectsSidebarList = () => {
    return (
      <ul>
        {this.props.project.projects.reverse().map((p) => (
          <li key={p._id}>{p.title}</li>
        ))}
      </ul>
    );
  };

  getProjectContent = () => {
    return this.props.project.activeProject === "" ? (
      ""
    ) : (
      <SingleProject
        activeProject={this.props.project.activeProject}
      ></SingleProject>
    );
  };

  // RENDER
  render() {
    return (
      <div className="component">
        <ProjectsSidebar />
        <div className="project-component-content">
          {this.getProjectContent()}
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  project: state.projectReducer,
});
export default connect(mapStateToProps, { getProjects })(ProjectsComponent);
