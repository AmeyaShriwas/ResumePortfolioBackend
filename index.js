const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./Routes/AuthRoutes');
const planRoutes = require('./Routes/PlanRoutes')
const paymentRoutes = require('./Routes/PaymentRoutes')
const portfolioRoutes = require('./Routes/PortfolioRoutes')
const path = require('path')
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


app.use(cors({ origin: true })); // Allows requests from any domain
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGOURI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((error) => console.error('❌ MongoDB connection error:', error));

app.get('/', (req, res) => {
    return res.send('🚀 Server is running...');
});

// Use authRoutes with API prefix
app.use('/auth', authRoutes);
app.use('/plan', planRoutes)
app.use('/payment', paymentRoutes)
app.use('/portfolio', portfolioRoutes)

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on port ${process.env.PORT}`);
});
