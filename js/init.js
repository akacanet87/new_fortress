//	처음에 load 되는 init() 함수 호출
window.addEventListener("load", function() {

	init();

});

// 처음에 load 될 항목들
function init() {

	wrapper = document.getElementById("wrapper"); // 창의 틀
	mask = document.getElementById("mask"); // 게임플레이시 맵을 덮을 mask
	disWin = document.getElementById("disWin"); // 플레이 창 외의 창들을 나타낼 창

	winWidth = window.innerWidth - 10;
	winHeight = window.innerHeight - 10;

	mask.style.top = 5 + "px";
	mask.style.left = 5 + "px";
	mask.style.width = winWidth + "px";
	mask.style.height = winHeight + "px";
	
	gameMap = new theCastleMap();
	cannon = new cannonTank();
	
	gameTank = new tank( cannon );
	
	gameTank.init();
	
	gameMap = new map( mask, gameMap, gameTank );
	
	gameMap.init();
	
	shotPower = new bulletPower();

	shotBullet = new bullet( gameTank, gameMap, shotPower );
	
	//bp = new bulletPower();

	disWin.style.display = "none";

}

