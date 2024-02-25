import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";

const app = express();
const route = 3000;

const date = new Date();
const day = date.getDate();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const todos = [];
const works = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(expressEjsLayouts);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    layout: "partials/main-layout.ejs",
  });
});

app.post("/addItemWork", (req, res) => {
  const item = req.body.todo;
  works.push(item);

  res.redirect("/workPage");
});

app.post("/addItemTodo", (req, res) => {
  const item = req.body.todo;
  todos.push(item);

  res.redirect("/todayPage");
});

app.get("/todayPage", (req, res) => {
  res.render("today.ejs", {
    layout: "partials/main-layout.ejs",
    day: day,
    month: months[date.getMonth()],
    weekday: days[date.getDay()],
    todos,
  });
});

app.get("/workPage", (req, res) => {
  res.render("work.ejs", {
    layout: "partials/main-layout.ejs",
    day: day,
    month: months[date.getMonth()],
    weekday: days[date.getDay()],
    works,
  });
});

app.listen(route, () => {
  console.log(`Listening on port : ${route}`);
});
