const mongoose=require('mongoose');


const commentSchema=new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
},{timestamps:true})

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;