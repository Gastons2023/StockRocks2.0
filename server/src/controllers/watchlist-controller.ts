import { Request, Response } from 'express';
import { Watchlist } from '../models/watchlist.js';
import { User } from '../models/user.js';
import yahooFinance from 'yahoo-finance2';

export const getWatchList = async (req: Request, res: Response) => {
    try {
        const wtchlist = await Watchlist.findAll();

        res.json(wtchlist);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const saveToWatchList = async(req: Request, res: Response) => {
    try {
        const { stockTicker } = req.body
        
        const results = await yahooFinance.search(stockTicker);
        const quote: any = await yahooFinance.quote(stockTicker);

        let responseFromDatabase = null

        if (results.quotes.length > 0) {
            const stock: any = results.quotes[0]

            responseFromDatabase = Watchlist.create({
                stockId: 0,
                stockTicker: stock.symbol,
                stockValue: Math.floor(quote.regularMarketPrice),
            })
        }

        

        res.json({
            responseFromDatabase: responseFromDatabase
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}