require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const wasteRoutes = require('./routes/waste.routes');
const transactionRoutes = require('./routes/transaction.routes');
const rewardRoutes = require('./routes/reward.routes');
const partnerRoutes = require('./routes/partner.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/partners', partnerRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di API Bank Sampah dengan Poin Digital' });
});

// Database synchronization
db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});