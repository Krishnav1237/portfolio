import { useEffect, useRef } from 'react';

const Projects = () => {
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0) rotate(0)';
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = 'translateY(100px) rotate(-5deg)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/400x250',
      link: '#',
      color: '#00C896'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team chat, and project analytics.',
      tech: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      image: 'https://via.placeholder.com/400x250',
      link: '#',
      color: '#00A3FF'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with modern design, smooth animations, and interactive 3D elements.',
      tech: ['React', 'Three.js', 'GSAP', 'Styled Components'],
      image: 'https://via.placeholder.com/400x250',
      link: '#',
      color: '#FF6B6B'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather tracking application with interactive maps and detailed weather forecasts.',
      tech: ['React', 'Weather API', 'D3.js', 'Mapbox'],
      image: 'https://via.placeholder.com/400x250',
      link: '#',
      color: '#FFD93D'
    }
  ];

  return (
    <div className="container">
      <section className="section">
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1.5rem',
          background: 'linear-gradient(45deg, var(--text-color), var(--accent-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          My Projects
        </h1>
        
        <p style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 4rem',
          opacity: 0.8,
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          Here are some of my recent projects that showcase my skills and experience in web development.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%)',
            opacity: '0.1',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />

          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              style={{
                backgroundColor: 'rgba(42, 42, 42, 0.5)',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 20px 40px -20px ${project.color}`;
                e.currentTarget.style.borderColor = project.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                height: '200px'
              }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(to bottom, transparent, ${project.color}33)`,
                  transition: 'opacity 0.3s ease',
                  opacity: 0
                }} className="overlay" />
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: project.color
                }}>
                  {project.title}
                </h3>
                <p style={{ 
                  marginBottom: '1.5rem',
                  opacity: 0.9,
                  lineHeight: 1.6
                }}>
                  {project.description}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {project.tech.map((tech, i) => (
                    <span key={i} style={{
                      padding: '0.3rem 0.8rem',
                      backgroundColor: `${project.color}22`,
                      color: project.color,
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects; 