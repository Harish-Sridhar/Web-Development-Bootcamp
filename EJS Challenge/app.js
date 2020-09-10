//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodashString = require("lodash/string");
const mongoose = require("mongoose");
const { error } = require("console");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/journalDB", { useNewUrlParser: true, useUnifiedTopology: true })

const journalEntrySchema = {
  title: String,
  post: String
}
const JournalEntry = mongoose.model("journalEntry", journalEntrySchema)


app.get("/", function(req,res){
  let posts =[]
  JournalEntry.find((err, posts) => {
    if (err) {
      console.log(err)
    } else {
      res.render(__dirname + "/views/home.ejs", {content: homeStartingContent , posts:posts})
    }
  })
})

app.get("/contact", function(req,res){
  res.render(__dirname + "/views/contact.ejs", {content: contactContent})
})

app.get("/about", function(req,res){
  res.render(__dirname + "/views/about.ejs", {content: aboutContent})
})

app.get("/compose", function(req,res){
  res.render(__dirname + "/views/compose.ejs")
})

app.get("/post/:postId", function(req,res){
  // let postTitle = lodashString.lowerCase(req.params.postTitle)
  let postId = req.params.postId
  JournalEntry.findById(postId, (err, result)=> {
    if (err){
      console.log(err)
    } else {
      console.log(result)
      if (result === null) {
        res.render(__dirname + "/views/post.ejs", {postTitle: "The post with id " + postId + " is not found", postText:""})
      } else {
        res.render(__dirname + "/views/post.ejs", {postTitle: result.title, postText:result.post})
      }
    }
  })
})

app.post("/", function(req, res){
  const journalEntry = new JournalEntry({
    "title": req.body.postTitle, "post": req.body.postText
  })
  journalEntry.save()
  .then(res.redirect("/")) 
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
