import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { toggleSidebar } from "../actions/sidebarActions";
import { render } from "@testing-library/react";

class Topbar extends Component {
  toggleSidebar = (e) => {
    this.setState({ sidebarActive: !this.state.sidebarActive });
  };

  render() {
    return (
      <div className="top-bar">
        <i
          id="menu-button-left"
          className="fas fa-bars icon-button"
          onClick={this.props.toggleSidebar}
        ></i>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  sidebar: state.sidebarReducer,
});

export default connect(mapStateToProps, { toggleSidebar })(Topbar);
