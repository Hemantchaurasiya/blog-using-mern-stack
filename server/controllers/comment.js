const Comment = require("../models/Comment");

const newComment = async (req, res) => {
    try {
        const comment = await new Comment(req.body);
        comment.save();
        res.status(200).json('Comment saved successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.delete()
        res.status(200).json('comment deleted successfully');
    } catch (error) {
        res.status(500).json(error)
    }
}

const deletePostAllComment = async(req,res)=>{
    try {
        await Comment.deleteMany({postId:req.params.id});
        res.status(200).json('all comment deleted successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {newComment,getComments,deleteComment,deletePostAllComment};