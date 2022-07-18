const mongoose=require("mongoose");

const transactionSchema= new mongoose.Schema({
  fromname:{
    type:String,
    required:true
  },
  fromemail:{
    type:String,
    required:true
  },
  toname:{
    type:String,
    required:true
  },
  toemail:{
    type:String,
    required:true
  },
  details:[
    {
      from:{
        type:String,
        required:true
      },
      to:{
        type:String,
        required:true
      },
      amount:{
        type:Number,
        required:true
      },
      date:{
        type:String,
        required:true
      },
      time:{
        type:String,
        required:true
      }
    }
  ]


});
const History=mongoose.model("transactiondata",transactionSchema);

module.exports=History;
