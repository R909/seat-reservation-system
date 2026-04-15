import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { getAllSeats, bookSeat } from "../services/seat.service.js";

// GET ALL SEATS
export const getSeats = asyncHandler(async (_req, res) => {
  const seats = await getAllSeats();
  return ApiResponse.ok(res, "Seats fetched", seats);
});

// BOOK SEAT
export const bookSeatController = asyncHandler(async (req, res) => {
  const seatId = Number(req.params.id);

  if (!req.user || !req.user.id) {
    throw new ApiError("Unauthorized - User not found", 401);
  }

  const userId = req.user.id;

  console.log("Booking Seat:", seatId, "User:", userId);

  const seat = await bookSeat(seatId, userId);

  return ApiResponse.ok(res, "Seat booked successfully", seat);
});