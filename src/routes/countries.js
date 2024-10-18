import express from 'express';
import { seedCountriesHandler, getCountriesHandler } from '../controllers/countries.js';

const router = express.Router();

router.get('/', getCountriesHandler);

router.post('/', seedCountriesHandler);

export default router;
