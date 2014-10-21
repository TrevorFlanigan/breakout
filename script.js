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
var mousePos;
var bricks;
var nrows=5;
var ncols=5;
var brickWidth=width/ncols-1;
var brickHeight=15;
var padding=1;
var win=false;
var brickColour;
var interval;
var images = {};
var useLaser=false;
var throwBall=0;
var ammo=0;
var laserWidth=2;
var column;
var row;
var timer=18;
var countdownTimer;
var bigOn;
var bigOff;
var laserTimer=0;
var caughtBall=false;
var ndy;
var ndx;
var moveLeft=false;
var moveRight=true;
var nx;
var ny;
var stopTimer;
var distanceBetween=0;
var balls = [
    { x: width/2, y: height/2, dx:dx, dy:dy, ndx:ndx, ndy:ndy, distanceBetween:distanceBetween, frozen:false, olddy:dy,olddx:dx},
    { x: 110, y:110, dx:dx, dy:dy, ndx:ndx, ndy:ndy, distanceBetween:distanceBetween, frozen:false, olddy:dy,olddx:dx},
    { x: 200, y:50, dx:dx, dy:dy, ndx:ndx, ndy:ndy, distanceBetween:distanceBetween, frozen:false, olddy:dy,olddx:dx}
];
var powerupTimers=
{bigPaddle:0,
smallPaddle:0,
slowBall:0};

var powerupIntvs=
{bigPaddle:null,
smallPaddle:null,
slowBall:null};
var multiBall;
// var mouseX=event.screenX;
//console.log(ss"canvas width "+canvas.width+",  height "+canvas.height);
/*ctx.fillStyle="black";
ctx.fillRect(0,0,width,height);
ctx.fillStyle="white";
ctx.arc(width/2,height/2,10,0,2*Math.PI);
ctx.fill();*/

//Javascript


// function startTimer(time){
//     timer=time;
//   stopTimer=setInterval(
//         function countdown(){
//             timer--;
//             // console.log(timer);
//             if (timer==0){
//                 clearInterval(stopTimer);
//                 timer=18;
//             }
//         },1000
//     );
// }


function givePowerup(row,col){
    
        //console.log(row+" "+col);
        if(bricks[row][col]===2){
            paddlew=400;
            resetPowerups("bigPaddle");
            // startTimer(18);
            // console.log(paddlew);
        }
        else if(bricks[row][col]===3){
            paddlew=150;
            resetPowerups("smallPaddle");
            console.log(paddlew);
            // startTimer(18);
        }
        else if(bricks[row][col]===4){
            resetPowerups("slowBall");
            for (var i = 0; i < balls.length; i++) {
                console.log("before "+balls[i].dx);
                balls[i].dx=balls[i].dx/2;
                balls[i].dy=balls[i].dy/2;
                console.log(balls[i].dx);
            };
        }
        else if(bricks[row][col]===5){
            resetPowerups("laser");
            useLaser=true;
            ammo+=5;
        //  console.log(bricks[row][col]);
        }
        else if(bricks[row][col]===6){
            throwBall+=5;
            // console.log("Thowball activated ammo: "+throwBall);
        }
        else if(bricks[row][col]===7){
            resetPowerups("multiBall");
            // console.log("New Ball Created");
        }
    
}
function drawTimer(){
    if(powerupTimers.bigPaddle>0){
        ctx.font="20px Georgia";    
        ctx.fillStyle="#ffffff"
        ctx.fillText("Big Paddle: "+powerupTimers.bigPaddle/1000,10,200);
    }   
    if(powerupTimers.slowBall>0){
        ctx.font="20px Georgia";    
        ctx.fillStyle="#ffffff"
        ctx.fillText("Slow Ball:"+powerupTimers.slowBall/1000,10,400);
    }
    if(powerupTimers.smallPaddle>0){
        ctx.font="20px Georgia";    
        ctx.fillStyle="#ffffff"
        ctx.fillText("Small Paddle:"+powerupTimers.smallPaddle/1000,10,300);
    }
    if(balls.length>1){
        ctx.font="20px Georgia";    
        ctx.fillStyle="#ffffff"
        ctx.fillText("Multiball",10,500);
    }
    if(ammo>0){
        ctx.font="20px Georgia";    
        ctx.fillStyle="#ffffff"
        ctx.fillText("Laser Ammo: "+ammo,10,600);
    }
    if(throwBall>0){
        ctx.font="20px Georgia";    
        ctx.fillStyle="#ffffff"
        ctx.fillText("Catches "+throwBall,10,650);
    }
}
function drawLaser(){
    for (var i=nrows-1; i>=0; i--) {
        if(bricks[i][column]>0){
        row=i;
        i=-1;
        }
        
    }
    if(laserTimer>0){
        ctx.fillStyle="red";
        ctx.fillRect(paddlex-laserWidth/2,height-paddleh,laserWidth,-height);
    }

//  ctx.fillRect(paddlex-laserWidth/2,height-paddleh,laserWidth,-100);
    //if(row===0){
//  }
    //find the space between the two sides of one column
    if(paddlex<brickWidth){
        column=0;
    }
    else if(paddlex<2*brickWidth+padding*2&&paddlex>brickWidth+padding){
        column=1;
    }
    else if(paddlex<3*brickWidth+padding*3&&paddlex>2*brickWidth+padding*2){
        column=2;
    }
    else if(paddlex<4*brickWidth+padding*4&&paddlex>3*brickWidth+padding*3){
        column=3;
    }
    else if(paddlex<5*brickWidth+padding*5&&paddlex>4*brickWidth+padding*4){
        column=4;
    }
    // console.log(bricks[1][column]);
//  console.log(column);

}
function interact(){
    if(!caughtBall){
        if(useLaser){
            
            if(ammo>0){
                console.log("You fired your laser.");
                laserTimer=50;
                setInterval(function(){laserTimer-=5},5);
                ammo--;
                // console.log(bricks[1][column]);
                for (var i=nrows-1; i>=0; i--) {
                    if(bricks[i][column]>0){
                    //  console.log(bricks[i][column]);
                        givePowerup(i,column);
                        bricks[i][column]=0;
                        i=-1;
                        
                    }
                }
            }
            else{
                useLaser=false;
            }
        }
    }
    

    else if(throwBall>0&&caughtBall){
            throwBall--;
            for (var i = 0; i < balls.length; i++) {
            if(balls[i].frozen){
            balls[i].dx=balls[i].ndx;
            balls[i].dy=balls[i].ndy;
        }   
            caughtBall=false;
            console.log(caughtBall);
        //  caughtBall=true;
            console.log("You threw the ball!");
            console.log(throwBall);
            balls[i].frozen=false;
    }
}
    else{
        console.log("No ammo and no throwBall");
    }

}

