import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection';

interface UserAttributes {
  id: number;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public telegramId!: number;
  public firstName!: string;
  public lastName?: string;
  public username?: string;
  public language!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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
