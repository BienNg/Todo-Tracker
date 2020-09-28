import React, { Component } from "react";
import { connect } from "react-redux";
import { getTracks } from "../actions/tracksActions";
import { getProjects } from "../actions/projectActions";
import { Bar } from "react-chartjs-2";

import useMouse from "@react-hook/mouse-position";
import * as d3 from "d3";

class StatisitcsComponent extends Component {
  constructor(props) {
    super(props);
    this.doughnutChartRef = React.createRef();
    this.doughnutChartActivitiesRef = React.createRef();
  }
  state = {
    data: [
      { activity: "coding", duration: 10, color: "blue" },
      { activity: "studying", duration: 7, color: "orange" },
      { activity: "work", duration: 20, color: "red" },
      { activity: "break", duration: 6, color: "green" },
      { activity: "reading", duration: 10, color: "grey" },
    ],
    overviewRendered: false,
  };

  mousePosition() {
    const target = React.useRef(null);
    const mouse = useMouse(target, {
      fps: 60,
      enterDelay: 100,
      leaveDelay: 100,
    });

    console.log(mouse);
  }

  getTotalDurationX = (overviewData) => {
    let duration = 0;
    overviewData.forEach((d) => (duration = duration + d.duration));
    return duration;
  };

  generateOverview = (overviewData) => {
    const pieGenerator = d3.pie().value((d) => d.duration);
    const arcGenerator = d3.arc().innerRadius(175).outerRadius(200);
    const arcData = pieGenerator(overviewData);
    const context = this;
    const svg = d3
      .select(this.doughnutChartRef.current)
      .attr("id", "overview-chart")
      .append("svg")
      .attr("width", 500)
      .attr("height", 420)
      .append("g")
      .attr("transform", "translate(200, 210)");

    // Creating path elements for arcs
    svg
      .selectAll("path")
      .data(arcData)
      .enter()
      .append("path")
      .attr("id", (d) => "#" + d.data.id + "-arc")
      .attr("fill", (d) => d.data.color)
      .attr("d", arcGenerator);

    // Mouse Events for Doughnut chart
    d3.select(this.doughnutChartRef.current)
      .selectAll("path")
      .each(function (d) {
        d3.select(this)
          .on("mouseover", function () {
            // Highlighting activity text
            d3.select("#text-" + d.data.id)
              .transition()
              .style("background-color", "#EAEAEA");

            // De-highlighting other pie chart elements
            d3.select(context.doughnutChartRef.current)
              .selectAll("path")
              .each(function (data) {
                data.data.activity !== d.data.activity
                  ? d3.select(this).transition().style("opacity", 0.3)
                  : console.log();
              });
          })
          .on("mouseout", function () {
            d3.select("#text-" + d.data.id)
              .transition()
              .style("background-color", "");

            d3.select(context.doughnutChartRef.current)
              .selectAll("path")
              .each(function (d) {
                d3.select(this).transition().style("opacity", 1);
              });
          });
      });

    const doughnutChartActivitiesDiv = d3
      .select(this.doughnutChartActivitiesRef.current)
      .selectAll("p")
      .data(overviewData)
      .enter()
      .append("div")
      .attr("id", (d) => "text-" + d.id)
      .attr("class", "doughnut-chart-activities-div")
      .style("cursor", "pointer")
      .each(function (d) {
        d3.select(this)
          .on("mouseover", function () {
            // Highlighting activity text
            d3.select(this).transition().style("background-color", "#EAEAEA");

            // De-highlighting other pie chart elements
            d3.select(context.doughnutChartRef.current)
              .selectAll("path")
              .each(function (data) {
                data.data.activity !== d.activity
                  ? d3.select(this).transition().style("opacity", 0.3)
                  : console.log();
              });
          })
          .on("mouseout", function () {
            d3.select(this).transition().style("background-color", "");

            d3.select(context.doughnutChartRef.current)
              .selectAll("path")
              .each(function (d) {
                d3.select(this).transition().style("opacity", 1);
              });
          });
      });

    const doughnutChartActivitiesText = doughnutChartActivitiesDiv
      .append("p")
      .text((d) => d.activity);

    const doughnutChartActivitiesDuration = doughnutChartActivitiesDiv
      .append("p")
      .attr("class", "doughnut-chart-activities-duration")
      .style("background-color", (d) => d.color)
      .text((d) => d.duration + "h");

    const numberOfEntries = this.props.track.tracks.length;
    const middleText = d3
      .select(this.doughnutChartRef.current)
      .append("div")
      .attr("class", "doughnut-chart-middle-text")
      .append("p")
      .text("Hours Tracked")
      .append("p")
      .style("font-weight", "bold")
      .style("font-size", "24px")
      .text(context.getTotalDurationX(overviewData) + " hours")
      .append("p")
      .style("font-weight", "normal")
      .style("font-size", "16px")
      .style("margin-top", "60px")
      .text("Time Entries")
      .append("p")
      .style("font-weight", "bold")
      .style("font-size", "24px")
      .text(numberOfEntries);
  };

