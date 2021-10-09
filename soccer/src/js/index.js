import gdi from './common/misc/cgdi';
import {
	WindowWidth,
	WindowHeight,
	TeamSize
} from './constants';
import SoccerPitch from './soccer_pitch';

gdi.setCanvas(document.getElementById('canvasWrapper'), WindowWidth, WindowHeight);
let g_SoccerPitch = new SoccerPitch(WindowWidth, WindowHeight);

let lastTime = (new Date()).getTime();
function render(){
	let currentTime = (new Date()).getTime();
	gdi.clear();
	g_SoccerPitch.update((currentTime - lastTime) / 500);
	g_SoccerPitch.render();
	requestAnimationFrame(render);
	lastTime = currentTime;
}
render();