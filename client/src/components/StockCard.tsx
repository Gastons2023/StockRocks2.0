import { StockData } from '../interfaces/StockData';

interface StockCardProps {
  stock: StockData;
  onDelete: (stockId: number) => void;
  onEdit: (stock: StockData) => void;
}

const StockCard = ({ stock, onDelete }: StockCardProps) => {


  return (
    <div className="border 5px">
      <h2>{stock.companyName || 'Unknown'} ({stock.symbol || 'N/A'})</h2>
      <p>Current Price: ${Number(stock.currentPrice || 0).toFixed(2)}</p>
      <div>
      <button>Edit</button>
        <button onClick={() => onDelete(stock.id)}>Delete</button>
      </div>
    </div>

  );
};

export default StockCard;
