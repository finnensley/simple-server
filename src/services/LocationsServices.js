import prisma from "../utils/client.js";

// things failed getting data

export const getLocations = async (req, res) =>  {
    const locations = await prisma.location.findMany();
    return locations;
}