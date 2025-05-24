import { compare } from "bcrypt";
import pkg from "jsonwebtoken";

import pool from "../config/db.js";

const { sign } = pkg;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default { login };
