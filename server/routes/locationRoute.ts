const express = require("express");
const router = express.Router();
import locationController from "@controllers/locationController";
router.get("/province", locationController.getProvince);
router.get("/district", locationController.getDistrict);
router.get("/ward", locationController.getWard);

export default router;
