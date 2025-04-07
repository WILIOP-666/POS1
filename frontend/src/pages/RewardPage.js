import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Badge, Modal, Form } from 'react-bootstrap';
import { FaCoins, FaExchangeAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const RewardPage = () => {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Simulasi data untuk demo
  useEffect(() => {
    // Dalam implementasi nyata, ini akan mengambil data dari API
    setUserPoints(1250); // Simulasi poin pengguna
    
    setRewards([
      {
        id: 1,
        name: 'Voucher Belanja 50rb',
        description: 'Voucher belanja senilai Rp 50.000 yang dapat digunakan di berbagai merchant partner.',
        pointsRequired: 500,
        image: 'https://via.placeholder.com/150',
        category: 'Voucher',
        stock: 15
      },
      {
        id: 2,
        name: 'Pulsa 25rb',
        description: 'Pulsa senilai Rp 25.000 untuk semua operator.',
        pointsRequired: 250,
        image: 'https://via.placeholder.com/150',
        category: 'Pulsa',
        stock: 100
      },
      {
        id: 3,
        name: 'Token Listrik 50rb',
        description: 'Token listrik PLN senilai Rp 50.000.',
        pointsRequired: 500,
        image: 'https://via.placeholder.com/150',
        category: 'Utilitas',
        stock: 50
      },
      {
        id: 4,
        name: 'Voucher Makanan 25rb',
        description: 'Voucher makanan senilai Rp 25.000 yang dapat digunakan di restoran partner.',
        pointsRequired: 250,
        image: 'https://via.placeholder.com/150',
        category: 'Makanan',
        stock: 30
      },
      {
        id: 5,
        name: 'Bibit Tanaman',
        description: 'Bibit tanaman untuk penghijauan lingkungan.',
        pointsRequired: 100,
        image: 'https://via.placeholder.com/150',
        category: 'Lingkungan',
        stock: 200
      },
      {
        id: 6,
        name: 'Tas Belanja Ramah Lingkungan',
        description: 'Tas belanja yang terbuat dari bahan daur ulang.',
        pointsRequired: 150,
        image: 'https://via.placeholder.com/150',
        category: 'Lingkungan',
        stock: 75
      },
    ]);
  }, []);

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const handleRedeemConfirm = () => {
    // Validasi kode konfirmasi (dalam implementasi nyata, ini akan diverifikasi melalui API)
    if (confirmationCode.trim() === '') {
      toast.error('Silakan masukkan kode konfirmasi');
      return;
    }

    // Validasi poin mencukupi
    if (userPoints < selectedReward.pointsRequired) {
      toast.error('Poin Anda tidak mencukupi untuk menukarkan hadiah ini');
      return;
    }

    // Simulasi penukaran berhasil
    setUserPoints(userPoints - selectedReward.pointsRequired);
    toast.success(`Berhasil menukarkan ${selectedReward.name}!`);
    setShowRedeemModal(false);
    setConfirmationCode('');
  };

  return (
    <div className="rewards-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Katalog Hadiah</h1>
        <div className="user-points">
          <FaCoins className="text-warning me-2" />
          <span className="fw-bold">{userPoints} Poin</span>
        </div>
      </div>

      <Row>
        {rewards.map((reward) => (
          <Col key={reward.id} md={4} className="mb-4">
            <Card className="h-100 reward-card">
              <Card.Img variant="top" src={reward.image} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Title>{reward.name}</Card.Title>
                  <Badge bg="info">{reward.category}</Badge>
                </div>
                <Card.Text>{reward.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="points-required">
                    <FaCoins className="text-warning me-1" />
                    <span>{reward.pointsRequired} Poin</span>
                  </div>
                  <div>
                    <small className="text-muted me-2">Stok: {reward.stock}</small>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleRedeemClick(reward)}
                      disabled={userPoints < reward.pointsRequired || reward.stock <= 0}
                    >
                      <FaExchangeAlt className="me-1" /> Tukar
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Konfirmasi Penukaran */}
      <Modal show={showRedeemModal} onHide={() => setShowRedeemModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penukaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReward && (
            <>
              <p>Anda akan menukarkan <strong>{selectedReward.pointsRequired} poin</strong> untuk:</p>
              <h5>{selectedReward.name}</h5>
              <p>{selectedReward.description}</p>
              <hr />
              <Form.Group className="mb-3">
                <Form.Label>Masukkan Kode Konfirmasi</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Kode Konfirmasi" 
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Kode konfirmasi akan dikirimkan ke nomor telepon terdaftar.
                </Form.Text>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRedeemModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleRedeemConfirm}>
            Konfirmasi Penukaran
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RewardPage;