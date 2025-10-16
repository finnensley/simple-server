import prisma from "../utils/client.js";

// things fail getting data

export const getItems = async (req, res) =>  {
    const items = await prisma.items.findMany();
    return items;
}
