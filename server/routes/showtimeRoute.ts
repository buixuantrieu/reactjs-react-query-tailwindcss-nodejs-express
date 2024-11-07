const express = require("express");
const router = express.Router();
import showtimeController from "@controllers/showtimeController";
import { authorizationAdmin } from "middleware/AuthorizationAdmin";
router.put("/:id", authorizationAdmin, showtimeController.updateShowTime);
router.post("/", authorizationAdmin, showtimeController.createShowTime);
router.get("/", showtimeController.getShowTime);
router.get("/:id", showtimeController.showTimeDetail);

export default router;
