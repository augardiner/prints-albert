const { Pool } = require('pg');

// connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
