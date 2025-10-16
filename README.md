Set up a simple server using node.js and express

Steps:
    - npm init -y, npm install express, npm install nodemon
    - package.json: 
        * add "type": "module" beneath "main": "server.js"
        * add to "script": "start": "node server.js" 
        * switched to "start": "nodemon server.js", use npx nodemon server.js (listens for changes)
    - server.js:
        * import express from 'express'
        * initialize: const app = express();
        * designate port: const port = 3000;
    - install Postman extension to use for testing
        * add Header: Content-Type, json
        * copy url
    - add a simple .get with res.send("Hello") and .listen
    - from directory 
        * node server.js or npm start
        
Additional Backend Steps using MVC (model view controller):
    - env 
        * npm install dotenv
    - prisma - 
       * npm install prisma @prisma/client     
       * npx prisma init
       * npx prisma format
       * npx prisma generate
       * npx prisma migrate dev --name init
       * npx prisma studio (to view the database)
    - railway - tables
    - env, utils, controller, routes folders, prisma client
    - logic lives in controller
    - routes live in individual routes(1 file for orders, 1 file for items, etc)
    - env: Port and Docker URL

MVC Restructuring:
simpleServer/
├── controllers/          # Handle request/response logic
│   ├── itemController.js
│   ├── locationController.js
│   └── orderController.js
├── models/              # Database models (Prisma handles this)
│   └── index.js         # Prisma client export
├── routes/              # Route definitions
│   ├── itemRoutes.js
│   ├── locationRoutes.js
│   └── orderRoutes.js
├── middleware/          # Custom middleware
│   └── errorHandler.js
├── config/              # Configuration files
│   └── database.js
├── prisma/              # Prisma schema and migrations
│   └── schema.prisma
├── server.js            # Main server file
├── package.json
└── .env                 # Environment variables

Notes:

  const itemId = parseInt(req.params.id); // itemId will contain the input from the url
  app.put("/items/:id/locations/:locationId",...); // :id is mutable by user, as is :locationId
    - example: localhost:3000/items/1/locations/1
  Don't forget validations! 

.get: 
    - used to retrieve data from a specified resource
    - requesting a webpage or fetching a list of products
    - use req.params.parameterName to get URL parameters
    - convert to correct type (parseInt() for numbers)
    - use array.find() for a single result, array.filter() for     multiple results
  

.post: 
    - used to submit data to a specified resource
    - create new item or user account
    - submitting a form with new data
    

.put:
    - used to update an existing resource 
    - update all existing details of a current product

.delete:
    - used to remove a specified resource from the server
    - remove an item from a shopping cart
    - deleting a blog post
    - no body is necessary, the delete occurs by just making the delete request to the specific url

JS Refresher: 
.find():
    - finds the first element in the array that satisfies the provided test function
    - ex. finding an item using the item.id

.filter():
    - process or refine data before sending a response
    - filtering arrays of data based on specific criteria
    - ex. let filteredProducts = allProducts;
          if (categoryFilter) {
            filteredProducts = allProducts.filter(product => product.category === categoryFilter);}
    - ex. if (searchTerm) {
          const matchingUsers = allUsers.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()));
         }

.map():
    - used for data transformation and manipulation within arrays.
    - creates a new array by calling a provided function on every element in the calling array.
    - fetching data from a database, transform results into cleaner format:  
        const rawProducts = await db.query('SELECT * FROM         products');
        const formattedProducts = rawProducts.map(product => ({
            id: product.id,
            name: product.product_name,
            price: product.unit_price,
            category: product.category_id // Assuming category names are handled elsewhere
        }));
    - ex.   
            const user = await db.getUserById(req.params.id);
            if (!user) {
                 return res.status(404).send('User not found'); }
            const publicProfile = {
            username: user.username,
            email: user.email, // Assuming email is public for this endpoint
            registrationDate: user.created_at
        };
    - ex.
        // Example: Generating a list of image URLs from an array of image filenames
         app.get('/gallery', (req, res) => {
            const imageFilenames = ['image1.jpg', 'image2.png', 'image3.jpeg'];
            const imageUrls = imageFilenames.map(filename => `/assets/images/${filename}`);
            res.json(imageUrls);
          });

.reduce():
    - ex. item.total_quantity = item.locations.reduce((sum, loc) => sum + loc.quantity, 0);
    - 0 indicates where sum starts, sum = 0 (the initial value)
  

.splice():
    - always needs the numeric index,  const itemIndex = items.findIndex(item => item.id === itemId)
    - always returns an array, even if removing just one item. Example:     
       * const deletedItem = items.splice(itemIndex, 1); // [{id: 2, description: "bowl"}] -> array
       * const deletedItem = items.splice(itemIndex, 1)[0]; // {id: 2, description: "bowl"} -> want a clean object.


Postman: 
    - Make sure using raw and JSON, and Content-Type application/json

Error Codes:

404 - Not found: server can't process the request due to syntax issues or invalid parameters, used for items
400 - Bad request: server can't find the requested source. Url may be incorrect, "description" or "sku" not found
200 - success message: "Item deleted successfully"