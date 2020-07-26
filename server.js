const express = require("express");
const mongoosee = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const tasks = require("./routes/api/tasks");
const projects = require("./routes/api/projects");
const activities = require("./routes/api/activities");
const tracks = require("./routes/api/tracks");

const app = express();

// Middlewares
app.use(bodyParser.json()); // Body Parser
app.use("/api/tasks", tasks);
app.use("/api/projects", projects);
app.use("/api/activities", activities);
app.use("/api/tracks", tracks);

// Connecting to Mongo
mongoosee
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`server started on port ${port}`));
