// jshint esversion:6

const express = require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const dburl="mongodb://jaydeepsingh:<password>@ac-ugvrxwe-shard-00-00.wkgajyd.mongodb.net:27017,ac-ugvrxwe-shard-00-01.wkgajyd.mongodb.net:27017,ac-ugvrxwe-shard-00-02.wkgajyd.mongodb.net:27017/?ssl=true&replicaSet=atlas-4dug4h-shard-0&authSource=admin&retryWrites=true&w=majority";
// const dburl="mongodb://127.0.0.1:27017/Blog";
mongoose.connect(dburl)
.then(
  ()=>{
    console.log("mongodb connection is successfull.......");
  }
  )
  .catch((err)=>{
    console.log(err);
  })
  
  var posts=[];
const PostSchema={
  Title:String,
  Text:String
}

const Posts=mongoose.model("post",PostSchema);

app.get("/",function(req,res){

  async function getpostdata(){
     const post=await Posts.find();

     if(!post){
      res.render('home',{
        data:homeStartingContent,
        ComposePost:[]
    
      });
     }
     else{
      res.render('home',{

        data:homeStartingContent,
        ComposePost:post
    
      });
     }

  }
  
  getpostdata();
 

});

app.get("/about",function(req,res){

  res.render('about',{aboutdata:aboutContent});

});

app.get("/contact",function(req,res){

  res.render('contact',{contactdata:contactContent});

});

app.get("/compose",function(req,res){

  res.render('compose');

});

app.post("/compose",function(req,res){

  const newpost=new Posts({

    Title :_.capitalize(req.body.composeTitle),
    Text :req.body.composeText

  });

  newpost.save();

  res.redirect("/");
  
})




app.get("/post/:post_id",function(req,res){
  
  const postId=req.params.post_id;

  async function find(post_id){

    const foundPost=await Posts.findOne({_id:post_id});
  
    if(foundPost){
  
      console.log("match found");
      res.render('post',{postdata:foundPost})

    }
    else{
  
      res.redirect("/");
    }
    
  }

   find(postId);

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
