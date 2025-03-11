import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
import { StockJournalFactory } from './stockJournal.js'; 

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
const StockJournal = StockJournalFactory(sequelize); 


User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });


User.hasMany(StockJournal, { foreignKey: 'userId' });
StockJournal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, Ticket, StockJournal }; 
