//jshint esversion:6
require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");//
const bodyParser=require("body-parser");
const ejs=require("ejs");
const encrypt =require("mongoose-encryption");
const app= express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true,useUnifiedTopology: true,family: 4});

const userSchema= new mongoose.Schema({
  email:String,
  password:String
});

const secret=process.env.SECRET;
userSchema.plugin(encrypt,{secret:secret , encryptFields:["password"]});

const User = new mongoose.model("User", userSchema);

app.get("/",function(re,res){
  res.render("home");
});


app.get("/register",function(re,res){
  res.render("register");
});

app.get("/login",function(re,res){
  res.render("login");
});



app.post("/register",function(req,res){
const newUser=new User({
   email:req.body.username,
  password:req.body.password
});
newUser.save(function(err){
  if(!err){
    res.render("secrets");
  }
  else{
    res.send("err");
  }
});
});

app.post("/login",function(req,res){
  const username=req.body.username;
  const password=req.bodypassword;
User.find({email:username},function(err,foundUser){
  if(!err){
    if(foundUser){
      if(foundUser.password===password){
        res.render("secrets");
      }
      else{
        console.log("Kahi tari gadbad");
      }
    }
  }
  else{
  console.log("err");
  }
});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