function brickIcon(icon,i,j){
    ctx.drawImage(icon, j*(brickWidth+padding*2)+brickWidth/2, i*(brickHeight+padding*2));
}
function fillBrick(i,j){
    ctx.fillRect(j*(brickWidth+padding*2), i*(brickHeight+padding*2),brickWidth, brickHeight);
}
function loadImages(sources, callback) {
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback();
        }
      };
      images[src].src = sources[src];
    }
  }

var sources = {
    big: 'images/big.png',
    slow: 'images/slow.png',
    small: 'images/small.png',
    laser: 'images/laser.png',
    throwBall:'images/throwBall.png',
    multiBall:'images/multi-ball.png'
};

loadImages(sources, function() {
    // console.log("The tiny 13x13 icon for the brick works!");
    initPaddle();
    initBricks();
    interval = setInterval(draw,5);
});
//needs to be fixed here 
function resetPowerups(powerUp){
    switch (powerUp) {
        case "bigPaddle":
            // console.log("Big Paddle");
            clearInterval(powerupIntvs.bigPaddle);
            powerupTimers.bigPaddle+=18000;
            powerupIntvs.bigPaddle=setInterval(function(){powerupTimers.bigPaddle-=1000;},1000);
            setTimeout(function(){paddlew=200;},18000)
            bigOn=true;
            // setTimeout(function(){paddlew=200;bigOff=true;},18000);
            // startTimer();
            break;
        case "smallPaddle":
            // console.log("Small Paddle");
            powerupTimers.smallPaddle+=18000;
            setTimeout(function(){paddlew=200},18000);
            powerupIntvs.smallPaddle=setInterval(function(){powerupTimers.smallPaddle-=1000;},1000);
            break;
        case "slowBall":
            // console.log("Slow Ball");
            powerupTimers.slowBall+=18000;
            powerupIntvs.slowBall=setInterval(function(){powerupTimers.slowBall-=1000;},1000);
            setTimeout(
                function(){
                     for (var i = 0; i < balls.length; i++) {
                        // balls[i].dx=balls[i].olddx;
                        if(balls[i].dx<0){
                            balls[i].dx=-balls[i].olddx;
                        }
                        else{
                            balls[i].dx=balls[i].olddx;
                        }
                        if(balls[i].dy<0){
                            balls[i].dy=-balls[i].olddy;
                        }
                        else{
                            balls[i].dy=balls[i].olddy;
                        }
                        // console.log(balls[i].dx);
                     };
                },18000);
            break;
        case "multiBall":
            // console.log("Multiball On");
            break;
        case "laser":
            // console.log("laser is on");
            break;
    }
}
function randBrick(){
  var numbers=[1,1,1,1,1,1,1,4,2,3,1,1,1,1,1,1,1,1,1,1,0,5,6,7];
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
            //  console.log(counter);
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
        // console.log(leftDown+" <---LEFT RIGHT---> "+rightDown);
}
function onKeyUp(evt){
    
    var arrowKey=evt.keyCode;
    if(37===arrowKey){
        leftDown=false;
    }
    if(39===arrowKey){
        rightDown=false;
    }
    // console.log(leftDown+" <---LEFT RIGHT---> "+rightDown);
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

    // if(powerupTimers.bigPaddle<=0){
    //     clearInterval(powerupIntvs.bigPaddle);
    //     paddlew=200;
    //     bigOff=true;

    // }
    // console.log(powerupTimers.bigPaddle);
    // console.log(mouseX);
    //console.log("Ping");
    ctx.fillStyle=bgColour;
    // drawTimer();

    //ctx.clearRect(0,0,width,height);
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle="white";
    drawTimer();
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,10,0,2*Math.PI);
        ctx.fill();
    };
    ctx.fillStyle="green";
    ctx.fillRect(paddlex-paddlew/2,height-paddleh,paddlew,paddleh);
    drawLaser();
    for (var i = 0; i < balls.length; i++) {
    
        if(balls[i].frozen){
            //console.log(balls[i].distanceBetween);
            balls[i].x=paddlex+balls[i].distanceBetween;
            balls[i].dx=0;
            balls[i].dy=0;
        }
    };

    for(i=0;i<nrows;i++){
        for(j=0;j<ncols;j++){
            if(bricks[i][j]===1){
                ctx.fillStyle=brickColour[i][j];
                fillBrick(i,j);

            }
            else if(bricks[i][j]===2){
                ctx.fillStyle=rainbowPower();
                fillBrick(i,j);
                brickIcon(images.big,i,j);
            }
            else if(bricks[i][j]===3){
                ctx.fillStyle="red";
                fillBrick(i,j);
                brickIcon(images.small,i,j);
            }
            else if(bricks[i][j]===4){
                ctx.fillStyle="white";
                fillBrick(i,j);
                brickIcon(images.slow,i,j);


            }
            else if(bricks[i][j]===5){
                ctx.fillStyle="purple";
                fillBrick(i,j);
                brickIcon(images.laser,i,j);
            }
            else if(bricks[i][j]===6){
                ctx.fillStyle="yellow";
                fillBrick(i,j);
                brickIcon(images.throwBall,i,j);
            }
            else if(bricks[i][j]===7){
                ctx.fillStyle="black";
                fillBrick(i,j);
             //   brickIcon(images.multiBall.png,i,j);
            }
        }
    } 

                if(bgColour!=="black"){
        clearInterval(interval);
        clearInterval(powerupIntvs.bigPaddle)
    }
    //bounce
    var rowHeight=brickHeight+padding;
    var colWidth=brickWidth+padding;
    for (var i = 0; i < balls.length; i++) {
        var row=Math.floor(balls[i].y/rowHeight);
        var col=Math.floor(balls[i].x/colWidth);
        if(balls[i].y<rowHeight*nrows && /*row>=0 && col>=0 &&*/ bricks[row][col]>=1){
            givePowerup(row,col);
            bricks[row][col]=0;
            balls[i].dy=-balls[i].dy;
        }
    }

    //  if(bricks[row][col]===2){
    //      paddlew=400;
    //      resetPowerups("bigPaddle");
    //      // console.log(paddlew);
    //  }
    //  else if(bricks[row][col]===3){
    //      paddlew=150;
    //      resetPowerups("smallPaddle");
    //  }
    //  else if(bricks[row][col]===4){
    //      resetPowerups("slowBall");
    //      dx=dx/2;
    //      dy=dy/2;
    //  }
    //  else if(bricks[row][col]===5){
    //      resetPowerups("laser");
    //      useLaser=true;
    //      ammo+=5;
    //  }
    //  bricks[row][col]=0;
    //  dy=-dy;
        
    // }

