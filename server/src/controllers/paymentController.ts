import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { instance } from '../utils/razorpay';
import crypto from 'crypto';
import NodeCache from 'node-cache';

const cache = new NodeCache();
const PAYMENT_TIMEOUT = 5 * 60 * 1000;

export const createOrder = async (req: Request, res: Response) => {
  const { amount, userId, listingId, checkIn, checkOut } = req.body;
  try {
    const razorOrder = await instance.orders.create({
      amount: Math.floor(amount * 100),
      currency: 'INR',
    });
    const userOrder = await prisma.bookings.create({
      data: {
        guest_id: userId,
        listing_id: listingId,
        start_date: new Date(checkIn),
        end_date: new Date(checkOut),
        total_price: amount.toString(),
      },
    });
    cache.set(razorOrder.id, Date.now());
    res.json({ order: razorOrder, userOrder });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Order creation failed' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { orderId, paymentDetails } = req.body;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentDetails;
  try {
    const createdAt = cache.get<number>(razorpay_order_id);
    if (!createdAt || Date.now() - createdAt > PAYMENT_TIMEOUT) {
      return res.status(400).json({ message: 'Payment timeout/expired' });
    }
    const expected = crypto.createHmac('sha256', process.env.CRYPTO_KEY!)
                            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                            .digest('hex');
    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: 'Signature mismatch' });
    }
    const payment = await prisma.payments.create({
      data: { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id: orderId },
    });
    await prisma.bookings.update({
      where: { id: orderId },
      data: { payment: { connect: { id: payment.id } } },
    });
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Payment verification failed' });
  }
};
