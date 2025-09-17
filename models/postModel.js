const mongoose = require("mongoose");


//route handler
const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    likes:[{
        //isi me likes ki id store hogi
   type:mongoose.Schema.Types.ObjectId,
    ref:"Like",

    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]

});
module.exports =mongoose.model("Post",postSchema);
