import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', asyncHandler(verifyPayment));

export default router;
