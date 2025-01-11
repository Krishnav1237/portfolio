import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import emailjs from '@emailjs/browser';

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
    </>
  );
}

const Contact = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const socialRef = useRef(null);
  const [formStatus, setFormStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const elements = [titleRef, formRef, socialRef];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: '', isError: false });

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      setFormStatus({
        message: 'Message sent successfully! I will get back to you soon.',
        isError: false
      });
      formRef.current.reset();
    } catch (error) {
      setFormStatus({
        message: 'Failed to send message. Please try again.',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get In Touch
            </h1>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }
          }}>
            <div ref={formRef} style={{
              backgroundColor: 'rgba(42, 42, 42, 0.5)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '@media (max-width: 768px)': {
                padding: '1.5rem'
              }
            }}>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}>Name</label>
                  <input
                    name="user_name"
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'var(--text-color)',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}>Email</label>
                  <input
                    name="user_email"
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'var(--text-color)',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}>Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'var(--text-color)',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                {formStatus.message && (
                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    backgroundColor: formStatus.isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
                    color: formStatus.isError ? '#ff6b6b' : '#00c896',
                    textAlign: 'center'
                  }}>
                    {formStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    '@media (max-width: 768px)': {
                      marginTop: '1rem'
                    }
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
              </form>
            </div>

            <div ref={socialRef} style={{
              backgroundColor: 'rgba(42, 42, 42, 0.5)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '@media (max-width: 768px)': {
                padding: '1.5rem'
              }
            }}>
              <h2 style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
                marginBottom: '1.5rem',
                color: 'var(--accent-color)'
              }}>
                Connect With Me
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                '@media (max-width: 768px)': {
                  gap: '1rem'
                }
              }}>
                <a
                  href="https://www.linkedin.com/in/krishnav-kanoi-3ba53a217"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <i className="fab fa-linkedin" style={{ fontSize: '1.5rem', color: '#0077B5' }}></i>
                  <span>Connect on LinkedIn</span>
                </a>

                <a
                  href="https://x.com/KanoiKrishnav"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    style={{ 
                      width: '1.5rem',
                      height: '1.5rem',
                      fill: 'currentColor'
                    }}
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Follow on X</span>
                </a>

                <a
                  href="mailto:krishnavkanoi2005@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <i className="fas fa-envelope" style={{ fontSize: '1.5rem', color: '#EA4335' }}></i>
                  <span>Send an Email</span>
                </a>

                <button
                  onClick={handleDownloadResume}
                  className="btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    width: '100%',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    <i className="fas fa-file-pdf" style={{ fontSize: '1.5rem', marginRight: '1rem' }}></i>
                    Download Resume
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
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>
        {`
          .btn:hover .btn-shine {
            transform: translateX(100%);
          }
        `}
      </style>
    </div>
  );
};

export default Contact; 