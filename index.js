const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./Routes/AuthRoutes');
const planRoutes = require('./Routes/PlanRoutes')
const paymentRoutes = require('./Routes/PaymentRoutes')

app.use(cors({}));
app.use(express.json());

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

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on port ${process.env.PORT}`);
});
