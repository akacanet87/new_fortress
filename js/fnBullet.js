function bullet( selectedTank, selectedMap, shotPower ){
	
	this.bulletImg;
	this.bulletImgSrc=selectedTank.bulletImg;
	this.bulletWidth=selectedTank.bulletWidth;
	this.bulletHeight=selectedTank.bulletHeight;
	this.bulletPosX;
	this.bulletPosY;
	this.bulletVelX=0;
	this.bulletVelY=0;
	this.firePower=shotPower.firePower/100;
	this.map=selectedMap.mapBase;
	
	this.tankWidth=selectedTank.tankWidth;
	this.tankHeight=selectedTank.tankHeight;
	this.tankPosX=parseInt(selectedTank.tankImg.style.left);
	this.tankPosY=parseInt(selectedTank.tankImg.style.top);
	this.tankSide=true;
	this.st;
	
	this.init = function(){
				
		this.bulletImg=document.createElement("img");
		
		this.bulletImg.src=this.bulletImgSrc;
		this.bulletImg.style.width=this.bulletWidth+"px";
		this.bulletImg.style.height=this.bulletWidth+"px";
		this.bulletImg.style.position="absolute";
		this.bulletImg.style.zIndex=0;
		
		this.map.appendChild(this.bulletImg);

		if(this.tankSide){
			
			this.bulletPosX=this.tankPosX+this.tankWidth+1;
			this.bulletPosY=this.tankPosY-1;
			this.bulletVelX=this.bulletVelX;
			this.bulletVelY=-this.bulletVelY;
			this.bulletImg.style.transform="rotateY(0deg)";
			this.bulletImg.style.left=this.tankPosX+"px";
			this.bulletImg.style.top=this.tankPosY+"px";
			
		}else{
			
			this.bulletPosX=this.tankPosX-this.bulletWidth-1;
			this.bulletPosY=this.tankPosY-1;
			this.bulletVelX=-this.bulletVelX;
			this.bulletVelY=-this.bulletVelY;
			this.bulletImg.style.transform="rotateY(180deg)";
			this.bulletImg.style.left=this.tankPosX+"px";
			this.bulletImg.style.top=this.tankPosY+"px";
			
		}
		
		console.log("this.tankPosX : "+this.tankPosX);
		console.log("this.tankPosY : "+this.tankPosY);
		console.log("bulletVelX : "+this.bulletVelX);
		console.log("bulletVelY : "+this.bulletVelY);
		console.log("firePower : "+this.firePower);
		
		this.move();
		
	}

	this.move=function(){

		var me = this;
		
		this.bulletVelX=this.bulletVelX*this.firePower;
		this.bulletVelY=this.bulletVelY*this.firePower;
		this.bulletVelY+=gravity;

		this.bulletPosX+=this.bulletVelX;
		this.bulletPosY+=this.bulletVelY;

		//console.log(this.x+" , "+this.y);

		this.bulletImg.style.left=this.bulletPosX+"px";
		this.bulletImg.style.top=this.bulletPosY+"px";

		//	stage를 벗어나면, 총알의 setTimeout은 멈춰야한다
		//console.log( parseInt( this.map.style.width ) );
		
		this.st=setTimeout(function(){
			
			me.move();
			
		}, 10);		// setTimeout이 clearTimeout보다 먼저 호출되어야 한다.
		


		for(var i=0;i<blockArr.length;i++){					//	히트테스트

			for(var j=0;j<blockArr[i].length;j++){
				
				if(blockArr[i][j]!=undefined){

					var result=hitTest(this.bulletImg, blockArr[i][j].img );

					if(result){

						this.map.removeChild(this.bulletImg);
						clearTimeout(this.st);

						//	적군 죽이고
						this.map.removeChild(blockArr[i][j].img);			//	이미지를 먼저 없애고 delete를 맨마지막에 쓴다.
						clearTimeout(blockArr[i][j].st);
						delete blockArr[i][j];				//	배열에서 제거하고 이자리에는 Undefined 가 남음

						//turn=!turn;

						break;
						return;

					}

				}

			}

		}

		/*for( var a=0 ; a<gameTankArr.length ; a++ ){

			if(gameTankArr[a]!=undefined){							//	배열에 존재하는 img에 대해서만 (undefined가 아닌 경우만)
				
				var result = hitTest(this.img, gameTankArr[a].img);

				if( result ){

					//	총알 죽이고 총알의 setTimeout도 중지
					this.map.removeChild(this.img);
					clearTimeout(this.st);

					this.calDam = new calDamage( gameTankArr[a].hp , gameTankArr[a].defense, this.damage );

					gameTankArr[a].hp=this.calDam.restHp;

					console.log( "이 총알의 damage : " + this.damage );
					console.log( "이 탱크의 defence : " + gameTankArr[a].defense);
					console.log( (a+1)+"P의 현재 hp : "+gameTankArr[a].hp );

					turn=!turn;

					break;
					return;
	
				}

			}

		}*/

		// 부딪히지 않고 화면 밖으로 나가면
		if( ( this.bulletPosX+this.bulletWidth < 0 ) || ( this.bulletPosX > mapWidth ) || ( this.bulletPosY > mapHeight )  ){

			//alert("저 자살할게요");

			clearTimeout(this.st);
			this.map.removeChild(this.bulletImg);
			
			this.bulletVelX=0;
			this.bulletVelY=0;
			console.log("총알 죽음");

			//turn=!turn;

			return;


		}

		/*if(turn){

			console.log( "1p차례!!" );

		}else if( !turn ){

			console.log( "2p차례" );

		}*/

	}
	
}


