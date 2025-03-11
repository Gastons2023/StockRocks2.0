import express from 'express';
import dotenv from 'dotenv';
import stockJournalRoutes from './routes/api/stockJournalRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use stock journal routes
app.use('/api/stockJournal', stockJournalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
