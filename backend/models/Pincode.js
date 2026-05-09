const mongoose = require("mongoose");

const pincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: true,
      index: true
    },
    area: {
      type: String,
      required: true,
      index: true
    },
    district: {
      type: String,
      default: "Bengaluru"
    },
    state: {
      type: String,
      default: "Karnataka"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pincode", pincodeSchema);