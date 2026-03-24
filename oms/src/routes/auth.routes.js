const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");
const { verifyToken } = require("../middleware/auth.middleware"); // ← add this

// REGISTER → handle image upload
router.post("/register", upload.single("image"), authController.register);

// LOGIN → no file needed
router.post("/login", authController.login);

// UPDATE PROFILE → protected + optional image
router.put("/update-profile", verifyToken, upload.single("image"), authController.updateProfile);

module.exports = router;