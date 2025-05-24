import dotenv from "dotenv";
import { createPool } from "mysql2/promise";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          ca: process.env.DB_SSL_CA,
        }
      : undefined,
});

export default pool;
