import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';

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
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
    </>
  );
}

const Home = () => {
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
        <section className="section hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-content">
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, var(--text-color), var(--accent-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              Hi, I'm <span style={{ color: 'var(--accent-color)' }}>John Doe</span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', 
              marginBottom: '2rem', 
              opacity: 0.9,
              maxWidth: '600px',
              lineHeight: 1.6
            }}>
              Full Stack Developer & UI/UX Designer crafting beautiful digital experiences
            </p>
            <div className="hero-buttons" style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link to="/projects" className="btn" style={{
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                letterSpacing: '0.5px'
              }}>
                View Projects
              </Link>
              <Link to="/contact" className="btn" style={{ 
                backgroundColor: 'transparent',
                border: '2px solid var(--accent-color)',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                letterSpacing: '0.5px'
              }}>
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 style={{ 
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
            marginBottom: '3rem',
            textAlign: 'center',
            color: 'var(--accent-color)'
          }}>
            Featured Skills
          </h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                skill: 'React',
                description: 'Building modern and responsive web applications with React and its ecosystem.'
              },
              {
                skill: 'Node.js',
                description: 'Creating scalable backend services and RESTful APIs.'
              },
              {
                skill: 'TypeScript',
                description: 'Developing type-safe applications with enhanced developer experience.'
              },
              {
                skill: 'UI/UX Design',
                description: 'Designing intuitive and beautiful user interfaces with attention to detail.'
              }
            ].map((item) => (
              <div key={item.skill} style={{
                padding: '2rem',
                backgroundColor: 'var(--primary-color)',
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
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
                <h3 style={{ 
                  color: 'var(--accent-color)', 
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  {item.skill}
                </h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 