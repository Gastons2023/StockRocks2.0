import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface StockJournalAttributes {
  id: number;
  symbol: string;
  entryPrice: number;
  exitPrice?: number | null;
  purchaseDate: Date;
  saleDate?: Date | null;
  positionSize: number;
  returns?: number | null;
}

interface StockJournalAttributesWithId extends Optional<StockJournalAttributes, 'id'> {}

export class StockJournal extends Model<StockJournalAttributesWithId> {}

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
  return StockJournal;
}
