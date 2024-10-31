import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const app = express();
const JWT_SECRET = 'thisisthesecretkey123123';
const PORT = 4000;
app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb+srv://vijaykvs2016:Y4NmSswLi3N8Xh0j@cluster0.ehogv.mongodb.net/').then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const commentSchema = new mongoose.Schema({
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

const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);

app.post("/signup", async (req, res) => {
  const { username, email, password} = req.body;

  // Validate request body
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all the details' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword });

    
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: 'error', message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ status: 'error', message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ status: 'ok', message: 'Login Successful', user: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred. Please try again later.' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.get('/homepage', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});



app.post("/comments", async (req, res) => {
  const { id, author, content, date } = req.body;

  if (id === null || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid id provided.' });
  }

  try {
    const newComment = new Comment({ id, author, content, date });
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
    const comments = await Comment.find({ id: postId }); // Find comments with the matching ID
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
    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
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
    const deletedComment = await Comment.findByIdAndDelete(id);
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
