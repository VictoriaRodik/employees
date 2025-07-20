import { loginUser } from "../services/authService.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (err) {
    if (err.message === "Invalid username or password") {
      return res.status(401).json({ message: err.message });
    }

    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export default { login };
