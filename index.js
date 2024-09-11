import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import { verifyToken } from './middleware/auth.js';
import { updateUserHandler } from './controllers/users.js';
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets/profileImages', express.static(path.join(__dirname, 'public/assets/profileImages')));

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

/* ROUTES WITH FILES */
app.patch('/api/v1/user', verifyToken, uploadProfileImage.single('profileImage'), updateUserHandler);
/* ROUTES */ 
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', usersRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
}).then(() =>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(error))