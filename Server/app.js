const express = require("express");
const cors = require("cors");
const { getDetails, selectedStocks } = require("./script.js");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Server is running on port ${3000}`);
});

app.get("/refresh", (req, res) => {
  res.json(getDetails());
});

app.get("/stocks", (req, res) => {
  res.json(selectedStocks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
