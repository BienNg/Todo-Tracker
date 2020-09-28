import React, { Component } from "react";
import "./App.css";
import SidebarLeft from "./components/SidebarLeft";
import Topbar from "./components/Topbar";
import TodosComponent from "./components/TodosComponent";
import ProjectsComponent from "./components/ProjectsComponent";
import CalendarComponent from "./components/CalendarComponent";
import ActivitiesComponent from "./components/ActivitiesComponent";
import StatisticsComponent from "./components/StatisitcsComponent";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  state = {
    activeComponent: 1,
    todos: [],
  };

  changeComponent = (component) => {
    this.setState({ activeComponent: component });
  };

  renderComponent = () => {
    // 1: Statistics Component
    if (this.state.activeComponent === 1) {
      return <StatisticsComponent />;
      // 2: Todo Component
    } else if (this.state.activeComponent === 2) {
      return <TodosComponent todos={this.state.todos} addTodo={this.addTodo} />;
      // 3: Porjects Component
    } else if (this.state.activeComponent === 3) {
      return <ProjectsComponent />;
      // 4: Activities Component
    } else if (this.state.activeComponent === 4) {
      return <ActivitiesComponent />;
      // 5: Calendar Component
    } else if (this.state.activeComponent === 5) {
      return <CalendarComponent />;
    }
  };

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <header></header>
          <SidebarLeft
            activeComponent={this.state.activeComponent}
            changeComponent={this.changeComponent}
          />
          {this.renderComponent()}
        </div>
      </Provider>
    );
  }
}

export default App;
