function tank( selectedTank ){
	
	this.tankMainImg;
	this.tankImg;
	this.tankImgSrc=selectedTank.tankImg;
	this.tankWidth=selectedTank.tankWidth;
	this.tankHeight=selectedTank.tankHeight;
	this.tankVelX=0;
	this.tankVelY=0;
	this.tankPosX=50;
	this.tankPosY=50;
	this.tankSide=true;
	this.tankHp=selectedTank.tankHp;
	
	this.bulletImg=selectedTank.bulletImg;
	this.bulletWidth=selectedTank.bulletWidth;
	this.bulletHeight=selectedTank.bulletHeight;
	
	this.gravity = gravity;
	this.isFalling;
	this.st;
	
	this.init = function(){
		
		this.tankImg=document.createElement("img");
		
		this.tankImg.src=this.tankImgSrc;
		this.tankImg.style.width=this.tankWidth+"px";
		this.tankImg.style.height=this.tankHeight+"px";
		this.tankImg.style.position="absolute";
		this.tankImg.style.zIndex=0;
		this.tankImg.style.left=this.tankPosX+"px";
		this.tankImg.style.top=this.tankPosY+"px";
		
		this.move();
		
	}
	
	this.move = function(){
		
		var me = this;
		
		if(this.tankSide){
			
			this.tankImg.style.transform="rotateY(0deg)";

		}else{

			this.tankImg.style.transform="rotateY(180deg)";

		}
		
		if( !this.isFalling ){
			
			this.tankVelY=0;
			
		}else{
			
			this.tankVelY+=this.gravity;
			
		}
		
		this.tankPosX+=this.tankVelX;
		this.tankPosY+=this.tankVelY;
		
		this.tankImg.style.left=this.tankPosX+"px";
		this.tankImg.style.top=this.tankPosY+"px";
	
		this.fallingTest();
		
		if( !this.isDead() ) {
			
			this.st = setTimeout(function(){
				
				me.move();
				
			}, 10);
			
		}else if ( this.isDead() ){
			
			this.st = clearTimeout();
			console.log("탱크 죽음");
			
		}
		
	}
	
	this.isDead = function(){
		
		var result=false;
		
		if( ( this.tankPosX+this.tankWidth < 0 ) || ( this.tankPosX > mapWidth ) || ( this.tankPosY > mapHeight ) || ( this.tankHp <= 0 ) ){
			
			result=true;
			
		}
		
		return result;
		
	}
	
	this.fallingTest = function(){ 
		
		for( var a=0 ; a<blockArr.length ; a++ ){
			
			for( var b=0 ; b<blockArr[a].length ; b++ ){
				
				if(blockArr[a][b]!=undefined){
				
					if( hitTest( blockArr[a][b].img, this.tankImg ) ){
	
						this.isFalling=false;
						
						return;
						
					}else if( !hitTest( blockArr[a][b].img, this.tankImg ) ){
		
						this.isFalling=true;
						
					}				
					
				}
				
			}
			
		}
		
	}
	
}