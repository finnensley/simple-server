import prisma from "../utils/client.js";

// things fail getting data
// services talk to the database

export const getItems = async (req, res) =>  {
    const items = await prisma.item.findMany();
    return items;
}


