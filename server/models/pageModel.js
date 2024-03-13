const mongoose=require('mongoose');

const pageSchema=new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    pageNumber:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const Page=mongoose.model('Page',pageSchema);

module.exports=Page;