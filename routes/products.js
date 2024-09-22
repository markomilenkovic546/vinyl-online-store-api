import express from 'express';
import {getProductByIdHandler } from '../controllers/products.js';

const router = express.Router();
router.get('/:id', getProductByIdHandler);



export default router;
