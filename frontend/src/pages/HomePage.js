import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRecycle, FaCoins, FaQrcode, FaLeaf, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import '../animations.css';

// Custom hook for scroll animation
const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-animation');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animate__animated');
          element.classList.add(element.dataset.animation);
          element.classList.remove('scroll-animation');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
};

const HomePage = () => {
  // Use the scroll animation hook
  useScrollAnimation();
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section py-5 mb-5 rounded position-relative overflow-hidden" 
           style={{
             background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
             color: 'white',
             boxShadow: '0 15px 40px rgba(46, 139, 87, 0.25)',
             border: '1px solid rgba(255, 255, 255, 0.15)',
             minHeight: '85vh',
             display: 'flex',
             alignItems: 'center'
           }}>
        {/* Animated Gradient Overlay */}
        <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)', zIndex: 1 }}></div>
        {/* Animated Background Elements */}
        <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', opacity: 0.15 }}>
          <div className="position-absolute" style={{ top: '10%', left: '5%', width: '15px', height: '15px', background: '#fff', borderRadius: '50%', animation: 'float 8s infinite ease-in-out' }}></div>
          <div className="position-absolute" style={{ top: '40%', left: '25%', width: '10px', height: '10px', background: '#fff', borderRadius: '50%', animation: 'float 12s infinite ease-in-out' }}></div>
          <div className="position-absolute" style={{ top: '70%', left: '15%', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', animation: 'float 10s infinite ease-in-out' }}></div>
          <div className="position-absolute" style={{ top: '30%', right: '15%', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', animation: 'float 9s infinite ease-in-out' }}></div>
          <div className="position-absolute" style={{ top: '60%', right: '25%', width: '18px', height: '18px', background: '#fff', borderRadius: '50%', animation: 'float 11s infinite ease-in-out' }}></div>
          <div className="position-absolute" style={{ top: '20%', right: '40%', width: '25px', height: '25px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'float 15s infinite ease-in-out', filter: 'blur(3px)' }}></div>
          <div className="position-absolute" style={{ top: '80%', right: '10%', width: '8px', height: '8px', background: '#fff', borderRadius: '50%', animation: 'float 7s infinite ease-in-out' }}></div>
          <div className="position-absolute" style={{ top: '15%', left: '40%', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', animation: 'float 10s infinite ease-in-out' }}></div>
        </div>
        {/* Decorative Elements */}
        <div className="position-absolute" style={{ top: '-30px', left: '-20px', opacity: 0.15, zIndex: 1 }}>
          <svg width="250" height="250" viewBox="0 0 250 250">
            <path d="M20 150 Q0 120 20 100 Q40 120 20 150 Z" fill="#ffffff" />
            <path d="M50 180 Q20 170 10 140 Q40 150 50 180 Z" fill="#ffffff" />
            <path d="M80 120 Q60 100 80 80 Q100 100 80 120 Z" fill="#ffffff" opacity="0.7" />
          </svg>
        </div>
        <div className="position-absolute" style={{ bottom: '-30px', right: '-20px', opacity: 0.15, zIndex: 1 }}>
          <svg width="250" height="250" viewBox="0 0 250 250">
            <path d="M180 50 Q210 40 190 10 Q160 30 180 50 Z" fill="#ffffff" />
            <path d="M150 80 Q180 70 200 50 Q170 70 150 80 Z" fill="#ffffff" />
            <path d="M210 100 Q240 90 220 70 Q190 90 210 100 Z" fill="#ffffff" opacity="0.7" />
          </svg>
        </div>
        <div className="position-absolute" style={{ top: '20%', left: '15%', opacity: 0.1, zIndex: 1, transform: 'rotate(45deg)', animation: 'float 20s infinite ease-in-out' }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect x="10" y="10" width="100" height="100" rx="25" fill="#ffffff" opacity="0.5" />
          </svg>
        </div>
        <div className="position-absolute" style={{ bottom: '15%', right: '20%', opacity: 0.1, zIndex: 1, transform: 'rotate(-15deg)', animation: 'float 25s infinite ease-in-out' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#ffffff" opacity="0.6" />
          </svg>
        </div>
        
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col md={6} className="mb-5 mb-md-0">
              <div className="animate__animated animate__fadeInLeft">
                <Badge 
                  pill 
                  className="mb-4 px-4 py-2 animate__animated animate__fadeInDown animate__delay-1s" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.25)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <span className="pulse-dot me-2"></span> Solusi Sampah Digital
                </Badge>
                <h1 className="display-4 fw-bold text-white mb-4 animate__animated animate__fadeInUp animate__delay-1s" 
                    style={{ 
                      textShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', 
                      letterSpacing: '-0.5px',
                      lineHeight: '1.2'
                    }}>
                  Bank Sampah Digital: <span style={{ color: '#FFD700', textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)' }}>Dampak Hijau</span> untuk Bumi
                </h1>
                <p className="lead mb-5 text-white animate__animated animate__fadeInUp animate__delay-1s" 
                   style={{ 
                     opacity: 0.95, 
                     fontWeight: 300, 
                     lineHeight: 1.8, 
                     maxWidth: '95%',
                     fontSize: '1.2rem',
                     textShadow: '0 1px 5px rgba(0, 0, 0, 0.1)'
                   }}>
                  Temukan cara mudah untuk mengubah sampah menjadi poin digital dan tukarkan dengan berbagai hadiah menarik. 
                  Mari bersama menjaga lingkungan dan mendapatkan manfaat dari sampah yang kita pilah.
                </p>
                <div className="d-grid gap-3 d-md-flex mt-4 animate__animated animate__fadeInUp animate__delay-1s">
                  <Button 
                    as={Link} 
                    to="/register" 
                    size="lg" 
                    className="me-md-3 px-4 py-3 fw-medium d-flex align-items-center position-relative overflow-hidden" 
                    style={{ 
                      backgroundColor: '#FF8C00', 
                      borderColor: '#FF8C00', 
                      boxShadow: '0 10px 20px rgba(255, 140, 0, 0.35)',
                      transition: 'all 0.4s ease',
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 140, 0, 0.45)';
                      e.currentTarget.style.backgroundColor = '#FFA500';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 140, 0, 0.35)';
                      e.currentTarget.style.backgroundColor = '#FF8C00';
                    }}
                  >
                    <span className="position-relative z-index-1">Daftar Sekarang <FaArrowRight className="ms-2" /></span>
                    <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', opacity: 0.5, zIndex: 0 }}></div>
                  </Button>
                  <Button 
                    as={Link} 
                    to="/education" 
                    variant="outline-light" 
                    size="lg" 
                    className="shadow-sm px-4 py-3 fw-medium position-relative overflow-hidden"
                    style={{ 
                      borderWidth: '2px',
                      transition: 'all 0.4s ease',
                      transform: 'translateY(0)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <span className="position-relative z-index-1">Pelajari Lebih Lanjut</span>
                    <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', opacity: 0.5, zIndex: 0 }}></div>
                  </Button>
                </div>
                <div className="mt-5 d-flex align-items-center animate__animated animate__fadeInUp animate__delay-1s">
                  <div className="d-flex">
                    <div className="user-avatar" 
                         style={{ 
                           marginRight: '-10px', 
                           width: '40px', 
                           height: '40px', 
                           borderRadius: '50%', 
                           background: '#FFD700', 
                           border: '2px solid white', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           fontSize: '13px', 
                           fontWeight: 'bold',
                           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                           transition: 'all 0.3s ease',
                           transform: 'translateY(0)'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-3px)';
                           e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                         }}
                    >BS</div>
                    <div className="user-avatar" 
                         style={{ 
                           marginRight: '-10px', 
                           width: '40px', 
                           height: '40px', 
                           borderRadius: '50%', 
                           background: '#FF8C00', 
                           border: '2px solid white', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           fontSize: '13px', 
                           fontWeight: 'bold',
                           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                           transition: 'all 0.3s ease',
                           transform: 'translateY(0)'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-3px)';
                           e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                         }}
                    >SA</div>
                    <div className="user-avatar" 
                         style={{ 
                           marginRight: '-10px', 
                           width: '40px', 
                           height: '40px', 
                           borderRadius: '50%', 
                           background: '#4CAF50', 
                           border: '2px solid white', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           fontSize: '13px', 
                           fontWeight: 'bold',
                           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                           transition: 'all 0.3s ease',
                           transform: 'translateY(0)'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-3px)';
                           e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                         }}
                    >AR</div>
                    <div className="user-avatar" 
                         style={{ 
                           width: '40px', 
                           height: '40px', 
                           borderRadius: '50%', 
                           background: 'rgba(255, 255, 255, 0.3)', 
                           border: '2px solid white', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           fontSize: '13px', 
                           fontWeight: 'bold',
                           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                           transition: 'all 0.3s ease',
                           transform: 'translateY(0)'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-3px)';
                           e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                         }}
                    >+</div>
                  </div>
                  <div className="ms-3">
                    <div className="d-flex align-items-center">
                      <div className="me-2" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}></div>
                      <small className="text-white-50">Bergabung dengan <span className="text-white fw-bold" style={{ fontSize: '1.1rem', textShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>150+</span> nasabah lainnya</small>
                    </div>
                    <div className="mt-1">
                      <small className="text-white-50 fst-italic">Jadilah bagian dari komunitas kami</small>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="animate__animated animate__fadeInRight animate__delay-1s position-relative">
                <div className="hero-image-container" style={{ 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  borderRadius: '30px', 
                  padding: '25px',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'all 0.5s ease',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 35px 60px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
                }}
                >
                  {/* Glowing effect behind image */}
                  <div className="position-absolute" style={{ 
                    top: '50%', 
                    left: '50%', 
                    width: '80%', 
                    height: '80%', 
                    transform: 'translate(-50%, -50%)', 
                    background: 'radial-gradient(circle at center, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0) 70%)', 
                    filter: 'blur(30px)',
                    zIndex: 1 
                  }}></div>
                  
                  <img 
                    src="/images/waste-bin-illustration.svg" 
                    alt="Bank Sampah Digital" 
                    className="img-fluid p-4"
                    style={{ 
                      maxHeight: '420px', 
                      position: 'relative', 
                      zIndex: 2,
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                      transform: 'translateZ(20px)',
                      transition: 'all 0.5s ease'
                    }}
                  />
                  
                  {/* Radial gradient overlay */}
                  <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', zIndex: 1 }}></div>
                  
                  {/* Animated dots pattern */}
                  <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4, zIndex: 1, overflow: 'hidden' }}>
                    <div className="position-absolute" style={{ top: '10%', left: '10%', width: '6px', height: '6px', background: '#fff', borderRadius: '50%', animation: 'float 8s infinite ease-in-out' }}></div>
                    <div className="position-absolute" style={{ top: '20%', right: '15%', width: '4px', height: '4px', background: '#fff', borderRadius: '50%', animation: 'float 12s infinite ease-in-out' }}></div>
                    <div className="position-absolute" style={{ bottom: '15%', left: '20%', width: '5px', height: '5px', background: '#fff', borderRadius: '50%', animation: 'float 10s infinite ease-in-out' }}></div>
                    <div className="position-absolute" style={{ bottom: '30%', right: '10%', width: '7px', height: '7px', background: '#fff', borderRadius: '50%', animation: 'float 9s infinite ease-in-out' }}></div>
                  </div>
                </div>
                
                {/* Decorative shapes around the image */}
                <div className="position-absolute" style={{ top: '10%', right: '0%', transform: 'rotate(15deg)', animation: 'float 6s infinite ease-in-out' }}>
                  <svg width="70" height="70" viewBox="0 0 70 70">
                    <path d="M35 0 L41 23 L65 29 L41 35 L35 58 L29 35 L5 29 L29 23 Z" fill="#FFD700" opacity="0.8" filter="drop-shadow(0 5px 15px rgba(255, 215, 0, 0.3))" />
                  </svg>
                </div>
                
                <div className="position-absolute" style={{ bottom: '15%', left: '0%', transform: 'rotate(-10deg)', animation: 'float 8s infinite ease-in-out' }}>
                  <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="#FF8C00" opacity="0.7" filter="drop-shadow(0 5px 15px rgba(255, 140, 0, 0.3))" />
                  </svg>
                </div>
                
                <div className="position-absolute" style={{ top: '60%', right: '10%', animation: 'float 7s infinite ease-in-out' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <rect x="5" y="5" width="30" height="30" rx="8" fill="#4CAF50" opacity="0.7" filter="drop-shadow(0 5px 15px rgba(76, 175, 80, 0.3))" />
                  </svg>
                </div>
                
                {/* New decorative element */}
                <div className="position-absolute" style={{ top: '40%', left: '-5%', animation: 'float 9s infinite ease-in-out' }}>
                  <svg width="35" height="35" viewBox="0 0 35 35">
                    <polygon points="17.5,0 23.5,12 35,17.5 23.5,23 17.5,35 11.5,23 0,17.5 11.5,12" fill="#2196F3" opacity="0.6" filter="drop-shadow(0 5px 15px rgba(33, 150, 243, 0.3))" />
                  </svg>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="mb-5 py-5">
        <div className="text-center mb-5 scroll-animation" data-animation="animate__fadeInUp">
          <Badge 
            pill 
            className="mb-3 px-3 py-2" 
            style={{ 
              background: 'rgba(46, 139, 87, 0.1)', 
              color: '#2E8B57',
              border: '1px solid rgba(46, 139, 87, 0.2)'
            }}
          >
            Fitur Kami
          </Badge>
          <h2 className="display-5 fw-bold mb-3">Fitur <span style={{ color: '#2E8B57' }}>Utama</span></h2>
          <div className="mx-auto" style={{ width: '50px', height: '4px', background: 'linear-gradient(to right, #2E8B57, #3CB371)', marginBottom: '20px', borderRadius: '2px' }}></div>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', fontWeight: 300 }}>Nikmati berbagai fitur yang memudahkan Anda dalam mengelola sampah dan mendapatkan manfaat dari program Bank Sampah Digital</p>
        </div>
        
        <Row className="g-4 justify-content-center">
          <Col lg={3} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp">
            <Card className="h-100 text-center p-4 border-0 shadow-sm feature-card" 
                  style={{ 
                    borderRadius: '16px', 
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1)';
                  }}
            >
              <div className="card-gradient-top" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(to right, #1976D2, #2196F3)' }}></div>
              <Card.Body>
                <div className="feature-icon-wrapper mb-4 mx-auto d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '90px', 
                       height: '90px', 
                       borderRadius: '50%', 
                       background: 'rgba(25, 118, 210, 0.1)',
                       transition: 'all 0.3s ease',
                       boxShadow: '0 10px 20px rgba(25, 118, 210, 0.1)'
                     }}>
                  <FaRecycle size={45} style={{ color: '#1976D2' }} />
                </div>
                <Card.Title className="fw-bold mb-3">Setoran Sampah</Card.Title>
                <Card.Text style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Setorkan sampah yang sudah dipilah dan dapatkan poin digital sesuai dengan jenis dan berat sampah.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
            <Card className="h-100 text-center p-4 border-0 shadow-sm feature-card" 
                  style={{ 
                    borderRadius: '16px', 
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1)';
                  }}
            >
              <div className="card-gradient-top" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(to right, #FF8C00, #FFA500)' }}></div>
              <Card.Body>
                <div className="feature-icon-wrapper mb-4 mx-auto d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '90px', 
                       height: '90px', 
                       borderRadius: '50%', 
                       background: 'rgba(255, 140, 0, 0.1)',
                       transition: 'all 0.3s ease',
                       boxShadow: '0 10px 20px rgba(255, 140, 0, 0.1)'
                     }}>
                  <FaCoins size={45} style={{ color: '#FF8C00' }} />
                </div>
                <Card.Title className="fw-bold mb-3">Poin Digital</Card.Title>
                <Card.Text style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Kumpulkan poin dari setiap transaksi penyetoran sampah dan pantau saldo poin Anda dengan mudah.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <Card className="h-100 text-center p-4 border-0 shadow-sm feature-card" 
                  style={{ 
                    borderRadius: '16px', 
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1)';
                  }}
            >
              <div className="card-gradient-top" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(to right, #2196F3, #03A9F4)' }}></div>
              <Card.Body>
                <div className="feature-icon-wrapper mb-4 mx-auto d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '90px', 
                       height: '90px', 
                       borderRadius: '50%', 
                       background: 'rgba(33, 150, 243, 0.1)',
                       transition: 'all 0.3s ease',
                       boxShadow: '0 10px 20px rgba(33, 150, 243, 0.1)'
                     }}>
                  <FaQrcode size={45} style={{ color: '#2196F3' }} />
                </div>
                <Card.Title className="fw-bold mb-3">QR Code</Card.Title>
                <Card.Text style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Gunakan QR Code untuk identifikasi nasabah yang cepat dan mudah saat melakukan transaksi.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Card className="h-100 text-center p-4 border-0 shadow-sm feature-card" 
                  style={{ 
                    borderRadius: '16px', 
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    const icon = e.currentTarget.querySelector('.feature-icon-wrapper');
                    if (icon) icon.style.transform = 'scale(1)';
                  }}
            >
              <div className="card-gradient-top" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(to right, #4CAF50, #8BC34A)' }}></div>
              <Card.Body>
                <div className="feature-icon-wrapper mb-4 mx-auto d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '90px', 
                       height: '90px', 
                       borderRadius: '50%', 
                       background: 'rgba(76, 175, 80, 0.1)',
                       transition: 'all 0.3s ease',
                       boxShadow: '0 10px 20px rgba(76, 175, 80, 0.1)'
                     }}>
                  <FaLeaf size={45} style={{ color: '#4CAF50' }} />
                </div>
                <Card.Title className="fw-bold mb-3">Edukasi</Card.Title>
                <Card.Text style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                  Pelajari cara memilah sampah dengan benar dan dampak positifnya terhadap lingkungan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="py-5 mb-5 position-relative overflow-hidden scroll-animation" data-animation="animate__fadeIn"
           style={{ 
             background: 'linear-gradient(45deg, #006400 0%, #2E8B57 50%, #3CB371 100%)',
             borderRadius: '20px',
             boxShadow: '0 20px 40px rgba(46, 139, 87, 0.2)',
             border: '1px solid rgba(255, 255, 255, 0.1)'
           }}>
        {/* Decorative Elements */}
        <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="5" fill="#FFF"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        
        {/* Animated Shapes */}
        <div className="position-absolute" style={{ top: '20%', left: '5%', opacity: 0.2, animation: 'float 8s infinite ease-in-out' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#FFF" />
          </svg>
        </div>
        <div className="position-absolute" style={{ bottom: '15%', right: '8%', opacity: 0.15, animation: 'float 10s infinite ease-in-out' }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect x="0" y="0" width="120" height="120" rx="20" fill="#FFF" />
          </svg>
        </div>
        
        <Container className="text-center position-relative py-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="cta-content">
                <Badge 
                  pill 
                  className="mb-4 px-3 py-2" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white'
                  }}
                >
                  Mulai Perjalanan Hijau Anda
                </Badge>
                <h2 className="display-4 fw-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>Siap Bergabung dengan <span style={{ color: '#FFD700' }}>Bank Sampah Digital</span>?</h2>
                <p className="lead mb-4 text-white" style={{ opacity: 0.95, fontWeight: 300, lineHeight: 1.6, maxWidth: '90%', margin: '0 auto' }}>
                  Mulai sekarang, ubah sampah menjadi poin dan dapatkan manfaatnya. Bergabunglah dengan ribuan nasabah yang telah merasakan manfaat dari program Bank Sampah Digital.
                </p>
                <div className="d-flex justify-content-center mt-5">
                  <Button 
                    as={Link} 
                    to="/register" 
                    size="lg" 
                    className="px-5 py-3 fw-medium shadow-lg" 
                    style={{ 
                      backgroundColor: '#FF8C00', 
                      borderColor: '#FF8C00',
                      borderRadius: '50px',
                      boxShadow: '0 10px 25px rgba(255, 140, 0, 0.4)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 140, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 140, 0, 0.4)';
                    }}
                  >
                    <span className="d-flex align-items-center">
                      Daftar Sekarang <FaArrowRight className="ms-2" />
                    </span>
                    <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', opacity: 0.5 }}></div>
                  </Button>
                </div>
                <div className="mt-4 text-white-50">
                  <small>Sudah memiliki akun? <Link to="/login" className="text-white fw-medium" style={{ textDecoration: 'underline' }}>Masuk di sini</Link></small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="mb-5 py-5">
        <div className="text-center mb-5 scroll-animation" data-animation="animate__fadeInUp">
          <Badge 
            pill 
            className="mb-3 px-3 py-2" 
            style={{ 
              background: 'rgba(46, 139, 87, 0.1)', 
              color: '#2E8B57',
              border: '1px solid rgba(46, 139, 87, 0.2)'
            }}
          >
            Statistik Kami
          </Badge>
          <h2 className="display-5 fw-bold mb-3">Pencapaian <span style={{ color: '#2E8B57' }}>Kami</span></h2>
          <div className="mx-auto" style={{ width: '50px', height: '4px', background: 'linear-gradient(to right, #2E8B57, #3CB371)', marginBottom: '20px', borderRadius: '2px' }}></div>
        </div>
        
        <Row className="justify-content-center text-center g-4">
          <Col md={3} sm={6} className="scroll-animation" data-animation="animate__fadeInUp">
            <div className="p-4 rounded stat-card" 
              style={{ 
                background: 'rgba(46, 139, 87, 0.1)', 
                borderRadius: '16px',
                border: '1px solid rgba(46, 139, 87, 0.1)',
                boxShadow: '0 10px 20px rgba(46, 139, 87, 0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(46, 139, 87, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(46, 139, 87, 0.05)';
              }}
            >
              <div className="stat-icon mb-2" style={{ opacity: 0.2, position: 'absolute', top: '10px', right: '10px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="display-4 fw-bold" style={{ color: '#2E8B57' }}>156<span style={{ fontSize: '2rem' }}>+</span></h2>
              <p className="mb-0" style={{ color: '#6c757d', fontWeight: 500 }}>Nasabah Aktif</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="p-4 rounded stat-card" 
              style={{ 
                background: 'rgba(255, 140, 0, 0.1)', 
                borderRadius: '16px',
                border: '1px solid rgba(255, 140, 0, 0.1)',
                boxShadow: '0 10px 20px rgba(255, 140, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 140, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 140, 0, 0.05)';
              }}
            >
              <div className="stat-icon mb-2" style={{ opacity: 0.2, position: 'absolute', top: '10px', right: '10px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="display-4 fw-bold" style={{ color: '#FF8C00' }}>423<span style={{ fontSize: '2rem' }}>+</span></h2>
              <p className="mb-0" style={{ color: '#6c757d', fontWeight: 500 }}>Transaksi Sampah</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="p-4 rounded stat-card" 
              style={{ 
                background: 'rgba(33, 150, 243, 0.1)', 
                borderRadius: '16px',
                border: '1px solid rgba(33, 150, 243, 0.1)',
                boxShadow: '0 10px 20px rgba(33, 150, 243, 0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(33, 150, 243, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(33, 150, 243, 0.05)';
              }}
            >
              <div className="stat-icon mb-2" style={{ opacity: 0.2, position: 'absolute', top: '10px', right: '10px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6v6l4 2" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="display-4 fw-bold" style={{ color: '#2196F3' }}>12<span style={{ fontSize: '2rem' }}>K+</span></h2>
              <p className="mb-0" style={{ color: '#6c757d', fontWeight: 500 }}>Poin Ditukarkan</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="p-4 rounded stat-card" 
              style={{ 
                background: 'rgba(76, 175, 80, 0.1)', 
                borderRadius: '16px',
                border: '1px solid rgba(76, 175, 80, 0.1)',
                boxShadow: '0 10px 20px rgba(76, 175, 80, 0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(76, 175, 80, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(76, 175, 80, 0.05)';
              }}
            >
              <div className="stat-icon mb-2" style={{ opacity: 0.2, position: 'absolute', top: '10px', right: '10px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12V22H4V12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7H2v5h20V7z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="display-4 fw-bold" style={{ color: '#4CAF50' }}>87<span style={{ fontSize: '2rem' }}>+</span></h2>
              <p className="mb-0" style={{ color: '#6c757d', fontWeight: 500 }}>Hadiah Diberikan</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* How It Works */}
      <Container className="mb-5 py-5">
        <div className="text-center mb-5 scroll-animation" data-animation="animate__fadeInUp">
          <Badge 
            pill 
            className="mb-3 px-3 py-2" 
            style={{ 
              background: 'rgba(46, 139, 87, 0.1)', 
              color: '#2E8B57',
              border: '1px solid rgba(46, 139, 87, 0.2)'
            }}
          >
            Proses Sederhana
          </Badge>
          <h2 className="display-5 fw-bold mb-3">Cara <span style={{ color: '#2E8B57' }}>Kerja</span></h2>
          <div className="mx-auto" style={{ width: '50px', height: '4px', background: 'linear-gradient(to right, #2E8B57, #3CB371)', marginBottom: '20px', borderRadius: '2px' }}></div>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', fontWeight: 300 }}>Ikuti 4 langkah mudah ini untuk mulai menggunakan Bank Sampah Digital</p>
        </div>
        
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="position-relative">
              {/* Connecting Line */}
              <div className="position-absolute d-none d-md-block" style={{ 
                top: '100px', 
                left: '60px', 
                width: 'calc(100% - 120px)', 
                height: '3px', 
                background: 'linear-gradient(to right, #E9ECEF 0%, #2E8B57 33%, #2E8B57 66%, #E9ECEF 100%)',
                zIndex: '-1'
              }}></div>
              
              <Row className="g-5">
                <Col md={3} className="text-center scroll-animation" data-animation="animate__fadeInUp">
                  <div className="how-it-works-item" 
                    style={{ 
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="step-icon-wrapper mx-auto mb-4 d-flex align-items-center justify-content-center" 
                         style={{ 
                           width: '100px', 
                           height: '100px', 
                           borderRadius: '50%', 
                           background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
                           boxShadow: '0 10px 20px rgba(46, 139, 87, 0.3)',
                           color: 'white',
                           fontSize: '36px',
                           fontWeight: 'bold',
                           transition: 'all 0.3s ease',
                           position: 'relative',
                           zIndex: '1'
                         }}
                    >
                      <div className="position-absolute" style={{ top: '-5px', right: '-5px', width: '30px', height: '30px', borderRadius: '50%', background: '#FFD700', opacity: '0.5', zIndex: '-1' }}></div>
                      1
                    </div>
                    <h4 className="fw-bold mb-3">Daftar</h4>
                    <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Buat akun dan dapatkan QR Code unik untuk identifikasi nasabah.</p>
                  </div>
                </Col>
                
                <Col md={3} className="text-center scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <div className="how-it-works-item"
                    style={{ 
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="step-icon-wrapper mx-auto mb-4 d-flex align-items-center justify-content-center" 
                         style={{ 
                           width: '100px', 
                           height: '100px', 
                           borderRadius: '50%', 
                           background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
                           boxShadow: '0 10px 20px rgba(46, 139, 87, 0.3)',
                           color: 'white',
                           fontSize: '36px',
                           fontWeight: 'bold',
                           transition: 'all 0.3s ease',
                           position: 'relative',
                           zIndex: '1'
                         }}
                    >
                      <div className="position-absolute" style={{ top: '-5px', right: '-5px', width: '30px', height: '30px', borderRadius: '50%', background: '#FF8C00', opacity: '0.5', zIndex: '-1' }}></div>
                      2
                    </div>
                    <h4 className="fw-bold mb-3">Pilah Sampah</h4>
                    <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Pisahkan sampah berdasarkan jenisnya sesuai dengan panduan pemilahan.</p>
                  </div>
                </Col>
                
                <Col md={3} className="text-center scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="how-it-works-item"
                    style={{ 
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="step-icon-wrapper mx-auto mb-4 d-flex align-items-center justify-content-center" 
                         style={{ 
                           width: '100px', 
                           height: '100px', 
                           borderRadius: '50%', 
                           background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
                           boxShadow: '0 10px 20px rgba(46, 139, 87, 0.3)',
                           color: 'white',
                           fontSize: '36px',
                           fontWeight: 'bold',
                           transition: 'all 0.3s ease',
                           position: 'relative',
                           zIndex: '1'
                         }}
                    >
                      <div className="position-absolute" style={{ top: '-5px', right: '-5px', width: '30px', height: '30px', borderRadius: '50%', background: '#2196F3', opacity: '0.5', zIndex: '-1' }}></div>
                      3
                    </div>
                    <h4 className="fw-bold mb-3">Setorkan</h4>
                    <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Kunjungi lokasi Bank Sampah terdekat dan setorkan sampah yang sudah dipilah.</p>
                  </div>
                </Col>
                
                <Col md={3} className="text-center scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <div className="how-it-works-item"
                    style={{ 
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      const icon = e.currentTarget.querySelector('.step-icon-wrapper');
                      if (icon) icon.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="step-icon-wrapper mx-auto mb-4 d-flex align-items-center justify-content-center" 
                         style={{ 
                           width: '100px', 
                           height: '100px', 
                           borderRadius: '50%', 
                           background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
                           boxShadow: '0 10px 20px rgba(46, 139, 87, 0.3)',
                           color: 'white',
                           fontSize: '36px',
                           fontWeight: 'bold',
                           transition: 'all 0.3s ease',
                           position: 'relative',
                           zIndex: '1'
                         }}
                    >
                      <div className="position-absolute" style={{ top: '-5px', right: '-5px', width: '30px', height: '30px', borderRadius: '50%', background: '#4CAF50', opacity: '0.5', zIndex: '-1' }}></div>
                      4
                    </div>
                    <h4 className="fw-bold mb-3">Dapatkan Poin</h4>
                    <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Terima poin digital sesuai dengan jenis dan berat sampah yang disetorkan.</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <div className="py-5 mb-5 position-relative" 
           style={{ 
             background: 'linear-gradient(135deg, #F8F9FA 0%, #F1F8F5 100%)', 
             borderRadius: '20px',
             boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
             border: '1px solid rgba(46, 139, 87, 0.05)',
             overflow: 'hidden'
           }}>
        {/* Background Pattern */}
        <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="testimonial-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="#2E8B57" strokeWidth="1"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#testimonial-pattern)"/>
          </svg>
        </div>
        
        <Container className="position-relative">
          <div className="text-center mb-5 scroll-animation" data-animation="animate__fadeInUp">
            <Badge 
              pill 
              className="mb-3 px-3 py-2" 
              style={{ 
                background: 'rgba(46, 139, 87, 0.1)', 
                color: '#2E8B57',
                border: '1px solid rgba(46, 139, 87, 0.2)'
              }}
            >
              Apa Kata Mereka
            </Badge>
            <h2 className="display-5 fw-bold mb-3">Testimoni <span style={{ color: '#2E8B57' }}>Nasabah</span></h2>
            <div className="mx-auto" style={{ width: '50px', height: '4px', background: 'linear-gradient(to right, #2E8B57, #3CB371)', marginBottom: '20px', borderRadius: '2px' }}></div>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', fontWeight: 300 }}>Dengarkan pengalaman dari nasabah yang telah merasakan manfaat Bank Sampah Digital</p>
          </div>
          
          <Row className="justify-content-center g-4">
            <Col lg={4} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp">
              <Card className="h-100 border-0 shadow-sm testimonial-card" 
                    style={{ 
                      borderRadius: '16px', 
                      overflow: 'visible',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    }}
              >
                <Card.Body className="position-relative p-4">
                  <div className="position-absolute" style={{ top: '-30px', left: '30px' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
                      border: '3px solid white',
                      boxShadow: '0 8px 20px rgba(46, 139, 87, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>BS</div>
                  </div>
                  <div className="position-absolute" style={{ top: '20px', right: '20px', opacity: 0.1 }}>
                    <FaQuoteLeft size={40} color="#2E8B57" />
                  </div>
                  <div className="mb-3 text-warning mt-4 pt-2" style={{ fontSize: '18px' }}>
                    ★★★★★
                  </div>
                  <Card.Text className="mb-4 fst-italic" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                    "Sangat membantu dalam mengelola sampah rumah tangga. Sekarang sampah tidak lagi menjadi masalah tapi menjadi sumber poin yang bisa ditukar dengan hadiah menarik."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0 fw-bold">Budi Santoso</h5>
                      <small style={{ color: '#6c757d' }}>Nasabah sejak 2022</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
              <Card className="h-100 border-0 shadow-sm testimonial-card" 
                    style={{ 
                      borderRadius: '16px', 
                      overflow: 'visible',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    }}
              >
                <Card.Body className="position-relative p-4">
                  <div className="position-absolute" style={{ top: '-30px', left: '30px' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
                      border: '3px solid white',
                      boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>SA</div>
                  </div>
                  <div className="position-absolute" style={{ top: '20px', right: '20px', opacity: 0.1 }}>
                    <FaQuoteLeft size={40} color="#FF8C00" />
                  </div>
                  <div className="mb-3 text-warning mt-4 pt-2" style={{ fontSize: '18px' }}>
                    ★★★★★
                  </div>
                  <Card.Text className="mb-4 fst-italic" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                    "Aplikasi Bank Sampah Digital sangat mudah digunakan. Proses penyetoran sampah jadi lebih efisien dan transparan dengan sistem poin digital."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0 fw-bold">Siti Aminah</h5>
                      <small style={{ color: '#6c757d' }}>Nasabah sejak 2021</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4 scroll-animation" data-animation="animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
              <Card className="h-100 border-0 shadow-sm testimonial-card" 
                    style={{ 
                      borderRadius: '16px', 
                      overflow: 'visible',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                    }}
              >
                <Card.Body className="position-relative p-4">
                  <div className="position-absolute" style={{ top: '-30px', left: '30px' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)',
                      border: '3px solid white',
                      boxShadow: '0 8px 20px rgba(33, 150, 243, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>AR</div>
                  </div>
                  <div className="position-absolute" style={{ top: '20px', right: '20px', opacity: 0.1 }}>
                    <FaQuoteLeft size={40} color="#2196F3" />
                  </div>
                  <div className="mb-3 text-warning mt-4 pt-2" style={{ fontSize: '18px' }}>
                    ★★★★★
                  </div>
                  <Card.Text className="mb-4 fst-italic" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                    "Selain mendapatkan poin, saya juga merasa berkontribusi dalam menjaga lingkungan. Program edukasi tentang pemilahan sampah sangat bermanfaat."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0 fw-bold">Ahmad Rizki</h5>
                      <small style={{ color: '#6c757d' }}>Nasabah sejak 2023</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;