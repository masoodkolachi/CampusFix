import mongoose from "mongoose";

export const REPORT_CATEGORIES = ["electrical", "internet", "cleanliness", "furniture", "water", "safety", "other"];
export const REPORT_STATUSES = ["pending", "in_progress", "resolved"];
export const REPORT_PRIORITIES = ["low", "medium", "high"];

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    category: { type: String, enum: REPORT_CATEGORIES, required: true },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    imageUrl: { type: String },
    status: { type: String, enum: REPORT_STATUSES, default: "pending" },
    priority: { type: String, enum: REPORT_PRIORITIES, default: "medium" },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    statusHistory: [
      {
        status: { type: String, enum: REPORT_STATUSES },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        note: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

reportSchema.index({ reportedBy: 1, createdAt: -1 });
reportSchema.index({ status: 1, category: 1 });

export default mongoose.model("Report", reportSchema);
