import prisma from "../utils/client.js";
import { getLocations } from "../services/LocationsServices.js";

// when a request fails

export const getAllLocations = async (req, res, next) => {
  try {
    const locationss = await getLocationss();
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
        location,
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
// //Update location quantity for an item
// app.put("/items/:id/locations/:locationId", (req, res) => {
//   const itemId = parseInt(req.params.id);
//   const locationId = parseInt(req.params.locationId);
//   const { quantity } = req.body;

//   //find the item.id
//   const item = items.find((item) => item.id === itemId);
//   if (!item) {
//     return res.status(404).json({ error: "Item not found" });
//   }
//   //find the location within the item's location array
//   const locationIndex = item.locations.findIndex(
//     (loc) => loc.id === locationId
//   );
//   if (!locationIndex === -1) {
//     return res.status(400).json({ error: "Location not found" });
//   }

//   if (quantity === undefined || quantity < 0) {
//     return res.status(400).json({ error: "Add a valid quantity" });
//   }

//   item.locations[locationIndex].quantity = parseInt(quantity);

//   item.total_quantity = item.locations.reduce(
//     (sum, location) => sum + location.quantity,
//     0
//   );

//   res.json({
//     success: true,
//     message: "Location quantity updated",
//     item: item,
//   });
// });
