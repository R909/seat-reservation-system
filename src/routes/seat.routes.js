import { Router } from "express";
import { getSeats, bookSeatController } from "../controllers/seat.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get("/",    getSeats);
router.put("/:id", bookSeatController);

export default router;
