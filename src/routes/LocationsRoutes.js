import express from "express";
import {
  getAllLocations,
  addNewLocation,
  updateLocationQuantity,
  addItemToLocation,
  getLocationWithItems,
  deleteItemFromLocation,
  decrementItemQuantity
  
} from "../controllers/LocationsController.js";

const router = express.Router();

// prefixed with /locations
router.get("/", getAllLocations);
router.get("/:id", getLocationWithItems);
router.post("/", addNewLocation);
router.post("/:locationId/items", addItemToLocation);
router.put("/:id/:locationId", updateLocationQuantity);
router.delete("/:locationId/items/:itemId", deleteItemFromLocation);
router.patch("/:locationId/items/:itemId", decrementItemQuantity);

// router.delete("/locations");

export default router;
