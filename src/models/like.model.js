import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Video", "Comment", "Tweet"],
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
