import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory real estate data store (for simplicity)
let properties = [
  {
    id: 1,
    title: "Modern Apartment",
    price: 120000,
    location: "New York",
    description: "A beautiful modern apartment in downtown.",
    type: "apartment",
  },
  {
    id: 2,
    title: "Cozy Cottage",
    price: 80000,
    location: "Vermont",
    description: "A cozy cottage in a peaceful location.",
    type: "house",
  },
  {
    id: 3,
    title: "Luxury Villa",
    price: 450000,
    location: "Los Angeles",
    description: "A luxurious villa with a pool and garden.",
    type: "villa",
  },
];

// GET all properties
app.get("/api/properties", (req, res) => {
  try {
    // The main logic goes inside the try block
    res.json(properties);
    console.log(properties);
  } catch (error) {
    // Catch any error and send an appropriate response
    console.error("Error fetching properties:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching properties." });
  }
});

// GET a single property by ID
app.get("/api/properties/:id", (req, res) => {
  const property = properties.find((p) => p.id === parseInt(req.params.id));
  if (!property) return res.status(404).send("Property not found.");
  res.json(property);
});

// POST a new property
app.post("/api/properties", (req, res) => {
  const newProperty = {
    id: properties.length + 1, // Generate a simple ID (in real applications, use a UUID or database-generated ID)
    title: req.body.title,
    price: req.body.price,
    location: req.body.location,
    type: req.body.type,
    description: req.body.description,
  };

  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// PUT (update) an existing property
app.put("/api/properties/:id", (req, res) => {
  const property = properties.find((p) => p.id === parseInt(req.params.id));
  if (!property) return res.status(404).send("Property not found.");

  property.title = req.body.title;
  property.price = req.body.price;
  property.location = req.body.location;
  property.description = req.body.description;
  property.type = req.body.type;
  res.json(property);
});

// app.put("/api/properties/:id", (req, res) => {
//   const property = properties.find((p) => p.id === parseInt(req.params.id));
//   if (!property) return res.status(404).send("Property not found.");

//   property.title = req.body.title;
//   property.price = req.body.price;
//   property.location = req.body.location;
//   property.description = req.body.description;
//   property.type = req.body.type;
//   res.json(property);
// });

// DELETE a property
// app.delete("/api/properties/:id", (req, res) => {
//   const propertyIndex = properties.findIndex(
//     (p) => p.id === parseInt(req.params.id)
//   );
//   if (propertyIndex === -1) return res.status(404).send("Property not found.");

//   properties.splice(propertyIndex, 1);
//   res.status(204).send();
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
