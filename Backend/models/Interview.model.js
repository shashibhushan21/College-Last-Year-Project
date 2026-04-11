import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    question: String,
    userAnswer: String,
    score: { type: Number, default: 0 },
    feedback: String
  }],
  overallScore: {
    type: Number,
    default: 0
  },
  strengths: [String],
  weaknesses: [String],
  suggestions: [String],
  category: {
    type: String,
    default: 'General'
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  }
}, {
  timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
