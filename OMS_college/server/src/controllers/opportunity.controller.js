import { Opportunity } from "../models/opportunity.model.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

/* =========================
   CREATE OPPORTUNITY
========================= */
export const createOpportunity = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    opportunityType,
    category,
    applicationLink,
    deadline,
    eligibleYears,
    eligibleDepartments,
    organization,
    contactInfo,
    location,
    tags,
  } = req.body;

  if (
    !title ||
    !description ||
    !opportunityType ||
    !category ||
    !applicationLink ||
    !deadline
  ) {
    throw new ApiError(400, "Required fields missing");
  }

  let imageData = {};
  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file.path);
    imageData = {
      image: uploaded.secure_url,
      imagePublicId: uploaded.public_id,
    };
  }

  const opportunity = await Opportunity.create({
    title,
    description,
    opportunityType,
    category,
    applicationLink,
    deadline,
    eligibleYears,
    eligibleDepartments,
    organization,
    contactInfo,
    location,
    tags,
    postedBy: req.user._id, // admin
    ...imageData,
  });

  return res
    .status(201)
    .json(
      new apiResponse(201, opportunity, "Opportunity created successfully")
    );
});

/* =========================
   UPDATE OPPORTUNITY
========================= */
export const updateOpportunity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const opportunity = await Opportunity.findById(id);
  if (!opportunity) {
    throw new ApiError(404, "Opportunity not found");
  }

  // 🔐 OWNERSHIP CHECK
  if (opportunity.postedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You cannot edit another admin's post");
  }

  // Image update (optional)
  if (req.file) {
    if (opportunity.imagePublicId) {
      await deleteFromCloudinary(opportunity.imagePublicId);
    }

    const uploaded = await uploadToCloudinary(req.file.path);
    opportunity.image = uploaded.secure_url;
    opportunity.imagePublicId = uploaded.public_id;
  }

  Object.assign(opportunity, req.body);
  await opportunity.save();

  return res
    .status(200)
    .json(
      new apiResponse(200, opportunity, "Opportunity updated successfully")
    );
});

/* =========================
   DELETE OPPORTUNITY
========================= */
export const deleteOpportunity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const opportunity = await Opportunity.findById(id);
  if (!opportunity) {
    throw new ApiError(404, "Opportunity not found");
  }

  // 🔐 OWNERSHIP CHECK
  if (opportunity.postedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You cannot delete another admin's post");
  }

  if (opportunity.imagePublicId) {
    await deleteFromCloudinary(opportunity.imagePublicId);
  }

  await opportunity.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Opportunity deleted successfully"));
});

/* =========================
   GET ALL OPPORTUNITIES
   (Students + Admin)
========================= */
export const getAllOpportunities = asyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find({ isActive: true })
    .populate("postedBy", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, opportunities, "Opportunities fetched"));
});
