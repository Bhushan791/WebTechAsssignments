const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

// All routes below require a valid JWT
router.use(verifyToken);

// CREATE  (admin only)
router.post("/create", verifyAdmin, userController.createUser);

// READ ALL  (any logged in user)
router.get("/", userController.getAllUsers);

// READ ONE
router.get("/:id", userController.getUserById);

// UPDATE  (admin only)
router.put("/:id", verifyAdmin, userController.updateUser);

// DELETE  (admin only)
router.delete("/:id", verifyAdmin, userController.deleteUser);

module.exports = router;