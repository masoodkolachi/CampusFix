import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log(`Admin already exists: ${email}`);
  } else {
    await User.create({
      name: process.env.ADMIN_NAME || "Campus Admin",
      email,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`Admin created: ${email}`);
  }

  await mongoose.disconnect();
}

seedAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
