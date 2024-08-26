const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskmanager",
});

connect.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected");
});

app.get("/", (req, res) => {
  res.send("connected!");
});

//! add task
app.post("/addTask", (req, res) => {
  const { task, priority, date } = req.body;
  const data = {
    Task: task,
    Priority: priority,
    DeadLine: date,
    Status: "pending",
  };

  const query = "INSERT INTO tasks SET ?";
  connect.query(query, data, (err, result) => {
    console.log(result);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "task added" });
    } else {
      res.status(500).json({ message: "failed to add!" });
    }
  });
});

//! delete task
app.post("/deleteTask/:TID", (req, res) => {
  const { TID } = req.params;

  const query = "DELETE FROM tasks WHERE TID=?";
  connect.query(query, [TID], (err, result) => {
    console.log(result);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "task deleted" });
    } else {
      res.status(500).json({ message: "failed to delete!" });
    }
  });
});

app.get("/getTask", (req, res) => {
  const query = "SELECT * FROM tasks WHERE Status='pending' ORDER BY DeadLine";
  connect.query(query, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/taskDone/:TID", (req, res) => {
  const { TID } = req.params;
  const query = "UPDATE tasks SET Status='done' WHERE TID=?";
  connect.query(query, [TID], (err, result) => {
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "task updated" });
    } else {
      res.status(500).json({ message: "failed to updated!" });
    }
  });
});

app.listen(3001, () => {
  console.log("Listening at 3001..");
});
