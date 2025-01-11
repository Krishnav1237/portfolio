import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="navbar-container" style={{
        position: 'fixed',
        top: isMobile ? '1rem' : '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: 'calc(100% - 2rem)',
        maxWidth: '600px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative'
        }}>
          {!isMobile && (
            <div className="desktop-menu" style={{
              display: 'flex',
              gap: '3rem',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-around'
            }}>
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/projects', label: 'Projects' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  style={{
                    color: location.pathname === path ? 'var(--accent-color)' : 'var(--text-color)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    padding: '0.5rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== path) {
                      e.target.style.color = 'var(--accent-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== path) {
                      e.target.style.color = 'var(--text-color)';
                    }
                  }}
                >
                  {label}
                  {location.pathname === path && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '5px',
                      height: '5px',
                      backgroundColor: 'var(--accent-color)',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }} />
                  )}
                </Link>
              ))}
            </div>
          )}

          {isMobile && (
            <button 
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-color)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: -1
            }}
          />
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <div 
            className="mobile-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              left: '0',
              right: '0',
              backgroundColor: 'rgba(18, 18, 18, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '0.5rem',
              display: isMenuOpen ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s ease'
            }}
          >
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/projects', label: 'Projects' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  color: location.pathname === path ? 'var(--accent-color)' : 'var(--text-color)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  padding: '0.8rem',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  borderRadius: '8px',
                  backgroundColor: location.pathname === path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  display: 'block'
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: isMobile ? '4rem' : '5rem' }} />
    </>
  );
};

export default Navbar;