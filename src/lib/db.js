// lib/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Add a basic test function
const testConnection = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query('SELECT NOW()');
      console.log('Database connection successful');
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Database connection test failed:', err);
    return false;
  }
};

// Test the connection when the module loads
testConnection().catch(console.error);

// Add event listeners for pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool, testConnection };