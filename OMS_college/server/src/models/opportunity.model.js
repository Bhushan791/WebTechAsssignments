import mongoose from "mongoose";

// Prevent overwrite issue
if (mongoose.models.Opportunity) {
  delete mongoose.models.Opportunity;
}

const opportunitySchema = new mongoose.Schema(
  {
    /* =======================
       CORE REQUIRED INFO
    ======================== */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    opportunityType: {
      type: String,
      required: true,
      enum: [
        "internship",
        "job",
        "scholarship",
        "research",
        "event",
        "announcement",
      ],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "engineering",
        "medical",
        "business",
        "science",
        "arts",
        "law",
        "all",
      ],
    },

    applicationLink: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // admin user
    },

    /* =======================
       OPTIONAL / FLEXIBLE INFO
    ======================== */

    eligibleYears: {
      type: [String], // ["1st", "2nd", "final"]
      default: [],
    },

    eligibleDepartments: {
      type: [String], // ["Computer", "IT", "Civil"]
      default: [],
    },

    organization: {
      type: String, // company / university name
    },

    contactInfo: {
      type: String, // email / phone / website
    },

    location: {
      type: String, // remote / onsite / hybrid
    },

    tags: {
      type: [String], // AI, frontend, finance etc
      default: [],
    },

    /* =======================
       IMAGE (OPTIONAL)
    ======================== */

    image: {
      type: String, // Cloudinary URL
    },

    imagePublicId: {
      type: String, // for delete/update
    },

    /* =======================
       STATUS & ANALYTICS
    ======================== */

    views: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["open", "closed", "expired"],
      default: "open",
    },

    isVerified: {
      type: Boolean,
      default: true, // admin-posted
    },
  },
  { timestamps: true }
);

// 🔄 Auto-expire after deadline
opportunitySchema.pre("save", function (next) {
  if (this.deadline && this.deadline < new Date()) {
    this.isActive = false;
    this.status = "expired";
  }

});

export const Opportunity = mongoose.model(
  "Opportunity",
  opportunitySchema
);
