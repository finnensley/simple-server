import express from "express";
import {
  getAllItems,
  getItemById,
  getItemByDescription,
  addNewItem,
  updateItemDescription,
} from "../controllers/ItemsController";

const router = express.Router();

// prefixed with /items
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.get("/:description", getItemByDescription);
router.post("/", addNewItem);
router.put("/:id/:description", updateItemDescription);
router.delete("/");

export default router;
