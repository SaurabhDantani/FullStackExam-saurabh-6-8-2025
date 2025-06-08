import dotenv from 'dotenv';
import { dataSource } from '../config/db.mysql';

// Load environment variables
dotenv.config();

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.AUTH_SECRET_KEY = 'test-secret-key';

// Global setup before all tests
beforeAll(async () => {
  // Initialize database connection
  await dataSource.initialize();
});

// Global teardown after all tests
afterAll(async () => {
  // Close database connection
  await dataSource.destroy();
}); 