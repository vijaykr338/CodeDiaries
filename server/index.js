import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb://127.0.0.1:27017/config').then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

const userSchema = new mongoose.Schema({
  id: {
    type: Number, 
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

app.post("/comments", async (req, res) => {
  const { id, author, content, date } = req.body;

  if (id === null || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid id provided.' });
  }

  try {
    const newComment = new User({ id, author, content, date });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ message: 'Error saving comment.' });
  }
});



// Fetch comments for a specific blog (based on index/id)
app.get("/comments/:id", async (req, res) => {
  const postId = req.params.id; // Extract post ID from the URL

  try {
    const comments = await User.find({ id: postId }); // Find comments with the matching ID
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments.' });
  }
});


// Update a specific comment
app.put("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await User.findByIdAndUpdate(id, { content }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating the comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a specific comment
app.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await User.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting the comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
