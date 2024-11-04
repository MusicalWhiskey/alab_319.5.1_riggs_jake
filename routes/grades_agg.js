import express from 'express';
import mongoose from 'mongoose';
import db from '../db/conn.js';
import Grade from '../models/grades.js';

const router = express.Router();

// Define the grade schema
const gradeSchema = new mongoose.Schema({
  learner_id: Number,
  class_id: Number,
  scores: [{ type: String, score: Number }],
});


// Get the weighted average of a specified learner's grades, per class
router.get('/learner/:id/avg-class', async (req, res) => {
  try {
    const grades = await Grade.find({ learner_id: req.params.id });
    const weightedAverage = grades.reduce((acc, grade) => {
      // Calculate the weighted average for each class
      const classId = grade.class_id;
      const scores = grade.scores;
      const weightedScore = scores.reduce((acc, score) => {
        // Calculate the weighted score for each score type
        const scoreType = score.type;
        const scoreValue = score.score;
        const weight = getWeight(scoreType);
        return acc + scoreValue * weight;
      }, 0);
      acc[classId] = (acc[classId] || 0) + weightedScore;
      return acc;
    }, {});
    res.send(weightedAverage).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

// Helper function to get the weight for each score type
function getWeight(scoreType) {
  switch (scoreType) {
    case 'exam':
      return 0.5;
    case 'quiz':
      return 0.3;
    case 'homework':
      return 0.2;
    default:
      return 0;
  }
}

export default router;