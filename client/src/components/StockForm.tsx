import { useState } from "react";
import { StockData } from "../interfaces/StockData";

interface StockFormProps {
  stock?: StockData | null; 
  onSave: (stock: StockData) => void;
  onCancel: () => void;
}

const StockForm = ({ stock, onSave, onCancel }: StockFormProps) => {
  const [formData, setFormData] = useState<StockData>(
    stock || { id: 0, symbol: "", companyName: "", currentPrice: 0, lastUpdated: new Date(), assignedUserId: null }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{stock ? "Edit Stock" : "Add New Stock"}</h2>
      <input type="text" className="border" name="symbol" placeholder="Symbol" value={formData.symbol} onChange={handleChange} required />
      <input type="text" className="border" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
      <input className="border" name="currentPrice" type="number" placeholder="Current Price" value={formData.currentPrice} onChange={handleChange} required />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default StockForm;
