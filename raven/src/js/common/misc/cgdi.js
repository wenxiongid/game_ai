import Vector2D, { vec2dNormalize } from "../2D/Vector2D";

class GDI{
	constructor() {
		this.RED = 'rgb(255,0,0)';
	  this.BLUE = 'rgb(0,0,255)';
	  this.GREEN = 'rgb(0,255,0)';
	  this.BLACK = 'rgb(0,0,0)';
	  this.PINK = 'rgb(255,200,200)';
	  this.GREY = 'rgb(200,200,200)';
	  this.YELLOW = 'rgb(255,255,0)';
	  this.ORANGE = 'rgb(255,170,0)';
	  this.PURPLE = 'rgb(255,0,170)';
	  this.BROWN = 'rgb(133,90,0)';
	  this.WHITE = 'rgb(255,255,255)';
	  this.DARK_GREEN = 'rgb(0, 100, 0)';
	  this.LIGHT_BLUE = 'rgb(0, 255, 255)';
	  this.LIGHT_GREY = 'rgb(200, 200, 200)';
	  this.LIGHT_PINK = 'rgb(255, 230, 230)';
	  this.TRANSPARENT = 'rgba(0, 0, 0, 0)';
	}
	setCanvas(wrapper, width, height){
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height= height;
		this.ctx = this.canvas.getContext('2d');
		wrapper.appendChild(this.canvas);
	}
	transparentText(){}
	// pen
	normalPen(){ this.ctx.lineWidth = 2; }
	thickPen(){ this.ctx.lineWidth = 1; }
	blackPen(){ this.ctx.strokeStyle = this.BLACK; this.normalPen(); }
	whitePen(){ this.ctx.strokeStyle = this.WHITE; this.normalPen(); }
	redPen(){ this.ctx.strokeStyle = this.RED; this.normalPen(); }
	greenPen(){ this.ctx.strokeStyle = this.GREEN; this.normalPen(); }
	bluePen(){ this.ctx.strokeStyle = this.BLUE; this.normalPen(); }
	greyPen(){ this.ctx.strokeStyle = this.GREY; this.normalPen(); }
	pinkPen(){ this.ctx.strokeStyle = this.PINK; this.normalPen(); }
	yellowPen(){ this.ctx.strokeStyle = this.YELLOW; this.normalPen(); }
	orangePen(){ this.ctx.strokeStyle = this.ORANGE; this.normalPen(); }
	purplePen(){ this.ctx.strokeStyle = this.PURPLE; this.normalPen(); }
	brownPen(){ this.ctx.strokeStyle = this.BROWN; this.normalPen(); }
	darkGreenPen(){ this.ctx.strokeStyle = this.DARK_GREEN; this.normalPen(); }
	lightBluePen(){ this.ctx.strokeStyle = this.LIGHT_BLUE; this.normalPen(); }
	lightGreyPen(){ this.ctx.strokeStyle = this.LIGHT_GREY; this.normalPen(); }
	lightPinkPen(){ this.ctx.strokeStyle = this.LIGHT_PINK; this.normalPen(); }
	setPenColor(color) {this.ctx.strokeStyle = color}
	// brush
	redBrush(){ this.ctx.fillStyle = this.RED; }
	greyBrush(){ this.ctx.fillStyle = this.GREY; }
	blueBrush(){ this.ctx.fillStyle = this.BLUE; }
	yellowBrush(){ this.ctx.fillStyle = this.YELLOW; }
	greenBrush(){ this.ctx.fillStyle = this.GREEN; }
	brownBrush(){ this.ctx.fillStyle = this.BROWN; }
	darkGreenBrush(){ this.ctx.fillStyle = this.DARK_GREEN; }
	whiteBrush(){ this.ctx.fillStyle = this.WHITE; }
	blackBrush(){ this.ctx.fillStyle = this.BLACK; }
	orangeBrush(){ this.ctx.fillStyle = this.ORANGE; }
	hollowBrush(){ this.ctx.fillStyle = this.TRANSPARENT; }
	thickBlackPen(){
		this.blackPen();
		this.thickPen();
	}
	thickRedPen(){
		this.redPen();
		this.thickPen();
	}
	thickBluePen(){
		this.bluePen();
		this.thickPen();
	}
	thickGreenPen(){
		this.greenPen();
		this.thickPen();
	}
	textColor(color){
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = color;
	}
	textAtPos(x, y, text){
		this.ctx.fillText(text, x, y);
	}
	circle(pos, r){
		this.ctx.beginPath();
		this.ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
		this.ctx.stroke();
		this.ctx.fill();
	}
	line(startPos, endPos){
		this.ctx.beginPath();
		this.ctx.moveTo(startPos.x, startPos.y);
		this.ctx.lineTo(endPos.x, endPos.y);
		this.ctx.stroke();
	}
	lineWithArrow(from, to, size) {
		const norm = vec2dNormalize(new Vector2D(to.x - from.x, to.y - from.y))
		const crossingPoint = to.add(norm.crossNum(size).getReverse())
		const arrowPoint1 = crossingPoint.add(norm.perp().crossNum(0.4 * size))
		const arrowPoint2 = crossingPoint.add(norm.perp().crossNum(0.4 * size).getReverse())
		this.ctx.beginPath();
		this.ctx.moveTo(from.x, from.y)
		this.ctx.lineTo(crossingPoint.x, crossingPoint.y)
		this.ctx.lineTo(arrowPoint1.x, arrowPoint1.y)
		this.ctx.lineTo(to.x, to.y)
		this.ctx.lineTo(arrowPoint2.x, arrowPoint2.y)
		this.ctx.lineTo(crossingPoint.x, crossingPoint.y)
		this.ctx.stroke();
		this.ctx.fill();
	}
	closedShape(posList){
		this.ctx.beginPath();
		for(let i = 0; i < posList.length - 1; i++){
			this.ctx.moveTo(posList[i].x, posList[i].y);
			this.ctx.lineTo(posList[i + 1].x, posList[i + 1].y);
		}
		this.ctx.moveTo(posList[posList.length - 1].x, posList[posList.length - 1].y);
		this.ctx.lineTo(posList[0].x, posList[0].y);
		this.ctx.stroke();
		this.ctx.fill();
	}
	polyLine(points) {
		if(points.length < 2) return
		this.ctx.moveTo(points[0].x, points[0].y)
		for (let i = 1; i < points.length; i++) {
			const p = points[i];
			this.ctx.lineTo(p.x, p.y)
		}
	}
	rect(x1, y1, x2, y2){
		let startX = Math.min(x1, x2);
		let startY = Math.min(y1, y2);
		this.ctx.beginPath();
		this.ctx.rect(startX, startY, Math.abs(x1 - x2), Math.abs(y1 - y2));
		this.ctx.stroke();
		this.ctx.fill();
	}
	clear(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

const gdi = new GDI();

export default gdi;