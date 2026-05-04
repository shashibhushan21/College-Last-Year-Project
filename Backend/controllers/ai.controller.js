import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '../models/User.model.js';
import Interview from '../models/Interview.model.js';

// Initialize Gemini
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.startsWith('sk-')) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

// @desc    Generate interview questions from resume
// @route   POST /api/ai/questions
export const generateQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { category = 'General', count = 5 } = req.body;

    if (!user.resumeText) {
      return res.status(400).json({ message: 'Please upload your resume first' });
    }

    const genAI = getGenAI();

    let questions;

    if (genAI) {
      try {
        // Use Gemini API
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are an expert technical interviewer. Based on the following resume, generate exactly ${count} interview questions for a ${category} interview.

Resume:
${user.resumeText.substring(0, 3000)}

Requirements:
- Questions should be relevant to the candidate's experience and skills
- Mix of technical and behavioral questions
- Vary difficulty (easy, medium, hard)
- Return ONLY a valid JSON array of objects with this structure:
[
  {
    "question": "Your question here",
    "difficulty": "easy|medium|hard",
    "category": "${category}",
    "expectedTopics": ["topic1", "topic2"]
  }
]

Return ONLY the JSON array, no other text.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Extract JSON from response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          questions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse AI response');
        }
      } catch (aiError) {
        console.warn('Gemini questions generation failed. Falling back to local questions:', aiError.message);
        questions = generateFallbackQuestions(user.resumeText, category, count);
      }
    } else {
      // Fallback questions when no API key
      questions = generateFallbackQuestions(user.resumeText, category, count);
    }

    // Create a new interview session
    const interview = await Interview.create({
      userId: req.user._id,
      questions: questions.map(q => ({
        question: q.question,
        userAnswer: '',
        score: 0,
        feedback: ''
      })),
      category,
      status: 'in-progress'
    });

    res.json({
      interviewId: interview._id,
      questions: questions,
      totalQuestions: questions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating questions', error: error.message });
  }
};

// @desc    Submit answer and get AI feedback
// @route   POST /api/ai/feedback
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, question } = req.body;

    if (!answer || !question) {
      return res.status(400).json({ message: 'Answer and question are required' });
    }

    const genAI = getGenAI();
    let feedback;

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are an expert interviewer evaluating a candidate's answer.

Question: ${question}
Candidate's Answer: ${answer}

Evaluate the answer and return ONLY a valid JSON object with this structure:
{
  "score": <number 0-10>,
  "feedback": "<detailed feedback about the answer>",
  "strengths": ["<strength1>", "<strength2>"],
  "weaknesses": ["<weakness1>", "<weakness2>"],
  "suggestions": ["<suggestion1>", "<suggestion2>"],
  "idealAnswer": "<a brief ideal answer outline>"
}

Be fair but thorough. Return ONLY the JSON object.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          feedback = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse AI response');
        }
      } catch (aiError) {
        console.warn('Gemini feedback generation failed. Falling back to local feedback:', aiError.message);
        feedback = generateFallbackFeedback(question, answer);
      }
    } else {
      // Fallback feedback
      feedback = generateFallbackFeedback(question, answer);
    }

    // Update the interview record
    if (interviewId) {
      const interview = await Interview.findById(interviewId);
      if (interview && interview.questions[questionIndex]) {
        interview.questions[questionIndex].userAnswer = answer;
        interview.questions[questionIndex].score = feedback.score;
        interview.questions[questionIndex].feedback = feedback.feedback;
        await interview.save();
      }
    }

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error generating feedback', error: error.message });
  }
};

