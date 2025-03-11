import { Router } from 'express';
import { stockRouter } from './stock-routes.js';
import { userRouter } from './user-routes.js';
import {yahooRouter} from './yahoo-routes.js';

const router = Router();

router.use('/stocks', stockRouter);
router.use('/users', userRouter);
router.use('/yahoo', yahooRouter);

export default router;

