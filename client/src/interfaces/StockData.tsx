import { UserData } from './UserData';

  export interface StockData {
    id: number;
    symbol: string;
    companyName: string;
    currentPrice: number;
    lastUpdated: Date;
    assignedUserId: number | null;
    assignedUser?: UserData | null;
}
