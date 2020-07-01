const express = require("express");
const mongoosee = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const tasks = require("./routes/api/tasks");

const app = express();

// Middlewares
app.use(bodyParser.json()); // Body Parser
app.use("/api/tasks", tasks);

// Connecting to Mongo
mongoosee
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`server started on port ${port}`));
