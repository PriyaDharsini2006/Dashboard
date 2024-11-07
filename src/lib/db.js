// lib/db.js

import { Pool } from 'pg';

// Create a new pool instance using the DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon DB's SSL connection
  },
});

export { pool };
