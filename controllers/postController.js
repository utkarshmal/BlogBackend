const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");
const mongoose = require("mongoose");  

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title,
            body,
        });
        const savedPost = await post.save();

        res.json({
            post: savedPost,
        });
    } catch (error) {
        return res.status(400).json({
            error: "Error while creating post",
        });
    }
};

exports.getAllPosts = async (req, res) => {
  try {
      const posts = await Post.find(); 
      res.json({ posts });
  } catch (error) {
      return res.status(400).json({ error: "Error while fetching posts", details: error.message });
  }
};






exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid Object Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID format",
      });
    }

    // ✅ Fetch post with likes & comments
    const post = await Post.findById(id)
      .populate({
        path: "likes",
        select: "_id user", // only select required fields
      })
      .populate({
        path: "comments",
        select: "_id user body",
      })
      .exec();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found with this ID",
      });
    } 
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("getPostById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching post",
      error: error.message,
    });
  }
};




// ✅ Delete entire post + all its likes & comments
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.body;   // keep same body pattern as like/unlike

    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // 1️⃣ Delete all comments linked to this post
    await Comment.deleteMany({ _id: { $in: post.comments } });

    // 2️⃣ Delete all likes linked to this post
    await Like.deleteMany({ _id: { $in: post.likes } });

    // 3️⃣ Delete the post itself
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
