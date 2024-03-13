const express=require('express');
const { protect } = require('../middleware/authMiddleware');
const { addCommnet,getAllCommentsOfBook, deleteComment } = require('../controller/commentController');

const router=express.Router();

router.post("/add-comment",protect,addCommnet);
router.get('/get-comments/:bookId',protect,getAllCommentsOfBook)
router.delete('/delete-comment/:commentId',protect,deleteComment)
module.exports=router;