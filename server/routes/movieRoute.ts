const express = require("express");
const router = express.Router();
import movieController from "@controllers/movieController";
import { authorizationAdmin } from "middleware/AuthorizationAdmin";
router.post("/", authorizationAdmin, movieController.createMovie);
router.get("/", movieController.getMovie);
router.get("/genre", movieController.getGenre);
router.get("/:id", movieController.getMovieDetail);
router.put("/:id", movieController.updateMovie);

export default router;
