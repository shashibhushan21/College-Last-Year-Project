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
              background: '#24180d',
              color: '#ffffff',
              border: '1px solid #6b4a24',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontFamily: "'Manrope', sans-serif"
            },
            success: { iconTheme: { primary: '#b85a10', secondary: '#fff8ee' } },
            error: { iconTheme: { primary: '#c9941d', secondary: '#fff8ee' } }
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
