const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const popup = require('node-popup');
const app=express();
//
// const babel = require('gulp-babel');
// const del = require('del');
// const gulp = require('gulp');
// const plumber = require('gulp-plumber');
// const uglify = require('gulp-uglify');


const User=require(__dirname+"/models/user");
const History=require(__dirname+"/models/transaction");


//
// gulp.task('javascript', () => {
//     del('dist').then(() => gulp.src('src/bubbly-bg.js')
//         .pipe(plumber())
//         .pipe(babel({presets: ['es2015']}))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'))
//         .pipe(gulp.dest('docs'))
//     );
// });
// gulp.task('watch', () => {
//     gulp.watch('src/bubbly-bg.js', ['javascript']);
// });
//
// gulp.task('default', ['javascript']);

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/naman_tsf_db");
//mongoose.connect('mongodb+srv://SonalSingh65:Jain@955@sonalsingh65.paoseky.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//mongodb+srv://sonalsingh65.svbs2ps.mongodb.net/myFirstDatabase
app.get("/createuser",function(req,res){
  res.render("newuser.ejs",{success:""});
});
app.get("/transfermoney",function(req,res){
    res.render("transfermoney",{message:""});
});
app.get("/viewcustomer",function(req,res){
  User.find({},function(err,users){
    if(err){
      console.log(err);
    }else{
      res.render("customerlist",{user:users,c:0});
    }
  });
});
app.get("/transactionhistory",function(req,res){
    res.render("history",{t:[],m:"",flag:1});
});
app.get("/",function(req,res){
  res.render("home");
});
app.get("/contactUs",function(req,res){
  res.render("contactUs");
});
app.post("/viewcustomer",function(req,res){
  User.find({},function(err,users){
    if(err){
      console.log(err);
    }else{
      res.render("customerlist",{user:users,c:0});
    }
  });
});
app.post("/createuser",function(req,res){
  res.render("newuser",{success:""});
});
app.post("/updateform",function(req,res){
    const temp=[
      {
        name:req.body.newuser[0],
        mnumber:req.body.newuser[2],
        email:req.body.newuser[1],
        credits:req.body.newuser[3]
      }
    ]
    User.insertMany(temp,function(err,res){
      if(err){
        console.log(err);
      }else{
        console.log(res);
      }
    });
    res.render("newuser",{success:"user registered successfully!"});
});
app.post("/transfermoney",function(req,res){
  res.render("transfermoney",{message:""});
});
app.post("/sendmoney",function(req,res){
  const sendername=req.body.sendername;
  const senderemail=req.body.senderemail;
  const receivername=req.body.receivername;
  const receiveremail=req.body.receiveremail;
  const amount=parseInt(req.body.money);
  User.find({name:sendername,email:senderemail},function(err,resp){
    if(err){
      console.log(err);
    }else if(resp[0]==undefined){
      console.log(resp);
      res.render("transfermoney",{message:"user does not exist!.Please enter valid details."});
    }
    else{
      var check=parseInt(resp[0].credits);
      User.find({name:receivername,email:receiveremail},function(err,r){
        if(err){
          console.log(err);
        }else if(r[0]==undefined) {
          console.log(2);
            res.render("transfermoney",{message:"user does not exist!.Please enter valid details."});
        }else if(check<amount){
          res.render("transfermoney",{message:"Sorry! Insufficient Balance"})
        }else{
          console.log(r);
          console.log(resp);
          var updatedamt1=parseInt(resp[0].credits)-amount;
          User.findByIdAndUpdate({_id:resp[0]._id},{credits:updatedamt1},function(err,result){
            if(err){
              console.log(3);
              res.render("transfermoney",{message:"user does not exist!.Please enter valid details."});
            }else{
              console.log("updated");
            }
          });
          var updatedamt2=parseInt(r[0].credits)+amount;
          User.findByIdAndUpdate({_id:r[0]._id},{credits:updatedamt2},function(err,result){
            if(err){
              console.log(2);
              res.render("transfermoney",{message:"user does not exist!.Please enter valid details"});
            }else{
              console.log("updated");
            }
          });
          res.render("transfermoney",{message:"Congratulations! Transaction Successful"});
          let date=new Date();
          const currdate=date.toLocaleDateString('en-GB');
          const currtime=date.toLocaleTimeString('en-US');
          const th1=new  History({
            fromname:sendername,
            fromemail:senderemail,
            toname:receivername,
            toemail:receiveremail,
            details:[{from:sendername,to:receivername,amount:amount,
            date:currdate,
            time:currtime}]
          });
          th1.save();
        }
      });
    }
  });
});
app.post("/history",function(req,res){
  res.render("history",{t:[],m:"",flag:1});
});
app.post("/showhistory",function(req,res){
  const name=req.body.transferedname;
  const email=req.body.transferedemail;
  var transaction=[];
  History.find({fromname:name,fromemail:email},function(err,response){
    if(err){
      console.log(err);
    }else if(response.length==0){
      History.find({toname:name,toemail:email},function(err,resp){
        if(err){
          console.log(err);
        }else if(resp.length==0){
          console.log(1);
          res.render("history",{t:transaction,m:"Sorry! No transaction found",flag:1});
        }else{
          transaction.push(resp);
          res.render("history",{t:transaction,m:"",flag:0});
        }
      });
    }else{
      transaction.push(response);
      History.find({toname:name,toemail:email},function(err,respo){
        if(err){
          console.log(err);
        }else if(respo.length==0){
          if(transaction.length>0){
            res.render("history",{t:transaction,m:"",flag:0});
          }
          else{
            res.render("history",{t:transaction,m:"Sorry! No transaction found",flag:1});
          }
        }else{
          transaction.push(respo);
          res.render("history",{t:transaction,m:"",flag:0});
        }
      });
    }
   });
});
app.post("/showcustomer",function(req,res){
  customer_id=req.body.view;
  User.findById(customer_id,function(err,resp){
    if(err){
      console.log(err);
    }else{
        res.render("customerdetails",{name:resp.name,mn:resp.mnumber,email:resp.email,b:resp.credits});
    }
  });
});
const port = process.env.PORT || 3000;
app.listen(port,function(req,res){
  console.log("server running on port  : ",port);
});
