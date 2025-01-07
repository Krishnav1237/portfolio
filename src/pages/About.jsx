import { useEffect, useRef } from 'react';

const About = () => {
  const skillsRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      skillsRef.current.style.transform = 'translateY(50px)';
      skillsRef.current.style.opacity = '0';
      skillsRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(skillsRef.current);
    }

    if (bioRef.current) {
      bioRef.current.style.transform = 'translateY(50px)';
      bioRef.current.style.opacity = '0';
      bioRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
      observer.observe(bioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'TypeScript', level: 75, color: '#3178C6' },
    { name: 'Three.js', level: 70, color: '#000000' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'MongoDB', level: 75, color: '#47A248' },
    { name: 'GraphQL', level: 70, color: '#E10098' }
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
          About Me
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          position: 'relative',
          padding: '2rem'
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

          <div ref={bioRef} style={{
            backgroundColor: 'rgba(42, 42, 42, 0.5)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: 'var(--accent-color)'
            }}>
              Who I Am
            </h2>
            <p style={{ 
              lineHeight: 1.8,
              marginBottom: '1.5rem',
              opacity: 0.9
            }}>
              I'm a passionate Full Stack Developer with a love for creating beautiful, functional, and user-friendly websites and applications. With expertise in modern web technologies and a keen eye for design, I bring ideas to life through code.
            </p>
            <p style={{ 
              lineHeight: 1.8,
              opacity: 0.9
            }}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring.
            </p>
          </div>

          <div ref={skillsRef} style={{
            backgroundColor: 'rgba(42, 42, 42, 0.5)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: 'var(--accent-color)'
            }}>
              Skills & Technologies
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {skills.map((skill, index) => (
                <div key={index}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '1.1rem',
                      opacity: 0.9
                    }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      opacity: 0.7
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{
                    height: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        backgroundColor: skill.color,
                        borderRadius: '3px',
                        transition: 'width 1s ease-in-out',
                        boxShadow: `0 0 10px ${skill.color}66`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 