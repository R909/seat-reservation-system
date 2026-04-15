import { Router } from "express";
import { registration, login, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import RegisterDto from "../validators/auth/registration.validator.js";
import LoginDto from "../validators/auth/login.validator.js";

const router = Router();

router.post("/register", validate(RegisterDto), registration);
router.post("/login",    validate(LoginDto),    login);
router.post("/logout",   verifyJWT,             logout);

export default router;
