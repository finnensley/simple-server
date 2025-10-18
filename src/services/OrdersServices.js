import prisma from "../utils/client.js";

// things failed getting data

export const getOrders = async () => {
  return await prisma.order.findMany()({
    include: {
      orderItems: {
        include: {
          item: true, // Include item details
        },
      },
    },
  });
};
