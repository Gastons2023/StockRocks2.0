// import { Model, DataTypes, Sequelize } from 'sequelize';

// interface StockAttributes {
//   id: number;
//   symbol: string;
//   companyName: string;
//   currentPrice: number;
//   dayHigh: number;
//   dayLow: number;
//   volume: number;
//   lastUpdated: Date;
// }

// interface StockCreationAttributes extends Omit<StockAttributes, 'id'> {}

// export class Stock extends Model<StockAttributes, StockCreationAttributes> {
//   static insertMany: any;
//   static initModel(sequelize: Sequelize): void {
//     Stock.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         symbol: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true,
//         },
//         companyName: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         currentPrice: {
//           type: DataTypes.DECIMAL(10, 2),
//           allowNull: false,
//         },
//         dayHigh: {
//           type: DataTypes.DECIMAL(10, 2),
//           allowNull: false,
//         },
//         dayLow: {
//           type: DataTypes.DECIMAL(10, 2),
//           allowNull: false,
//         },
//         volume: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         lastUpdated: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//         }
//       },
//       {
//         sequelize,
//         tableName: 'stocks',
//       }
//     );
//   }
// } 