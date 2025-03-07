import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { watchlistRouter } from './watchlist-routes.js';

const router = Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
router.use("/watchlist", watchlistRouter);

export default router;

