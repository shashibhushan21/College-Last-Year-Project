import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import aiRoutes from './routes/ai.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database unavailable. Start MongoDB locally or whitelist your IP in Atlas.'
    });
  }

  next();
};

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'unavailable',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', requireDatabase, authRoutes);
app.use('/api/resume', requireDatabase, resumeRoutes);
app.use('/api/ai', requireDatabase, aiRoutes);
app.use('/api/dashboard', requireDatabase, dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const mongoCandidates = [
  process.env.MONGO_URI,
  process.env.MONGO_FALLBACK_URI,
  'mongodb://127.0.0.1:27017/interview-prep'
].filter(Boolean);

const connectDatabase = async () => {
  for (const mongoUri of mongoCandidates) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
      console.log(`MongoDB connected successfully: ${mongoUri.startsWith('mongodb+srv://') ? 'Atlas' : 'local'}`);
      return;
    } catch (err) {
      console.error(`MongoDB connection failed for ${mongoUri}:`, err.message);
      await mongoose.disconnect().catch(() => {});
    }
  }

  console.warn('No MongoDB connection available. API routes will return 503 until a database is reachable.');
};

connectDatabase();
