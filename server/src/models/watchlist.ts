import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface WatchlistAttributes {
  watchlistId: number;
  stockId:number;
  stockValue: number;
  stockTicker: string;
}

interface WatchlistCreationAttributes extends Optional<WatchlistAttributes, 'watchlistId'> {}

export class Watchlist extends Model<WatchlistAttributes, WatchlistCreationAttributes> implements WatchlistAttributes {
  // public id!: number;
  // public name!: string;
  // public status!: string;
  // public description!: string;
  // public assignedUserId!: number;

  // // associated User model
  // public readonly assignedUser?: User;

  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;

  watchlistId!: number;
  stockId!:number;
  stockValue!: number;
  stockTicker!: string;
}

export function WatchlistFactory(sequelize: Sequelize): typeof Watchlist {
  Watchlist.init(
    {
      watchlistId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stockId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stockValue: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stockTicker: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // status: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // description: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // assignedUserId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    },
    {
      tableName: 'watchlist',
      sequelize,
    }
  );

  return Watchlist;
}