//console.log(row+" "+col);
    for (var i = 0; i < balls.length; i++) {
        if(balls[i].y+balls[i].dy>=height-paddleh){
            //add half of paddlew instead of 1 forward 2 back
            if(balls[i].x>paddlex-paddlew/2&&balls[i].x<paddlex-paddlew/2+paddlew){
                // ndy=-dy;
                balls[i].dy=-balls[i].dy;
                if(balls[i].x<paddlex-paddlew/4){
                    if(balls[i].dx>0){
                        //reverse and increase the speed and angle of the ball
                        // console.log("Changed to Left")
                        balls[i].dx=-balls[i].dx*1.1;   
                        //ndx=dx;
                    }
                    else{
                        balls[i].dx=balls[i].dx*1.1;
                        //ndx=dx;
                        // console.log("Continued going Left");
                    }
                }
                else if(balls[i].x>paddlex+paddlew/4){
                    // console.log("Hit Right Corner")
                    if(balls[i].dx>0){
                        balls[i].dx=balls[i].dx*1.1;
                    }
                    else{
                        balls[i].dx=-balls[i].dx*1.1;
                    }
                }
                // for (var i = 0; i < balls.length; i++) {
                    if(throwBall){
                        caughtBall=true;
                        balls[i].distanceBetween=balls[i].x-paddlex;
                        // console.log(balls[i].distanceBetween);
                        balls[i].frozen=true;
                        balls[i].ndx=balls[i].dx;
                        balls[i].ndy=balls[i].dy;
                         //     switch (balls[i]) {
                            //  case balls[0]:
                            //      console.log("Ball 1 has frozen");
                            //      balls[0].dx=0;
                            //      break;
                            //  case balls[1]:
                            //      console.log("Ball 2 has frozen");
                            //      balls[1].dx=0;
                            //      break;
                            //  case balls[2]:
                            //      console.log("Ball 3 has frozen");
                            //      balls[2].dx=0;
                            //      break;
                            // }
                            //MOVED TO DRAW FUNCTION
                            // if(balls[i].frozen){
                            //  balls[i].x=paddlex;
                            //  balls[i].dx=0;
                            //  balls[i].dy=0;
                            // }
                        // balls[i].dx=0;
                        // balls[i].dy=0;
                        // console.log("Ball is frozen")
                        balls[i].nx=balls[i].x;
                        balls[i].ny=balls[i].y;
                        // console.log(distanceBetween);
                    }
                
                else{
                    // dx=ndx;
                    // dy=ndy;
                    // ndx=null;
                    // ndy=null;
                    // console.log("Ball bounced normally.");
                }
            // }
            }

            else{
                if(balls.length===1){
                    // console.log("Game is over.");
                    ctx.font= width/6+"px Ariel";
                    var textString="You Lose!";
                    var textWidth=ctx.measureText(textString).width;
                    bgColour="#6E463F";
                    ctx.fillStyle="white";
                    ctx.fillText(textString,width/2-textWidth/2,height/2);
                }
                else{
                    balls.splice(i,1);
                }
                
                
            }
        }

    }
    //SHOW THE ICONS

    // switch(drawTimer()){
    //     case "big":

    //     break;
    //     case "small":

    //     break;
    //     case "slow":

    //     break;
    //     case "multi":

    //     break;
    //     case "laser":

    //     break;
    //     case "throw":

    //     break;
    // }
    
    
    for (var i = 0; i < balls.length; i++) {
    
    if(caughtBall&&mousePos<nx){
        balls[i].dx=paddlex-balls[i].distanceBetween;
        // console.log("Ball Moving Left");
    }
    else if(caughtBall&&mousePos>nx){
        balls[i].dx=paddlex-balls[i].distanceBetween;
        // console.log("Ball moving right");
    }
    if(caughtBall&&bigOff){
        // console.log(bigOff);
        balls[i].distanceBetween=balls[i].distanceBetween/2;
        bigOff=false;
    }
};
    if(checkWin()){ 
        // console.log("You Won!");
        ctx.font= width/6+"px Ariel";
        var textString="You Win!";
        var textWidth=ctx.measureText(textString).width;
        ctx.fillStyle="white";
        ctx.fillText(textString,width/2-textWidth/2,height/2);
        bgColour="purple";
    }
    // //roof
    // if(balls[0][1]+dy<=0){
    //  dy=-dy;
    // }
    // //right
    // if(balls[0][0]+dx>=width){
    //  dx=-dx;
    // }

    for (var i = 0; i < balls.length; i++) {
        //left
        if(balls[i].x+balls[i].dx<=0){
            balls[i].dx=-balls[i].dx;//dx
        }
        //right
        if(balls[i].x+balls[i].dx>=width){
            balls[i].dx=-balls[i].dx;//dx
        }
        //roof
        if(balls[i].y+balls[i].dy<=0){
            balls[i].dy=-balls[i].dy;//dy
        }
        // //floor
        // if(balls[i].y+balls[i].dy>=height-20){
        //  balls[i].dy=-balls[i].dy;//dy
        // }
        balls[i].x+=balls[i].dx;//dx
        balls[i].y+=balls[i].dy;//dy

    };

    
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
    //  console.log("Moving Left!");
        paddlex-=paddledx;
        moveLeft=true;
    }
    else if(rightDown===true&&leftDown===false&&paddlex+paddlew/2<=width){
    //  console.log("Moving Right!");
        paddlex+=paddledx;
        moveRight=true;
    }
    else{
    //  console.log("Standing Still!");
    }

}
// initPaddle();
// initBricks();
// var interval = setInterval(draw,5);
//Left = 37, Right = 39

