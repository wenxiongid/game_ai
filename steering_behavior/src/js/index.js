import gdi from './common/misc/cgdi';
import GameWorld from './game_world';

const WIDTH = 600;
const HEIGHT = 600;

gdi.setCanvas(document.getElementById('canvasWrapper'), WIDTH, HEIGHT);
let g_GameWorld = new GameWorld(WIDTH, HEIGHT);

document.addEventListener('keydown', function(e){
	g_GameWorld.handleKeyPresses(e.key);
});

let lastTime = (new Date()).getTime();
function render(){
	let currentTime = (new Date()).getTime();
	gdi.clear();
	g_GameWorld.update((currentTime - lastTime) / 1000);
	g_GameWorld.render();
	requestAnimationFrame(render);
	lastTime = currentTime;
}
render();