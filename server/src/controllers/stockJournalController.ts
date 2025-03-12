import { Request, Response } from 'express';
import { StockJournal, StockJournalAttributes } from '../models/stockJournal.js';

// ✅ GET all stock entries
export const getStockJournal = async (_req: Request, res: Response) => {
  try {
    const stocks = await StockJournal.findAll();
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stock journal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ CREATE a stock entry
export const addStockEntry = async (req: Request, res: Response) => {
  try {
    const { symbol, entryPrice, purchaseDate, positionSize, exitPrice, returns, saleDate }: StockJournalAttributes  = req.body;

    if (!symbol || !entryPrice || !purchaseDate || !positionSize) {
      res.status(400).json({ error: 'All fields are required!' });
    }

    const newStock = await StockJournal.create({
      symbol,
      entryPrice,
      purchaseDate,
      positionSize,
      exitPrice: exitPrice || null,
      returns: returns ||  null,
      saleDate: saleDate || null
    });

    res.status(201).json(newStock);
  } catch (error) {
    console.error('Error creating stock entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ UPDATE stock entry
export const updateStockEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { exitPrice, saleDate, entryPrice } = req.body;

    const stockEntry = await StockJournal.findByPk(id);
    if (stockEntry) {
      await stockEntry.update({ 
        exitPrice, 
        saleDate, 
        returns: exitPrice - stockEntry.dataValues.entryPrice,
        entryPrice
      });

      res.json(stockEntry);
    } else {
      res.status(404).json({ error: 'Stock entry not found' });
    }
  } catch (error) {
    console.error('Error updating stock entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ DELETE a stock entry
export const deleteStockEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stockEntry = await StockJournal.findByPk(id);
    if (stockEntry) {
      await stockEntry.destroy();
      res.json({ message: 'Stock entry deleted' });
    } else {
      res.status(404).json({ message: 'Stock entry not found' });
    }
  } catch (error) {
    console.error('Error deleting stock entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
