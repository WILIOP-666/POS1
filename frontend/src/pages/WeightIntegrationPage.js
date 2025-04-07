import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table } from 'react-bootstrap';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const WeightIntegrationPage = () => {
  const { user } = useContext(AuthContext);
  const [scanResult, setScanResult] = useState('');
  const [customer, setCustomer] = useState(null);
  const [wasteTypes, setWasteTypes] = useState([]);
  const [selectedWasteType, setSelectedWasteType] = useState('');
  const [weight, setWeight] = useState(0);
  const [serialPort, setSerialPort] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [transactionItems, setTransactionItems] = useState([]);

  // Fetch waste types on component mount
  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        const { data } = await axios.get('/api/waste', config);
        setWasteTypes(data);
      } catch (err) {
        setError('Gagal memuat jenis sampah. Silakan muat ulang halaman.');
        console.error('Error fetching waste types:', err);
      }
    };

    fetchWasteTypes();
  }, []);

  // Handle QR code scan result
  const handleScan = async (result) => {
    if (result) {
      setScanResult(result);
      
      try {
        // Parse QR code data (format: BankSampahDigital:userId:timestamp)
        const parts = result.split(':');
        if (parts.length >= 2 && parts[0] === 'BankSampahDigital') {
          const userId = parts[1];
          
          // Fetch customer data
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          
          const { data } = await axios.get(`/api/users/${userId}`, config);
          setCustomer(data);
          setSuccess('Nasabah berhasil diidentifikasi!');
          setError(null);
        } else {
          setError('QR Code tidak valid. Silakan scan ulang.');
          setCustomer(null);
        }
      } catch (err) {
        setError('Gagal mengidentifikasi nasabah. Silakan coba lagi.');
        setCustomer(null);
        console.error('Error identifying customer:', err);
      }
    }
  };

  // Connect to digital scale via Web Serial API
  const connectToScale = async () => {
    if (!navigator.serial) {
      setError('Browser Anda tidak mendukung Web Serial API. Gunakan Chrome atau Edge terbaru.');
      return;
    }
    
    try {
      // Request port access
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      
      setSerialPort(port);
      setIsConnected(true);
      setSuccess('Berhasil terhubung dengan timbangan digital!');
      
      // Set up reading from the port
      const reader = port.readable.getReader();
      let weightData = '';
      
      // Read weight data continuously
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        // Convert received bytes to string
        const textDecoder = new TextDecoder();
        const text = textDecoder.decode(value);
        
        weightData += text;
        
        // Process weight data when complete (usually ends with newline)
        if (weightData.includes('\n')) {
          const lines = weightData.split('\n');
          const lastLine = lines[lines.length - 2]; // Get the last complete line
          
          // Parse weight value (assuming format like "WEIGHT: 1.234 kg")
          const weightMatch = lastLine.match(/([\d.]+)/);
          if (weightMatch && weightMatch[1]) {
            setWeight(parseFloat(weightMatch[1]));
          }
          
          weightData = lines[lines.length - 1]; // Keep the incomplete line
        }
      }
    } catch (err) {
      setError('Gagal terhubung dengan timbangan digital. Silakan coba lagi.');
      setIsConnected(false);
      console.error('Serial connection error:', err);
    }
  };

  // Disconnect from digital scale
  const disconnectFromScale = async () => {
    if (serialPort) {
      try {
        await serialPort.close();
        setSerialPort(null);
        setIsConnected(false);
        setSuccess('Timbangan digital telah terputus.');
      } catch (err) {
        setError('Gagal memutuskan koneksi timbangan digital.');
        console.error('Serial disconnection error:', err);
      }
    }
  };

  // Add waste item to transaction
  const addWasteItem = () => {
    if (!selectedWasteType || weight <= 0) {
      setError('Pilih jenis sampah dan pastikan berat lebih dari 0 kg.');
      return;
    }
    
    const wasteType = wasteTypes.find(type => type.id === parseInt(selectedWasteType));
    if (!wasteType) {
      setError('Jenis sampah tidak valid.');
      return;
    }
    
    const newItem = {
      wasteTypeId: wasteType.id,
      name: wasteType.name,
      weight: weight,
      pointsPerKg: wasteType.pointsPerKg,
      totalPoints: Math.floor(weight * wasteType.pointsPerKg)
    };
    
    setTransactionItems([...transactionItems, newItem]);
    setSelectedWasteType('');
    setWeight(0);
    setSuccess('Item berhasil ditambahkan ke transaksi.');
    setError(null);
  };

  // Remove waste item from transaction
  const removeWasteItem = (index) => {
    const updatedItems = [...transactionItems];
    updatedItems.splice(index, 1);
    setTransactionItems(updatedItems);
  };

  // Submit transaction
  const submitTransaction = async () => {
    if (!customer) {
      setError('Silakan scan QR Code nasabah terlebih dahulu.');
      return;
    }
    
    if (transactionItems.length === 0) {
      setError('Tambahkan minimal satu item sampah ke transaksi.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      // Calculate totals
      const totalWeight = transactionItems.reduce((sum, item) => sum + parseFloat(item.weight), 0);
      const totalPoints = transactionItems.reduce((sum, item) => sum + item.totalPoints, 0);
      
      // Prepare transaction data
      const transactionData = {
        userId: customer.id,
        staffId: user.id,
        totalWeight,
        totalPoints,
        status: 'completed',
        details: transactionItems.map(item => ({
          wasteTypeId: item.wasteTypeId,
          weight: item.weight
        }))
      };
      
      // Submit transaction
      await axios.post('/api/transactions', transactionData, config);
      
      // Reset form
      setCustomer(null);
      setScanResult('');
      setTransactionItems([]);
      setSuccess('Transaksi berhasil disimpan!');
    } catch (err) {
      setError('Gagal menyimpan transaksi. Silakan coba lagi.');
      console.error('Transaction submission error:', err);
    }
  };

  // Check if user is authorized (admin or staff)
  if (user && (user.role !== 'admin' && user.role !== 'staff')) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Anda tidak memiliki akses ke halaman ini. Halaman ini hanya untuk petugas Bank Sampah.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Integrasi Timbangan Digital</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Identifikasi Nasabah</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6>Scan QR Code Nasabah</h6>
                <div className="border rounded overflow-hidden">
                  <QrReader
                    constraints={{ facingMode: 'environment' }}
                    onResult={(result) => result && handleScan(result.text)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              
              {customer && (
                <div className="border rounded p-3 bg-light">
                  <h6>Informasi Nasabah:</h6>
                  <p className="mb-1"><strong>Nama:</strong> {customer.fullName}</p>
                  <p className="mb-1"><strong>ID:</strong> {customer.id}</p>
                  <p className="mb-0"><strong>Poin:</strong> {customer.points}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Timbangan Digital</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6>Status: {isConnected ? 'Terhubung' : 'Tidak Terhubung'}</h6>
                </div>
                <div>
                  {!isConnected ? (
                    <Button variant="primary" onClick={connectToScale}>
                      Hubungkan Timbangan
                    </Button>
                  ) : (
                    <Button variant="outline-danger" onClick={disconnectFromScale}>
                      Putuskan Koneksi
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="border rounded p-3 text-center bg-light mb-4">
                <h3 className="display-4">{weight.toFixed(2)} kg</h3>
              </div>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Jenis Sampah</Form.Label>
                  <Form.Select 
                    value={selectedWasteType}
                    onChange={(e) => setSelectedWasteType(e.target.value)}
                  >
                    <option value="">Pilih Jenis Sampah</option>
                    {wasteTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name} - {type.pointsPerKg} poin/kg
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Berat (kg)</Form.Label>
                  <Form.Control 
                    type="number" 
                    step="0.01"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Berat akan otomatis terisi jika timbangan terhubung.
                  </Form.Text>
                </Form.Group>
                
                <Button variant="success" onClick={addWasteItem}>
                  Tambahkan Item
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Detail Transaksi</h5>
        </Card.Header>
        <Card.Body>
          {transactionItems.length === 0 ? (
            <p className="text-center py-3">Belum ada item sampah ditambahkan.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Jenis Sampah</th>
                  <th>Berat (kg)</th>
                  <th>Poin per kg</th>
                  <th>Total Poin</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactionItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.weight.toFixed(2)}</td>
                    <td>{item.pointsPerKg}</td>
                    <td>{item.totalPoints}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeWasteItem(index)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2">Total</th>
                  <th>
                    {transactionItems.reduce((sum, item) => sum + parseFloat(item.weight), 0).toFixed(2)} kg
                  </th>
                  <th></th>
                  <th>
                    {transactionItems.reduce((sum, item) => sum + item.totalPoints, 0)} poin
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </Table>
          )}
          
          <div className="d-flex justify-content-end mt-3">
            <Button 
              variant="primary" 
              disabled={!customer || transactionItems.length === 0}
              onClick={submitTransaction}
            >
              Simpan Transaksi
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WeightIntegrationPage;