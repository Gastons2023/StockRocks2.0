import { Router } from 'express';
import {
  getStockJournal, 
  addStockEntry,
  updateStockEntry,
  deleteStockEntry
} from '../../controllers/stockJournalController.js'; 

const router = Router();


router.post('/', addStockEntry);


router.get('/', getStockJournal);


router.put('/:id', updateStockEntry);


router.delete('/:id', deleteStockEntry);

export { router as stockJournalRouter };
