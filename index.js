const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const blog = require("./routes/blog");
app.use("/api/v1", blog);

const authRoutes = require("./routes/check");
app.use("/api/v1/check" ,authRoutes);

// Connect to DB
const connectWithDb = require("./config/database");
connectWithDb();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at port ${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  res.send(`<h1>✅ Backend running on ${PORT}</h1>`);
});
