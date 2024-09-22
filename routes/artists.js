import express from 'express';
import { getArtistsHandler } from '../controllers/artists.js';

const router = express.Router();

router.get('/', getArtistsHandler)


export default router;