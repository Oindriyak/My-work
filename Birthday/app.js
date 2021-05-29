const express=require("express");
const app=express();
var a=0,b=0;
app.use(express.static("views"));
app.get("/",function(req,res){
	res.render("Dinogame.ejs");
	a++;
	console.log("a=",a);
});

app.get("/Birthday",function(req,res){
	res.render("Birthday.ejs");
	b++;
	console.log("b=",b);
});

app.listen(3000,function(){
	console.log("Server has started");
});
