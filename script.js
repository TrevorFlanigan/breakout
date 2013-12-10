//Canvas
var body = document.getElementById("body");
var canvas = document.createElement("canvas");

canvas.id = "myCanvas";

body.appendChild(canvas);


var ctx = canvas.getContext("2d");
var width = document.documentElement.clientWidth-21;
var height = document.documentElement.clientHeight-21; 
canvas.width=width;
canvas.height=height;
var x=width/2;
var y=height/2;
var dx=2;
var dy=3;
var paddlex;
var paddleh;
var paddlew;
console.log("canvas width " + canvas.width + ",  height " + canvas.height);
/*ctx.fillStyle="black";
ctx.fillRect(0,0,width,height);
ctx.fillStyle="white";
ctx.arc(width/2,height/2,10,0,2*Math.PI);
ctx.fill();*/

//Javascript
function initPaddle(){
	paddlex=width/2;
	paddleh=10;
	paddlew=75;
}
function draw(){
	console.log("Ping");
	ctx.fillStyle="black";
	//ctx.clearRect(0,0,width,height);
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(x,y,10,0,2*Math.PI);
	ctx.fill();
	ctx.fillStyle="green";
	ctx.fillRect(paddlex,height-paddleh,paddlew,paddleh);
	if(y+dy>=height){
		dy=-dy;
	}
	if(y+dy<=0){
		dy=-dy;
	}
	if(x+dx>=width){
		dx=-dx;
	}
	if(x+dx<=0){
		dx=-dx;
	}
	x+=dx;
	y+=dy;

}
initPaddle();
setInterval(draw,10);


