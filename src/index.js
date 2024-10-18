import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import linksRoutes from './routes/links.js';
import countriesRoutes from './routes/countries.js';
import { verifyToken } from './middleware/auth/auth.js';
import { updateUserHandler } from './controllers/users.js';
import { createProductHandler } from './controllers/products.js';
import { validateUpdateUserPayload } from './middleware/user/payload-validation/updateUser.js';
import { validateCreateProductPayload } from './middleware/products/payload-validation/createProduct.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(
    cors({
        origin: clientOrigin,
        credentials: true
    })
);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(
    '/assets/profileImages',
    express.static(path.join(__dirname, '../public/assets/profileImages'))
);
app.use(
    '/assets/productImages',
    express.static(path.join(__dirname, '../public/assets/productImages'))
);



/* FILE STORAGE FOR PROFILE IMAGES */
const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/profileImages');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadProfileImage = multer({ storage: profileImageStorage });

/* FILE STORAGE FOR PRODUCT IMAGES */
const productImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/productImages');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadProductImage = multer({ storage: productImageStorage });

/* ROUTES WITH FILES */
app.patch(
    '/api/v1/user',
    verifyToken,
    validateUpdateUserPayload,
    uploadProfileImage.single('profileImage'),
    updateUserHandler
);
app.post(
    '/api/v1/product',
    uploadProductImage.single('productImage'),
    validateCreateProductPayload,
    createProductHandler
);
/* ROUTES */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', usersRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/countries', countriesRoutes);
app.use('/api/v1/links', linksRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
    })
    .catch((error) => console.log(error));
   