import { Stock } from '../models/stock.js';

export const seedStocks = async () => {
  await Stock.bulkCreate([
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      currentPrice: 175.43,
      lastUpdated: new Date(),
      assignedUserId: 1
    },
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      currentPrice: 338.11,
      lastUpdated: new Date(),
      assignedUserId: 1
    },
    {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      currentPrice: 125.23,
      lastUpdated: new Date(),
      assignedUserId: 2
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      currentPrice: 238.45,
      lastUpdated: new Date(),
      assignedUserId: 2
    },
    {
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      currentPrice: 445.12,
      lastUpdated: new Date(),
      assignedUserId: 3
    }
  ]);
}; 

