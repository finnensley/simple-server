import prisma from "../utils/client";
import { getItems } from "../services/ItemsServices";

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
    const item = await prisma.items.findUnique({
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
    const item = await prisma.items.findUnique({
      where: { description: itemDescription },
    });
    res.json({ success: true, data: item });
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Item not found");
    }
  }
};

//.post
export const addNewItem = async (req, res) => {
  try {
    const { picture, sku, description, total_quantity, itemLocations } =
      req.body;
    const newItem = await prisma.items.create({
      data: {
        id: newId,
        picture,
        sku,
        description,
        total_quantity,
        itemLocations,
      },
    });
    res.json({ success: true, data: newItem });
  } catch (error) {
    if (error.code === "P2025") {
      console.log("New item not created");
    }
  }
};

//.put
export const updateItemDescription = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const description = req.body.description;

    const item = await prisma.items.findUnique({
      where: { item: itemId },
    });

    if (!item) {
      res.send({
        success: false,
        error: "No item was found with that item id",
      });
    }

    const itemToUpdate = [...item, description];
    item = itemToUpdate;
    res.send({ success: true, data: item });
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Description not updated");
    }
  }
};

//.delete, to splice must use index
export const deleteItem = (req, res) => {
    const index = items.findIndex((item) => item.id === req.body.id);
    if (index === -1) {
        res.send({ success: false, error: "No item was found with that id"});
    }
    items.splice(index, 1);
    res.send({ success: true, data: items });
};