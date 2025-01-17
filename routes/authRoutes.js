const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("existingUserexistingUser",existingUser)
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = generateToken({ id: user.id });
  res.json({ token, user: user });
});

module.exports = router;
