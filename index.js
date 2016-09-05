function Circle(ctx,x,y,r){
	this.ctx=ctx;
	this.x=x;
	this.y=y;
	this.r=r;
}
Circle.prototype.update=function(){
	this.r+=2;
	if(this.r>window.innerWidth && window.innerWidth>window.innerHeight){
		this.r=0;
	}
	if(this.r>window.innerHeight && window.innerHeight>window.innerWidth){
		this.r=0;
	}
}
Circle.prototype.draw=function(){
	this.ctx.beginPath();
	this.ctx.strokeStyle="red";
	this.ctx.arc(this.x,this.y,this.r,Math.PI*2,false);
	this.ctx.stroke();
	this.ctx.closePath();
}
Circle.prototype.render=function(){
	this.update();
	this.draw();
}
function Solt(ctx,x,y,img){
	this.img=img;
	this.w=img.width;
	this.h=img.height;
	this.ctx=ctx;
	this.p={
		x:x || 0,
		y:y || 0
	};
	this.v={
		x:5+Math.random()*5,
		y:5+Math.random()*5
	};
}
Solt.prototype.draw=function(){
	this.ctx.drawImage(this.img,this.p.x,this.p.y);
}
Solt.prototype.updatePosition=function(){
	this.p.x+=this.v.x;
	this.p.y+=this.v.y;
	if(this.p.x<0){
		this.v.x=-this.v.x;
		this.p.x=0;
	}
	if(this.p.x>window.innerWidth-this.w){
		this.v.x=-this.v.x;
		this.p.x=window.innerWidth-this.w;
	}
	if(this.p.y<0){
		this.v.y=-this.v.y;
		this.p.y=0;
	}
	if(this.p.y>window.innerHeight-this.h){
		this.v.y=-this.v.y;
		this.p.y=window.innerHeight-this.h;
	}
}
Solt.prototype.render=function(){
	this.updatePosition();
	this.draw();
}
function Particle(ctx,x,y,r){
	this.ctx=ctx;
	this.p={
		x:x || 0,
		y:y || 0
	};
	this.v={
		x:Math.random()*10,
		y:Math.random()*10
	};
	this.radius=r;
	this.color={
		r:Math.floor(Math.random()*200),
		g:Math.floor(Math.random()*200),
		b:Math.floor(Math.random()*200),
		a:1
	};
}
Particle.prototype.render=function(){
	this.updatePosition();
	this.wrapPosition();
	this.draw();
}
Particle.prototype.draw=function(){
	this.ctx.beginPath();
	this.ctx.fillStyle=this.gradient();
	this.ctx.arc(this.p.x,this.p.y,this.radius,Math.PI*2,false);
	this.ctx.fill();
	this.ctx.closePath();
}
Particle.prototype.gradient=function(){
	var col=this.color.r+","+this.color.g+","+this.color.b;
	var g=this.ctx.createRadialGradient(this.p.x,this.p.y,0,this.p.x,this.p.y,this.radius);
	g.addColorStop(0,"rgba("+col+","+(this.color.a*1)+")");
	g.addColorStop(0.5,"rgba("+col+","+(this.color.a*0.2)+")");
	g.addColorStop(1,"rgba("+col+","+(this.color.a*0)+")");
	return g;
}
Particle.prototype.updatePosition=function(){
	this.p.x+=this.v.x;
	this.p.y+=this.v.y;
}
Particle.prototype.wrapPosition=function(){
	if(this.p.x<0)this.p.x=window.innerWidth;
	if(this.p.x>window.innerWidth)this.p.x=0;
	if(this.p.y<0)this.p.y=window.innerHeight;
	if(this.p.y>window.innerHeight)this.p.y=0;
}

var canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var ctx=canvas.getContext("2d");
ctx.globalCompositeOperation="lighter";
window.requestAnimationFrame=window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(cb){setTimeout(cb,17);};
var particlesNum=window.innerWidth*window.innerHeight/20000;
var particles=[];
for(var i=0; i<particlesNum; i++){
	var positionX=Math.random()*window.innerWidth;
	var positionY=Math.random()*window.innerHeight;
	var radius=270;
	var particle=new Particle(ctx,positionX,positionY,radius);
	particles.push(particle);
}
var circlesNum;
var circles=[];
if(window.innerWidth>window.innerHeight){
	circlesNum=window.innerWidth/100;
}else{
	circlesNum=window.innerHeight/100;
}
for(var i=0; i<circlesNum; i++){
	var positionX=window.innerWidth/2;
	var positionY=window.innerHeight/2;
	var radius=i*100;
	var circle=new Circle(ctx,positionX,positionY,radius);
	circles.push(circle);
}
var solt;
var img=new Image();
img.src="solt.jpg";
img.onload=function(){
	solt=new Solt(ctx,5,5,img);
	render();
}

function render(){
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	for(var i=0; i<particles.length; i++){
		particles[i].render();
	}
	for(var i=0; i<circles.length; i++){
		circles[i].render();
	}
	solt.render();
	ctx.textAlign="center";
	ctx.font="50px 'MS Pゴシック'";
	ctx.fillStyle="white"
	ctx.fillText("食塩が出現しました！",window.innerWidth/2,window.innerHeight/2);
	ctx.strokeStyle="red";
	ctx.strokeText("食塩が出現しました！",window.innerWidth/2,window.innerHeight/2);
	requestAnimationFrame(render);
}

window.addEventListener("resize",function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	ctx.globalCompositeOperation="lighter";
	particles=[];
	particlesNum=window.innerWidth*window.innerHeight/20000;
	for(var i=0; i<particlesNum; i++){
		var positionX=Math.random()*window.innerWidth;
		var positionY=Math.random()*window.innerHeight;
		var radius=270;
		var particle=new Particle(ctx,positionX,positionY,radius);
		particles.push(particle);
	}
	circles=[];
	if(window.innerWidth>window.innerHeight){
		circlesNum=window.innerWidth/100;
	}else{
		circlesNum=window.innerHeight/100;
	}
	for(var i=0; i<circlesNum; i++){
		var positionX=window.innerWidth/2;
		var positionY=window.innerHeight/2;
		var radius=i*100;
		var circle=new Circle(ctx,positionX,positionY,radius);
		circles.push(circle);
	}
	render();
});