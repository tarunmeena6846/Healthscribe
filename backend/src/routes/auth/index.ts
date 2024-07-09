import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../db/models/user"; // Assuming you have defined Mongoose models for User

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("at / in auth");
  res.status(200).send("hello from / route of auth");
});

const SECRET_KEY = "your_secret_key";

// Signup
router.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
