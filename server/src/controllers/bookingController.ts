import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const createBooking = async (req: Request, res: Response) => {
  const { guest_id, listing_id, start_date, end_date, total_price } = req.body;
  try {
    const booking = await prisma.bookings.create({
      data: {
        guest_id,
        listing_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        total_price,
      },
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};
