console.log("Yay!!!!!!!!!!!");
var speed=100;
var stat=true;
var score=0;
var food;
var newgame =true;
var index=[];
var dir=2;
var inter;
var body=document.querySelector("body");


var play =document.getElementById("play");
var square=document.getElementsByClassName("square");

play.addEventListener("click",function(){
	newg();
});

function newg(){
	score=0;
	newgame=true;
	dir=6;
	index.splice(0,index.length);
	for(i=0;i<90*48;i++)
	square[i].classList.remove("vis");
	clearInterval(inter);
	speed=100;
	gam();
	
}

function gam(){
	inter=setInterval(game,speed);
}

function game()
{
	if(newgame==true)
	{
		index.push(1);
		square[1].classList.add("vis");
		newgame=false;
		food=Math.floor(Math.random() * Math.floor(48*90));
		square[food].classList.add("vis");
		square[food].classList.add("food");
		document.querySelector(".status").textContent="GOOD 			LUCK";
	}
	else
		{
			var con= true;
			var a=index.pop();
			var b=a;
			end(a);			
			index.push(a);
			if(dir==2)
				a=a+90;
			if(dir==6)
				a++;
			if(dir==8)
				a=a-90;		
			if(dir==4)
				a--;
			if(food==a)
			{
				con=false;
				eat();				
			}
			square[a].classList.add("vis");
			index.push(a);
			var b=index[0];
			if(con)
			{
				square[b].classList.remove("vis");
				index.splice(0,1);
			}
			crash();
		}
	
}
var p
function eat(){
	square[food].classList.remove("food");
	food=Math.floor(Math.random() * Math.floor(49*90));
	square[food].classList.add("vis");
	square[food].classList.add("food");
	score++;
	p="Score: "+ score;
	if(score%5==0 && speed>30)
	{
		speed=speed-5;
		clearInterval(inter);
		inter =setInterval(game,speed)
	}
	
	document.querySelector(".status").textContent=p;
}






body.addEventListener("keydown",function(key){
	
	if(key.which==37 && dir!=6 )
	{
	   dir=4;
	}
	else if(key.which==38 && dir!=2)
	{
		dir=8;
	}
	else if(key.which==39 && dir!=4)
	{
		dir=6;	
	}
	else if(key.which==40 && dir!=8)
	{
		dir=2;	
	}
});


function end(a)
{
	var b=false;
	if((a+1)%90==0 && dir==6)
	b=true;
		
	if((a+1)%90==1 && dir ==4)
	b=true;
	
	if((a+1)<90 && dir==8)
	b=true;
	
	if((a+1)>90*47 && dir==2)
	b=true;
	
	if(b)
	{
		clearInterval(inter);
		var p="GAME ENDED score:"+score;
		document.querySelector(".status").textContent=p;
	}	
	
}

function crash(){
	var l= index.length;
	var a=index[l-1];
	var b=0,i;
	for(i=0;i<l-1;i++)
		if(index[i]==a)
			b=1;
	if(b==1)
	{
		clearInterval(inter);
		var p="YOU CRASHED score:"+score;
		document.querySelector(".status").textContent=p;
	}	
}




gam();