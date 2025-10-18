import prisma from "../utils/client.js";
import { getLocations } from "../services/LocationsServices.js";

// when a request fails


export const getAllLocations = async (req, res, next) => {
  try {
    const locations = await getLocations();
    res.json({ success: true, data: locations });
  } catch (err) {
    next(err);
  }
};

//.post
export const addNewLocation = async (req, res) => {
  try {
    const { location } = req.body;
    const newLocation = await prisma.location.create({
      data: {
        location: location,
      },
    });
    res.json({ success: true, data: newLocation });
  } catch (error) {
    console.log("Error creating item:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//.put
export const updateLocationQuantity = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const locationId = parseInt(req.params.locationId);
    const { quantity } = req.body;

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item was found with that item id",
      });
    }

    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        error: "No location was found with this location id",
      });
    }

    const updatedLocationQuantity = await prisma.itemLocation.upsert({
      where: {
        item_id_location_id: {
          item_id: itemId,
          location_id: locationId,
        },
      },
      update: {
        quantity: quantity,
      },
      create: {
        item_id: itemId,
        location_id: locationId,
        quantity: quantity,
      },
    });
    res.json({ success: true, data: updatedLocationQuantity });
  } catch (error) {
    console.log("Location quantity not updated:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
