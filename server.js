const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// parse middleware
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Home Page"));
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

module.exports = app;