import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      padding: '1rem 2rem',
      backgroundColor: 'rgba(18, 18, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'center'
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
    </nav>
  );
};

export default Navbar; 