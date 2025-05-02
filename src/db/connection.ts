import { Sequelize } from 'sequelize';
import { config } from '../config/env';

// Initialize Sequelize with PostgreSQL connection
export const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'postgres',
  logging: config.NODE_ENV === 'development' ? console.log : false,
  timezone: '+00:00',
});

// Test database connection
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}
