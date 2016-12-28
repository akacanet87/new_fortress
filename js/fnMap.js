function map( mask, selectedMap, selectedTank ){
	
	this.mapBase;
	this.block;
	this.mapBg = selectedMap.bgSrc;
	this.blockImg=selectedMap.blockImg;
	this.blockSize=selectedMap.blockSize;
	this.blockAreaX = selectedMap.blockAreaX;
	this.blockAreaY = selectedMap.blockAreaY;
	this.blockLen = selectedMap.blockLen;
	
	this.init = function(){
		
		this.mapBase = document.createElement("div");
		this.mapBase.style.backgroundImage="url('"+this.mapBg+"')";
		this.mapBase.style.position = "relative";
		this.mapBase.style.width = mapWidth+"px";
		this.mapBase.style.height = mapHeight+"px";
		
		this.mapBase.appendChild(selectedTank.tankImg);
		
		for( var a=0 ; a<this.blockAreaX.length ; a++ ){

			for( var b=0 ; b<this.blockLen[a] ; b++ ){
				
				if( b<this.blockLen[a]/2 ){

					this.block = new oneBlock( selectedMap, selectedTank, this.blockAreaX[a]+(this.blockSize*b), this.blockAreaY[a] );

					this.block.init();

					blockArr[a].push(this.block);

					this.mapBase.appendChild(blockArr[a][b].img);

				}else{

					this.block = new oneBlock( selectedMap, selectedTank, this.blockAreaX[a]+(this.blockSize*(b-this.blockLen[a]/2)), this.blockSize+this.blockAreaY[a] );
					this.block.init();
					blockArr[a].push(this.block);

					this.mapBase.appendChild(blockArr[a][b].img);

				}
				
			}
			
		}
			
		mask.appendChild(this.mapBase);
		
	}
	
}


function oneBlock( selectedMap, selectedTank, x, y ){

	this.img;
	this.blockSize=selectedMap.blockSize;
	this.blockPosX=x;
	this.blockPosY=y;
	this.blockImg=selectedMap.blockImg;
	this.st;

	this.init = function(){

		this.img = document.createElement("img");
		this.img.src=this.blockImg;
		this.img.style.width=this.blockSize+"px";
		this.img.style.height=this.blockSize+"px";
		this.img.style.zIndex=0;
		this.img.style.position="absolute";
		this.img.style.left=this.blockPosX+"px";
		this.img.style.top=this.blockPosY+"px";

	}

}
