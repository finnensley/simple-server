import express from 'express';
import {
    getAllOrders,
    addNewOrder,
    deleteOrder
} from "../controllers/OrdersController.js";

const router = express.Router();

//prefixed with orders
router.get("/", getAllOrders)
router.post("/", addNewOrder)
// router.put("/", )
router.delete("/:id", deleteOrder)

export default router;