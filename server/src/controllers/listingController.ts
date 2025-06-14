import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getAllListings = async (_req: Request, res: Response) => {
  const listings = await prisma.listings.findMany();
  res.json(listings);
};

export const getListingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await prisma.listings.findUnique({ where: { id: Number(id) } });
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  res.json(listing);
};

export const createListing = async (req: Request, res: Response) => {
  const { title, description, location, price_per_night, image_url } = req.body;
  const listing = await prisma.listings.create({
    data: {
      title,
      description,
      location,
      price_per_night,
      image_url,
    },
  });
  res.status(201).json(listing);
};
