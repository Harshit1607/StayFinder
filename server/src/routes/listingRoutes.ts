import express from 'express';
import { getAllListings, getListingById, createListing } from '../controllers/listingController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/', asyncHandler(getAllListings));
router.get('/:id', asyncHandler(getListingById));
router.post('/', asyncHandler(createListing));

export default router;
