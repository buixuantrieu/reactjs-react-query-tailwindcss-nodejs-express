const express = require("express");
const router = express.Router();
import cinemaController from "@controllers/cinemaController";
import { authorizationAdmin } from "middleware/AuthorizationAdmin";
router.post("/", authorizationAdmin, cinemaController.createCinema);
router.get("/", cinemaController.getCinema);
router.post("/facility", authorizationAdmin, cinemaController.createFacility);
router.get("/facility", cinemaController.getFacility);
router.get("/facility/:id", cinemaController.getFacilityDetail);
router.put("/facility/:id", authorizationAdmin, cinemaController.updateFacility);
router.get("/:id", cinemaController.getCinemaDetail);
router.put("/:id", cinemaController.updateCinema);

export default router;
