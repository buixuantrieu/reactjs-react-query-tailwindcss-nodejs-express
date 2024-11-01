const express = require("express");
const router = express.Router();
import authController from "@controllers/authController";
import { authenticateToken } from "middleware/Authentication";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/verified", authController.verified);

export default router;
