import express from 'express';
import account from './account';
import app from './app';

const router = express.Router();

router.use('/account', account);
router.use('/app', app);

export default router;
