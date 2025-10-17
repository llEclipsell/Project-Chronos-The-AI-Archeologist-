import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    fragment: { type: String, required: true },
    reconstruction: { type: String, required: true },
    sources: [{ title: String, link: String }],
    diff: { type: Object },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
