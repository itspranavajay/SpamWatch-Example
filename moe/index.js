require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = {
  async query(text, params) {
    const result = await pool.query(text, params)
      .catch(err => Promise.reject(err));
    return result;
  }
};
