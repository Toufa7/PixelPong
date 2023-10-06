import { QueryResult } from 'pg';
import { Response } from 'express';
import { configDotenv } from 'dotenv';

import env from 'dotenv';

configDotenv();
const Pool = require('pg').Pool
const pool = new Pool({
  user: "mohamed",
  host: "/var/run/postgresql",
  database: "db",
  password: "Damnit",
  port: "5432"
});


const checkDatabaseConnection = async () => {
    try {
      const client = await pool.connect();
      console.log('Connected to the database.');
      client.release();
    } catch (error) {
      console.error('Database connection error:', error.message);
    }
  };
  
  checkDatabaseConnection();
  

console.log(process.env.DB_PASSWORD);
const getUsers = (req: Request, res: Response) => {
    pool.query('SELECT * FROM users', (err: Error, results:QueryResult) => {
      if (err) {
        throw err
      }
      else 
        res.status(200).json({ rows: results.rows });
    })
}

module.exports = {Pool, getUsers};
