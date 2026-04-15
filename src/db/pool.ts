import pg from "pg";
import "dotenv/config";

export const pool = new pg.Pool({
  host: process.env.DB_HOST || "db",       
  port: Number(process.env.DB_PORT) || 5433,
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "sql_class_2_db",
});

