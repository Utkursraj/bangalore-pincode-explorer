require("dotenv").config();
const mongoose = require("mongoose");
const Pincode = require("./models/Pincode");
const pincodes = require("./data/pincodes");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Pincode.deleteMany();
    await Pincode.insertMany(pincodes);

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();