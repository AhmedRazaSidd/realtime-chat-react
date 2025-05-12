import express from 'express';
import { login, signup, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.get('/check', protectRoute, checkAuth)

router.put('/update-profile', protectRoute, updateProfile)

export default router