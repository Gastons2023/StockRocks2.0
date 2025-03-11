import Auth from '../utils/auth';
import { StockData } from '../interfaces/StockData';
import { ApiMessage } from '../interfaces/ApiMessage';


const retrieveStocks = async () => {
  try {
    const userId = Auth.getUserId();
    const response = await fetch(`/api/stocks?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

const retrieveStock = async (id: number | null): Promise<StockData> => {
  try {
    const response = await fetch(`/api/stocks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    return await response.json();
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch stock data');
  }
};

const createStock = async (body: StockData) => {
  try {
    const response = await fetch(`/api/stocks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    return await response.json();
  } catch (err) {
    console.log('Error from Stock Creation:', err);
    return Promise.reject('Could not create stock entry');
  }
};

const updateStock = async (stockId: number, body: StockData): Promise<StockData> => {
  try {
    const response = await fetch(`/api/stocks/${stockId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    return await response.json();
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteStock = async (stockId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`/api/stocks/${stockId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.error('Error in deleting stock entry', err);
    return Promise.reject('Could not delete stock entry');
  }
};

const getYahooFinanceData = async (symbol: string) => {
  try {
    const response = await fetch(`/api/yahoo/${symbol}`);
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    return await response.json();
  } catch (err) {
    console.log('Error from Yahoo Finance API:', err);
    return Promise.reject('Could not fetch stock data');
  }
}
export { createStock, deleteStock, retrieveStocks, retrieveStock, updateStock, getYahooFinanceData };