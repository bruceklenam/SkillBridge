const express = require("express");
const authMiddleware = require("../middleware/auth");
const ForumPost = require("../models/ForumPost");

const router = express.Router();

// create a post
router.post("/createPost", authMiddleware(["business", "mentor", "student"]), async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const post = new ForumPost({
      title,
      content,
      authorId: req.user.id,
      authorName: req.user.fullName,
    });
    await post.save();

    // Real-time update
    req.io.emit("newPost", post);

    res.status(201).json({ id: post._id, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get posts (with pagination)
router.get("/getPosts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const posts = await ForumPost.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ForumPost.countDocuments();
    res.status(200).json({
      posts,
      page,
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add comment
router.post("/addComment", authMiddleware(["business", "mentor", "student"]), async (req, res) => {
  const { postId, content } = req.body;
  if (!postId || !content) {
    return res.status(400).json({ error: "Post ID and content are required" });
  }

  try {
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({
      content,
      authorId: req.user.id,
      authorName: req.user.fullName,
    });
    await post.save();

    // Real-time update
    req.io.to(`post_${postId}`).emit("newComment", post.comments[post.comments.length - 1]);

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