var bulletPower = function(){						//	총알 쏘는 힘 게이지

	this.finalPower;
	this.powerGauge=0;
	this.gaugeUpDown=1;
	this.upDownFlag=true;
	this.st;
	var me = this;
	
	this.init = function(){
	
		console.log( this.powerGauge +" , "+trigger );
		
		if( this.upDownFlag ){

			if( this.powerGauge != 100 ){

				this.powerGauge+=this.gaugeUpDown;
				
			}else if( this.powerGauge == 100 ){
				
				this.upDownFlag=!this.upDownFlag;

			}

		}
		
		if( !this.upDownFlag ){

			if( this.powerGauge != 0 ){

				this.powerGauge-=this.gaugeUpDown;
				
			}else if( this.powerGauge == 0 ){
				
				this.upDownFlag=!this.upDownFlag;

			}

		}
		
		this.finalPower=this.powerGauge;
		
		if( !trigger ){
			
			this.st=setTimeout(function(){

				me.init();
			
			}, 50);
			
		}else if( trigger ){
			
			console.log(this.finalPower);
			
			clearTimeout(this.st);
			
		}

	}
	
}

var bulletDeg = function( bullet, cal ){

	this.rad=0.9;
	this.deg;
	this.angleX=bullet.bulletVelX;
	this.angleY=bullet.bulletVelY;
	
	this.angleY+=cal;

	this.angleX=parseFloat(Math.sqrt(this.rad*this.rad-this.angleY*this.angleY));
	
	if( this.angleY >= 0 && this.angleX >= 0 ){

		this.angleX=this.angleX;
		this.angleY=this.angleY;

	}else if( this.angleX >= this.rad ){

		this.angleX=this.rad;
		this.angleY=parseFloat(Math.sqrt(this.rad*this.rad-this.angleX*this.angleX))

	}else if( this.angleY >= this.rad ){

		this.angleY=this.rad;
		this.angleX=parseFloat(Math.sqrt(this.rad*this.rad-this.angleY*this.angleY))

	}else if( this.angleX <= 0 ){

		this.angleX=0;
		this.angleY=parseFloat(Math.sqrt(this.rad*this.rad-this.angleX*this.angleX))

	}else if( this.angleY <= 0 ){

		this.angleY=0;
		this.angleX=parseFloat(Math.sqrt(this.rad*this.rad-this.angleY*this.angleY))

	}

	bullet.bulletVelX=this.angleX;
	bullet.bulletVelY=this.angleY;
	
	console.log( this.angleX+" , "+this.angleY);
	//console.log( bullet.bulletVelX+" , "+bullet.bulletVelY);

}