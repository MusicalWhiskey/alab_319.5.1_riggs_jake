import express from "express";
import "dotenv/config";

const PORT = 3000;
const app = express();

import grades from "./routes/grades.js";
import grades_agg from "./routes/grades_agg.js";


app.use(express.json());

app.get("/", (req, res) => {
  res.send("You are here.");
});

app.use("/grades", grades);
app.use("/grades/agg", grades_agg);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
