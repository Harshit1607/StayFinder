import express from 'express';
import { getUserBookings } from '../controllers/bookingController';

const router = express.Router();

router.get('/:userId', getUserBookings);

export default router;