// @desc    Complete an interview and get overall results
// @route   POST /api/ai/complete
export const completeInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Calculate overall score
    const answeredQuestions = interview.questions.filter(q => q.userAnswer);
    const totalScore = answeredQuestions.reduce((sum, q) => sum + q.score, 0);
    const averageScore = answeredQuestions.length > 0
      ? Math.round((totalScore / answeredQuestions.length) * 10) / 10
      : 0;

    // Collect all strengths, weaknesses, suggestions
    const genAI = getGenAI();
    let overallFeedback;

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const questionsData = interview.questions.map(q => ({
          question: q.question,
          answer: q.userAnswer,
          score: q.score
        }));

        const prompt = `Based on these interview results, provide an overall assessment:
${JSON.stringify(questionsData)}

Return ONLY a valid JSON object:
{
  "overallScore": ${averageScore},
  "strengths": ["<top strengths>"],
  "weaknesses": ["<areas to improve>"],
  "suggestions": ["<actionable suggestions>"],
  "summary": "<2-3 sentence overall summary>"
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          overallFeedback = JSON.parse(jsonMatch[0]);
        }
      } catch (aiError) {
        console.warn('Gemini overall feedback generation failed. Falling back to local summary:', aiError.message);
      }
    }

    if (!overallFeedback) {
      overallFeedback = {
        overallScore: averageScore,
        strengths: ['Good attempt at answering questions'],
        weaknesses: ['Could provide more detailed answers'],
        suggestions: ['Practice more with sample questions', 'Research common interview patterns'],
        summary: `You completed the interview with an average score of ${averageScore}/10.`
      };
    }

    // Update interview
    interview.status = 'completed';
    interview.overallScore = averageScore;
    interview.strengths = overallFeedback.strengths;
    interview.weaknesses = overallFeedback.weaknesses;
    interview.suggestions = overallFeedback.suggestions;
    await interview.save();

    // Update user stats
    const user = await User.findById(req.user._id);
    user.totalInterviews += 1;
    const allInterviews = await Interview.find({ userId: req.user._id, status: 'completed' });
    const totalAvg = allInterviews.reduce((sum, i) => sum + i.overallScore, 0) / allInterviews.length;
    user.averageScore = Math.round(totalAvg * 10) / 10;
    await user.save();

    res.json({
      ...overallFeedback,
      interviewId: interview._id,
      questionsAnswered: answeredQuestions.length,
      totalQuestions: interview.questions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing interview', error: error.message });
  }
};

// Fallback questions when no API key configured
function generateFallbackQuestions(resumeText, category, count) {
  const technicalQuestions = [
    { question: "Tell me about yourself and your technical background.", difficulty: "easy", category, expectedTopics: ["introduction", "experience"] },
    { question: "What is the difference between REST and GraphQL APIs?", difficulty: "medium", category, expectedTopics: ["REST", "GraphQL", "API design"] },
    { question: "Explain the concept of closures in JavaScript.", difficulty: "medium", category, expectedTopics: ["closures", "scope", "JavaScript"] },
    { question: "How do you handle state management in a React application?", difficulty: "medium", category, expectedTopics: ["React", "state management", "Redux"] },
    { question: "Describe a challenging project you worked on and how you overcame obstacles.", difficulty: "easy", category, expectedTopics: ["problem-solving", "experience"] },
    { question: "What are the SOLID principles in object-oriented programming?", difficulty: "hard", category, expectedTopics: ["SOLID", "OOP", "design principles"] },
    { question: "How would you optimize the performance of a web application?", difficulty: "hard", category, expectedTopics: ["performance", "optimization", "web"] },
    { question: "Explain the event loop in Node.js.", difficulty: "medium", category, expectedTopics: ["Node.js", "event loop", "async"] },
    { question: "What is the difference between SQL and NoSQL databases?", difficulty: "easy", category, expectedTopics: ["SQL", "NoSQL", "databases"] },
    { question: "How do you ensure security in a web application?", difficulty: "hard", category, expectedTopics: ["security", "authentication", "OWASP"] }
  ];

  return technicalQuestions.slice(0, count);
}

// Fallback feedback when no API key configured
function generateFallbackFeedback(question, answer) {
  const wordCount = answer.split(' ').length;
  let score = 5;

  if (wordCount > 100) score = 8;
  else if (wordCount > 50) score = 7;
  else if (wordCount > 20) score = 6;
  else if (wordCount > 10) score = 5;
  else score = 3;

  return {
    score,
    feedback: `Your answer contains ${wordCount} words. ${wordCount > 30 ? 'Good level of detail provided.' : 'Consider providing more detailed answers with examples.'} The response ${wordCount > 50 ? 'demonstrates a solid understanding' : 'could benefit from more depth and specific examples'}.`,
    strengths: wordCount > 30
      ? ['Provided a substantive response', 'Showed engagement with the question']
      : ['Attempted to answer the question'],
    weaknesses: wordCount < 50
      ? ['Answer could be more detailed', 'Consider adding specific examples']
      : ['Could include more real-world examples'],
    suggestions: [
      'Use the STAR method (Situation, Task, Action, Result) for behavioral questions',
      'Include specific examples from your experience',
      'Structure your answer clearly with key points'
    ],
    idealAnswer: 'A comprehensive answer would include specific examples, demonstrate understanding of core concepts, and show practical experience.'
  };
}
