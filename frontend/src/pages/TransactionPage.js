import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Alert, Pagination } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FaSearch, FaFilePdf } from 'react-icons/fa';

const TransactionPage = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [success, setSuccess] = useState(null);
  const [itemsPerPage] = useState(10);

  // Fetch transactions on component mount and when filters change
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
            startDate: dateFilter.startDate || undefined,
            endDate: dateFilter.endDate || undefined
          }
        };

        const { data } = await axios.get('/api/transactions', config);
        
        setTransactions(data.rows || data);
        setTotalPages(Math.ceil((data.count || data.length) / itemsPerPage));
      } catch (err) {
        setError('Gagal memuat data transaksi. Silakan coba lagi.');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, searchTerm, dateFilter, itemsPerPage]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle date filter change
  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Generate PDF report
  const generatePDF = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          search: searchTerm,
          startDate: dateFilter.startDate || undefined,
          endDate: dateFilter.endDate || undefined
        },
        responseType: 'blob'
      };

      const response = await axios.get('/api/transactions/report', config);
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transaksi_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      setSuccess('Laporan berhasil diunduh');
    } catch (err) {
      setError('Gagal mengunduh laporan. Silakan coba lagi.');
      console.error('Error generating PDF:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render pagination component
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

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
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-0">Riwayat Transaksi</h2>
          <p className="text-muted">Daftar transaksi penyetoran sampah</p>
        </Col>
      </Row>

      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <Row>
            <Col md={6} className="mb-2 mb-md-0">
              <Form.Group className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Cari transaksi..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="primary" className="ms-2">
                  <FaSearch />
                </Button>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex justify-content-md-end">
              <Button variant="success" onClick={generatePDF} disabled={loading}>
                <FaFilePdf className="me-2" />
                Ekspor PDF
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6} lg={3} className="mb-2 mb-lg-0">
              <Form.Group>
                <Form.Label>Tanggal Mulai</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={dateFilter.startDate}
                  onChange={handleDateFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Tanggal Akhir</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={dateFilter.endDate}
                  onChange={handleDateFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center py-5">
              <p>Memuat data transaksi...</p>
            </div>
          ) : transactions.length === 0 ? (
            <Alert variant="info">
              Tidak ada transaksi yang ditemukan.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover bordered className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
                    <th>Nasabah</th>
                    <th>Petugas</th>
                    <th>Jenis Sampah</th>
                    <th>Berat (kg)</th>
                    <th>Poin</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{formatDate(transaction.transactionDate)}</td>
                      <td>{transaction.user?.name || '-'}</td>
                      <td>{transaction.staff?.name || '-'}</td>
                      <td>
                        {transaction.TransactionDetails?.map(detail => (
                          <div key={detail.id}>
                            {detail.wasteType?.name || 'Sampah'}
                          </div>
                        ))}
                      </td>
                      <td>
                        {transaction.TransactionDetails?.map(detail => (
                          <div key={detail.id}>
                            {detail.weight.toFixed(2)}
                          </div>
                        ))}
                      </td>
                      <td>{transaction.totalPoints}</td>
                      <td>
                        <span className={`badge ${transaction.status === 'completed' ? 'bg-success' : transaction.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                          {transaction.status === 'completed' ? 'Selesai' : 
                           transaction.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {renderPagination()}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TransactionPage;