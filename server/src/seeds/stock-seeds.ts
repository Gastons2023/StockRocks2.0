import { Stock } from '../models/stock.js';

export const seedStocks = async () => {
  await Stock.insertMany([
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      currentPrice: 175.43,
      dayHigh: 176.98,
      dayLow: 174.21,
      volume: 52387641,
      lastUpdated: new Date()
    },
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      currentPrice: 338.11,
      dayHigh: 340.45,
      dayLow: 337.20,
      volume: 21234567,
      lastUpdated: new Date()
    },
    {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      currentPrice: 125.23,
      dayHigh: 126.55,
      dayLow: 124.32,
      volume: 15678901,
      lastUpdated: new Date()
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      currentPrice: 238.45,
      dayHigh: 240.12,
      dayLow: 237.89,
      volume: 41234567,
      lastUpdated: new Date()
    },
    {
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      currentPrice: 445.12,
      dayHigh: 447.90,
      dayLow: 442.35,
      volume: 28456789,
      lastUpdated: new Date()
    }
  ]);
}; 

// figure out how they want the search stock to work, and ask if they are usinh y finanace or our seeded data base
