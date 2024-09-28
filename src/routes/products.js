import express from 'express';
import {getProductByIdHandler, getProductsHandler } from '../controllers/products.js';

const router = express.Router();
router.get('/:id', getProductByIdHandler);
router.get('/', getProductsHandler)



export default router;
