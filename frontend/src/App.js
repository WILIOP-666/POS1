import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './custom.css';
import './animations.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import TransactionPage from './pages/TransactionPage';
import RewardPage from './pages/RewardPage';
import EducationPage from './pages/EducationPage';
import QrCodePage from './pages/QrCodePage';
import WeightIntegrationPage from './pages/WeightIntegrationPage';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="py-4 my-3">
          <Container className="fade-in">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/rewards" element={<RewardPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/qrcode" element={<QrCodePage />} />
              <Route path="/weight-integration" element={<WeightIntegrationPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;