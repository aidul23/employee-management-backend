const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!password) throw new Error("password is required");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!password || !username)
      throw new Error("username and password is required");

    const user = await User.findOne({ username });
    if (!user) res.status(400).json({ message: "user not found" });

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) res.status(400).json({ message: "invalid password" });

    if (!process.env.JWT_SECRET) throw new Error("JWT secret is not defined");

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
