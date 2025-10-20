import express from "express";
import {
  getAllLocations,
  addNewLocation,
  updateLocationQuantity,
  addItemToLocation,
  getLocationWithItems,
} from "../controllers/LocationsController.js";

const router = express.Router();

// prefixed with /locations
router.get("/", getAllLocations);
router.get("/:id", getLocationWithItems);
router.post("/", addNewLocation);
router.post("/:locationId/items", addItemToLocation);
router.put("/:locationId/items/:id", updateLocationQuantity);

// router.delete("/locations");

export default router;
