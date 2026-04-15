import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  if (err instanceof ApiError && err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Errorfgfgfg",
  });
};

export default errorMiddleware;