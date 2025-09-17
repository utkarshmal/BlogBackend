const express = require("express");
const router = express.Router();

// Controllers
const { likePost, unlikePost } = require("../controllers/likeController");
const { createComment, deleteComment } = require("../controllers/commentController");
const { 
  createPost,
  getAllPosts,
  getPostById,
  deletePost
} = require("../controllers/postController");


// ---------- Existing Routes ----------
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

// ---------- Auth ----------


router.delete("/comments/delete", deleteComment); // body: { postId, commentId }
router.delete("/posts/delete", deletePost);       // body: { postId }

// Export
module.exports = router;
