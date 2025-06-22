import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getUserBookings = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const bookings = await prisma.bookings.findMany({
      where: { guest_id: parseInt(userId) },
      include: {
        listings: true, // only if you want listing data too
      },
      orderBy: {
        start_date: 'desc',
      },
    });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
