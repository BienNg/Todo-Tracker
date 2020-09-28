import React, { Component } from "react";
import { connect } from "react-redux";

class CalendarComponent extends Component {
  state = {
    activeDate: new Date(),
    daysOfTheMonth: [],
  };

  getCalendarWeek(date) {
    let onejan = new Date(date.getFullYear(), 0, 1);
    let week =
      Math.ceil(((date - onejan) / 86400000 + date.getDay() + 1) / 7) + 1;
    return week;
  }

  getCalendarContenClass(type) {
    return type === "week" ? "calendar-week " : "calendar-day";
  }

  resetActiveDate = () => {
    let date = new Date();
    let daysOfTheMonth = this.getDaysOfTheMonth(date);
    this.setState({
      activeDate: date,
      daysOfTheMonth: daysOfTheMonth,
    });
  };

  getNextMonth = () => {
    const nextDate = new Date(
      this.state.activeDate.getFullYear(),
      (this.state.activeDate.getMonth() + 1) % 12,
      1
    );
    const nextDaysOfTheMonth = this.getDaysOfTheMonth(nextDate);
    this.setState({
      activeDate: nextDate,
      daysOfTheMonth: nextDaysOfTheMonth,
    });
  };
  getPreviousMonth = () => {
    const nextDate = new Date(
      this.state.activeDate.getFullYear(),
      (this.state.activeDate.getMonth() - 1) % 12,
      1
    );
    const nextDaysOfTheMonth = this.getDaysOfTheMonth(nextDate);
    this.setState({
      activeDate: nextDate,
      daysOfTheMonth: nextDaysOfTheMonth,
    });
  };

  getDaysOfTheMonth(date) {
    const daysInMonth =
      new Date(date.getFullYear(), date.getMonth(), 0).getDate() + 1;
    let dayCounter = 1;
    let tempDaysOfMonth = [];
    let currentWeek = "";

    while (dayCounter <= daysInMonth) {
      const currentDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        dayCounter
      );
      if (currentWeek == "") {
        currentWeek = this.getCalendarWeek(currentDate);
        tempDaysOfMonth.push({
          type: "week",
          number: "CW " + (currentWeek - 1),
        });
        if (currentDate.getDay() === 0) {
          for (let i = 1; i < 7; i++) {
            tempDaysOfMonth.push({ type: "day", number: "" });
          }
          tempDaysOfMonth.push({ type: "day", number: dayCounter });
        } else {
          for (let i = 1; i < currentDate.getDay(); i++) {
            tempDaysOfMonth.push({ type: "day", number: "" });
          }
          tempDaysOfMonth.push({ type: "day", number: dayCounter });
        }
      } else {
        if (currentDate.getDay() === 1) {
          currentWeek = this.getCalendarWeek(currentDate);
          tempDaysOfMonth.push({ type: "week", number: "CW " + currentWeek });
          tempDaysOfMonth.push({ type: "day", number: dayCounter });
        } else {
          tempDaysOfMonth.push({ type: "day", number: dayCounter });
        }
      }
      dayCounter++;
    }
    return tempDaysOfMonth;
  }

  getComponentClass() {
    return this.props.sidebar.sidebarIsActive
      ? "calendar-component sidebar-extended"
      : "calendar-component sidebar-collapsed";
  }

  componentDidMount() {
    this.setState({
      daysOfTheMonth: this.getDaysOfTheMonth(this.state.activeDate),
    });
  }

  render() {
    return (
      <div className={this.getComponentClass()}>
        <div className="flex-container">
          <div className="calendar-container">
            <h1>
              {this.state.activeDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              <span> </span>
              {this.state.activeDate.getFullYear()}
            </h1>
            <i
              className="fas fa-chevron-left calendar-arrow-icon"
              onClick={this.getPreviousMonth}
            ></i>
            <i
              className="fas fa-chevron-right calendar-arrow-icon"
              onClick={this.getNextMonth}
            ></i>
            <h2 onClick={this.resetActiveDate}>T</h2>
            <div className="calendar-week"></div>
            <div className="calendar-header">Mon</div>
            <div className="calendar-header">Tue</div>
            <div className="calendar-header">Wed</div>
            <div className="calendar-header">Thu</div>
            <div className="calendar-header">Fri</div>
            <div className="calendar-header">Sat</div>
            <div className="calendar-header">Sun</div>
            {this.state.daysOfTheMonth.map((item) => (
              <div className={this.getCalendarContenClass(item.type)}>
                {" "}
                {item.number}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  sidebar: state.sidebarReducer,
});
export default connect(mapStateToProps)(CalendarComponent);
