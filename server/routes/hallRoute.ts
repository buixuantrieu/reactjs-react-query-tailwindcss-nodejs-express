const express = require("express");
const router = express.Router();
import hallController from "@controllers/hallController";
import { authorizationAdmin } from "middleware/AuthorizationAdmin";
router.get("/", hallController.getHall);
router.get("/seat-type", hallController.getSeatType);
router.post("/", authorizationAdmin, hallController.createHall);
router.get("/:id", hallController.getHallDetail);

export default router;
