import express from 'express';
import { getArtistsHandler, getCategoriesHandler } from '../controllers/links.js';



const router = express.Router();
router.get('/artists', getArtistsHandler)
router.get('/categories', getCategoriesHandler)

export default router;
