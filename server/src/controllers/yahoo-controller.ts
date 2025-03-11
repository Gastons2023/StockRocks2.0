import yahooFinance from "yahoo-finance2";
import { Request, Response } from "express";

interface StockData {
    symbol: string;
    companyName: string;
    currentPrice: number;
}

export const getStock = async (req: Request, res:Response) => {
    try {
        const data = await yahooFinance.quote(req.params.symbol as string);
        
        const stock: StockData = {
            symbol: data.symbol,
            companyName: data.longName || "Unknown Company",
            currentPrice: data.regularMarketPrice || 0,
        };

        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};