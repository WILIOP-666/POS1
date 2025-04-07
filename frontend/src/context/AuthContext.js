import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token and get user data
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          const { data } = await axios.get('/api/auth/me', config);
          setUser(data);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      
      // Decode token to get user info
      const decoded = jwt_decode(data.token);
      setUser(decoded.user);
      
      toast.success('Login berhasil!');
      navigate('/');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login gagal. Silakan coba lagi.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('/api/auth/register', userData);
      toast.success('Pendaftaran berhasil! Silakan login.');
      navigate('/login');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Anda telah keluar dari sistem');
    navigate('/');
  };

  const updateProfile = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const { data } = await axios.put(`/api/users/${user.id}`, userData, config);
      setUser(data);
      toast.success('Profil berhasil diperbarui!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil. Silakan coba lagi.');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};