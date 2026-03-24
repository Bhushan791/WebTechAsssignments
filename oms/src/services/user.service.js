const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const createUser = async (userData) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error("Email already in use");

  const user = new User(userData); // use new User() not User.create() so pre save fires
  await user.save();
  return user;
};

// READ ALL
const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

// READ ONE BY ID
const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  return user;
};

// UPDATE
const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
  return user;
};

// DELETE
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };