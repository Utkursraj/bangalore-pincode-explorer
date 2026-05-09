const express = require("express");
const Pincode = require("../models/Pincode");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { pincode: { $regex: search, $options: "i" } },
          { area: { $regex: search, $options: "i" } }
        ]
      };
    }

    const results = await Pincode.find(query).sort({ area: 1 });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

router.get("/:pincode", async (req, res) => {
  try {
    const result = await Pincode.findOne({
      pincode: req.params.pincode
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Pincode not found"
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;