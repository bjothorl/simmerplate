// standard express server, serving static dist folder

const express = require("express");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api", limiter);

// Hello world endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
