import Interview from '../models/Interview.model.js';
import User from '../models/User.model.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
export const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    // Get all completed interviews
    const completedInterviews = await Interview.find({
      userId,
      status: 'completed'
    }).sort({ createdAt: -1 });

    // Calculate stats
    const totalInterviews = completedInterviews.length;
    const averageScore = totalInterviews > 0
      ? Math.round(completedInterviews.reduce((sum, i) => sum + i.overallScore, 0) / totalInterviews * 10) / 10
      : 0;

    // Score history for chart (last 10 interviews)
    const scoreHistory = completedInterviews.slice(0, 10).reverse().map((interview, idx) => ({
      name: `Interview ${idx + 1}`,
      score: interview.overallScore,
      date: interview.createdAt
    }));

    // All strengths and weaknesses
    const allStrengths = {};
    const allWeaknesses = {};

    completedInterviews.forEach(interview => {
      interview.strengths.forEach(s => {
        allStrengths[s] = (allStrengths[s] || 0) + 1;
      });
      interview.weaknesses.forEach(w => {
        allWeaknesses[w] = (allWeaknesses[w] || 0) + 1;
      });
    });

    // Sort by frequency
    const topStrengths = Object.entries(allStrengths)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const topWeaknesses = Object.entries(allWeaknesses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Recent interviews
    const recentInterviews = completedInterviews.slice(0, 5).map(i => ({
      _id: i._id,
      category: i.category,
      overallScore: i.overallScore,
      questionsAnswered: i.questions.filter(q => q.userAnswer).length,
      totalQuestions: i.questions.length,
      createdAt: i.createdAt
    }));

    // Best score
    const bestScore = totalInterviews > 0
      ? Math.max(...completedInterviews.map(i => i.overallScore))
      : 0;

    res.json({
      totalInterviews,
      averageScore,
      bestScore,
      scoreHistory,
      topStrengths,
      topWeaknesses,
      recentInterviews,
      hasResume: !!user.resumeText
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

// @desc    Get interview details
// @route   GET /api/dashboard/interview/:id
export const getInterviewDetails = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interview', error: error.message });
  }
};
