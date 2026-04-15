import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { registerUser, loginUser, logoutUser } from "../services/auth.service.js";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};


export const registration = asyncHandler(async (req, res) => {
  console.log("bodyfdgfdg",req.body)
  const { name, email, password } = req.body;
  const { user, accessToken } = await registerUser({ name, email, password });

  res.cookie("AccessToken", accessToken, COOKIE_OPTIONS);
  return ApiResponse.created(res, "User registered successfully", { user, accessToken });
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken } = await loginUser({ email, password });

  res.cookie("AccessToken", accessToken, COOKIE_OPTIONS);
  return ApiResponse.ok(res, "Login successful", { user, accessToken });
});


export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user.id);

  res.clearCookie("AccessToken", COOKIE_OPTIONS)
    .clearCookie("RefreshToken", COOKIE_OPTIONS);

  return ApiResponse.ok(res, "Logged out successfully", {});
});
