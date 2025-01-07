import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import emailjs from '@emailjs/browser';

function AnimatedShape({ position, color, speed, scale, shape }) {
  return (
    <Float
      speed={speed}
      rotationIntensity={2}
      floatIntensity={2}
    >
      <mesh position={position} scale={scale}>
        {shape === 'torus' ? (
          <torusGeometry args={[1, 0.4, 16, 32]} />
        ) : shape === 'box' ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : (
          <octahedronGeometry args={[1]} />
        )}
        <MeshDistortMaterial
          color={color}
          speed={0.4}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  );
}

function Background() {
  return (
    <>
      <AnimatedShape 
        position={[6, 3, -10]} 
        color="#00A3FF" 
        speed={2} 
        scale={1.5}
        shape="torus"
      />
      <AnimatedShape 
        position={[-6, -2, -8]} 
        color="#FF6B6B" 
        speed={1.5} 
        scale={1.2}
        shape="box"
      />
      <AnimatedShape 
        position={[0, -4, -6]} 
        color="#FFD93D" 
        speed={2.5} 
        scale={1}
        shape="octahedron"
      />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
    </>
  );
}

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (formRef.current) {
      formRef.current.style.transform = 'translateY(50px)';
      formRef.current.style.opacity = '0';
      formRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('sending');

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      e.target.reset();
    } catch (error) {
      setStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setStatus(''), 5000);
  };

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

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <section className="section">
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '1.5rem',
            background: 'linear-gradient(45deg, var(--text-color), var(--accent-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Get in Touch
          </h1>

          <p style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 4rem',
            opacity: 0.8,
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}>
            Have a question or want to work together? Feel free to reach out!
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            padding: '2rem'
          }}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: 'rgba(42, 42, 42, 0.5)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '1.1rem',
                    color: 'var(--accent-color)'
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-color)';
                    e.target.style.boxShadow = '0 0 0 2px var(--accent-color-transparent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '1.1rem',
                    color: 'var(--accent-color)'
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-color)';
                    e.target.style.boxShadow = '0 0 0 2px var(--accent-color-transparent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '1.1rem',
                    color: 'var(--accent-color)'
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-color)';
                    e.target.style.boxShadow = '0 0 0 2px var(--accent-color-transparent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'var(--accent-color)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {status && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: '10px',
                    backgroundColor: status === 'success' 
                      ? 'rgba(0, 200, 0, 0.1)' 
                      : status === 'error'
                      ? 'rgba(255, 0, 0, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    color: status === 'success'
                      ? '#00c800'
                      : status === 'error'
                      ? '#ff0000'
                      : 'var(--text-color)',
                    textAlign: 'center'
                  }}
                >
                  {status === 'success' 
                    ? 'Message sent successfully!'
                    : status === 'error'
                    ? 'Failed to send message. Please try again.'
                    : 'Sending message...'}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact; 