console.log("Yaay!!!");


const canvas = document.querySelector('canvas');
const ctx=canvas.getContext("2d");
let number=[], pre=[];

var time=1;
var startx=500;
var starty=150;
var max=6,startime=0,inter,newg=true,easy= 0;



function newgame(){
	document.querySelector(".status").textContent="GOOD LUCK";
	let l=pre.length;
	pre.splice(0,l);
	l=number.length;
	number.splice(0,l);

	for(let i=0;i<81;i++)
		number.push(0);
	console.log(number);
	clearInterval(inter);
	time=1;
	ctx.clearRect(0,0,1200,550);
	grid();
	bomb();
	createnumber();
	
}

play();
function grid()
{
	ctx.strokeStyle='rgb(240,240,240)';
	for (let i = 0; i <max+1; i++) {
    ctx.lineWidth =2;
    ctx.beginPath();
    ctx.moveTo(startx+i*30,starty);
    ctx.lineTo(startx+i*30,starty+max*30);
    ctx.moveTo(startx,starty+i*30);
    ctx.lineTo(startx+max*30,starty+i*30);
    ctx.stroke();
  }
}


function bomb()
{
	if(max==6)
		var a=2;
	else 
		var a = 4;
	var x=[],y=[];
	for(let i=0;i<a;i++)
	{
		x.push(Math.floor(Math.random()*(max-2))+1);
		y.push(Math.floor(Math.random()*(max-2))+1);
	}
	var c=0;
	for(let i=0;i<max;i++)
	{
		if((i-1)%3==0)
		{
			for(let j=0;j<max;j++)
			{
				if((j-1)%3==0 && (i-1)%3==0 )
				{
					var a=i*max+j;
					number[a]=-1;
					//console.log(number);
					ctx.fillStyle='rgb(30,30,256)';
					ctx.beginPath();
    				ctx.arc(startx+15+i*30, starty+15+j*30, 12, 0, Math.PI * 2, true);
    				ctx.fill();
    				pre.push(a);
				}				
			}
			
		}	
	}
	for(let j=0;j<x.length;j++)
	{
		
		var a=y[j]*max+x[j];
		
		number[a]=-1;
		ctx.fillStyle='rgb(30,30,256)';
		ctx.beginPath();
		ctx.arc(startx+15+x[j]*30, starty+15+y[j]*30, 12, 0, Math.PI * 2, true);
		ctx.fill();
		pre.push(a);	
	}
		
}

function createnumber()
{
	let a;
	if(max==6)
		 a=5;
	else 
		 a=20;

	let x=[],y=[],c=0;
	for(let i=0;i<a;i++)
	{
		x.push(Math.floor(Math.random()*(max-2))+1);
		y.push(Math.floor(Math.random()*(max-2))+1);
	}
	for(let i=0;i<x.length;i++)
	{
		if((number[y[i]*max+x[i]])==0)
		{

			var n=Math.floor(Math.random()*9)+1;
			number[y[i]*max+x[i]]=n;
			ctx.font = '25px serif';
			ctx.fillStyle='red';
  			ctx.fillText(n,startx+x[i]*30+10,starty+y[i]*30+25);
  			pre.push([y[i]*max+x[i]]);
		}	
	}	
		
}
function play()
{
	const body=document.querySelector('body');
	canvas.addEventListener('click',function(event){
		var pos=getMousePos(canvas,event);
		var box=-1,c=0;
		if(pos.x>=startx && pos.x<=startx+30*max && pos.y>=starty && pos.y<=starty+30*max)
		{
			box=0;
			if(newg)
			{
				newg=false;
				score();
			}
			var  x=Math.floor((pos.x - startx)/30);
			var y= Math.floor((pos.y-starty)/30);
			box=y*max +x;	
			
		}
		if (box>=0)
		{
			update(box);
		}
	});
}



function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,    
      scaleY = canvas.height / rect.height;  

  return {
    x: (evt.clientX - rect.left) * scaleX,  
    y: (evt.clientY - rect.top) * scaleY   
  }
}


function update(box)
{
	let cond=true;
	for(let i=0;i<pre.length;i++)
	{
		if(box==pre[i])
			cond=false;
	}
	if(cond)
	{
		var text;
		if(number[box]==9)
		{	
			number[box]=0;
			text="";
		}
		else 
		{
			number[box]+=1;
			text=number[box];
		}

			let y= Math.floor(box/max);
			let x=box%max;
			ctx.clearRect(startx+x*30+2,starty+y*30+2,27,27);
			ctx.font = '25px serif';
			ctx.fillStyle='green';
  			ctx.fillText(text,startx+x*30+10,starty+y*30+25);
	}
}

const submit= document.querySelector('#submit');
submit.addEventListener('click',function(){
	check();
	console.log("Aa");
});


function check()
{
	clearInterval(inter);
	console.log("BBB");
	var sum=0,s;
	result=1;
	var l=pre.length;
	for(let i=0;i<l;i++)
	{
		s=0;
		if(number[pre[i]]==-1)
		{	
			var p=pre[i];
			var a=Math.floor(pre[i]/max),b=pre[i]%max;
			if(b!=0 && number[p-1]!=-1)
				s=s+number[p-1];
				
			if(b!=0 && a!=0 && number[p-max-1]!=-1)
				s=s+number[p-max-1];
					
			if(a!=0 && number[p-max]!=-1)
				s=s+number[p-max];
				
			if(b!=max-1 && a!=0 && number[p-max+1]!=-1)
				s=s+number[p-max+1];
				
			if(b!=max-1 && number[p+1]!=-1)
				s=s+number[p+1];
				
			if(b!=max-1 && a!=max-1 && number[p+max+1]!=-1)
				s=s+number[p+max+1];

			if(a!=max-1 && number[p+max]!=-1)
				s=s+number[p+max];

			if(b!=0 && a!=max-1 && number[p+max-1]!=-1)
				s=s+number[p+max-1];

			if(sum==0)
				sum=s;
			else if(sum != s)
			{
				result=0;
				break;
			}			

		}

	}
	end(result);

}


function end(result){
	if(result==1)
		{
			var text = "YOU WIN !!!! ";
			if(max==6)
				text=text + " (DIFFICULTY: EASY)";
			else
				text=text + " (DIFFICULTY: HARD)";
		}
	else
		var text ="YOU LOSE  TRY AGAIN"; 
	ctx.clearRect(0,0,1200,550);
	ctx.font ='50px serif';
	ctx.strokeStyle='white';
  	ctx.strokeText(text,300,100);
}

function score()
{
	
	inter =setInterval(function(){
		text = "Time: "+time;
		time++;
		document.querySelector('.status').textContent=text;
	},1000);
}

document.querySelector('#play').addEventListener('click',function(){
	newg=true;
	newgame();
});

document.querySelector('#easy').addEventListener('click',function(){
	max=6;
	newg=true;
	newgame();
});

document.querySelector('#hard').addEventListener('click',function(){
	max=9;
	newg=true;
	newgame();
});


document.querySelector('#help').addEventListener('click',function(){
	ctx.clearRect(0,0,1200,550);
	ctx.font = '30px serif';
	var text =".Click on the square to get numbers in such a manner" 
	var text1="that the sum of all the squares around each circle is same";
	ctx.fillStyle='rgb(220,220,256)';
  	ctx.fillText(text, 300, 100);
  	ctx.fillText(text1, 300, 150);
});

newgame();