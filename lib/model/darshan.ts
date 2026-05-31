import mongoose, { Schema } from "mongoose";

const DarshanSchema = new Schema(
  {
    date: { type: String, required: true },
    tithi: { type: String },
    cover: { type: String, required: true },
    images: [{ type: String }],
    imageKitFileIds: [{ type: String }],
  },
  { timestamps: true }
);

export const Darshan =
  mongoose.models.Darshan || mongoose.model("Darshan", DarshanSchema);