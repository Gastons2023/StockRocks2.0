import { useState, useEffect } from 'react';
import { StockData } from '../interfaces/StockData';
import StockCard from '../components/StockCard';
import SearchBar from '../components/SearchBar';
import { retrieveStocks, deleteStock as deleteStockAPI, createStock, updateStock, getYahooFinanceData } from '../api/stockAPI';
import ErrorPage from './ErrorPage';
import StockForm from '../components/StockForm';
import auth from '../utils/auth';

const Dashboard = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (auth.loggedIn()) {
      fetchStocks();
    }
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await retrieveStocks();
      const userId = auth.getProfile()?.id;
      if (!userId) return;
      const filteredData = data.filter(stock => stock.assignedUserId === userId);
      setStocks(filteredData);
      setFilteredStocks(filteredData);
    } catch {
      setError(true);
    }
  };

  const handleSearchChange = (query: string) => {
    setFilteredStocks(
      stocks.filter(stock =>
        stock.companyName?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setSearchQuery(query);
  };

  const handleSearch = async () => {
    try {
      const data = await getYahooFinanceData(searchQuery);
      console.log(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleCreateStock = () => {
    setSelectedStock(null);
    setShowForm(true);
  };

  const handleEditStock = (stock: StockData) => {
    setSelectedStock(stock);
    setShowForm(true);
  };

  const handleSaveStock = async (stock: StockData) => {
    try {
      const userId = auth.getProfile()?.id;
      if (!userId) return;

      const updatedStock = {
        ...stock,
        assignedUserId: stock.assignedUserId ?? userId,
      };

      if (updatedStock.id) {
        await updateStock(updatedStock.id, updatedStock);
      } else {
        await createStock(updatedStock);
      }

      fetchStocks();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save stock:', error);
    }
  };

  const handleDeleteStock = async (stockId: number) => {
    try {
      if (!stockId) throw new Error('Invalid stock ID');
      await deleteStockAPI(stockId);
      setStocks(stocks.filter(stock => stock.id !== stockId));
      setFilteredStocks(filteredStocks.filter(stock => stock.id !== stockId));
    } catch (error) {
      console.error('Failed to delete stock:', error);
    }
  };

  if (error) return <ErrorPage />;

  return (
    <section className="dashboard-container p-6 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <SearchBar onSearch={handleSearchChange} />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          onClick={handleCreateStock}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Stock
        </button>
      </header>

      {showForm && (
        <div className="mb-6">
          <StockForm
            stock={selectedStock}
            onSave={handleSaveStock}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStocks.map(stock => (
          <StockCard
            key={stock.id}
            stock={stock}
            onDelete={handleDeleteStock}
            onEdit={handleEditStock}
          />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
