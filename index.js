const express = require("express");
const path = require("path");
const app = express();

// Mock database for image data
const images = [
  { id: 1, name: "Deer", file: "image1.jpg" },
  { id: 2, name: "Red Panda", file: "image2.jpg" },
  { id: 3, name: "Hummingbird", file: "image3.jpg" },
  { id: 4, name: "Leopard", file: "image4.jpg" },
  { id: 5, name: "Squirrel", file: "image5.jpg" },
  { id: 6, name: "Owl", file: "image6.jpg" },
  { id: 7, name: "Squirrel", file: "image7.jpg" },
  { id: 8, name: "Elephant", file: "image8.jpg" },
  { id: 9, name: "Tomy", file: "image9.jpg" },
  { id: 10, name: "Ten", file: "image10.jpg" },
  { id: 11, name: "Eleven", file: "image11.jpg" },
  { id: 12, name: "Twelve", file: "image12.jpg" },
  { id: 13, name: "Thirteen", file: "image13.jpg" },
  { id: 14, name: "Fourteen", file: "image14.jpg" },
  { id: 15, name: "Fifteen", file: "image15.jpg" },
  { id: 16, name: "Sixteen", file: "image16.jpg" },
  { id: 17, name: "Seventeen", file: "image17.jpg" },
  { id: 18, name: "Eighteen", file: "image18.jpg" },
  { id: 19, name: "Nineteen", file: "image19.jpg" },
  { id: 20, name: "Twenty", file: "image20.jpg" },
];

// Middleware to serve static files
app.use("/images", express.static(path.join(__dirname, "images")));

// Helper function to add full URLs to image data
const buildImageResponse = (image, req) => ({
  id: image.id,
  name: image.name,
  url: `${req.protocol}://${req.get("host")}/images/${image.file}`,
});

// API to fetch a single image by ID
app.get("/api/image/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const image = images.find((img) => img.id === id);
  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }
  const response = buildImageResponse(image, req);
  res.json(response);
});

// API to fetch all images
app.get("/api/images", (req, res) => {
  const response = images.map((image) => buildImageResponse(image, req));
  res.json(response);
});

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
