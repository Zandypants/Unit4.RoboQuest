const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// parsing middleware
app.use(express.json());
app.use(express.urlencoded());

// routes
app.get("/", (req, res) => res.send("Home Page"));
app.use("/api/v1", require("./api/api.js"));
app.use("/auth", require("./auth.js"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
app.use((req, res) => {
  res.status(404).send("Path not found.");
});

// start
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

module.exports = app;