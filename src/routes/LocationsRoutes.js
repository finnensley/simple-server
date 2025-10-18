import express from "express";
import {
  getAllLocations,
  addNewLocation,
  updateLocationQuantity,
  
} from "../controllers/LocationsController.js";

const router = express.Router();

// prefixed with /locations
router.get("/", getAllLocations);

router.post("/", addNewLocation);

router.put("/:id/:locationId", updateLocationQuantity);

// router.delete("/locations");

export default router;
