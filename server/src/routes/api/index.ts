import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { stockJournalRouter } from './stockJournal-routes.js';

const router = Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
router.use("/stockJournal", stockJournalRouter);


export default router;

