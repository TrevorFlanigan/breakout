var balls = [
	{ x: width/2, y: height/2, dx:dx, dy:dy, ndx:ndx},
	{ x: 110, y:110, dx:dx, dy:dy, ndx:ndx},
	{ x: 200, y:50, dx:dx, dy:dy, ndx:ndx}
];
console.log(balls);

	ctx.beginPath();
	ctx.arc(balls[0][0],balls[0][1],10,0,2*Math.PI);
	ctx.fill();

	for (var i = balls.length - 1; i >= 0; i--) {
		Things[i]
	};

for (var i = 0; i < balls.length; i++) {
	ctx.beginPath();
	ctx.arc(balls[i][0],balls[i][1],10,0,2*Math.PI);
	ctx.fill();
};

	for (var i = 0; i < balls.length; i++) {
		balls[i][0]+=balls[i][2];
		balls[i][1]+=balls[i][3];
	};


	else if(throwBall>0&&caughtBall){
		throwBall--;
		dx=ndx;
		dy=ndy;
		caughtBall=false;
	//	caughtBall=true;
		console.log("You threw the ball!");
	}
	else{
		console.log("No ammo and no throwBall");
	}
}


	switch (balls[i]) {
		case "balls[0]":
			console.log("Ball 1 has frozen");
			balls[0].dx=0;
			break;
		case "balls[1]":
			console.log("Ball 2 has frozen");
			balls[1].dx=0;
			break;
		case "balls[2]":
			console.log("Ball 3 has frozen");
			balls[2].dx=0;
			break;
	}