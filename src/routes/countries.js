import express from 'express';
import { seedCountriesHandler, getCountriesHandler, getSingleCountryHandler } from '../controllers/countries.js';

const router = express.Router();

router.get('/', getCountriesHandler);
router.get('/:name', getSingleCountryHandler);
router.post('/', seedCountriesHandler);

export default router;
