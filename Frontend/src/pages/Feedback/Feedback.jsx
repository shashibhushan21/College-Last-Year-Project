import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dashboardService } from '../../services/services';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineCheck, HiOutlineExclamation, HiOutlineLightBulb } from 'react-icons/hi';
import './Feedback.css';

const fade = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } })
};

export default function Feedback() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try { const { data } = await dashboardService.getInterviewDetails(id); setInterview(data); }
      catch { setInterview(null); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return <div className="fb-loading"><div className="spinner" /></div>;
  if (!interview) return <div className="fb-loading"><p>Interview not found</p><Link to="/dashboard" className="btn btn-secondary btn-sm">Back</Link></div>;

  const sc = interview.overallScore >= 7 ? 'green' : interview.overallScore >= 5 ? 'yellow' : 'red';

  return (
    <div className="page-wrap" style={{ maxWidth: 760 }}>
      <Link to="/dashboard" className="fb-back"><HiOutlineArrowLeft /> Dashboard</Link>

      {/* Overview */}
      <motion.div className="fb-overview card" variants={fade} initial="hidden" animate="visible" custom={0}>
        <div className={`fb-score fb-score--${sc}`}>{interview.overallScore}</div>
        <div className="fb-overview__info">
          <h1 className="fb-overview__title">{interview.category} Interview</h1>
          <p className="fb-overview__meta">
            {interview.questions.filter(q => q.userAnswer).length}/{interview.questions.length} answered · {new Date(interview.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </motion.div>

      {/* Analysis */}
      <div className="fb-analysis">
        <motion.div className="fb-acard card" variants={fade} initial="hidden" animate="visible" custom={1}>
          <h3 className="fb-acard__title"><HiOutlineCheck className="fb-icon fb-icon--green" /> Strengths</h3>
          {interview.strengths?.length > 0
            ? <ul className="fb-list">{interview.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            : <p className="fb-empty">None identified</p>
          }
        </motion.div>

        <motion.div className="fb-acard card" variants={fade} initial="hidden" animate="visible" custom={2}>
          <h3 className="fb-acard__title"><HiOutlineExclamation className="fb-icon fb-icon--yellow" /> Weaknesses</h3>
          {interview.weaknesses?.length > 0
            ? <ul className="fb-list">{interview.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
            : <p className="fb-empty">None identified</p>
          }
        </motion.div>

        <motion.div className="fb-acard fb-acard--full card" variants={fade} initial="hidden" animate="visible" custom={3}>
          <h3 className="fb-acard__title"><HiOutlineLightBulb className="fb-icon fb-icon--blue" /> Suggestions</h3>
          {interview.suggestions?.length > 0
            ? <ul className="fb-list">{interview.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            : <p className="fb-empty">No suggestions</p>
          }
        </motion.div>
      </div>

      {/* Questions */}
      <h2 className="fb-section-title">Question Review</h2>
      {interview.questions.map((q, i) => (
        <motion.div key={i} className="fb-q card" variants={fade} initial="hidden" animate="visible" custom={4 + i * 0.3}>
          <div className="fb-q__head">
            <span className="fb-q__num">Q{i + 1}</span>
            <span className={`score-badge score-badge--${q.score >= 7 ? 'green' : q.score >= 5 ? 'yellow' : 'red'}`}>{q.score}/10</span>
          </div>
          <p className="fb-q__question">{q.question}</p>
          {q.userAnswer ? (
            <>
              <div className="fb-q__answer"><span className="fb-q__label">Your answer</span><p>{q.userAnswer}</p></div>
              {q.feedback && <div className="fb-q__feedback"><span className="fb-q__label">Feedback</span><p>{q.feedback}</p></div>}
            </>
          ) : <p className="fb-q__skip">Skipped</p>}
        </motion.div>
      ))}

      <div className="fb-actions">
        <Link to="/interview" className="btn btn-primary">New Interview</Link>
        <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
      </div>
    </div>
  );
}
