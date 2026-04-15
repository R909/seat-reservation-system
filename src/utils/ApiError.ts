import { Response } from "express";

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static unauthenticatedError(res: Response, message = "You are not authenticated") {
    return res.status(401).json({ success: false, message });
  }

  static unauthorizedError(res: Response, message = "You are not authorized") {
    return res.status(403).json({ success: false, message });
  }

  static notFoundError(res: Response, message = "Resource not found") {
    return res.status(404).json({ success: false, message });
  }

  static badRequestError(res: Response, message = "Bad request") {
    return res.status(400).json({ success: false, message });
  }

  static conflictError(res: Response, message = "Conflict") {
    return res.status(409).json({ success: false, message });
  }

  static serverError(): ApiError {
    return new ApiError("Internal server error", 500);
  }
}

export default ApiError;
