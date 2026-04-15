import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";
import ApiError from "../utils/ApiError.js";


const hashPassword = (password) => bcrypt.hash(password, 10);

const generateAccessToken = (user) =>
  jwt.sign(
    { _id: user.id, email: user.email, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { _id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

// ── Services ───────────────────────────────────────────────────────────────────

export const registerUser = async (data) => {
  console.log("jfjhf")
  const conn = await pool.connect();
  console.log("conn",conn)
  try {
    const existing = await conn.query("SELECT id FROM users WHERE email = $1", [data.email]);
    if (existing.rows.length > 0) throw new ApiError("User already exists", 409);

    const hashed = await hashPassword(data.password);
    console.log("hashed",hashed)

    const { rows } = await conn.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [data.name, data.email, hashed]
    );

    const user = rows[0] ;
    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await conn.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [refreshToken, user.id]);

    return { user, accessToken, refreshToken };
  } finally {
    conn.release();
  }
};

export const loginUser = async (data) => {
  const conn = await pool.connect();
  try {
    const { rows } = await conn.query("SELECT * FROM users WHERE email = $1", [data.email]);
    if (rows.length === 0) throw new ApiError("User not found", 404);

    const user = rows[0];
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new ApiError("Incorrect password", 400);

    const publicUser = { id: user.id, name: user.name, email: user.email };
    const accessToken  = generateAccessToken(publicUser);
    const refreshToken = generateRefreshToken(publicUser);

    await conn.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [refreshToken, user.id]);

    return { user: publicUser, accessToken, refreshToken };
  } finally {
    conn.release();
  }
};

export const logoutUser = async (userId) => {
  const conn = await pool.connect();
  try {
    await conn.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [userId]);
  } finally {
    conn.release();
  }
};
