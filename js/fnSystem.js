// 맵 이동 이벤트
window.addEventListener("mousemove", function() {

	var eventX = event.clientX;
	var eventY = event.clientY;

	var winWidth = window.innerWidth - 10;
	var winHeight = window.innerHeight - 10;
	
	

	// 마우스가 우측 끝과 끝에서부터 30px 떨어진 곳 사이에 있고, 맵의 끝이 안나왔다면 우측으로 움직임
	if ((eventX > winWidth - 30 && mapPosX > winWidth - mapWidth + 10)) {

		mapLeft = -10;

		mapPosX += mapLeft;

		gameMap.mapBase.style.left = mapPosX + "px";
		gameMap.mapBase.style.top = mapPosY + "px";

	}

	// 마우스가 좌측 끝과 끝에서부터 30px 떨어진 곳 사이에 있고, 맵의 끝이 안나왔다면 좌측으로 움직임
	if ((eventX < 30 && mapPosX < 0)) {

		mapLeft = 10;

		mapPosX += mapLeft;

		gameMap.mapBase.style.left = mapPosX + "px";
		gameMap.mapBase.style.top = mapPosY + "px";

	}

	// 마우스가 하단 끝과 끝에서부터 30px 떨어진 곳 사이에 있고, 맵의 끝이 안나왔다면 아래쪽으로 움직임
	if ((eventY > winHeight - 30 && mapPosY > winHeight - mapHeight + 10)) {

		mapTop = -10;

		mapPosY += mapTop;

		gameMap.mapBase.style.left = mapPosX + "px";
		gameMap.mapBase.style.top = mapPosY + "px";

	}

	// 마우스가 상단 끝과 끝에서부터 30px 떨어진 곳 사이에 있고, 맵의 끝이 안나왔다면 위쪽으로 움직임
	if ((eventY < 30 && mapPosY < 0)) {

		mapTop = 10;

		mapPosY += mapTop;

		gameMap.mapBase.style.left = mapPosX + "px";
		gameMap.mapBase.style.top = mapPosY + "px";

	}

});


//방향키나 스페이스 바가 keydown이 됐을 때의 이벤트
window.addEventListener("keydown", function(){
	
	key = event.keyCode;
	
	switch(key){
	
		case 32 :
			
			if( !gameTank.isFalling ){
				
				trigger=!trigger;
				
				/*if( shotPower==null ){
					
					shotPower = new bulletPower();
					
				}else{
					
					shotPower=shotPower;
					
				}*/
				
				if( !trigger ){
					
					shotPower.init();

				}else if( trigger ){
					
					console.log( "발사 후 :" + shotPower.finalPower);
					
					shotBullet.firePower=shotPower.finalPower;
					
					shotBullet.init();
					
					shotPower==null;

				}	
					
			}
			
			break;
			
		case 37 :
			
			tankSide=false;
			gameTank.tankSide=tankSide;
			
			if( !gameTank.isFalling ){

				moveTank( gameTank, -1.5 );
				//console.log(key);
							
			}else{
				
				moveTank( gameTank, 0 );
				
			}
			
			break;
			
		case 39 :
			
			tankSide=true;
			gameTank.tankSide=tankSide;
			
			if( !gameTank.isFalling ){
		
				moveTank( gameTank, 1.5 );
				//console.log(key);
				
			}else{
				
				moveTank( gameTank, 0 );
				
			}

			break;
			
		case 38:
	
			//bulletDeg( shotBullet, 0.01 );
	
			//angleCount++;
	
			//console.log( angleCount );
	
			//console.log( angleCount+", "+parseInt(shotBullet.bulletVelY*100));
	
			break;
		
		case 40:
	
			//bulletDeg( shotBullet, -0.01 );
	
			//console.log( angleCount+", "+parseInt(shotBullet.bulletVelY*100));
	
			break;
	
	}
	
});


//	방향키나 스페이스 바가 keyup이 됐을 때의 이벤트
window.addEventListener("keyup", function(){

	key = event.keyCode;
	
	if( key==37 || key==39 ){
		
		moveTank( gameTank, 0 );
		
	}

});


// 히트테스트
function hitTest(me, target) {

	// 두물체간 충돌 여부 판단
	me_x = parseInt(me.style.left); // div이든 image 이든 style시트를 갖고 잇는 모든 것
	me_y = parseInt(me.style.top);
	me_width = parseInt(me.style.width);
	me_height = parseInt(me.style.height);

	target_x = parseInt(target.style.left);
	target_y = parseInt(target.style.top);
	target_width = parseInt(target.style.width);
	target_height = parseInt(target.style.height);

	var result1 = (me_x >= target_x) && (me_x <= (target_x + target_width));// 나의 x좌표위치가 타겟의 x range 내에 있는지 판단
	var result2 = (me_x + me_width >= target_x)
			&& (me_x + me_width <= (target_x + target_width)); // 나의 가로폭이 타겟의 가로폭 내에 있는지 판단

	var result3 = (me_y >= target_y) && (me_y <= (target_y + target_height));// 나의 y좌표위치가 타겟의 세로폭 내에 있는지 판단
	var result4 = (me_y + me_height >= target_y)
			&& (me_y + me_height <= (target_y + target_height));// 나의 y폭이 타겟의 세로폭 내에 있는지 판단

	return (result1 || result2) && (result3 || result4);
}


//	탱크 움직임 효과
function moveTank( tank, speed ){
	
	//if ( tank.tankVelX != undefined ){
		
	tank.tankVelX=speed;
	
	/*console.log(tank.tankVelX);
	console.log(speed);
	console.log(tank.tankPosX);*/
		
	//}
	
}
