import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setTempStartCell,
  setTempEndCell,
  setActivityTrackModalState,
  setActiveDate,
  setSelectedTrack,
} from "../actions/activityActions";

import { getProjects } from "../actions/projectActions";

class TimetableData extends Component {
  // State of Mouse-Is-Down
  mouseIsDown = false;

  // Setting this cells kind (Weekday, Time or Normal Cell)
  generateCellContent() {
    let nextDay = new Date();
    nextDay.setDate(this.props.date.getDate() + 1);
    let content;

    // Weekdays Row
    if (this.props.cellNumber < 8 && this.props.cellNumber > 0) {
      if (this.props.date.getDay() === this.props.cellNumber % 7) {
        content = (
          <div className="timetable-weekdays active-weekday">
            {this.getDayofTheMonth()}
          </div>
        );
      } else {
        content = (
          <div className="timetable-weekdays">{this.getDayofTheMonth()}</div>
        );
      }
    }
    // Times Columns
    else if (this.props.cellNumber % 8 == 0 && this.props.cellNumber > 0) {
      // Hours Cell
      if (this.props.cellNumber % 16 != 0) {
        let timeCounter = Math.floor(this.props.cellNumber / 8 / 2);
        content = <div className="timetable-time">{timeCounter + ":00"}</div>;
        timeCounter++;
      }
      // Non Hours Cell
      else {
        content = <div className="timetable-time "></div>;
      }
    }
    // Normal Cell
    else if (this.props.cellNumber > 0) {
      content = <div className="normal-cell"></div>;
      let timeCellIsTrackedNormal =
        this.props.cellNumber % 8 === this.props.activity.tempStartCell % 8 &&
        this.props.cellNumber >= this.props.activity.tempStartCell &&
        this.props.cellNumber <= this.props.activity.tempEndCell;
      let timeCellIsTrackedReversed =
        this.props.activity.tempEndCell !== -1 &&
        this.props.activity.tempStartCell > this.props.activity.tempEndCell &&
        this.props.cellNumber % 8 === this.props.activity.tempStartCell % 8 &&
        this.props.cellNumber <= this.props.activity.tempStartCell &&
        this.props.cellNumber >= this.props.activity.tempEndCell;

      // Normal Cell with strong border
      if (
        this.props.cellNumber % 16 < 8 &&
        !timeCellIsTrackedNormal &&
        !timeCellIsTrackedReversed
      ) {
        content = <div className="normal-cell strong-border"></div>;
      }
    }

    return content;
  }

