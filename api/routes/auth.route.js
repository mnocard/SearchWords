import express from 'express';
import { signUp, signIn, google } from "../controllers/auth.controller.js";

const router = express.Router();
router.post('/SignUp', signUp);
router.post('/SignIn', signIn);
router.post('/Google', google);

export default router;