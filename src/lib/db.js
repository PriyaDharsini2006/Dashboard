// lib/db.js

import { Pool } from 'pg'; // Correct import with capital P

// Create a new pool instance using the database_url from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this environment variable is correctly set
  ssl: {
    rejectUnauthorized: false, // Required for Neon DB's SSL connection
  },
});

export default pool; // Export the pool instance for use in your app
