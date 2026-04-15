import { pool } from "../db/pool.js";
import ApiError from "../utils/ApiError.js";

// GET ALL SEATS
export const getAllSeats = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM seats ORDER BY id ASC"
  );
  return rows;
};

// BOOK SEAT (FIXED VERSION)
export const bookSeat = async (seatId, userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      "SELECT * FROM seats WHERE id = $1 FOR UPDATE",
      [seatId]
    );

    if (result.rowCount === 0) {
      throw new ApiError("Seat not found", 404);
    }

    const seat = result.rows[0];

    //  Already booked
    if (seat.isbooked === 1) {
      throw new ApiError("Seat is already booked", 409);
    }

    //  Book seat
    const updated = await client.query(
      "UPDATE seats SET isbooked = 1, user_id = $2 WHERE id = $1 RETURNING *",
      [seatId, userId]
    );

    await client.query("COMMIT");

    return updated.rows[0];

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};