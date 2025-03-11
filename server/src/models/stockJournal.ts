import { DataTypes, Model, Sequelize } from 'sequelize';

interface StockJournalAttributes {
  id: number;
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  purchaseDate: Date;
  saleDate?: Date;
  positionSize: number;
  returns?: number;
}

export class StockJournal extends Model<StockJournalAttributes> {}

export function StockJournalFactory(sequelize: Sequelize) {
  StockJournal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entryPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      exitPrice: {
        type: DataTypes.FLOAT,
        allowNull: true, // Can be null if not sold yet
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      positionSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      returns: {
        type: DataTypes.FLOAT,
        allowNull: true, // Computed when stock is sold
      },
    },
    {
      sequelize,
      tableName: 'StockJournal',
      timestamps: true,
    }
  );
}
