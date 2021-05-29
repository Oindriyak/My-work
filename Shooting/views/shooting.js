console.log("Yay!!!!!!!!!!!");
var square=document.querySelectorAll(".square");
var play =document.getElementById("play");
var body=document.querySelector("body");
//play.addEventListener("click",newgame);
var start,score=0;
var beam=[];
var space=false;
var brickpos=[];
var sinter;
var binter,ginter;
function newgame(){
	for(let i=0;i<200*120;i++)
	{
		square[i].classList.remove("vis");
		square[i].classList.remove("shooter");
		square[i].classList.remove("beam");
	}
	let l=brickpos.length;
	brickpos.splice(0,l);
	l= beam.length;
	beam.splice(0,l);
	space=false;
	start=95;
	score=0;
	clearInterval(sinter);
	clearInterval(binter);
	clearInterval(ginter);
	create();
	shoot();
	game();
	brick();
	document.querySelector(".status").textContent="GOOD LUCK";
}

function create(){
	let p=118*200+start;
	for(let i=0;i<=10;i++)
		{
			if(i==5)
				{
					square[p].classList.add("vis");
					square[p].classList.add("shooter");
				}
			square[p+200].classList.add("vis");
			square[p+200].classList.add("shooter");
			p++;
		}
	
}


body.addEventListener("keydown",function(key){
	var m;
	if(key.which==37)
	{	
		m=-1;
		move(m);
	
	}	
	 else if(key.which==39)
	{
		m=1;
		move(m);
	}
	
	if(key.which==32 && space==false)
	{	var a=start + 5 +118*200;
		beam.push(a);
		space=true;
	}
	
});

body.addEventListener("keyup",function(key){
	space=false;
});




function move(m){
	
	if((m!=1 && start!=0)||(m!=-1 && start!=189))	
		var p=119*200+start;
		if(m==1)
		{
			square[p].classList.remove("vis");
			square[p].classList.remove("shooter");
		}
		else
		{
			square[p+10].classList.remove("vis");
			square[p+10].classList.remove("shooter");
		}


		square[p+5-200].classList.remove("vis");
		square[p+5-200].classList.remove("shooter");
		start=start+m;
		create();
		
}

function shoot()
{
	let c=0;
		sinter=setInterval(function(){
		if(space==true && c<5)
			c++;
		else
		{
			c=0;
			space=false;
		}
		let l=beam.length;
		let i;
		for(i=0;i<l;i++)
		{
			
			square[beam[i]].classList.remove("beam");
		}
		for( i=0;i<l;i++)
		{
			
			
			if(beam[i]>200)
			{	
				beam[i]=beam[i]-200;
			 	var b=beam[i];
			 	square[b].classList.add("beam");
			}
			else 
			{
				beam.splice(i,1);
			}
		}
		
	},100);
}

function brick(){
	let c=0;
	binter=setInterval(function(){
		if(c%15==0)
			createbrick();
		l=brickpos.length;
		for( i=0;i<l;i++)
		{
			if(brickpos[i]>=0 && brickpos[i]<120*200)
				square[brickpos[i]].classList.remove("vis");
			
		}
		
		for( i=0;i<l;i++)
		{
			brickpos[i]=brickpos[i]+200;
			
			if(brickpos[i]>=0&& brickpos[i]<120*200){
				
				var b=brickpos[i];
				square[b].classList.add("vis");
			}
			
		}
		c++;
	},300);
	
	
	
}

function createbrick()
{
	let height=Math.floor(Math.random() * Math.floor(10))+1;
	let width=Math.floor(Math.random() * Math.floor(10))+1;
	var st=Math.floor(Math.random() * Math.floor(200-width-11));
	st=st+6;
	for(let i=0;i<height;i++)
	{
		for(let j=st; j<=st+width;j++)
		{
			let a=j-200*i;
			brickpos.push(a);
		}
	}
}

function game(){
	
	ginter=setInterval(function(){
		let l=brickpos.length;
		for(let i=0;i<=l;i++)
		{
			
			let a=beam.length;
			for(let j=0;j<a;j++)
			{	
				let b=false;
				if((brickpos[i]%200==beam[j]%200) 
				   && (brickpos[i]>beam[j]))
					b=true;
				else if(brickpos[i]==beam[j])
					b=true;
				if(b){
					score++;
				square[brickpos[i]].classList.remove("vis");
					square[beam[j]].classList.remove("beam");
					beam.splice(j,1);
					brickpos.splice(i,1);
					view="Score: "+score;
			document.querySelector(".status").textContent=view;
				}	
			}
		}
		end();
	},1);
}

function end(){
	let e=false;
	let l=brickpos.length;
	for(let i=0;i<=l;i++){
		if(brickpos[i]>=117*200)
			e=true;
		//else if(brickpos[i]>=118*200+start &&
		//		118*200+start+10<=brickpos[i])
		//	e=true;
		if(e){
			view="GAME ENDED Score: "+score;
			document.querySelector(".status").textContent=view;
			clearInterval(sinter);
			clearInterval(binter);
			clearInterval(ginter);
		}
	}		
}

newgame();
