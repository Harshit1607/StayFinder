// index.ts
import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middlewares/corsMiddleware';
import authRoutes from './routes/authRoutes';
import listingRoutes from './routes/listingRoutes';
import bookingRoutes from './routes/bookingRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();
const app = express();

// 🛡️ Use CORS Middleware
app.use(corsMiddleware);

// 🔧 Other middlewares
app.use(express.json());

// 📦 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes)

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
