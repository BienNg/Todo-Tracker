import * as d3 from "d3";
/*
export function generateOverview(props) {
  const pieGenerator = d3.pie().value((d) => d.duration);
  const arcGenerator = d3.arc().innerRadius(175).outerRadius(200);
  const arcData = pieGenerator(this.state.data);
  const context = this;
  console.log(this.getTotalDurationX());
  const svg = d3
    .select(this.doughnutChartRef.current)
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
    .attr("id", (d) => "#" + d.data.activity + "-arc")
    .attr("fill", (d) => d.data.color)
    .attr("d", arcGenerator);

  // Mouse Events for Doughnut chart
  d3.select(this.doughnutChartRef.current)
    .selectAll("path")
    .each(function (d) {
      d3.select(this)
        .on("mouseover", function () {
          // Highlighting activity text
          d3.select("#" + d.data.activity)
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
          d3.select("#" + d.data.activity)
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
    .data(this.state.data)
    .enter()
    .append("div")
    .attr("id", (d) => d.activity)
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

  const middleText = d3
    .select(this.doughnutChartRef.current)
    .append("div")
    .attr("class", "doughnut-chart-middle-text")
    .append("p")
    .text("Hours Tracked")
    .append("p")
    .style("font-weight", "bold")
    .style("font-size", "24px")
    .text(context.getTotalDurationX() + " hours")
    .append("p")
    .style("font-weight", "normal")
    .style("font-size", "16px")
    .style("margin-top", "60px")
    .text("Time Entries")
    .append("p")
    .style("font-weight", "bold")
    .style("font-size", "24px")
    .text(10);
}

*/