  getDayofTheMonth() {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let date =
      this.props.date.getDate() +
      this.props.cellNumber -
      this.props.date.getDay();

    const comparissonDate = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth() + 1,
      0
    );
    if (date < 1) {
      date = comparissonDate.getDate() + date;
    } else if (date >= comparissonDate.getDate() + 1) {
      console.log("Month: " + comparissonDate.getMonth());
      console.log("Days: " + comparissonDate.getDate());

      date = date - comparissonDate.getDate();
    }
    return weekDays[this.props.cellNumber - 1] + " " + date;
  }

  generateCellContentTest() {
    return this.props.cellNumber;
  }

  handleMouseDown = (e) => {
    if (e.target.id === "") {
      if (this.props.cellNumber > 8 && this.props.cellNumber % 8 !== 0) {
        this.props.setTempStartCell(this.props.cellNumber);
      } else {
        this.props.setTempStartCell(-1);
      }
      this.props.setTempEndCell(-1);
    } else {
      this.props.setTempStartCell(-1);
      this.props.setTempEndCell(-1);
    }
  };

  handleMouseUp = (e) => {
    if (e.target.id === "") {
      if (this.props.activity.tempStartCell !== -1) {
        let startCol = this.props.activity.tempStartCell % 8;
        let endCol = this.props.cellNumber % 8;
        if (startCol === endCol) {
          this.props.setTempEndCell(this.props.cellNumber);
        } else if (startCol !== endCol) {
          let endCell = this.props.cellNumber + (startCol - endCol);

          this.props.setTempEndCell(endCell);
        }
        this.props.setActivityTrackModalState(true);
      }
    } else {
      this.props.setTempStartCell(-1);
      this.props.setTempEndCell(-1);
      this.props.setSelectedTrack(e.target.id);
      this.props.setActivityTrackModalState(true);
    }
  };

  handleHover = () => {
    if (this.mouseIsDown && this.props.activity.tempStartCell !== -1) {
      let startCol = this.props.activity.tempStartCell % 8;
      let endCol = this.props.cellNumber % 8;
      if (startCol === endCol) {
        this.props.setTempEndCell(this.props.cellNumber);
      } else if (startCol !== endCol) {
        let endCell = this.props.cellNumber + (startCol - endCol);
        this.props.setTempEndCell(endCell);
      }
    }
  };
  setMouseDown() {
    console.log(this.mouseIsDown);
    this.mouseIsDown = true;
  }
  setMouseUp() {
    this.mouseIsDown = false;
  }

  getCellContent = () => {
    let cellContent = this.generateCellContent();
    let trackId = "";
    let className = "timetable-data";
    let activityColor = "";

    // Setting Start Entry
    if (
      (this.props.activity.tempStartCell === this.props.cellNumber &&
        (this.props.activity.tempEndCell === -1 ||
          this.props.activity.tempStartCell <
            this.props.activity.tempEndCell)) ||
      (this.props.activity.tempEndCell <= this.props.activity.tempStartCell &&
        this.props.activity.tempEndCell === this.props.cellNumber)
    ) {
      className = "timetable-data-boderless timetable-cell-data-start";
    }
    // Setting End Entry
    if (
      (this.props.activity.tempEndCell === this.props.cellNumber &&
        this.props.activity.tempStartCell < this.props.activity.tempEndCell) ||
      (this.props.activity.tempEndCell !== -1 &&
        this.props.activity.tempStartCell === this.props.cellNumber &&
        this.props.activity.tempEndCell <= this.props.activity.tempStartCell)
    ) {
      // Check if entry was created by dragging from top to down or down to top
      if (
        this.props.activity.tempStartCell !== this.props.activity.tempEndCell
      ) {
        className = "timetable-data-boderless timetable-cell-data-end";
      } else {
        className =
          "timetable-data-boderless timetable-cell-data-start timetable-cell-data-end";
      }
    }

    // Check if cell is middle of an entry
    if (
      this.props.activity.tempStartCell !== -1 &&
      this.props.activity.tempEndCell !== -1
    ) {
      const thisColGroup = this.props.cellNumber % 8;
      const startColGroup = this.props.activity.tempStartCell % 8;
      if (
        this.props.activity.tempStartCell < this.props.activity.tempEndCell &&
        thisColGroup === startColGroup &&
        this.props.cellNumber > this.props.activity.tempStartCell &&
        this.props.cellNumber < this.props.activity.tempEndCell - 6
      ) {
        className = "timetable-data-boderless timetable-cell-data-mid";
      } else if (
        thisColGroup === startColGroup &&
        this.props.cellNumber < this.props.activity.tempStartCell &&
        this.props.cellNumber > this.props.activity.tempEndCell + 6
      ) {
        className = "timetable-data-boderless timetable-cell-data-mid";
      }
    }

    // Check if Cell is already part of an existing Entry

    if (this.props.track.tracks && this.props.track.tracks[0]) {
      const time = (Math.floor(this.props.cellNumber / 8) - 1) / 2;
      const cellDate = new Date(
        this.props.date.getFullYear(),
        this.props.date.getMonth(),
        this.props.date.getDate() +
          (((this.props.cellNumber % 8) % 7) - this.props.date.getDay()),

        Math.floor(time),
        60 * (time - Math.floor(time))
      );

      const tracksOfToday = this.props.track.tracks.filter(
        (t) =>
          // Filter for tracks of cells day
          new Date(t.startDate).getDate() === cellDate.getDate() &&
          new Date(t.startDate).getMonth() === cellDate.getMonth() &&
          new Date(t.startDate).getFullYear() === cellDate.getFullYear()
      );

      // Check if this Cell is part of an exsiting track
      if (tracksOfToday.length > 0) {
        tracksOfToday.forEach((track) => {
          const trackEndDate = new Date(track.endDate);
          const trackStartDate = new Date(track.startDate);
          const endDate = new Date(
            trackEndDate.getFullYear(),
            trackEndDate.getMonth(),
            trackEndDate.getDate(),
            trackEndDate.getHours(),
            trackEndDate.getMinutes() - 30
          );

          const activity = this.getActivityOrProject(track._id);

          if (trackStartDate < cellDate && endDate > cellDate) {
            trackId = track._id;
            className = "timetable-data-boderless timetable-cell-data-mid";
            cellContent = "";
            if (activity) {
              activityColor = activity.color;
            }
          } else if (
            cellDate <= trackStartDate &&
            cellDate >= trackStartDate &&
            cellDate <= endDate &&
            cellDate >= endDate
          ) {
            trackId = track._id;
            className =
              "timetable-data-boderless timetable-cell-data-end timetable-cell-data-start";
            cellContent = "";
            if (activity) {
              activityColor = activity.color;
            }
          } else if (cellDate <= trackStartDate && cellDate >= trackStartDate) {
            trackId = track._id;
            className = "timetable-data-boderless timetable-cell-data-start";
            cellContent = "";
            if (activity) {
              activityColor = activity.color;
            }
          } else if (cellDate <= endDate && cellDate >= endDate) {
            trackId = track._id;
            className = "timetable-data-boderless timetable-cell-data-end";
            cellContent = "";
            if (activity) {
              activityColor = activity.color;
            }
          }
        });
      }
    }

    // Return Div Content
    return (
      <div
        id={trackId}
        className={className}
        style={{ backgroundColor: activityColor }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {cellContent}
      </div>
    );
  };

  getActivityOrProject = (trackId) => {
    const track = this.props.track.tracks.find((t) => t._id === trackId);
    let activityOrProject = this.props.activity.activities.find(
      (act) => act._id === track.activity
    );
    if (!activityOrProject) {
      activityOrProject = this.props.project.projects.find(
        (p) => p._id === track.activity
      );
    }
    return activityOrProject;
  };

  componentDidMount() {
    this.props.getProjects();
  }

  // RENDER
  render() {
    return this.getCellContent();
  }
}
// Redux States
const mapStateToProps = (state) => ({
  activity: state.activityReducer,
  track: state.trackReducer,
  project: state.projectReducer,
});
export default connect(mapStateToProps, {
  setTempStartCell,
  setTempEndCell,
  setActivityTrackModalState,
  setActiveDate,
  setSelectedTrack,
  getProjects,
})(TimetableData);
