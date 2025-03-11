import { useState, useEffect } from 'react';
import { StockData } from '../interfaces/StockData';
import StockCard from '../components/StockCard';
import SearchBar from '../components/SearchBar';
import { retrieveStocks, deleteStock as deleteStockAPI, createStock, updateStock, } from '../api/stockAPI';
import ErrorPage from './ErrorPage';
import StockForm from '../components/StockForm';
import auth from '../utils/auth';  


const Dashboard = () => {
  const [stocks, setStocks] = useState<StockData[]>([]); 
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  // TODO: Manage the state for editing a stock and showing the stock form 
  const [showForm, setShowForm] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [error, setError] = useState(false);

  // Check if user is logged in before loading stocks
  useEffect(() => {
    if (auth.loggedIn()) {
      fetchStocks();
    }
  }, []);

  // Fetch stocks from API
  const fetchStocks = async () => {
    try {
      const data: StockData[] = await retrieveStocks();
  
      const userId = auth.getProfile()?.id; 
      if (!userId) {
        console.error("User is not logged in.");
        return;
      }
  
      const filteredData = data.filter((stock: StockData) => stock.assignedUserId === userId); 
    
      setStocks(filteredData);
      setFilteredStocks(filteredData);
    } catch (error) {
      setError(true);
    }
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setFilteredStocks(stocks.filter(stock => stock.companyName?.toLowerCase().includes(query.toLowerCase())));
  };

  // Create new stock
  const handleCreateStock = () => {
  setSelectedStock(null);
  setShowForm(true);
  };

  // Edit existing stock
  // TODO: Implement functionality to allow users to edit a stock
  const handleEditStock = (stock: StockData) => {
    setSelectedStock(stock);
    setShowForm(true);
  };

  // Save stock
// TODO: Handle saving a stock entry
// - Ensure the user is logged in before proceeding
// - Assign the logged-in user ID if assignedUserId is missing
// - Update the stock if it has an ID, otherwise create a new stock
// - Refresh the stock list after saving
  const handleSaveStock = async (stock: StockData) => {
    if (!auth.loggedIn()) {
      console.error("User is not logged in.");
      return;
    }

    const userId = auth.getProfile()?.id;
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }

    if (!stock.assignedUserId) {
      stock.assignedUserId = userId;
    }

    try {
      if (stock.id) {
        // Update stock
        const updatedStock = await updateStock(stock.id, stock);
        console.log(`Stock with ID ${stock.id} updated`);

        setStocks(stocks.map(s => (s.id === updatedStock.id ? updatedStock : s)));
        setFilteredStocks(filteredStocks.map(s => (s.id === updatedStock.id ? updatedStock : s)));
      } else {
        // Create stock
        const newStock = await createStock(stock);
        console.log(`Stock with ID ${newStock.id} created`);

        setStocks([...stocks, newStock]);
        setFilteredStocks([...filteredStocks, newStock]);
      }

      setShowForm(false);
    } catch (error) {
      console.error('Failed to save stock:', error);
    }
  };

  // Delete stock
  const handleDeleteStock = async (stockId: number) => {
    try {
      if (!stockId) {
        throw new Error('Invalid stock ID');
      }

      await deleteStockAPI(stockId);
      console.log(`Stock with ID ${stockId} deleted`);

      setStocks(stocks.filter(stock => stock.id !== stockId));
      setFilteredStocks(filteredStocks.filter(stock => stock.id !== stockId));
    } catch (error) {
      console.error('Failed to delete stock:', error);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleCreateStock}>
        + Add Stock
      </button>

      {showForm && (
        <StockForm 
          stock={selectedStock} 
          onSave={handleSaveStock} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div>
        {filteredStocks.map(stock => (
          <StockCard key={stock.id} stock={stock} onDelete={handleDeleteStock} onEdit={handleEditStock} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
