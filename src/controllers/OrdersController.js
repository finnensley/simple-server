import prisma from "../utils/client.js";
import { getOrders } from "../services/OrdersServices.js";

// when a request fails


export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await getOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

//.post
export const addNewOrder = async (req, res) => {
  try {
    const { order_number, items } = req.body; // get order_number and items array
    const newOrder = await prisma.order.create({
      data: {
        order_number: order_number,
      },
    });

    // If items are provided, create order items
    if (items && items.length > 0) {
      const orderItems = await Promise.all(
        items.map((item) =>
          prisma.orderItem.create({
            data: {
              order_id: newOrder.id,
              item_id: item.id,
              sku: item.sku,
              description: item.description,
              quantity: item.quantity,
              subtotal: item.subtotal,
              taxes: item.taxes,
              shipping_paid: item.shipping_paid,
            },
          })
        )
      );

      // Return order with items
      const orderWithItems = await prisma.order.findUnique({
        where: { id: newOrder.id },
        include: {
          orderItems: {
            include: {
              item: true, // Include item details
            },
          },
        },
      });
      res.json({ success: true, data: orderWithItems });
    } else {
      // Return just the order if no items
      res.json({ success: true, data: newOrder });
    }
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//.delete
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete order (OrderItems will be deleted too)
    const order = await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ success: true, data: order });
  } catch (error) {
    console.log("Error deleting order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
