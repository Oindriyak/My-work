import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

const canvas = document.querySelector('canvas');
	const audio=document.querySelector('audio');
	const body= document.querySelector('body');
	


function main() {
  
	
	
  const renderer = new THREE.WebGLRenderer({canvas});
	var cx=0,cz=100,cy=250,count=0,px=0,py=250,pz=40;
  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1500;
  const camera = new THREE.PerspectiveCamera((55,window.innerWidth/window.innerHeight,50,3000));
  camera.position.set(0, 250, 40);
	
  const controls = new OrbitControls(camera, canvas);
	controls.target.set(0,250,100);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
	  const loader = new THREE.TextureLoader();
   
    const cubeSize = 1000;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, 		600, cubeSize);
    const material = [
  new THREE.MeshBasicMaterial({wrapT:THREE.RepeatWrapping,wrapS:THREE.RepeatWrapping,side:THREE.BackSide ,map: loader.load('left.jpg')}),
  new THREE.MeshBasicMaterial({wrapT:THREE.RepeatWrapping,wrapS:THREE.RepeatWrapping,side:THREE.BackSide ,map: loader.load('right.jpg')}),
  
	new THREE.MeshBasicMaterial({side:THREE.BackSide ,map: loader.load('top.jpg')}),
		new THREE.MeshBasicMaterial({side:THREE.BackSide ,map: loader.load('https://images.unsplash.com/photo-1558346648-9757f2fa4474?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')}),
  new THREE.MeshBasicMaterial({wrapT:THREE.RepeatWrapping,wrapS:THREE.RepeatWrapping,side:THREE.BackSide ,map: loader.load('front.jpg')}),
  new THREE.MeshBasicMaterial({wrapT:THREE.RepeatWrapping,wrapS:THREE.RepeatWrapping,side:THREE.BackSide ,map: loader.load('back.jpg')}),
];
	
	  
	  const mesh = new THREE.Mesh(cubeGeo, material);
    scene.add(mesh);
}
	
	
	
	//BIRTHDAY  PLANE//
	{
		const loader = new THREE.TextureLoader();
		const geometry = new THREE.PlaneBufferGeometry(300, 100);
		const material =new THREE.MeshBasicMaterial({wrapT:THREE.RepeatWrapping,wrapS:THREE.RepeatWrapping,side:THREE.FrontSide ,map: loader.load('Birthday.jpg')})
		
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.x=0;
		mesh.position.y=250;
		mesh.position.z=100;
		scene.add(mesh);
		//material.side=THREE.BackSide;
		const mesh1 = new THREE.Mesh(geometry, material);
		mesh1.position.x=0;
		mesh1.position.y=250;
		mesh1.position.z=100;
		mesh1.rotation.y=Math.PI;
		scene.add(mesh1);
		/*const mesh2 = new THREE.Mesh(geometry, material);
		mesh2.position.x=0;
		mesh2.position.y=250;
		mesh2.position.z=-499;
		scene.add(mesh2);
		const mesh3 = new THREE.Mesh(geometry, material);
		mesh3.position.x=0;
		mesh3.position.y=250;
		mesh3.position.z=499;
		mesh3.rotation.y=Math.PI;
		scene.add(mesh3);
		*/
	}
	
	
	//BALOONS
	
	
	function balloon(x,y,z){
		const radius = 15;  
		const widthSegments = 100;  
		const heightSegments = 100;  
		const geometry = new THREE.SphereBufferGeometry(radius,widthSegments,heightSegments);
		const colour=['red','green','orange','cyan','red'];
		let i= Math.floor(Math.random()*5);
				var linemat = new THREE.LineBasicMaterial({
		color: 0x111111
	});
		if(i>0)
		{		var points = [];
				points.push( new THREE.Vector3( x, y-15, z+i*30 ) );
				points.push( new THREE.Vector3( x, y-55,z+i*30 ) );

				var linegeo = new THREE.BufferGeometry().setFromPoints( points );
				const material=new
				THREE.MeshPhongMaterial({color:colour[i]});
				var line = new THREE.Line( linegeo, linemat);
				scene.add( line );
				const mesh=new THREE.Mesh(geometry,material);
				mesh.position.x=x;
				mesh.position.y=y;
				mesh.position.z=z+i*30;
				mesh.rotation.x=Math.PI;
				scene.add(mesh);

		}
	}
	
	{
		for(let i=0;i<50;i++)
		{
			let x= Math.floor(Math.random()*960)-500;
			let y= Math.floor(Math.random()*200);
			let z= Math.floor(Math.random()*960)-500;
			balloon(x,y,z);
		}	
	}
	
	//Table 
	{
	const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      map: loader.load('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    )});
	const material1=new THREE.MeshBasicMaterial({map:loader.load('table.jpg')}) 	
	const leg = new THREE.BoxBufferGeometry(10,80,10);
	const legm=new THREE.Mesh(leg, material);
	legm.position.z=-185;
	legm.position.x=-115;	
	legm.position.y=-255;
	scene.add(legm);
	const mesh2=new THREE.Mesh(leg, material);	
	mesh2.position.y=-255;	
	mesh2.position.x=-115;
	mesh2.position.z=185;	
	scene.add(mesh2);
	const mesh3=new THREE.Mesh(leg, material);
	mesh3.position.y=-255;	
	mesh3.position.x=115;
	mesh3.position.z=185;	
	scene.add(mesh3);
	const mesh4=new THREE.Mesh(leg, material);
	mesh4.position.y=-255;	
	mesh4.position.z=-185;
	mesh4.position.x=115;	
	scene.add(mesh4);
	const top=new THREE.BoxBufferGeometry(250,5,400);
	const mesh=new THREE.Mesh(top, material1);
	mesh.position.y=-215;		
	scene.add(mesh);
	}
	
// CAKE
	{
		const radiusTop =  60;
		const radiusBottom =  60;
		const height = 60;  
		const radialSegments = 50;
		const heightSegments = 2; 
		const openEnded = true;  
		const thetaStart = Math.PI * 0.00;
		const thetaLength = Math.PI * 4.00;
		const geometry = new THREE.CylinderBufferGeometry(
			radiusTop, radiusBottom, height,
			radialSegments, heightSegments,
			openEnded,
			thetaStart, thetaLength);
		const loader =new THREE.TextureLoader;
		const texture= loader.load('stripe.jpg');
	
		const material=new THREE.MeshPhongMaterial({map:texture,shininess:5});
		const mesh= new THREE.Mesh(geometry,material);
		mesh.position.y=-185;
		mesh.position.z=-50;
		scene.add(mesh); 
		const segments = 50;  
		const geo = new THREE.CircleBufferGeometry(radiusTop, segments);
		const top=new
	THREE.MeshBasicMaterial({map:loader.load('caketop.jpg'),side:THREE.DoubleSide});
		const mesh2= new THREE.Mesh(geo,top);
		mesh2.position.y=-155;
		mesh2.position.z=-50;
		mesh2.rotation.x=Math.PI/2*3;
		mesh2.rotation.z=Math.PI;
		scene.add(mesh2);	
	}
	
	
// CARD	
	{
		const loader=new THREE.TextureLoader;
		const geometry=new THREE.PlaneBufferGeometry(50,50);
		const material=new
		THREE.MeshBasicMaterial({color:'white'});
		const cardtop= new THREE.MeshBasicMaterial({map:loader.load('cardtop.jpg')});
		const cardleft= new THREE.MeshBasicMaterial({map:loader.load('cardleft.jpg')});
		const cardright= new THREE.MeshBasicMaterial({map:loader.load('cardright.jpg')});
		
		const mesh1=new THREE.Mesh(geometry,cardleft);
		mesh1.position.y=-185;
		mesh1.rotation.y=Math.PI*3/2;
		mesh1.position.x=0;
		mesh1.position.z=-150;
		scene.add(mesh1);
		const mesh2=new THREE.Mesh(geometry,cardright);
		mesh2.position.y=-185;
		mesh2.rotation.y=Math.PI;
		var a=25;
		mesh2.position.x=-a;
		mesh2.position.z=0+25-150;
		scene.add(mesh2);
		
		const mesh3=new THREE.Mesh(geometry,cardtop);
		mesh3.position.y=-185;
		mesh3.rotation.y=Math.PI/2;
		mesh3.position.x=0;
		mesh3.position.z=-150;
		scene.add(mesh3);
		const mesh4=new THREE.Mesh(geometry,material);
		mesh4.position.y=-185;
		mesh4.rotation.y=2*Math.PI;
		mesh4.position.x=-a;
		mesh4.position.z=0+25-150;
		scene.add(mesh4);
		
	}
	

//	GIFTS
	{
		const loader= new THREE.TextureLoader();
		const cubegeo=new THREE.BoxBufferGeometry(40,40,40);
		const radius = 30.0;  
		const height = 50.0;  
		const radialSegments = 50;  		
		const conegeo= new THREE.ConeBufferGeometry(radius+10, height+10, radialSegments);
		const pyramidgeo= new THREE.ConeBufferGeometry(radius+10, height+10,3);
		const cylindergeo=new THREE.CylinderBufferGeometry(radius,radius,height,radialSegments);
		const material=[
		new THREE.MeshBasicMaterial({map:loader.load('gift1.jpg')}),
		new THREE.MeshBasicMaterial({map:loader.load('gift2.jpg')}),
		new THREE.MeshBasicMaterial({map:loader.load('gift3.jpg')}),
		new THREE.MeshBasicMaterial({map:loader.load('gift4.jpg')}),
		]
		const gift1=new THREE.Mesh(cubegeo,material[0]);
		const gift3=new THREE.Mesh(conegeo,material[1]);
		const gift2=new THREE.Mesh(pyramidgeo,material[2]);
		const gift4=new THREE.Mesh(cylindergeo,material[3]);
	  	gift1.position.x=20;
		gift1.position.y=-185;
		gift1.position.z=50;
			
		gift2.position.x=-80;
		gift2.position.y=-185;
		gift2.position.z=50;
			
		gift3.position.x=20;
		gift3.position.y=-185;
		gift3.position.z=150;
			
		gift4.position.x=-80;
		gift4.position.y=-185;
		gift4.position.z=150;
		
		scene.add(gift1);
		scene.add(gift2);
		scene.add(gift3);
		scene.add(gift4);
	}
	
	
// LIGHT

	{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light1 = new THREE.SpotLight(color, intensity);
	light1.position.set(500,300,500);	
	light1.target.position.set(-500,-300,-500);
	scene.add(light1);
	scene.add(light1.target);
	
	const light2 = new THREE.SpotLight(color, intensity);
	light2.position.set(500,300,-500);	
	light2.target.position.set(-500,-300,500);
	scene.add(light2);
	scene.add(light2.target);
		
	const light3 = new THREE.SpotLight(color, intensity);
	light3.position.set(-500,300,500);	
	light3.target.position.set(500,-300,-500);
	scene.add(light3);
	scene.add(light3.target);
		
	const light4 = new THREE.SpotLight(color, intensity);
	light4.position.set(-500,300,-500);	
	light4.target.position.set(500,-300,500);
	scene.add(light4);
	scene.add(light4.target);	
		
  }		
	
	
	
	//ANIMATE

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  function render(time) {
	  time*=0.001;  
	  

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
		var a =22100,b=Math.sqrt(22100)-50;
    renderer.render(scene, camera);
	 if(time> 8 &&count==0 && cz>=-40)
		 {
			 cz=cz-1*0.25;
			 cy=cy-2.8*0.25;
			 py=py-2.2*0.25;
			 pz=pz-0.6*0.25;
			if(cz==-40)
				count=1; 
			 camera.position.set(px,py,pz);
				 controls.target.set(cx,cy,cz);
				controls.update();
		 }
		else if( count==1 && px>-50)
			{
				px-=0.5*0.25;
				py-=1*0.25;
				pz-=1.4	*0.25;
				camera.position.set(px,py,pz);
				 controls.target.set(cx,cy,cz);
				controls.update();
				if(px==-50)
				{	
					count=2;
					px=-50;
					
					
				}
			}
	  		else if(pz>=-190 && count==2)
				{	
					pz=pz-0.2;
					if(pz<=-190)
					{	
						count=3;
						pz=-190;
						
					}
				 camera.position.set(px,py,pz);
				}
				 
	  		else if(count==3 && pz<b)
				{
					
					px=-Math.sqrt(a-(pz+50)*(pz+50));
					pz=pz+0.4;
					if(pz>=b)
					{	
						count=4;
						console.log(count);
					}
					 
					camera.position.set(px,py,pz);
					controls.target.set(cx,cy,cz);
					controls.update();
					
				
			}
	  		else if(count==4)
	  		{
				px=Math.sqrt(a-(pz+50)*(pz+50));
				console.log(pz);
				pz=pz-0.4;
				if(pz<=-190)
					count++;
				camera.position.set(px,py,pz);
				controls.target.set(cx,cy,cz);
				controls.update();
				

			}

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}


var a =true;
var b=alert("Press any key(for pc) or touch(for mobile)for surprise");
body.addEventListener('click',function(){
		audio.play();
	});
body.addEventListener('keydown',function(){
		audio.play();
	});
	body.addEventListener('touch',function(){
		audio.play();
	});


setTimeout(main,1000);
