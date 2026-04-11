import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { aiService } from '../../services/services';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlinePaperAirplane, HiOutlineCheck } from 'react-icons/hi';
import './Interview.css';

export default function Interview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [interviewId, setInterviewId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [category, setCategory] = useState('Technical');
  const [qCount, setQCount] = useState(5);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const startInterview = async () => {
    if (!user?.resumeText && !user?.resumeFileName) { toast.error('Upload your resume first'); navigate('/resume'); return; }
    setGenerating(true);
    try {
      const { data } = await aiService.generateQuestions({ category, count: qCount });
      setInterviewId(data.interviewId);
      setQuestions(data.questions);
      setQIndex(0);
      setStarted(true);
      setMessages([
        { type: 'system', text: `${category} Interview · ${data.totalQuestions} questions` },
        { type: 'ai', text: `Hi! I'll ask you ${data.totalQuestions} questions based on your resume. Take your time.\n\nLet's start.` },
        { type: 'ai', text: data.questions[0].question, isQ: true, num: 1, diff: data.questions[0].difficulty }
      ]);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to generate questions'); }
    finally { setGenerating(false); }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || loading) return;
    const ans = answer.trim();
    const q = questions[qIndex];
    setMessages(p => [...p, { type: 'user', text: ans }]);
    setAnswer('');
    setLoading(true);
    try {
      const { data: fb } = await aiService.submitAnswer({ interviewId, questionIndex: qIndex, answer: ans, question: q.question });
      setMessages(p => [...p, { type: 'feedback', score: fb.score, feedback: fb.feedback, strengths: fb.strengths, weaknesses: fb.weaknesses, suggestions: fb.suggestions }]);
      const next = qIndex + 1;
      if (next < questions.length) {
        setQIndex(next);
        setTimeout(() => { setMessages(p => [...p, { type: 'ai', text: questions[next].question, isQ: true, num: next + 1, diff: questions[next].difficulty }]); }, 600);
      } else {
        setTimeout(() => { setMessages(p => [...p, { type: 'system', text: 'All done! Click "Finish" to see your results.' }]); setFinished(true); }, 600);
      }
    } catch { toast.error('Failed to get feedback'); }
    finally { setLoading(false); inputRef.current?.focus(); }
  };

  const handleFinish = async () => {
    setLoading(true);
    try { await aiService.completeInterview({ interviewId }); toast.success('Interview completed!'); navigate(`/feedback/${interviewId}`); }
    catch { navigate('/dashboard'); }
    finally { setLoading(false); }
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer(); } };

  // Setup screen
  if (!started) {
    return (
      <div className="iv-page">
        <div className="iv-setup">
          <motion.div className="iv-setup__card card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="iv-setup__title">Mock Interview</h1>
            <p className="iv-setup__desc">AI generates questions from your resume and scores your answers in real time.</p>
            <div className="iv-setup__opts">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Technical">Technical</option>
                  <option value="Behavioral">Behavioral</option>
                  <option value="System Design">System Design</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Questions</label>
                <select className="form-input" value={qCount} onChange={(e) => setQCount(Number(e.target.value))}>
                  <option value={3}>3 — Quick</option>
                  <option value={5}>5 — Standard</option>
                  <option value={7}>7 — Thorough</option>
                  <option value={10}>10 — Full</option>
                </select>
              </div>
            </div>
            <button onClick={startInterview} className="btn btn-primary" disabled={generating} style={{ width: '100%' }}>
              {generating ? 'Generating...' : 'Start interview'}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="iv-page">
      <div className="iv-chat">
        {/* Header */}
        <div className="iv-header card">
          <div className="iv-header__top">
            <span className="iv-header__title">{category} Interview</span>
            <span className="iv-header__count">Q{Math.min(qIndex + 1, questions.length)}/{questions.length}</span>
          </div>
          <div className="iv-header__bar"><div className="iv-header__fill" style={{ width: `${((qIndex + (finished ? 1 : 0)) / questions.length) * 100}%` }} /></div>
        </div>

        {/* Messages */}
        <div className="iv-messages">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div key={i} className={`msg msg--${m.type}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

                {m.type === 'system' && <div className="msg__sys">{m.text}</div>}

                {m.type === 'ai' && (
                  <div className="msg__row">
                    <div className="msg__av msg__av--ai">AI</div>
                    <div className="msg__wrap">
                      {m.isQ && (
                        <div className="msg__tags">
                          <span className="msg__qnum">Q{m.num}</span>
                          <span className={`msg__diff msg__diff--${m.diff}`}>{m.diff}</span>
                        </div>
                      )}
                      <div className="msg__bubble msg__bubble--ai">{m.text}</div>
                    </div>
                  </div>
                )}

                {m.type === 'user' && (
                  <div className="msg__row msg__row--right">
                    <div className="msg__bubble msg__bubble--user">{m.text}</div>
                    <div className="msg__av msg__av--user">{user?.name?.charAt(0).toUpperCase()}</div>
                  </div>
                )}

                {m.type === 'feedback' && (
                  <div className="msg__row">
                    <div className="msg__av msg__av--ai">AI</div>
                    <div className="msg__fb card">
                      <div className="msg__fb-top">
                        <span className={`score-badge score-badge--${m.score >= 7 ? 'green' : m.score >= 5 ? 'yellow' : 'red'}`}>{m.score}/10</span>
                      </div>
                      <p className="msg__fb-text">{m.feedback}</p>
                      {m.strengths?.length > 0 && <div className="msg__fb-list"><strong className="msg__fb-label msg__fb-label--green">Strengths:</strong><ul>{m.strengths.map((s, j) => <li key={j}>{s}</li>)}</ul></div>}
                      {m.suggestions?.length > 0 && <div className="msg__fb-list"><strong className="msg__fb-label msg__fb-label--blue">Tips:</strong><ul>{m.suggestions.map((s, j) => <li key={j}>{s}</li>)}</ul></div>}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="msg msg--ai">
              <div className="msg__row">
                <div className="msg__av msg__av--ai">AI</div>
                <div className="msg__typing"><span /><span /><span /></div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="iv-input-area">
          {finished ? (
            <div className="iv-input-done">
              <button onClick={handleFinish} className="btn btn-primary" disabled={loading}><HiOutlineCheck /> Finish & View Results</button>
            </div>
          ) : (
            <div className="iv-input-wrap">
              <textarea ref={inputRef} className="iv-input" placeholder="Type your answer... (Enter to send)" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={onKey} disabled={loading} rows={2} />
              <button onClick={submitAnswer} className="iv-send" disabled={!answer.trim() || loading}><HiOutlinePaperAirplane /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
