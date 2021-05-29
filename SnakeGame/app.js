const express=require("express");
const app=express();
app.use(express.static("views"));
app.get("/",function(req,res){
	res.render("snake.ejs");
});

app.listen(3000,function(){
	console.log("Server has started");
});
