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
var paddledx=10;
var rightDown=false;
var leftDown=false;
var ps=5;
var mousePos
var bricks;
var nrows=5;
var ncols=5;
var brickWidth=width/ncols-1;
var brickHeight=15;
var padding=1;
var win=false;
var brickColour;
//console.log("canvas width " + canvas.width + ",  height " + canvas.height);
/*ctx.fillStyle="black";
ctx.fillRect(0,0,width,height);
ctx.fillStyle="white";
ctx.arc(width/2,height/2,10,0,2*Math.PI);
ctx.fill();*/

//Javascript
function resetPowerups(powerUp){
	switch (powerUp) {
		case "bigPaddle":
			console.log("Big Paddle");
			setTimeout(function(){paddlew=200},18000);
			break;
		case "smallPaddle":
			console.log("Small Paddle");
			setTimeout(function(){paddlew=200},18000);
			break;
		case "slowBall":
			console.log("Slow Ball");
			setTimeout(function(){dx=dx*2;dy=dy*2},18000);
	}
}
function randBrick(){
  var numbers=[1,1,1,1,1,1,1,4,2,3];
  var idx = Math.floor(Math.random() * numbers.length);
  return numbers[idx];
}
function rainbowPower(){
	var letters="0123456789abcdef";
	letters=letters.split("");
	//set up a new variable called colour
	//colour starts with #
	//write a for loop which runs 6 times
	//inside the loop add a random letter to colour
	//after the loop, return colour
	//pass in colour into the paintcells function when score = 5.
	var colourNumb="#";
	for(var i=0;i<6;i++){
		colourNumb+=letters[Math.round(Math.random()*15)];
	}
	return colourNumb;
}
function checkWin(){
	var counter=0;
	var numBricks=0;
	//console.log("You hit a brick!");
	for(i=0;i<nrows;i++){
		for(j=0;j<ncols;j++){
			numBricks++;
			if(bricks[i][j]===0){
				counter++;
			//	console.log(counter);
			}
			
		}
	}
	if(counter===numBricks){
		return true;
	}
	else{
		return false;
	}
}
function onMouseMove(evt){
	mousePos=evt.pageX;
	
}
function onKeyDown(evt){

	//console.log(evt.keyCode);
	var arrowKey=evt.keyCode;
	if(37===arrowKey){
		leftDown=true;
	}
	if(39===arrowKey){
		rightDown=true;
	}
		console.log(leftDown+" <---LEFT RIGHT---> "+rightDown);
}
function onKeyUp(evt){
	
	var arrowKey=evt.keyCode;
	if(37===arrowKey){
		leftDown=false;
	}
	if(39===arrowKey){
		rightDown=false;
	}
	console.log(leftDown+" <---LEFT RIGHT---> "+rightDown);
}
function initPaddle(){
	paddlex=width/2;
	paddleh=10;
	paddlew=200;
}
function initBricks(){
	bricks=new Array(nrows);
	for(i=0;i<nrows;i++){
		bricks[i]=new Array(ncols);
		for(j=0;j<ncols;j++){
			bricks[i][j]=randBrick();
		}
	}
	//console.log(bricks);
	brickColour=new Array(nrows);
	for(i=0;i<nrows;i++){
		brickColour[i]=new Array(ncols);
		for(j=0;j<ncols;j++){
			brickColour[i][j]=rainbowPower();
		}
	}
	//console.log(bricks);
}

var bgColour="black";
function draw(){
	//console.log("Ping");

	ctx.fillStyle=bgColour;
	//ctx.clearRect(0,0,width,height);
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(x,y,10,0,2*Math.PI);
	ctx.fill();
	ctx.fillStyle="green";
	ctx.fillRect(paddlex-paddlew/2,height-paddleh,paddlew,paddleh);

	
	for(i=0;i<nrows;i++){
		for(j=0;j<ncols;j++){
			if(bricks[i][j]===1){
				ctx.fillStyle=brickColour[i][j];
				ctx.fillRect((j * (brickWidth + padding)) + padding, (i * (brickHeight + padding)) + padding,brickWidth, brickHeight);

			}
			else if(bricks[i][j]===2){
				ctx.fillStyle=rainbowPower();
				ctx.fillRect((j * (brickWidth + padding)) + padding, (i * (brickHeight + padding)) + padding,brickWidth, brickHeight);
			}
			else if(bricks[i][j]===3){
				ctx.fillStyle="red";
				ctx.fillRect((j * (brickWidth + padding)) + padding, (i * (brickHeight + padding)) + padding,brickWidth, brickHeight);
			}
			else if(bricks[i][j]===4){
				ctx.fillStyle="white";
				ctx.fillRect((j * (brickWidth + padding)) + padding, (i * (brickHeight + padding)) + padding,brickWidth, brickHeight);
			}
		}
	} 
	if(bgColour!=="black"){
		clearInterval(interval);
	}
	//bounce
	var rowHeight=brickHeight+padding;
	var colWidth=brickWidth+padding;
	var row=Math.floor(y/rowHeight);
	var col=Math.floor(x/colWidth);
	if(y<rowHeight*nrows && row>=0 && col>=0 && bricks[row][col]>=1){
		if(bricks[row][col]===2){
			paddlew=400;
			resetPowerups("bigPaddle");
			// console.log(paddlew);
		}
		else if(bricks[row][col]===3){
			paddlew=150;
			resetPowerups("smallPaddle");
		}
		else if(bricks[row][col]===4){
			resetPowerups("slowBall");
			dx=dx/2;
			dy=dy/2;
		}
		bricks[row][col]=0;
		dy=-dy;
		
	}
//console.log(row+" "+col);
	if(y+dy>=height-paddleh){
		if(x>paddlex-paddlew/2&&x<paddlex-paddlew/2+paddlew){
			dy=-dy;
			if(x<paddlex-paddlew/4){
				if(dx>0){
					//reverse and increase the speed and angle of the ball
					// console.log("Changed to Left")
					dx=-dx*1.1;	
				}
				else{
					dx=dx*1.1;
					// console.log("Continued going Left");
				}
			}
			else if(x>paddlex+paddlew/4){
				// console.log("Hit Right Corner")
					if(dx>0){
						dx=dx*1.1;
					}
					else{
						dx=-dx*1.1;
					}
			}
		}

		else{
			// console.log("Game is over.");
			ctx.font= width/6 + "px Ariel";
			var textString="You Lose!";
			var textWidth=ctx.measureText(textString).width;
			bgColour="#6E463F";
			ctx.fillStyle="white";
			ctx.fillText(textString,width/2-textWidth/2,height/2);
			
		}
	}
		if(checkWin()){	
			// console.log("You Won!");
			ctx.font= width/6 + "px Ariel";
			var textString="You Win!";
			var textWidth=ctx.measureText(textString).width;
			ctx.fillStyle="white";
			ctx.fillText(textString,width/2-textWidth/2,height/2);
			bgColour="purple";
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

	//console.log(mousePos);
	if(leftDown===true&&rightDown===false&&paddlex-paddlew/2>=0){
		console.log("Moving Left!");
		paddlex-=paddledx;
	}
	else if(rightDown===true&&leftDown===false&&paddlex+paddlew/2<=width){
		console.log("Moving Right!");
		paddlex+=paddledx;
	}
	else{
		console.log("Standing Still!");
	}

}

initPaddle();
initBricks();
var interval = setInterval(draw,5);


//Left = 37, Right = 39