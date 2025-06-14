import express from 'express';
import { getAllListings, getListingById, createListing } from '../controllers/listingController';
const router = express.Router();

router.get('/', getAllListings);
// router.get('/:id', getListingById);
router.post('/', createListing);

export default router;
