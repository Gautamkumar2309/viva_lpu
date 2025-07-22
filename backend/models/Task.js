import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  due: {
    type: Date, // ✅ Add this line
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
