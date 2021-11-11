import gdi from "./common/misc/cgdi";
import Raven_Game from "./raven_game";
import MAP_DATA from '../map'

gdi.setCanvas(document.getElementById('canvasWrapper'), MAP_DATA.width, MAP_DATA.height)
const game = new Raven_Game()

function update() {
  gdi.clear()
  game.update()
  game.render()
  requestAnimationFrame(update)
}

update()