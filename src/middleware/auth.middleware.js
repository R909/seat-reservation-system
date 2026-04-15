import path from "path";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../db/pool.js";
import helmet from "helmet";
import express from "express";

const app=express();

app.use(
  helmet({
    contentSecurityPolicy: false 
  })
);

export const verifyJWT = asyncHandler(
  async (req, res, next) => {
    try {
      const token =
        req.cookies?.AccessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) 

      const conn = await pool.connect();
      console.log("con",conn)
      const result = await conn.query(
        "SELECT id, name, email FROM users WHERE id = $1",
        [decoded._id]
      );
      conn.release();

      const user = result.rows[0];

      req.user = user;
      next();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Invalid access token";
      throw new ApiError(msg, 401);
    }
  }
);
