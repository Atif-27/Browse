import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  { timestamps: true }
);
commentSchema.plugin(mongooseAggregatePaginate);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
