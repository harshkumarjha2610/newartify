import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, required: true }, // Cloudinary URL
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
