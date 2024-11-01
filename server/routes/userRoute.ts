const express = require("express");
const router = express.Router();
import userController from "@controllers/userController";
import { authenticateToken } from "middleware/Authentication";
router.get("/user-info", authenticateToken, userController.getUserInfo);

export default router;
