import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isLanding = location.pathname === '/';

  return (
    <nav className={`navbar ${isLanding ? 'navbar--transparent' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo">
            <span className="navbar__logo-icon">P</span>
          </div>
          <span className="navbar__brand-text">Prep<span className="text-cyan">AI</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="navbar__links">
          {user ? (
            <>
              <Link to="/dashboard" className={`navbar__link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/resume" className={`navbar__link ${location.pathname === '/resume' ? 'active' : ''}`}>
                Resume
              </Link>
              <Link to="/interview" className={`navbar__link ${location.pathname === '/interview' ? 'active' : ''}`}>
                Interview
              </Link>
              <div className="navbar__user">
                <div className="navbar__avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="navbar__username">{user.name}</span>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {isLanding && (
                <>
                  <a href="#features" className="navbar__link">Features</a>
                  <a href="#how-it-works" className="navbar__link">How it Works</a>
                </>
              )}
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar__mobile-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link to="/resume" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Resume</Link>
              <Link to="/interview" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Interview</Link>
              <button onClick={handleLogout} className="navbar__mobile-link navbar__mobile-link--logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
