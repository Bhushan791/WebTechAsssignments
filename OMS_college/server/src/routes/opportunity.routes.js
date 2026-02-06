import { Router } from "express";
import {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getAllOpportunities,
} from "../controllers/opportunity.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// public / students
router.get("/", verifyJWT, getAllOpportunities);

// admin only
router.post(
  "/",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  createOpportunity
);

router.put(
  "/:id",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  updateOpportunity
);

router.delete(
  "/:id",
  verifyJWT,
  isAdmin,
  deleteOpportunity
);

export default router;
