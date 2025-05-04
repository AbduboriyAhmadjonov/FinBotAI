import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import User from './user.model.js';

interface ExpenseAttributes {
  id: number;
  userId: number;
  amount: number;
  currency: string;
  category: string;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

class Expense extends Model<ExpenseAttributes> implements ExpenseAttributes {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public currency!: string;
  public category!: string;
  public description?: string;
  public date!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',
  }
);

// Define associations
Expense.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Expense, { foreignKey: 'userId' });

export default Expense;
