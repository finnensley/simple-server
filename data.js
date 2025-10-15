export const items = [
  {
    id: 1,
    picture: "src/assets/pexels-jamie-he-170821-563067.jpg",
    sku: 111111,
    description: "plate",
    total_quantity: 10,
    locations: [{ id: 1, location: 1, quantity: 10 }],
  },
  {
    id: 2,
    picture: "src/assets/pexels-pixabay-53588.jpg",
    sku: 222222,
    description: "bowl",
    total_quantity: 10,
    locations: [
      { id: 2, location: 2, quantity: 5 },
      { id: 3, location: 3, quantity: 4 },
    ],
  },
  {
    id: 3,
    picture: "src/assets/pexels-ifreestock-585753.jpg",
    sku: 333333,
    description: "mug",
    total_quantity: 10,
    locations: [{ id: 4, location: 4, quantity: 10 }],
  },
];

export const locations = [
  { id: 1, location: 1 },
  { id: 2, location: 2 },
  { id: 3, location: 3 },
  { id: 4, location: 4 },
];

export const orders = [
  {
    order_number: 100,
    items: [
      {
        id: 1,
        sku: 111111,
        description: "plate",
        quantity: 1,
        subtotal: 40,
        taxes: 3,
        shipping_paid: 10,
      },
    ],
  },

  {
    order_number: 101,
    items: [
      {
        id: 2,
        sku: 222222,
        description: "bowl",
        quantity: 2,
        subtotal: 30,
        taxes: 3,
        shipping_paid: 10,
      },
    ],
  },

  {
    order_number: 102,
    items: [
      {
        id: 3,
        sku: 333333,
        description: "mug",
        quantity: 1,
        subtotal: 20,
        taxes: 3,
        shipping_paid: 10,
      },
      {
        id: 2,
        sku: 222222,
        description: "bowl",
        quantity: 1,
        subtotal: 30,
        taxes: 3,
        shipping_paid: 10,
      },
    ],
  },
];