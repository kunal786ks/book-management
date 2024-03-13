const Comment=require("../models/commentModel");

const addCommnet=async(req,res)=>{
    try {
        const {body,book}=req.body;
        const commnet=await Comment.create({
            body,
            book,
            owner:req.user?._id
        }) 
        return res.status(201).json({
            commnet
        })       
    } catch (error) {
        throw new Error(error)
    }
}

const getAllCommentsOfBook=async(req,res)=>{
     try {
        const id=req.params.bookId;
        const allComments=await Comment.find({book:id}).populate("owner","name email pic");
        return res.status(200).json({
            allComments
        })
     } catch (error) {
        throw new Error(error)
     }
}

const deleteComment=async(req,res)=>{
    try {
        console.log("hjerr")
        const id=req.params.commentId;
        const commentDeleted=await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Comment deleted successfully",
            commentDeleted
        })
    } catch (error) {
        throw new Error(error)
    }
}
module.exports={addCommnet,getAllCommentsOfBook,deleteComment}