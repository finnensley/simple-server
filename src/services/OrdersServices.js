import prisma from "../utils/client.js";

// things failed getting data

export const getOrders = async (req, res) =>  {
    const orders = await prisma.order.findMany();
    return orders;
}