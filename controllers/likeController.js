const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post: postId, user: userId } = req.body;
    if (!postId || !userId) {
      return res.status(400).json({ error: "post and user are required" });
    }

    // Check if this user has already liked this post
    const alreadyLiked = await Like.findOne({ post: postId, user: userId });
    if (alreadyLiked) {
      // ✅ Simply return the current post instead of 400
      const currentPost = await Post.findById(postId)
        .populate("likes")
        .populate("comments");
      return res.status(200).json({ success: true, post: currentPost });
    }

    const like = await Like.create({ post: postId, user: userId });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: like._id } },
      { new: true }
    ).populate("likes").populate("comments");

    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.unlikePost = async (req, res) => {
  try {
    const { postId, likeId } = req.body;   // <-- change keys here

    if (!postId || !likeId) {
      return res.status(400).json({ error: "postId and likeId are required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Remove the like reference from the post
    post.likes = post.likes.filter(id => id.toString() !== likeId);
    await post.save();

    // Remove the like document itself
    await Like.findByIdAndDelete(likeId);

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

   

