import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  learner_id: Number,
  class_id: Number,
  scores: [{ type: String, score: Number }],
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;