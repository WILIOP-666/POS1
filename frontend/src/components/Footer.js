import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRecycle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <FaRecycle size={24} className="me-2" />
              <h5 className="mb-0">Bank Sampah Digital</h5>
            </div>
            <p className="mb-3">
              Sistem manajemen Bank Sampah dengan Poin Digital yang memungkinkan warga untuk menyetorkan sampah dan mendapatkan poin.
            </p>
            <div className="d-flex mt-3">
              <a href="#" className="me-3 text-white"><FaFacebook size={20} /></a>
              <a href="#" className="me-3 text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-white"><FaInstagram size={20} /></a>
            </div>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Tautan Cepat</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-white">Beranda</a></li>
              <li className="mb-2"><a href="/education" className="text-white">Edukasi</a></li>
              <li className="mb-2"><a href="/rewards" className="text-white">Hadiah</a></li>
              <li className="mb-2"><a href="/login" className="text-white">Masuk</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Kontak Kami</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><FaEnvelope className="me-2" /> info@banksampahdigital.com</li>
              <li className="mb-2"><FaPhone className="me-2" /> (021) 1234-5678</li>
              <li className="mb-2"><FaMapMarkerAlt className="me-2" /> Jl. Lingkungan Hijau No. 123</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Bank Sampah Digital. Hak Cipta Dilindungi.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;