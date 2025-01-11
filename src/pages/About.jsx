import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere({ position, color, speed, scale }) {
  return (
    <Float
      speed={speed}
      rotationIntensity={1.5}
      floatIntensity={1.5}
    >
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={0.3}
          distort={0.3}
          radius={1}
        />
      </mesh>
    </Float>
  );
}

function Background() {
  return (
    <>
      <AnimatedSphere 
        position={[8, 2, -10]} 
        color="#00C896" 
        speed={2} 
        scale={2.5}
      />
      <AnimatedSphere 
        position={[-8, -4, -8]} 
        color="#00C896" 
        speed={1.5} 
        scale={2}
      />
      <AnimatedSphere 
        position={[0, -6, -12]} 
        color="#00C896" 
        speed={2.5} 
        scale={1.5}
      />
      <AnimatedSphere
        position={[5, 3, -10]}
        color="#00C896"
        speed={1.8}
        scale={2}
      />
      <AnimatedSphere
        position={[-5, -2, -8]}
        color="#00C896"
        speed={2.2}
        scale={1.8}
      />
      <AnimatedSphere
        position={[-5, 0, -8]}
        color="#00C896"
        speed={2}
        scale={1.5}
      />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
    </>
  );
}

const About = () => {
  const skillsRef = useRef(null);
  const bioRef = useRef(null);
  const titleRef = useRef(null);
  const downloadRef = useRef(null);

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

    [titleRef, bioRef, skillsRef, downloadRef].forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.transform = 'translateY(50px)';
        ref.current.style.opacity = '0';
        ref.current.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const resumeUrl = '/path-to-your-resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'john-doe-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'TypeScript', level: 75, color: '#3178C6' },
    { name: 'Three.js', level: 70, color: '#000000' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'MongoDB', level: 75, color: '#47A248' },
    { name: 'C++', level: 85, color: '#00599C' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 3D Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        opacity: 0.7,
        pointerEvents: 'none',
      }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Background />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <section className="section">
          <div ref={titleRef}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '1.5rem',
              background: 'linear-gradient(45deg, var(--text-color), var(--accent-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              position: 'relative'
            }}>
              About Me
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: 'var(--accent-color)',
                borderRadius: '2px'
              }} />
            </h1>
          </div>

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
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'fadeIn 1s ease-out forwards'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: 'var(--accent-color)',
                animation: 'slideInLeft 0.8s ease-out forwards'
              }}>
                Who I Am
              </h2>
              <p style={{ 
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                opacity: 0.9
              }}>
                I'm a passionate Full Stack Developer with expertise in modern web technologies, dedicated to creating user-friendly, efficient, and aesthetically pleasing digital solutions. My journey in tech is driven by a blend of creativity and logical problem-solving, which I constantly hone through competitive programming.
              </p>
              <p style={{ 
                lineHeight: 1.8,
                marginBottom: '2rem',
                opacity: 0.9
              }}>
                I actively engage in open-source contributions, collaborating with global communities to build impactful projects. Staying updated with emerging technologies excites me, and I strive to integrate these innovations into my work.
              </p>
              <div ref={downloadRef} style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <button
                  onClick={handleDownloadResume}
                  className="btn"
                  style={{
                    padding: '0.8rem 1.5rem',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    Download Resume
                  </span>
                  <span role="img" aria-label="download" style={{ position: 'relative', zIndex: 1 }}>
                    📄
                  </span>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'transform 0.5s ease',
                  }} className="btn-shine" />
                </button>

                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'center'
                }}>
                  <a
                    href="https://www.linkedin.com/in/krishnav-kanoi-3ba53a217"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#0077B5',
                      fontSize: '2rem',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://x.com/KanoiKrishnav"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '2rem',
                      transition: 'transform 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#000000'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      style={{ 
                        width: '2rem',
                        height: '2rem',
                        fill: 'currentColor'
                      }}
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:krishnavkanoi2005@gmail.com"
                    style={{
                      color: '#EA4335',
                      fontSize: '2rem',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            <div ref={skillsRef} style={{
              backgroundColor: 'rgba(42, 42, 42, 0.5)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 1s ease-out forwards 0.3s'
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
                          width: '0%',
                          height: '100%',
                          backgroundColor: skill.color,
                          borderRadius: '3px',
                          transition: 'width 1s ease-in-out',
                          boxShadow: `0 0 10px ${skill.color}66`,
                          animation: `progress-${index} 1.5s ease-out forwards ${index * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <style>
          {`
            ${skills.map((skill, index) => `
              @keyframes progress-${index} {
                from { width: 0; }
                to { width: ${skill.level}%; }
              }
            `).join('\n')}

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes slideInLeft {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
              }
            }

            .btn:hover {
              animation: pulse 0.5s ease-in-out;
            }

            .btn:hover .btn-shine {
              transform: translateX(100%);
            }

            .social-icon:hover {
              animation: pulse 0.5s ease-in-out;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default About; 