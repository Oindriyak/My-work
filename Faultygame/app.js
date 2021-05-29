const express=require("express");
const app=express();
var c=0;
app.use(express.static("views"));
app.get("/",function(req,res){
	console.log(c);
	c++;
	res.render("Faultygame.ejs");
	
});

app.listen(3000,function(){
	console.log("Server has started");
});
