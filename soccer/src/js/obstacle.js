import gdi from './common/misc/cgdi';
import BaseGameEntity from './base_game_entity';
import Vector2D from './common/2d/vector2d';

class Obstacle extends BaseGameEntity{
	constructor(x, y, r) {
		super(0, new Vector2D(x, y), r);
	}
	update(time_elapsed){}
	render(){
		gdi.blackPen();
		gdi.circle(this.pos(), this.bRadius());
	}
}

export default Obstacle;