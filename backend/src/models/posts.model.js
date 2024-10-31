import mongoose from "mongoose";

// Connect to the database (ideally, connection code should be in a separate file or handled once on app startup)


const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  content: { type: String, required: true },
  tags: { type: String, required: false },
  coverimg: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  approved: { type: Boolean, required: true, default: true },

});

const Posts = mongoose.model("Posts", PostSchema);

export default Posts;
