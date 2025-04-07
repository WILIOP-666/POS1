import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FaUsers, FaRecycle, FaCoins, FaGift } from 'react-icons/fa';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalPoints: 0,
    totalRewards: 0
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentRedemptions, setRecentRedemptions] = useState([]);

  // Simulasi data untuk demo
  useEffect(() => {
    // Dalam implementasi nyata, ini akan mengambil data dari API
    setStats({
      totalUsers: 156,
      totalTransactions: 423,
      totalPoints: 12580,
      totalRewards: 87
    });

    setRecentTransactions([
      { id: 1, date: '2023-06-15', user: 'Budi Santoso', wasteType: 'Plastik', weight: 3.5, points: 175 },
      { id: 2, date: '2023-06-14', user: 'Siti Aminah', wasteType: 'Kertas', weight: 5.2, points: 208 },
      { id: 3, date: '2023-06-14', user: 'Ahmad Hidayat', wasteType: 'Logam', weight: 1.8, points: 270 },
      { id: 4, date: '2023-06-13', user: 'Dewi Lestari', wasteType: 'Plastik', weight: 2.7, points: 135 },
      { id: 5, date: '2023-06-12', user: 'Joko Widodo', wasteType: 'Elektronik', weight: 4.1, points: 615 },
    ]);

    setRecentRedemptions([
      { id: 1, date: '2023-06-15', user: 'Rina Marlina', reward: 'Voucher Belanja', points: 500 },
      { id: 2, date: '2023-06-14', user: 'Agus Salim', reward: 'Pulsa', points: 250 },
      { id: 3, date: '2023-06-13', user: 'Maya Sari', reward: 'Token Listrik', points: 300 },
      { id: 4, date: '2023-06-12', user: 'Dian Sastro', reward: 'Voucher Makanan', points: 150 },
      { id: 5, date: '2023-06-11', user: 'Rudi Hartono', reward: 'Bibit Tanaman', points: 100 },
    ]);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="mb-4">Dashboard Admin</h1>
      
      {/* Statistik Utama */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Nasabah</h6>
                  <h3>{stats.totalUsers}</h3>
                </div>
                <FaUsers size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Transaksi</h6>
                  <h3>{stats.totalTransactions}</h3>
                </div>
                <FaRecycle size={30} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Poin</h6>
                  <h3>{stats.totalPoints}</h3>
                </div>
                <FaCoins size={30} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Penukaran Hadiah</h6>
                  <h3>{stats.totalRewards}</h3>
                </div>
                <FaGift size={30} className="text-danger" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Transaksi Terbaru */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Transaksi Terbaru</h5>
                <Button variant="outline-primary" size="sm">Lihat Semua</Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tanggal</th>
                    <th>Nasabah</th>
                    <th>Jenis Sampah</th>
                    <th>Berat (kg)</th>
                    <th>Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.user}</td>
                      <td>{transaction.wasteType}</td>
                      <td>{transaction.weight}</td>
                      <td>{transaction.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Penukaran Hadiah Terbaru */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Penukaran Hadiah Terbaru</h5>
                <Button variant="outline-primary" size="sm">Lihat Semua</Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tanggal</th>
                    <th>Nasabah</th>
                    <th>Hadiah</th>
                    <th>Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRedemptions.map(redemption => (
                    <tr key={redemption.id}>
                      <td>{redemption.id}</td>
                      <td>{redemption.date}</td>
                      <td>{redemption.user}</td>
                      <td>{redemption.reward}</td>
                      <td>{redemption.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;