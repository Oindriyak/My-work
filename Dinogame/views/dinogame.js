var ctx=document.getElementsByTagName('canvas')[0].getContext('2d');
var img1=new Image(),
	img2=new Image(),
	img3=new Image(),
	tnt=new Image(),
	background=new Image();
	bsx=0,bsy=0,bwidth=850,bheight=80,
	bdx=851,bdy=500,bdwidth=850,bdheight=80,c=0,
	angle=45,
	x=150,y=315,
	tntpos=[],tntcount=0,tnty=[];

var dir,inter,sqspeed=1,score=0,boom=new Image,newg=false;

var con=true,highscore=0;

tnt.src="tnt.jpg",
background.src="background.jpg";
boom.src="boom.jpg"
setTimeout(console.log("Yaaay!!"),1000);
inter =setInterval(game,5);
function game(){
	view();
	ctx.clearRect(0,0,1200,550);
	ctx.drawImage(background,bsx,bsy,bwidth,bheight,0,300,bdwidth,bdheight);
	ctx.drawImage(background,0,0,1200-bwidth,bheight,bdx,300,1200-bdwidth,bdheight);
	bdwidth--;
	bwidth--;
	bsx++;
	bdx--;
	if(bsx>=350)
	{
		ctx.drawImage(background,0,0,c,bheight,bdx+850,300,c,bdheight);
		c++;
	}
	if(bsx==850)
	{
		c=0;
		bdx=851;
		bdwidth=850;
		bwidth=850;
		bsx=0;
	}
	
	angle=angle+0.5;
	if(angle==360)
		angle=0;
	bomb();
	drawdino();
	hit();
}



function drawdino()
{
	jump();
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(Math.PI/180*angle)
	ctx.beginPath();
	ctx.lineTo(0,10);
	ctx.lineTo(-10,10);
	ctx.lineTo(-10,-10);
	ctx.lineTo(10,-10);
	ctx.lineTo(10,10);
	ctx.fill();
	ctx.restore();
	

}

var body=document.getElementsByTagName("body")[0];
body.addEventListener("keypress",function(event){
	if(newg)
	{
		newg=false;
		newgame();
	}
	else if(event.code=="Space" && y==315)
		dir=1;
});

body.addEventListener("keypress",function(event){
	if(newg)
	{
		newg=false;
		newgame();
	}
	else if(event.code=="Space" && y==315)
		dir=1;
});

body.addEventListener("touchstart",function(event){
	if(newg)
	{
		newg=false;
		newgame();
	}
	else if(y==315)
		dir=1;
});


function jump(){
	if(y>180 && dir==1)
		y=y-2;
	else if(y<315 && dir==2)
		y=y+2;
	else if(y<=180)
		dir=2;
}


function bomb()
{
	if((tntcount>=150 && score>=50)||(tntcount>=180 && 		score<50))
	{
		let a,b=0;
		a=Math.floor(Math.random()*200);
		if(a>=160)
		{
			a=1;
			b=1;
		}
		else if(a>=120){
			a=1;
			b=2;
		}
		else if(a>=80){
			a=2;
			b=1;
		}
		else if(a>=40 && score>=50){
			a=2;
			b=2;
		}
		for(let i=0;i<b;i++)
		{
			for(let j=0;j<a;j++)
			{
				tnty.push(300-j*25);
				tntpos.push(1200 +25*i);
			}
		}
		tntcount=0;

	}
	for(let i=0;i<tntpos.length;i++)
	{
		
		ctx.drawImage(tnt,tntpos[i],tnty[i],25,25);
		tntpos[i]-=sqspeed;
		ctx.clearRect(tntpos[i]+25,tnty[i],25,25);			
	}
	if(tntpos[0]==-30)
		{	
			tntpos.splice(0,1);
			tnty.splice(0,1);
		}
	tntcount++;
}
function view()
{
	score=score+0.01;
	text="Score:"+Math.floor(score);
	if(Math.floor(score)>highscore)
		highscore=Math.floor(score);

	document.querySelector(".score").textContent=text;
	text="High Score:"+Math.floor(highscore);
	document.querySelector(".hiscore").textContent=text;
	if(score%10==0 && sqspeed<=1.5)
		sqspeed=sqspeed+0.2;
	else if(score%10==0 && score<3)
		sqspeed+=0.1;
}

function hit()
{
	var a=Math.sqrt(2)*10;
	for(let i=0;i<tntpos.length;i++)
	{
		if(tntpos[i]<=x+a && tntpos[i]+25>=x-a && tnty[i]<=y-a)
		{
			clearInterval(inter);
			endanimation();
		}
		else if(tnty[i]<=y+a && tntpos[i]+25>=x-a && tntpos[i]<=x+a)
		{
			clearInterval(inter);
			endanimation();
		}
	}	
}

function endanimation()
{
	ctx.drawImage(boom,x-12,315-120,120,150);
	ctx.font='30px serif';
	var s="Game Over.  Your score: "+Math.floor(score);
	ctx.strokeText(s,400,150);
	ctx.strokeText("Press space to play again",400,190);
	setTimeout(function(){
		newg=true;
	},1000)
	


}

function newgame(){
	y=315;
	angle=0;
	sqspeed=1;
	score=0;
	ctx.clearRect(0,0,1200,550)
	inter=setInterval(game,5);
	tntpos.splice(0,tntpos.length);
	tnty.splice(0,tnty.length);
}