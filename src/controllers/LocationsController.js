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

// .get
export const getLocationWithItems = async (req, res) => {
  try {
    const locationId = parseInt(req.params.id);
    
    const location = await prisma.location.findUnique({
      where: { id: locationId },
      include: {
        items: {  
          include: {
            item: true,
          },
        },
      },
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        error: "Location not found",
      });
    }

    res.json({ success: true, data: location });
  } catch (error) {
    console.log("Error getting location:", error);
    res.status(500).json({ success: false, error: error.message });
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

//.post
export const addItemToLocation = async (req, res) => {
  try {
    const locationId = parseInt(req.params.locationId);
    const { item_id, quantity } = req.body;
    // check if location exists
    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      return res
        .status(404)
        .json({ success: false, error: "Location not found" });
    }
    // check if item exists
    const item = await prisma.item.findUnique({
      where: { id: item_id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item not found",
      });
    }

       // Add item to location (or update quantity if already exists)
    const itemLocation = await prisma.itemLocation.upsert({
      where: {
        item_id_location_id: {
          item_id: item_id,
          location_id: locationId,
        },
      },
      update: {
        quantity: quantity,
      },
      create: {
        item_id: item_id,
        location_id: locationId,
        quantity: quantity,
      },
    });

    res.json({ success: true, data: itemLocation });
  } catch (error) {
    console.log("Error adding item to location:", error);
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

//.patch
//.patch - Decrement item quantity at location
export const decrementItemQuantity = async (req, res) => {
  try {
    const locationId = parseInt(req.params.locationId);
    const itemId = parseInt(req.params.itemId);
    const { quantity } = req.body; // Amount to remove

    // Check if the item-location relationship exists
    const itemLocation = await prisma.itemLocation.findUnique({
      where: {
        item_id_location_id: {
          item_id: itemId,
          location_id: locationId,
        },
      },
    });

    if (!itemLocation) {
      return res.status(404).json({
        success: false,
        error: "Item not found at this location",
      });
    }

    const newQuantity = itemLocation.quantity - quantity;

    // If quantity would be 0 or less, remove the item-location relationship
    if (newQuantity <= 0) {
      await prisma.itemLocation.delete({
        where: {
          item_id_location_id: {
            item_id: itemId,
            location_id: locationId,
          },
        },
      });

      res.json({ 
        success: true, 
        message: `Item ${itemId} completely removed from location ${locationId}`,
        removed: true
      });
    } else {
      // Otherwise, update the quantity
      const updatedItemLocation = await prisma.itemLocation.update({
        where: {
          item_id_location_id: {
            item_id: itemId,
            location_id: locationId,
          },
        },
        data: {
          quantity: newQuantity,
        },
      });

      res.json({ 
        success: true, 
        data: updatedItemLocation,
        message: `Quantity decremented to ${newQuantity}`
      });
    }
  } catch (error) {
    console.log("Error decrementing item quantity:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//.delete
export const deleteItemFromLocation = async (req, res) => {
  try {
    const locationId = parseInt(req.params.locationId);
    const itemId = parseInt(req.params.itemId);

    // Check if the item-location relationship exists
    const itemLocation = await prisma.itemLocation.findUnique({
      where: {
        item_id_location_id: {
          item_id: itemId,
          location_id: locationId,
        },
      },
    });

    if (!itemLocation) {
      return res.status(404).json({
        success: false,
        error: "Item not found at this location",
      });
    }

    // Delete the item-location relationship
    await prisma.itemLocation.delete({
      where: {
        item_id_location_id: {
          item_id: itemId,
          location_id: locationId,
        },
      },
    });

    res.json({ 
      success: true, 
      message: `Item ${itemId} removed from location ${locationId}` 
    });
  } catch (error) {
    console.log("Error removing item from location:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};