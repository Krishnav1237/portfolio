import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';

const selfImageUrl = new URL('../assets/self.jpeg', import.meta.url).href;

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

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const skillsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const elements = [titleRef, subtitleRef, buttonsRef, imageRef];
    elements.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(20px)';
        setTimeout(() => {
          ref.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      skillsRef.current.style.opacity = '0';
      skillsRef.current.style.transform = 'translateY(50px)';
      skillsRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
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
          style={{ 
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
        >
          <Suspense fallback={null}>
            <Background />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="container">
        <section className="section hero" style={{ 
          position: 'relative', 
          zIndex: 1,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: '6rem 0 2rem 0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center'
          }}>
            <div className="hero-content" style={{ 
              flex: '1', 
              minWidth: '300px',
              '@media (max-width: 768px)': {
                textAlign: 'center',
                minWidth: '100%'
              }
            }}>
              <div ref={titleRef} style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ 
                  fontSize: 'clamp(2rem, 5vw, 4rem)', 
                  marginBottom: '1rem',
                  color: 'var(--text-color)',
                  fontWeight: '700',
                  position: 'relative',
                  '@media (max-width: 768px)': {
                    fontSize: 'clamp(2rem, 8vw, 3rem)'
                  }
                }}>
                  Hi, I'm <span style={{ 
                    color: 'var(--accent-color)',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    Krishnav Kanoi
                  </span>
                </h1>
              </div>

              <div ref={subtitleRef}>
                <p style={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
                  marginBottom: '2rem', 
                  opacity: 0.9,
                  maxWidth: '600px',
                  lineHeight: 1.6,
                  '@media (max-width: 768px)': {
                    fontSize: '1rem',
                    margin: '0 auto 2rem auto'
                  }
                }}>
                  I'm a passionate Full Stack Developer with expertise in modern web technologies and a knack for building user-friendly, efficient, and functional digital solutions.
                </p>
              </div>

              <div ref={buttonsRef} className="hero-buttons" style={{ 
                display: 'flex', 
                gap: '1rem',
                flexWrap: 'wrap',
                '@media (max-width: 768px)': {
                  justifyContent: 'center'
                }
              }}>
                <Link to="/projects" className="btn" style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span style={{ position: 'relative', zIndex: 1 }}>View Projects</span>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'transform 0.5s ease',
                  }} className="btn-shine" />
                </Link>
                <Link to="/contact" className="btn" style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid var(--accent-color)',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span style={{ position: 'relative', zIndex: 1 }}>Contact Me</span>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'transform 0.5s ease',
                  }} className="btn-shine" />
                </Link>
              </div>
            </div>

            <div ref={imageRef} style={{
              flex: '1',
              minWidth: '300px',
              maxWidth: '400px',
              opacity: '0',
              transform: 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '@media (max-width: 768px)': {
                minWidth: '250px',
                margin: '2rem auto'
              }
            }}>
              <div className="image-container" style={{
                position: 'relative',
                width: '400px',
                height: '400px'
              }}>
                <img 
                  src={selfImageUrl}
                  alt="Profile Photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    boxShadow: '0 20px 50px rgba(0,200,150,0.3)',
                    border: '5px solid var(--accent-color)',
                    transition: 'all 0.5s ease',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    animation: 'morph 8s ease-in-out infinite'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05) rotate(5deg)';
                    e.target.style.boxShadow = '0 30px 60px rgba(0,200,150,0.4)';
                    e.target.style.borderWidth = '8px';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                    e.target.style.boxShadow = '0 20px 50px rgba(0,200,150,0.3)';
                    e.target.style.borderWidth = '5px';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section achievements-grid" ref={skillsRef} style={{
          paddingTop: '2rem',
          paddingBottom: '6rem'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
            marginBottom: '3rem',
            textAlign: 'center',
            color: 'var(--accent-color)',
            position: 'relative',
            '@media (max-width: 768px)': {
              fontSize: 'clamp(1.5rem, 6vw, 2rem)'
            }
          }}>
            Achievements
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
          </h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '1.5rem'
            }
          }}>
            {[
              {
                role: 'ICPC Regionalist',
                company: 'International Collegiate Programming Contest',
                period: '2023',
                description: 'Qualified for ICPC Regionals, demonstrating advanced problem-solving skills and algorithmic expertise in competitive programming.',
                icon: '🏆'
              },
              {
                role: '4x Hackathon Winner',
                company: 'Various Tech Competitions',
                period: '2023 - 2025',
                description: 'Secured a win in multiple hackathons, showcasing innovation, technical prowess, and ability to deliver under pressure.',
                icon: '🚀'
              },
              {
                role: 'Student Excellence Award',
                company: 'Manipal University Jaipur',
                period: '2024',
                description: 'Recognized for outstanding contributions to technical initiatives and projects.',
                icon: '🎓'
              }
            ].map((item, index) => (
              <div 
                key={item.role}
                style={{
                  padding: '2rem',
                  backgroundColor: 'rgba(42, 42, 42, 0.5)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: `fadeInUp 0.5s ease forwards ${index * 0.2}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -15px var(--accent-color)';
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  color: 'var(--accent-color)', 
                  marginBottom: '0.5rem',
                  fontSize: '1.5rem',
                  textAlign: 'center'
                }}>
                  {item.role}
                </h3>
                <h4 style={{
                  color: 'var(--text-color)',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  {item.company}
                </h4>
                <p style={{
                  color: 'var(--accent-color)',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  textAlign: 'center'
                }}>
                  {item.period}
                </p>
                <p style={{ 
                  opacity: 0.8, 
                  lineHeight: 1.6,
                  textAlign: 'center'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <style>
        {`
          @keyframes width {
            from { width: 0; }
            to { width: 100%; }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .btn:hover .btn-shine {
            transform: translateX(100%);
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            }
            50% {
              box-shadow: 0 20px 40px rgba(0,0,0,0.25);
            }
            100% {
              box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes rotateGlow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }

          @keyframes morph {
            0% { border-radius: 50%; }
            30% { border-radius: 60% 40% 70% 30% / 60% 30% 70% 40%; }
            60% { border-radius: 30% 60% 40% 70% / 50% 60% 30% 60%; }
            100% { border-radius: 50%; }
          }

          .image-container {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
};

export default Home;