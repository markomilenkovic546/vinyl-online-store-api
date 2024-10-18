import express from 'express';
import {getProductByIdHandler, getProductsHandler, getArtistsHandler } from '../controllers/products.js';

const router = express.Router();
router.get('/artists', getArtistsHandler)
router.get('/:id', getProductByIdHandler);
router.get('/', getProductsHandler)




export default router;
