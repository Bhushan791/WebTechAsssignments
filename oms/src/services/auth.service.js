const User = require("../models/user.model");

// ─── REGISTER ─────────────────────────────────────────────────────
const register = async ({ name, email, password, image }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const user = await User.create({ name, email, password, image });

  const token = user.generateToken();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image, // send uploaded image path
    },
  };
};

// ─── LOGIN ────────────────────────────────────────────────────────
const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = user.generateToken();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    },
  };
};

// ─── UPDATE PROFILE ───────────────────────────────────────────────
const updateProfile = async (userId, { name, email, image }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Check if new email is taken by someone else
  if (email && email !== user.email) {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) throw new Error("Email already in use");
  }

  // Only update fields that were actually sent
  if (name)  user.name  = name;
  if (email) user.email = email;
  if (image) user.image = image; // new uploaded path

  await user.save();

  return {
    user: {
      id:    user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      image: user.image,
    },
  };
};

module.exports = { register, login, updateProfile }; 