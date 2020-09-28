import React, { Component } from "react";
import { connect } from "react-redux";
import { setProjectColor } from "../actions/projectActions";

class ProjectColorSelector extends Component {
  colors = [
    "#fbff12",
    "#ffbe0b",
    "#f94144",
    "#fb5607",
    "#ff006e",
    "#720026",
    "#8338ec",
    "#7209b7",
    "#3a0ca3",
    "#4361ee",
    "#3a86ff",
    "#0ead69",
    "#3bceac",
    "#91e5f6",
    "#5e3023",
    "#3c6e71",
    "#284b63",
    "#353535",
  ];

  onClickColor = (color) => {
    this.props.setProjectColor(color);
  };

  getCheckIconClass = (color) => {
    if (this.props.project.projectColor !== "") {
      return this.props.project.projectColor === color
        ? "fas fa-check check-icon"
        : "fas fa-check check-icon check-icon-hidden";
    } else if (this.props.selectedProject) {
      return this.props.selectedProject.color === color
        ? "fas fa-check check-icon"
        : "fas fa-check check-icon check-icon-hidden";
    }
  };

  render() {
    return (
      <div className="grid-container">
        {this.colors.map((color) => (
          <div
            className="project-color"
            style={{ backgroundColor: color }}
            onClick={() => this.onClickColor(color)}
          >
            <i className={this.getCheckIconClass(color)}></i>
          </div>
        ))}
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  project: state.projectReducer,
});
export default connect(mapStateToProps, { setProjectColor })(
  ProjectColorSelector
);
