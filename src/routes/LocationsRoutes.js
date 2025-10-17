import express from "express";
import {
  getAllLocations,
  addNewLocation,
  updateLocation,
  
} from "../controllers/LocationsController";

const router = express.Router();

router.get("/locations", getAllLocations);

router.post("/locations", addNewLocation);

router.put("/locations", updateLocation);

router.delete("/locations");

export default router;