  getTotalDurationOfActivities(data) {
    data.forEach((d) => (d.duration = 0));
    this.props.track.tracks.forEach(function (t) {
      let index = data.findIndex((d) => d.id === t.activity);
      let duration =
        Math.abs(new Date(t.startDate) - new Date(t.endDate)) / 36e5;
      if (index >= 0) {
        data[index].duration += duration;
      }
    });

    return data;
  }

  getDurationOfTrack(track) {
    const start = new Date(track.startDate);
    const end = new Date(track.endDate);
    return Math.abs(start - end) / 36e5;
  }

  getTimeData() {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    const labels = [];
    const dataset = [];
    const context = this;

    this.props.track.tracks.forEach(function (t) {
      const trackDate = new Date(t.startDate);
      console.log(trackDate);
      console.log(startDate);
      console.log(endDate);
      if (trackDate >= startDate && trackDate <= endDate) {
        console.log("TRUE");
        const title =
          context.props.project.projects[
            context.props.project.projects.findIndex(
              (p) => p._id === t.activity
            )
          ].title;
        const color =
          context.props.project.projects[
            context.props.project.projects.findIndex(
              (p) => p._id === t.activity
            )
          ].color;
        let index = dataset.findIndex((d) => d.label === title);

        if (index < 0) {
          dataset.push({
            label: title,
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: color,
          });
          index = dataset.findIndex((d) => d.label === title);
        }
        dataset[index].data[
          6 - (endDate.getDate() - new Date(t.startDate).getDate())
        ] =
          dataset[index].data[
            6 - (endDate.getDate() - new Date(t.startDate).getDate())
          ] + context.getDurationOfTrack(t);
      }
    });

    console.log(dataset);
    // Setting labels for the x-axis which are the last seven days (dates)
    for (let i = 6; i >= 0; i--) {
      let day = new Date();
      day.setDate(day.getDate() - i);
      labels.push(weekdays[day.getDay()] + " " + day.getDate());
    }

    return {
      labels: labels,
      datasets: dataset,
    };
  }

  // COMPONENT WILL MOUNT
  componentWillMount() {
    this.props.getTracks();
    this.props.getProjects();
  }

  // RENDER
  render() {
    const overviewChart = document.getElementById("overview-chart");
    // overviewData stores the data that d3.js uses to generate the overview statistic
    let overviewData = [];
    // timeData stores the data that chart.js uses to generate the time statistic bar chart
    let timeData = {};

    if (this.props.project.projects.length > 0 && !overviewChart) {
      // Preprocessing Data for Overview Doughnut Chart
      this.props.project.projects.forEach(function (p) {
        // Check if project is already added in overviewData
        if (overviewData.findIndex((data) => data.activity === p.title) < 0) {
          overviewData.push({
            activity: p.title,
            color: p.color,
            id: p._id,
          });
        }
      });

      overviewData = this.getTotalDurationOfActivities(overviewData);
      // Generating the overview statistic doughnut chart
      this.generateOverview(overviewData);
      timeData = this.getTimeData();
    }
    /** View */
    return (
      <div className="statistics-component">
        <div className="statistics-overview">
          <div className="statistics-heading">Overview</div>
          <div className="doughtnut-chart-container">
            <div ref={this.doughnutChartRef}></div>
            <div
              className="doughnut-chart-activities-container"
              ref={this.doughnutChartActivitiesRef}
            ></div>
          </div>
        </div>
        <div className="statistics-time">
          <div className="statistics-heading">Time</div>
          <Bar
            data={timeData}
            width={100}
            height={50}
            options={{
              legend: {
                display: false,
              },
              scales: {
                xAxes: [
                  {
                    stacked: true,
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    stacked: true,
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

// Redux States
const mapStateToProps = (state) => ({
  track: state.trackReducer,
  project: state.projectReducer,
});

export default connect(mapStateToProps, {
  getTracks,
  getProjects,
})(StatisitcsComponent);
