import express from 'express';
import { getStock } from "../../controllers/yahoo-controller.js";

const router = express.Router();


// GET /stocks - Get all stocks
router.get('/:symbol', getStock);


export { router as yahooRouter };