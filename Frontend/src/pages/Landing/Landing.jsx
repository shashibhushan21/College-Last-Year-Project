import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineChatAlt2, HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineGlobe } from 'react-icons/hi';
import interviewScene from '../../assets/illustrations/interview-scene.svg';
import interviewChecklist from '../../assets/illustrations/interview-checklist.svg';
import conversationCard from '../../assets/illustrations/conversation-card.svg';
import './Landing.css';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4 }
  })
};

const features = [
  { icon: <HiOutlineDocumentText />, title: 'Resume Parsing', desc: 'Upload your resume and turn it into a focused interview practice plan.' },
  { icon: <HiOutlineChatAlt2 />, title: 'Mock Interviews', desc: 'Practice in a chat-based format that feels close to the real thing.' },
  { icon: <HiOutlineChartBar />, title: 'Performance Tracking', desc: 'See your scores, strengths, and weak areas across every session.' },
  { icon: <HiOutlineLightningBolt />, title: 'Instant Feedback', desc: 'Get scored on every answer with clear suggestions on how to improve.' },
  { icon: <HiOutlineShieldCheck />, title: 'Tailored Questions', desc: 'Questions are based on your own background instead of generic templates.' },
  { icon: <HiOutlineGlobe />, title: 'Multiple Domains', desc: 'Practice technical, behavioral, and system design interviews.' }
];

const steps = [
  { num: '1', title: 'Upload your resume', desc: 'Drop a PDF or DOCX file. We extract the relevant text automatically.' },
  { num: '2', title: 'Take a mock interview', desc: 'AI generates questions based on your profile. Answer them in a chat interface.' },
  { num: '3', title: 'Review your performance', desc: 'Get a score, see your strengths and weaknesses, and track improvement over time.' }
];

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner hero__inner--split">
          <motion.div className="hero__copy" variants={fade} initial="hidden" animate="visible" custom={0}>
            <h1 className="hero__heading">
              Practice interviews.
              <br />
              <span className="hero__heading-accent">See where you stand.</span>
            </h1>

            <p className="hero__desc">
              PrepAI turns your resume into a polished practice routine with clear prompts,
              structured feedback, and a calm, focused experience that feels more like a real interview.
            </p>

            <div className="hero__btns">
              <Link to="/register" className="btn btn-primary btn-lg">Get started</Link>
              <a href="#features" className="btn btn-secondary btn-lg">Explore the flow</a>
            </div>
          </motion.div>

          <motion.div className="hero__visual" variants={fade} initial="hidden" animate="visible" custom={1}>
            <div className="hero__art hero__art--main">
              <img src={interviewScene} alt="People preparing for an interview" />
            </div>
            <div className="hero__art hero__art--small hero__art--top">
              <img src={conversationCard} alt="Interview conversation illustration" />
            </div>
            <div className="hero__art hero__art--small hero__art--bottom">
              <img src={interviewChecklist} alt="Interview checklist illustration" />
            </div>
            <div className="hero__note hero__note--one">
              <strong>Realistic practice</strong>
              <span>Questions based on your resume and target role.</span>
            </div>
            <div className="hero__note hero__note--two">
              <strong>Clear review</strong>
              <span>See strengths, weak spots, and next steps.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="section__inner">
          <motion.div className="section__header" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="section__title">What you get</h2>
            <p className="section__desc">Everything you need to go from nervous to confident.</p>
          </motion.div>

          <div className="features-grid">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="fcard card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <div className="fcard__icon">{f.icon}</div>
                <h3 className="fcard__title">{f.title}</h3>
                <p className="fcard__desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--alt" id="how-it-works">
        <div className="section__inner">
          <motion.div className="section__header" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="section__title">Three steps. That's it.</h2>
          </motion.div>

          <div className="steps-list">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className="step-item"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
              >
                <div className="step-item__num">{s.num}</div>
                <div>
                  <h3 className="step-item__title">{s.title}</h3>
                  <p className="step-item__desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <motion.div
          className="cta card"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="cta__title">Ready to start practicing?</h2>
          <p className="cta__desc">Create a free account and take your first mock interview today.</p>
          <Link to="/register" className="btn btn-primary btn-lg">Create free account</Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__brand">Prep<span className="text-cyan">AI</span></span>
          <span className="footer__copy">© {new Date().getFullYear()} PrepAI</span>
        </div>
      </footer>
    </div>
  );
}
