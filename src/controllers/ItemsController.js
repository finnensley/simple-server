import prisma from "../utils/client.js";
import { getItems } from "../services/ItemsServices.js";

// when a request fails

//.get
export const getAllItems = async (req, res, next) => {
  try {
    const items = await getItems();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

//.get
export const getItemById = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    res.json({ success: true, data: item });
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Item not found");
    } else {
      throw error;
    }
  }
};

//.get
export const getItemByDescription = async (req, res) => {
  try {
    const itemDescription = req.params.description;
    const item = await prisma.item.findFirst({
      where: { description: itemDescription },
    });
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: "Item not found" 
      });
    }
    
    res.json({ success: true, data: item });
  } catch (error) {
    console.log("Error finding item:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

//.post
export const addNewItem = async (req, res) => {
  try {
    const { picture, sku, description, total_quantity } = req.body;
    const newItem = await prisma.item.create({
      data: {
        picture,
        sku,
        description,
        total_quantity,
      },
    });
    res.json({ success: true, data: newItem });
  } catch (error) {
    console.log("Error creating item:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//.put
export const updateItemDescription = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const description = req.body.description;

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({  
        success: false,
        error: "No item was found with that item id",
      });
    }

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { description },
    });

    res.json({ success: true, data: updatedItem });
  } catch (error) {
    console.log("Description not updated:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//.delete
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ success: true, data: item });
  } catch (error) {
    console.log("Error deleting item:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
