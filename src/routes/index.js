import express from "express";
import { getNotFound, getHome, postLogin, postRegister, getProfile, postLogout, postCreatePost, getPost, getSinglePost } from "../controllers/general";
import multer from "multer";

const router = express.Router();
const uploadMiddleware = multer({ dest: 'public/uploads/' });

router.get('/', getHome);
router.post('/login', postLogin);
router.get('/profile', getProfile);
router.post('/create-post', uploadMiddleware.single('cover'), postCreatePost);
router.get('/post', getPost);
router.get('/post/:id', getSinglePost);
router.post('/logout', postLogout);
router.get('/createsuperadmin', postRegister);
router.get('*', getNotFound)

export default router;