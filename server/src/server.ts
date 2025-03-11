import express from 'express';
import dotenv from 'dotenv';
import {stockJournalRouter} from './routes/api/stockJournal-routes.js';
import {sequelize} from './models/index.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use stock journal routes
app.use('/api/stockJournal', stockJournalRouter);

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
