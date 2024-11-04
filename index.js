import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Grades from "./models/grades.js";


const PORT = 3000;
const app = express();

// Connect to the database
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to the Mongoose");
})
  .catch((err) => {
    console.log(err);
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You Are Here.");
});

app.get("/grades", (req, res) => {
  res.send(grades);
});

app.get("/grades/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const grade = grades.find((grade) => grade.id === id);
  if (grade) {
    res.send(grade);
  } else {
    res.status(404).send("Grade not found");
  }
})

app.post("/grades", (req, res) => {
  const newGrade = req.body;
  newGrade.id = Date.now();
  grades.push(newGrade);
  res.send(grades);
});

app.put("/grades/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedGrade = req.body;
  const index = grades.findIndex((grade) => grade.id === id);
  if (index !== -1) {
    grades[index] = updatedGrade;
    res.send(grades);
  } else {
    res.status(404).send("Grade not found");
  }
});

app.delete("/grades/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = grades.findIndex((grade) => grade.id === id);
  if (index !== -1) {
    grades.splice(index, 1);
    res.send(grades);
  } else {
    res.status(404).send("Grade not found");
  }
});

app.get("/grades/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const grade = grades.find((grade) => grade.id === id);
  if (grade) {
    res.send(grade);
  } else {
    res.status(404).send("Grade not found");
  }
});

app.use((req, res) => {
  res.status(404).send("Not found");
});


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
