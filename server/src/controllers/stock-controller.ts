import { Request, Response } from 'express';
import { Stock } from '../models/stock.js';
import { User } from '../models/user.js';

// GET /stocks
export const getAllStocks = async (_req: Request, res: Response) => {
  try {
    const userId = (_req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' }); 
    }

    console.log(`Fetching stocks for user ID: ${userId}`);

    // 🔹 Query stocks assigned to the logged-in user
    const stocks = await Stock.findAll({
      where: { assignedUserId: userId },
    });

    return res.json(stocks); // ✅ Always return JSON
  } catch (error: any) {
    console.error('Error retrieving stocks:', error);
    return res.status(500).json({ message: error.message });
  }
};

// GET /stocks/:id
export const getStockById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['username'],
        },
      ],
    });
    if (stock) {
      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /stocks
export const createStock = async (req: Request, res: Response) => {
  const { symbol, companyName, currentPrice, assignedUserId, lastUpdated } = req.body;
  try {
    const newStock = await Stock.create({ symbol, companyName, currentPrice, assignedUserId, lastUpdated: lastUpdated || new Date() });
    res.status(201).json(newStock);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /stocks/:id
export const updateStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { symbol, companyName, currentPrice, assignedUserId, lastUpdated } = req.body;
  try {
    const stock = await Stock.findByPk(id);
    if (stock) {
      stock.symbol = symbol;
      stock.companyName = companyName;
      stock.currentPrice = currentPrice;
      stock.assignedUserId = assignedUserId;
      stock.lastUpdated = lastUpdated || new Date();
      await stock.save();
      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /stocks/:id
export const deleteStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findByPk(id);
    if (stock) {
      await stock.destroy();
      res.json({ message: 'Stock deleted' });
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
