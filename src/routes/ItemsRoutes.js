import express from "express";

import {
  getAllItems,
  getItemById,
  getItemByDescription,
  addNewItem,
  updateItemDescription,
  deleteItem
} from "../controllers/ItemsController.js";

const router = express.Router();

// prefixed with /items
router.get("/", getAllItems); //localhost:3000/
router.get("/:id", getItemById); //localhost:3000/items/1
router.get("/search/:description", getItemByDescription); //localhost:3000/items/search/mug
router.post("/", addNewItem); // localhost:3000/items
router.put("/:id/", updateItemDescription); // localhost:3000/items/1
router.delete("/:id", deleteItem);

export default router;
