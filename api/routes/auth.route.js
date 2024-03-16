import express from 'express';
import { signUp, signIn, google, signOut } from "../controllers/auth.controller.js";

const router = express.Router();
router.post('/SignUp', signUp);
router.post('/SignIn', signIn);
router.post('/Google', google);
router.get('/SignOut', signOut);

export default router;