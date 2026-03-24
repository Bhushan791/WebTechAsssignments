const userService = require("../services/user.service");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }
  try {
    const user = await userService.createUser({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.status(200).json({ success: true, msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };