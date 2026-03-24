const authService = require("../services/auth.service");

// ─── REGISTER ─────────────────────────────────────────────────────
const register = async (req, res) => {
  // Safe destructuring
  const name = req.body?.name;
  const email = req.body?.email;
  const password = req.body?.password;
  const image = req.file?.path || null; // Multer file path

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  try {
    const data = await authService.register({ name, email, password, image });
    res.status(201).json({ success: true, ...data });
  } catch (error) {
    console.error(error); // log actual error
    res.status(500).json({ success: false, msg: error.message || "Internal server error" });
  }
};

// ─── LOGIN ────────────────────────────────────────────────────────
const login = async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({ success: false, msg: "Email and password are required" });
  }

  try {
    const data = await authService.login({ email, password });
    const message = data.user.role === "admin" ? "Admin login successful" : "User login successful";

    res.status(200).json({ success: true, message, ...data });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, msg: error.message });
  }
};




// ─── UPDATE PROFILE ───────────────────────────────────────────────
const updateProfile = async (req, res) => {
  const userId = req.user?.id; // comes from your auth middleware

  const name  = req.body?.name;
  const email = req.body?.email;
  const image = req.file?.path || null; // new image if uploaded

  // At least one field must be provided
  if (!name && !email && !image) {
    return res.status(400).json({ success: false, msg: "Nothing to update" });
  }

  try {
    const data = await authService.updateProfile(userId, { name, email, image });
    res.status(200).json({ success: true, message: "Profile updated successfully", ...data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message || "Internal server error" });
  }
};

module.exports = { register, login, updateProfile }; 