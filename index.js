const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const logger = require("./middleware/logger.js");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

app.set("view engine", "pug");
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled");
}
app.use(logger); // MW function
app.use(express.json()); // MW function
app.use(express.static("public"));
app.use(helmet());

app.use("/v1/api/courses", courses); // route to courses
app.use("/", home);

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server : " + config.get("mail.host"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
