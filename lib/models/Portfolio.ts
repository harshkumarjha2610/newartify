import mongoose from "mongoose";
import "./Category"; // Ensure Category is registered

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // Array of Cloudinary URLs
    link: { type: String, required: false, default: "" },
    techStack: { type: [String], default: [] },
    features: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
