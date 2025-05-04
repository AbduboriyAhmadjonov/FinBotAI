import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { sequelize } from '../connection.js';

interface UserAttributes {
  id: number;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  language: string;
  lastActive?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// These attributes will be optional during creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public telegramId!: number;
  public firstName!: string;
  public lastName?: string;
  public username?: string;
  public language!: string;
  public lastActive?: Date;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Add this to make the sequelize property available
  static sequelize: Sequelize;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    telegramId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: 'en',
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
