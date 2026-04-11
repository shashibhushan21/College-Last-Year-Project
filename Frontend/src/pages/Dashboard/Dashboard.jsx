import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/services';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiOutlineDocumentText, HiOutlineChatAlt2, HiOutlineTrendingUp, HiOutlineStar, HiOutlineUpload, HiOutlineArrowRight, HiOutlineCalendar, HiOutlineCheckCircle } from 'react-icons/hi';
import './Dashboard.css';

const fade = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } })
};

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="chart-tip card">
        <span className="chart-tip__label">{label}</span>
        <span className="chart-tip__val">{payload[0].value}/10</span>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await dashboardService.getStats();
        setStats(data);
      } catch {
        setStats({ totalInterviews: 0, averageScore: 0, bestScore: 0, scoreHistory: [], topStrengths: [], topWeaknesses: [], recentInterviews: [], hasResume: false });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="dash-loading"><div className="spinner" /></div>;

  return (
    <div className="page-wrap">
      {/* Header */}
      <motion.div className="dash-header" variants={fade} initial="hidden" animate="visible" custom={0}>
        <div>
          <h1 className="page-title">Welcome, {user?.name?.split(' ')[0]}</h1>
          <p className="page-subtitle">Your interview preparation at a glance</p>
        </div>
        <div className="dash-header__actions">
          {!stats?.hasResume && <Link to="/resume" className="btn btn-secondary btn-sm"><HiOutlineUpload /> Upload Resume</Link>}
          <Link to="/interview" className="btn btn-primary btn-sm"><HiOutlineChatAlt2 /> Start Interview</Link>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="dash-stats">
        {[
          { icon: <HiOutlineDocumentText />, value: stats?.totalInterviews || 0, label: 'Interviews', color: 'blue' },
          { icon: <HiOutlineTrendingUp />, value: `${stats?.averageScore || 0}/10`, label: 'Avg Score', color: 'orange' },
          { icon: <HiOutlineStar />, value: `${stats?.bestScore || 0}/10`, label: 'Best Score', color: 'green' },
          { icon: <HiOutlineCheckCircle />, value: stats?.hasResume ? 'Yes' : 'No', label: 'Resume Uploaded', color: 'blue' }
        ].map((s, i) => (
          <motion.div key={i} className="scard card" variants={fade} initial="hidden" animate="visible" custom={i + 1}>
            <div className={`scard__icon scard__icon--${s.color}`}>{s.icon}</div>
            <div className="scard__body">
              <span className="scard__val">{s.value}</span>
              <span className="scard__label">{s.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grid */}
      <div className="dash-grid">
        {/* Chart */}
        <motion.div className="dash-chart card" variants={fade} initial="hidden" animate="visible" custom={5}>
          <h3 className="card-title">Score History</h3>
          {stats?.scoreHistory?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={stats.scoreHistory}>
                <defs>
                  <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#5c5c60', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: '#5c5c60', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={2} fill="url(#fillScore)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state">
              <p>No data yet. Complete an interview to see your chart.</p>
            </div>
          )}
        </motion.div>

        {/* Skills */}
        <motion.div className="dash-skills card" variants={fade} initial="hidden" animate="visible" custom={6}>
          <h3 className="card-title">Skill Analysis</h3>
          {(stats?.topStrengths?.length > 0 || stats?.topWeaknesses?.length > 0) ? (
            <>
              {stats.topStrengths.length > 0 && (
                <div className="skill-group">
                  <h4 className="skill-group__label skill-group__label--green">Strengths</h4>
                  {stats.topStrengths.map((s, i) => (
                    <div key={i} className="skill-row">
                      <span className="skill-row__name">{s.name}</span>
                      <div className="skill-row__bar"><div className="skill-row__fill skill-row__fill--green" style={{ width: `${Math.min(s.count * 25, 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              )}
              {stats.topWeaknesses.length > 0 && (
                <div className="skill-group">
                  <h4 className="skill-group__label skill-group__label--yellow">Needs Work</h4>
                  {stats.topWeaknesses.map((w, i) => (
                    <div key={i} className="skill-row">
                      <span className="skill-row__name">{w.name}</span>
                      <div className="skill-row__bar"><div className="skill-row__fill skill-row__fill--yellow" style={{ width: `${Math.min(w.count * 25, 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="empty-state"><p>Complete interviews to see analysis.</p></div>
          )}
        </motion.div>
      </div>

      {/* Recent */}
      <motion.div className="dash-recent card" variants={fade} initial="hidden" animate="visible" custom={7}>
        <h3 className="card-title">Recent Interviews</h3>
        {stats?.recentInterviews?.length > 0 ? (
          <div className="recent-list">
            {stats.recentInterviews.map((item) => (
              <Link key={item._id} to={`/feedback/${item._id}`} className="recent-row">
                <div className="recent-row__info">
                  <span className="recent-row__cat">{item.category}</span>
                  <span className="recent-row__meta">
                    {new Date(item.createdAt).toLocaleDateString()} · {item.questionsAnswered}/{item.totalQuestions} answered
                  </span>
                </div>
                <div className="recent-row__right">
                  <span className={`score-badge score-badge--${item.overallScore >= 7 ? 'green' : item.overallScore >= 5 ? 'yellow' : 'red'}`}>{item.overallScore}/10</span>
                  <HiOutlineArrowRight className="recent-row__arrow" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No interviews yet.</p>
            <Link to="/interview" className="btn btn-primary btn-sm">Take your first interview</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
