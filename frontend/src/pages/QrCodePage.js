import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const QrCodePage = () => {
  const { user } = useContext(AuthContext);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateQrCode = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Check if user already has a QR code
        if (user.qrCode) {
          setQrData(user.qrCode);
        } else {
          // Generate new QR code
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          
          // Generate QR code data (user ID + timestamp for uniqueness)
          const qrCodeData = `BankSampahDigital:${user.id}:${Date.now()}`;
          
          // Save QR code to user profile
          await axios.put(`/api/users/${user.id}`, { qrCode: qrCodeData }, config);
          
          setQrData(qrCodeData);
        }
      } catch (err) {
        setError('Gagal menghasilkan QR Code. Silakan coba lagi.');
        console.error('QR Code generation error:', err);
      } finally {
        setLoading(false);
      }
    };

    generateQrCode();
  }, [user]);

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Anda harus login untuk mengakses halaman ini.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">QR Code Nasabah</h4>
            </Card.Header>
            <Card.Body className="text-center py-5">
              {loading ? (
                <p>Memuat QR Code...</p>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <>
                  <div className="mb-4">
                    <QRCodeSVG 
                      value={qrData || 'https://banksampahdigital.com'}
                      size={250}
                      level="H"
                      includeMargin={true}
                      className="border p-2"
                    />
                  </div>
                  <p className="mb-4">
                    Tunjukkan QR Code ini kepada petugas Bank Sampah saat melakukan transaksi penyetoran sampah.
                  </p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => window.print()}
                  >
                    Cetak QR Code
                  </Button>
                </>
              )}
            </Card.Body>
            <Card.Footer className="bg-light">
              <small className="text-muted">
                QR Code ini bersifat unik dan hanya berlaku untuk akun Anda. Jangan bagikan dengan orang lain.
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QrCodePage;