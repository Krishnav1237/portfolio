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

const Projects = () => {
  const titleRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const elements = [titleRef, projectsRef];
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
  }, []);

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
              marginBottom: '2rem',
              textAlign: 'center',
              background: 'linear-gradient(45deg, var(--text-color), var(--accent-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              My Projects
            </h1>
          </div>

          <div ref={projectsRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '2rem 0'
          }}>
            {[
              {
                title: 'Tokenised Real Estate Platform',
                description: 'A blockchain-based platform for real estate tokenization, enabling fractional property ownership and transparent transactions.',
                tech: ['React', 'Solidity', 'Web3.js', 'Node.js'],
                image: '/images/real-estate.png',
                url: 'https://real-estate-ten-gilt.vercel.app'
              },
              {
                title: 'AI Powered Hospital Management',
                description: 'An intelligent hospital management system featuring automated patient care workflows, appointment scheduling, and medical record management.',
                tech: ['React', 'Python', 'TensorFlow', 'MongoDB'],
                image: '/images/caremate.png',
                url: 'https://carematehealth.vercel.app',
                bgColor: '#E8F4FF'
              },
              {
                title: 'IEEE Flagship Tech Fest Website',
                description: 'Official website for IEEE technical festival, featuring event registration, real-time updates, and interactive user engagement.',
                tech: ['React', 'Node.js', 'Express', 'Socket.io'],
                image: '/images/genesis.png',
                url: 'https://genesis4-0.vercel.app',
                bgColor: '#1BB8FF'
              }
            ].map((project, index) => (
              <a 
                key={index} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  backgroundColor: 'rgba(42, 42, 42, 0.5)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease forwards ${index * 0.2}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -15px var(--accent-color)';
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}>
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: project.title.includes('Real Estate') ? '#0A0F1C' : 
                                   project.title.includes('Hospital') ? '#E8F4FF' :
                                   project.title.includes('IEEE') ? '#1BB8FF' :
                                   'var(--primary-color)',
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '1rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }} className="overlay" />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
                      color: 'var(--accent-color)'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{ 
                      marginBottom: '1rem',
                      lineHeight: 1.6,
                      opacity: 0.8
                    }}>
                      {project.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {project.tech.map((tech, i) => (
                        <span key={i} style={{
                          padding: '0.3rem 0.8rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '15px',
                          fontSize: '0.9rem',
                          opacity: 0.8
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <style>
        {`
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

          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .project-card:hover .overlay {
            opacity: 1;
          }

          .project-card:hover img {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default Projects; 