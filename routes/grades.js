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


// Create a single grade entry
router.post('/', async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();
    res.send(grade).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
});

// Get a single grade entry
router.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      res.send('Not found').status(404);
    } else {
      res.send(grade).status(200);
    }
  } catch (err) {
    res.send(err).status(400);
  }
});

// Add a score to a grade entry
router.patch('/:id/add', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      res.send('Not found').status(404);
    } else {
      grade.scores.push(req.body);
      await grade.save();
      res.send(grade).status(200);
    }
  } catch (err) {
    res.send(err).status(400);
  }
});

// Remove a score from a grade entry
router.patch('/:id/remove', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      res.send('Not found').status(404);
    } else {
      grade.scores.pull(req.body);
      await grade.save();
      res.send(grade).status(200);
    }
  } catch (err) {
    res.send(err).status(400);
  }
});

// Delete a single grade entry
router.delete('/:id', async (req, res) => {
  try {
    await Grade.findByIdAndRemove(req.params.id);
    res.send('Deleted').status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

export default router;