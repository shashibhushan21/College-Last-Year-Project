import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Resume from './pages/Resume/Resume';
import Interview from './pages/Interview/Interview';
import Feedback from './pages/Feedback/Feedback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/resume" element={
            <ProtectedRoute><Resume /></ProtectedRoute>
          } />
          <Route path="/interview" element={
            <ProtectedRoute><Interview /></ProtectedRoute>
          } />
          <Route path="/feedback/:id" element={
            <ProtectedRoute><Feedback /></ProtectedRoute>
          } />
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#19191c',
              color: '#ececed',
              border: '1px solid #2a2a2d',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontFamily: "'Inter', sans-serif"
            },
            success: { iconTheme: { primary: '#3dba6c', secondary: '#111113' } },
            error: { iconTheme: { primary: '#d1453b', secondary: '#111113' } }
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
