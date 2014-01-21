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
var paddledx=7;
var rightDown=false;
var leftDown=false;
var ps=10;
var mousePos;
var bricks;
var nrows=5;
var ncols=5;
var brickWidth=width/ncols-1;
var brickHeight=15;
var padding=1;
//console.log("canvas width " + canvas.width + ",  height " + canvas.height);
/*ctx.fillStyle="black";
ctx.fillRect(0,0,width,height);
ctx.fillStyle="white";
ctx.arc(width/2,height/2,10,0,2*Math.PI);
ctx.fill();*/

//Javascript
function onMouseMove(evt){
	mousePos=evt.pageX;
	
}
function onKeyDown(evt){

//	//console.log(evt.keyCode);
	var arrowKey=evt.keyCode;
	if(37===arrowKey){
		leftDown=true;
	}
	if(39===arrowKey){
		rightDown=true;
	}
		//console.log(leftDown+" <---LEFT RIGHT---> "+rightDown);
}
function onKeyUp(evt){
	
	var arrowKey=evt.keyCode;
	if(37===arrowKey){
		leftDown=false;
	}
	if(39===arrowKey){
		rightDown=false;
	}
	//console.log(leftDown+" <---LEFT RIGHT---> "+rightDown);
}
function initPaddle(){
	paddlex=width/2;
	paddleh=10;
	paddlew=100;
}
function initBricks(){
	bricks=new Array(nrows);
	for(i=0;i<nrows;i++){
		bricks[i]=new Array(ncols);
		for(j=0;j<ncols;j++){
			bricks[i][j]=1;
		}
	}
	console.log(bricks);
}
function draw(){
//	//console.log("Ping");
	ctx.fillStyle="black";
	//ctx.clearRect(0,0,width,height);
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(x,y,10,0,2*Math.PI);
	ctx.fill();
	ctx.fillStyle="green";
	ctx.fillRect(paddlex-paddlew/2,height-paddleh,paddlew,paddleh);
	//ctx.fillStyle="red";
	for(i=0;i<nrows;i++){
		for(j=0;j<ncols;j++){
			if(bricks[i][j]===1){
				ctx.fillRect((j * (brickWidth + padding)) + padding, (i * (brickHeight + padding)) + padding,brickWidth, brickHeight);

			}
			
		}
	} 
	//bounce
	var rowHeight=brickHeight+padding;
	var colWidth=brickWidth+padding;
	var row=Math.floor(y/rowHeight);
	var col=Math.floor(x/colWidth);
	if(y<rowHeight*nrows&&row>=0&&col>=0&&bricks[row][col]==1){
		bricks[row][col]=0;
		dy=-dy;
	}
//console.log(row+" "+col);
	if(y+dy>=height-paddleh){
		if(x>paddlex-paddlew/2&&x<paddlex-paddlew/2+paddlew){
			dy=-dy;
		}
		else{
			clearInterval(interval);
			console.log("Game is over.");
		}
	}
	//roof
	if(y+dy<=0){
		dy=-dy;
	}
	//right
	if(x+dx>=width){
		dx=-dx;
	}
	//left
	if(x+dx<=0){
		dx=-dx;
	}
	x+=dx;
	y+=dy;
	//mouse Move
	if(mousePos>paddlex+paddledx){
		rightDown=true;
		leftDown=false;
	}
	else if(mousePos<paddlex-paddledx){
		leftDown=true;
		rightDown=false;
	}
	else{
		leftDown=false;
		rightDown=false;
	}
	////console.log(mousePos);
	if(leftDown===true&&rightDown===false&&paddlex-paddlew/2>=0){
	//	//console.log("Moving Left!");
		paddlex-=paddledx;
	}
	else if(rightDown===true&&leftDown===false&&paddlex+paddlew/2<=width){
//		//console.log("Moving Right!");
		paddlex+=paddledx;
	}
	else{
//		//console.log("Standing Still!");
	}


}

initPaddle();
initBricks();
var interval = setInterval(draw,10);


//Left = 37, Right = 39