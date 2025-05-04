import { Sequelize } from 'sequelize';
import { config } from '../config/env.js';

// Initialize Sequelize with PostgreSQL connection
export const sequelize = new Sequelize({
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: 'postgres',
  logging: config.NODE_ENV === 'development' ? console.log : false,
  timezone: '+05:00',
  define: {
    timestamps: true,
  },
});

// Test database connection
export async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}
