import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  const { id, author, content, date } = req.body;

  if (id === null || isNaN(id)) {
    return res.status(400).json({ message: "Invalid id provided." });
  }

  try {
    const newComment = new Comment({ id, author, content, date });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Error saving comment." });
  }
};

export const getComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await Comment.find({ id: postId });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments." });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating the comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting the comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};