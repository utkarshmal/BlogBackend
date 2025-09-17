//import model
const Post =require("../models/postModel");
const Comment =require("../models/commentModel");

//business logic
exports.createComment = async(req,res)=>{
    try{
    //fetch data from req body
    const {post, user, body}=req.body;
    //create a comment object
    // new way ,,ek way already kiye hai create wala in first 2 lecture,, yaha .save use kre
    const comment =new Comment({
        post,user,body
    });
    //save the new comment into the database
    const savedComment =await comment.save();
    
    //find the post by ID , add new comment to its comment array
    const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}}, {new:true})
                        .populate("comments")//populate the comments array with comments document
                        .exec();
        res.json({
            post:updatedPost,
        });               
    }
    catch(error){
return res.status(500).json({
    error:"Error while creating comment",
})
    }
}





exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;

    if (!postId || !commentId) {
      return res.status(400).json({ error: "postId and commentId are required" });
    }

    // 1️⃣ Check Post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // 2️⃣ Remove comment reference from Post
    post.comments = post.comments.filter(id => id.toString() !== commentId);
    await post.save();

    // 3️⃣ Delete the comment document itself
    await Comment.findByIdAndDelete(commentId);

    // 4️⃣ Return updated Post (with populated likes/comments for UI)
    const updatedPost = await Post.findById(postId)
      .populate("likes")
      .populate("comments");

    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
