import express from "express";
import { items, locations, orders } from "./data.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("request coming through");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

// ITEMS
app.get("/items", (req, res) => {
  res.json(items);
});

// localhost:3000/items/2  sends: all data for item with id:2
app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

//lcoalhost:3000/description/plate sends: all data for item with description: "plate"
app.get("/items/description/:description", (req, res) => {
  const itemDescription = req.params.description;
  const item = items.find((item) => item.description === itemDescription);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

//Create and add a new item
app.post("/items", (req, res) => {
  console.log("Request body:", req.body);
  const {
    picture,
    sku,
    description,
    total_quantity,
    locations: itemLocations,
  } = req.body;

  if (!sku) {
    return res.status(400).json({ error: "SKU is required" });
  }

  const newId = items.length + 1;
  console.log(newId);

  const newItem = {
    id: newId,
    picture: picture || "",
    sku: sku,
    description: description,
    total_quantity: total_quantity || 0,
    locations: itemLocations || [],
  };

  items.push(newItem);

  res
    .status(201)
    .json({ success: true, message: "new item added", item: newItem });
});

//Update an existing item's description
app.put("/items/:id/description", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  const { description } = req.body;

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  item.description = description;

  res.json({
    success: true,
    message: "Description updated successfully",
    item: item,
  });
});

app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id); //gets id from url
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (!itemIndex) {
    return res.status(404).json({ error: "Item not found" });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];
  res.status(200).json({ message: "Item deleted successfully", deletedItem });
});

//LOCATIONS
app.get("/locations", (req, res) => res.json(locations));

//Update location quantity for an item
app.put("/items/:id/locations/:locationId", (req, res) => {
  const itemId = parseInt(req.params.id);
  const locationId = parseInt(req.params.locationId);
  const { quantity } = req.body;

  //find the item.id
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  //find the location within the item's location array
  const locationIndex = item.locations.findIndex(
    (loc) => loc.id === locationId
  );
  if (!locationIndex === -1) {
    return res.status(400).json({ error: "Location not found" });
  }

  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ error: "Add a valid quantity" });
  }

  item.locations[locationIndex].quantity = parseInt(quantity);

  item.total_quantity = item.locations.reduce(
    (sum, location) => sum + location.quantity,
    0
  );

  res.json({
    success: true,
    message: "Location quantity updated",
    item: item,
  });
});

// Create a new location
app.post("/locations", (req, res) => {
  const { location } = req.body; // this is getting the input value

  if (!location) {
    return res.status(400).json({ error: "Location is required" }); // don't forget validation
  }

  //Check if location already exists
  const existingLocation = locations.find(
    (loc) => loc.location === parseInt(location)
  );
  if (existingLocation) {
    return res.status(400).json({ error: "Location already exists" }); // don't forget validation
  }
  const newId = locations.length + 1;
  const newLocation = {
    id: newId,
    location: parseInt(location), // use the input value
  };
  locations.push(newLocation);
  res.status(200).json({
    success: true,
    message: "Location created successfully",
    newLocation,
  });
});

// ORDERS
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.delete("/orders/:id", (req, res) => {
    const orderId = parseInt(req.params.id)
    const orderIndex = orders.findIndex((order) => order.id === orderId)
    if (!orderIndex) {
        return res.status(404).json({ error: "Order not found"});
    }
    const deletedOrder = orders.splice(orderIndex, 1)[0];
    res.status(200).json({success: true, message: "Order deleted successfully", deletedOrder });
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
