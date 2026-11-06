import jwt from "jsonwebtoken";
import User from "../models/User.js";

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signup(req, res, next) {
  try {
    const { name, email, rollNumber, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.create({ name, email, rollNumber, password, role: "student" });
    res.status(201).json({ token: createToken(user._id), user: user.toPublicJSON() });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user || !(await user.matchesPassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    res.json({ token: createToken(user._id), user: user.toPublicJSON() });
  } catch (error) {
    next(error);
  }
}

export function getCurrentUser(req, res) {
  res.json({ user: req.user.toPublicJSON() });
}
