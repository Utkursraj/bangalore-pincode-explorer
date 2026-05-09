require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const pincodeRoutes = require("./routes/pincodeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bangalore Pincode Explorer API is running");
});

app.use("/api/pincodes", pincodeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });