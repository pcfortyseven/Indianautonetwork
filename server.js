const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a Mongoose schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    timestamp: { type: Date, default: Date.now }
});

// Create a Mongoose model
const Post = mongoose.model('Post', postSchema);

app.use(express.json());

// Endpoint to get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ timestamp: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to create a new post
app.post('/api/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
