/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _constants = __webpack_require__(2);
	
	var _soccer_pitch = __webpack_require__(3);
	
	var _soccer_pitch2 = _interopRequireDefault(_soccer_pitch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_cgdi2.default.setCanvas(document.getElementById('canvasWrapper'), _constants.WindowWidth, _constants.WindowHeight);
	var g_SoccerPitch = new _soccer_pitch2.default(_constants.WindowWidth, _constants.WindowHeight);
	
	var lastTime = new Date().getTime();
	function render() {
		var currentTime = new Date().getTime();
		_cgdi2.default.clear();
		g_SoccerPitch.update((currentTime - lastTime) / 500);
		g_SoccerPitch.render();
		requestAnimationFrame(render);
		lastTime = currentTime;
	}
	render();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GDI = function () {
		function GDI() {
			_classCallCheck(this, GDI);
	
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
	
		_createClass(GDI, [{
			key: 'setCanvas',
			value: function setCanvas(wrapper, width, height) {
				this.canvas = document.createElement('canvas');
				this.canvas.width = width;
				this.canvas.height = height;
				this.ctx = this.canvas.getContext('2d');
				wrapper.appendChild(this.canvas);
			}
		}, {
			key: 'transparentText',
			value: function transparentText() {}
			// pen
	
		}, {
			key: 'normalPen',
			value: function normalPen() {
				this.ctx.lineWidth = 2;
			}
		}, {
			key: 'thickPen',
			value: function thickPen() {
				this.ctx.lineWidth = 1;
			}
		}, {
			key: 'blackPen',
			value: function blackPen() {
				this.ctx.strokeStyle = this.BLACK;this.normalPen();
			}
		}, {
			key: 'whitePen',
			value: function whitePen() {
				this.ctx.strokeStyle = this.WHITE;this.normalPen();
			}
		}, {
			key: 'redPen',
			value: function redPen() {
				this.ctx.strokeStyle = this.RED;this.normalPen();
			}
		}, {
			key: 'greenPen',
			value: function greenPen() {
				this.ctx.strokeStyle = this.GREEN;this.normalPen();
			}
		}, {
			key: 'bluePen',
			value: function bluePen() {
				this.ctx.strokeStyle = this.BLUE;this.normalPen();
			}
		}, {
			key: 'greyPen',
			value: function greyPen() {
				this.ctx.strokeStyle = this.GREY;this.normalPen();
			}
		}, {
			key: 'pinkPen',
			value: function pinkPen() {
				this.ctx.strokeStyle = this.PINK;this.normalPen();
			}
		}, {
			key: 'yellowPen',
			value: function yellowPen() {
				this.ctx.strokeStyle = this.YELLOW;this.normalPen();
			}
		}, {
			key: 'orangePen',
			value: function orangePen() {
				this.ctx.strokeStyle = this.ORANGE;this.normalPen();
			}
		}, {
			key: 'purplePen',
			value: function purplePen() {
				this.ctx.strokeStyle = this.PURPLE;this.normalPen();
			}
		}, {
			key: 'brownPen',
			value: function brownPen() {
				this.ctx.strokeStyle = this.BROWN;this.normalPen();
			}
		}, {
			key: 'darkGreenPen',
			value: function darkGreenPen() {
				this.ctx.strokeStyle = this.DARK_GREEN;this.normalPen();
			}
		}, {
			key: 'lightBluePen',
			value: function lightBluePen() {
				this.ctx.strokeStyle = this.LIGHT_BLUE;this.normalPen();
			}
		}, {
			key: 'lightGreyPen',
			value: function lightGreyPen() {
				this.ctx.strokeStyle = this.LIGHT_GREY;this.normalPen();
			}
		}, {
			key: 'lightPinkPen',
			value: function lightPinkPen() {
				this.ctx.strokeStyle = this.LIGHT_PINK;this.normalPen();
			}
			// brush
	
		}, {
			key: 'brownBrush',
			value: function brownBrush() {
				this.ctx.fillStyle = this.BROWN;
			}
		}, {
			key: 'darkGreenBrush',
			value: function darkGreenBrush() {
				this.ctx.fillStyle = this.DARK_GREEN;
			}
		}, {
			key: 'whiteBrush',
			value: function whiteBrush() {
				this.ctx.fillStyle = this.WHITE;
			}
		}, {
			key: 'blackBrush',
			value: function blackBrush() {
				this.ctx.fillStyle = this.BLACK;
			}
		}, {
			key: 'hollowBrush',
			value: function hollowBrush() {
				this.ctx.fillStyle = this.TRANSPARENT;
			}
		}, {
			key: 'thickRedPen',
			value: function thickRedPen() {
				this.redPen();
				this.thickPen();
			}
		}, {
			key: 'textColor',
			value: function textColor(color) {
				this.ctx.strokeStyle = color;
				this.ctx.fillStyle = color;
			}
		}, {
			key: 'textAtPos',
			value: function textAtPos(x, y, text) {
				this.ctx.fillText(text, x, y);
			}
		}, {
			key: 'circle',
			value: function circle(pos, r) {
				this.ctx.beginPath();
				this.ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
				this.ctx.stroke();
				this.ctx.fill();
			}
		}, {
			key: 'line',
			value: function line(startPos, endPos) {
				this.ctx.beginPath();
				this.ctx.moveTo(startPos.x, startPos.y);
				this.ctx.lineTo(endPos.x, endPos.y);
				this.ctx.stroke();
			}
		}, {
			key: 'closedShape',
			value: function closedShape(posList) {
				this.ctx.beginPath();
				for (var i = 0; i < posList.length - 1; i++) {
					this.ctx.moveTo(posList[i].x, posList[i].y);
					this.ctx.lineTo(posList[i + 1].x, posList[i + 1].y);
				}
				this.ctx.moveTo(posList[posList.length - 1].x, posList[posList.length - 1].y);
				this.ctx.lineTo(posList[0].x, posList[0].y);
				this.ctx.stroke();
				this.ctx.fill();
			}
		}, {
			key: 'rect',
			value: function rect(x1, y1, x2, y2) {
				var startX = Math.min(x1, x2);
				var startY = Math.min(y1, y2);
				this.ctx.beginPath();
				this.ctx.rect(startX, startY, Math.abs(x1 - x2), Math.abs(y1 - y2));
				this.ctx.stroke();
				this.ctx.fill();
			}
		}, {
			key: 'clear',
			value: function clear() {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
		}]);
	
		return GDI;
	}();
	
	var gdi = new GDI();
	
	exports.default = gdi;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var WindowWidth = 700;
	var WindowHeight = 400;
	var TeamSize = 5;
	
	exports.WindowWidth = WindowWidth;
	exports.WindowHeight = WindowHeight;
	exports.TeamSize = TeamSize;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _region = __webpack_require__(4);
	
	var _region2 = _interopRequireDefault(_region);
	
	var _goal = __webpack_require__(6);
	
	var _goal2 = _interopRequireDefault(_goal);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _soccer_ball = __webpack_require__(11);
	
	var _soccer_ball2 = _interopRequireDefault(_soccer_ball);
	
	var _soccer_team = __webpack_require__(16);
	
	var _soccer_team2 = _interopRequireDefault(_soccer_team);
	
	var _wall2d = __webpack_require__(33);
	
	var _wall2d2 = _interopRequireDefault(_wall2d);
	
	var _team_state = __webpack_require__(18);
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NumRegionsHorizontal = 6;
	var NumRegionsVertical = 3;
	
	var SoccerPitch = function () {
		function SoccerPitch(cxClient, cyClient) {
			_classCallCheck(this, SoccerPitch);
	
			this.m_vecWalls = [];
			this.m_pPlayingArea = new _region2.default(20, 20, cxClient - 20, cyClient - 20);
			this.m_Regions = [];
			this.m_bGoalKeeperHasBall = false;
			this.m_bGameOn = true;
			this.m_bPaused = false;
			this.m_cxClient = cxClient;
			this.m_cyClient = cyClient;
			this.createRegions(this.playingArea().width() / NumRegionsHorizontal, this.playingArea().height() / NumRegionsVertical);
			this.m_pRedGoal = new _goal2.default(new _vector2d2.default(this.m_pPlayingArea.left(), (cyClient - _params2.default.GoalWidth) / 2), new _vector2d2.default(this.m_pPlayingArea.left(), (cyClient + _params2.default.GoalWidth) / 2), new _vector2d2.default(1, 0));
			this.m_pBlueGoal = new _goal2.default(new _vector2d2.default(this.m_pPlayingArea.right(), (cyClient - _params2.default.GoalWidth) / 2), new _vector2d2.default(this.m_pPlayingArea.right(), (cyClient + _params2.default.GoalWidth) / 2), new _vector2d2.default(-1, 0));
			var topLeft = new _vector2d2.default(this.m_pPlayingArea.left(), this.m_pPlayingArea.top());
			var topRight = new _vector2d2.default(this.m_pPlayingArea.right(), this.m_pPlayingArea.top());
			var bottomRight = new _vector2d2.default(this.m_pPlayingArea.right(), this.m_pPlayingArea.bottom());
			var bottomLeft = new _vector2d2.default(this.m_pPlayingArea.left(), this.m_pPlayingArea.bottom());
			this.m_vecWalls.push(new _wall2d2.default(bottomLeft, this.m_pRedGoal.rightPost()));
			this.m_vecWalls.push(new _wall2d2.default(this.m_pRedGoal.leftPost(), topLeft));
			this.m_vecWalls.push(new _wall2d2.default(topLeft, topRight));
			this.m_vecWalls.push(new _wall2d2.default(topRight, this.m_pBlueGoal.leftPost()));
			this.m_vecWalls.push(new _wall2d2.default(this.m_pBlueGoal.rightPost(), bottomRight));
			this.m_vecWalls.push(new _wall2d2.default(bottomRight, bottomLeft));
			this.m_pBall = new _soccer_ball2.default(new _vector2d2.default(this.m_cxClient / 2, this.m_cyClient / 2), _params2.default.BallSize, _params2.default.BallMass, this.m_vecWalls);
			this.m_pRedTeam = new _soccer_team2.default(this.m_pRedGoal, this.m_pBlueGoal, this, _soccer_team.TEAM_COLOR.red);
			this.m_pBlueTeam = new _soccer_team2.default(this.m_pBlueGoal, this.m_pRedGoal, this, _soccer_team.TEAM_COLOR.blue);
			this.m_pRedTeam.setOpponents(this.m_pBlueTeam);
			this.m_pBlueTeam.setOpponents(this.m_pRedTeam);
		}
	
		_createClass(SoccerPitch, [{
			key: 'createRegions',
			value: function createRegions(width, height) {
				var idx = NumRegionsHorizontal * NumRegionsVertical - 1;
				for (var col = 0; col < NumRegionsHorizontal; col++) {
					for (var row = 0; row < NumRegionsVertical; row++) {
						this.m_Regions[idx--] = new _region2.default(this.playingArea().left() + col * width, this.playingArea().top() + row * height, this.playingArea().left() + (col + 1) * width, this.playingArea().top() + (row + 1) * height, idx);
					}
				}
			}
		}, {
			key: 'update',
			value: function update(timeElapsed) {
				if (this.m_bPaused) {
					return;
				}
				var tick = 0;
				this.m_pBall.update(timeElapsed);
				this.m_pRedTeam.update(timeElapsed);
				this.m_pBlueTeam.update(timeElapsed);
				if (this.m_pBlueGoal.scored(this.m_pBall) || this.m_pRedGoal.scored(this.m_pBall)) {
					this.m_bGameOn = false;
					this.m_pBall.placeAtPosition(new _vector2d2.default(this.m_cxClient / 2, this.m_cyClient / 2));
					this.m_pRedTeam.getFSM().changeState(_team_state.PrepareForKickOff);
					this.m_pBlueTeam.getFSM().changeState(_team_state.PrepareForKickOff);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_cgdi2.default.darkGreenPen();
				_cgdi2.default.darkGreenBrush();
				_cgdi2.default.rect(0, 0, this.m_cxClient, this.m_cyClient);
				if (_params2.default.ViewRegions) {
					for (var r = 0; r < this.m_Regions.length; r++) {
						this.m_Regions[r].render(true);
					}
				}
				_cgdi2.default.hollowBrush();
				//red goal
				_cgdi2.default.redPen();
				_cgdi2.default.rect(this.m_pPlayingArea.left(), (this.m_cyClient - _params2.default.GoalWidth) / 2, this.m_pPlayingArea.left() + 40, this.m_cyClient - (this.m_cyClient - _params2.default.GoalWidth) / 2);
				// blue goal
				_cgdi2.default.bluePen();
				_cgdi2.default.rect(this.m_pPlayingArea.right(), (this.m_cyClient - _params2.default.GoalWidth) / 2, this.m_pPlayingArea.right() - 40, this.m_cyClient - (this.m_cyClient - _params2.default.GoalWidth) / 2);
				// pitch marking
				_cgdi2.default.whitePen();
				_cgdi2.default.circle(this.m_pPlayingArea.center(), this.m_pPlayingArea.width() * 0.125);
				_cgdi2.default.line(new _vector2d2.default(this.m_pPlayingArea.center().x, this.m_pPlayingArea.top()), new _vector2d2.default(this.m_pPlayingArea.center().x, this.m_pPlayingArea.bottom()));
				_cgdi2.default.circle(this.m_pPlayingArea.center(), 2);
				// ball
				_cgdi2.default.whitePen();
				_cgdi2.default.whiteBrush();
				this.m_pBall.render();
				// team
				this.m_pRedTeam.render();
				this.m_pBlueTeam.render();
				// walls
				_cgdi2.default.whitePen();
				for (var w = 0; w < this.m_vecWalls.length; w++) {
					this.m_vecWalls[w].render();
				}
				_cgdi2.default.textColor(_cgdi2.default.RED);
				_cgdi2.default.textAtPos(this.m_cxClient / 2 - 50, this.m_cyClient - 18, 'Red: ' + this.m_pBlueGoal.numGoalsScored());
				_cgdi2.default.textColor(_cgdi2.default.BLUE);
				_cgdi2.default.textAtPos(this.m_cxClient / 2 + 10, this.m_cyClient - 18, 'Blue: ' + this.m_pRedGoal.numGoalsScored());
				return true;
			}
		}, {
			key: 'togglePause',
			value: function togglePause() {
				this.m_bPaused = !this.m_bPaused;
			}
		}, {
			key: 'paused',
			value: function paused() {
				return this.m_bPaused;
			}
		}, {
			key: 'cxClient',
			value: function cxClient() {
				return this.m_cxClient;
			}
		}, {
			key: 'cyClient',
			value: function cyClient() {
				return this.m_cyClient;
			}
		}, {
			key: 'goalKeeperHasBall',
			value: function goalKeeperHasBall() {
				return this.m_bGoalKeeperHasBall;
			}
		}, {
			key: 'setGoalKeeperHasBall',
			value: function setGoalKeeperHasBall(b) {
				this.m_bGoalKeeperHasBall = b;
			}
		}, {
			key: 'playingArea',
			value: function playingArea() {
				return this.m_pPlayingArea;
			}
		}, {
			key: 'walls',
			value: function walls() {
				return this.m_vecWalls;
			}
		}, {
			key: 'ball',
			value: function ball() {
				return this.m_pBall;
			}
		}, {
			key: 'getRegionFromIndex',
			value: function getRegionFromIndex(idx) {
				if (idx >= 0 && idx < this.m_Regions.length) {
					return this.m_Regions[idx];
				}
			}
		}, {
			key: 'gameOn',
			value: function gameOn() {
				return this.m_bGameOn;
			}
		}, {
			key: 'setGameOn',
			value: function setGameOn() {
				this.m_bGameOn = true;
			}
		}, {
			key: 'setGameOff',
			value: function setGameOff() {
				this.m_bGameOn = false;
			}
		}]);
	
		return SoccerPitch;
	}();
	
	exports.default = SoccerPitch;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Region = function () {
		function Region(left, top, right, bottom) {
			var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
	
			_classCallCheck(this, Region);
	
			this.m_dTop = top || 0;
			this.m_dLeft = left || 0;
			this.m_dRight = right || 0;
			this.m_dBottom = bottom || 0;
			this.m_dWidth = Math.abs(right - left);
			this.m_dHeight = Math.abs(bottom - top);
			this.m_vCenter = new _vector2d2.default((left + right) / 2, (top + bottom) / 2);
			this.m_iID = id;
		}
	
		_createClass(Region, [{
			key: 'render',
			value: function render() {
				var showID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
				_cgdi2.default.hollowBrush();
				_cgdi2.default.greenPen();
				_cgdi2.default.rect(this.m_dLeft, this.m_dTop, this.m_dRight, this.m_dBottom);
				if (showID) {
					_cgdi2.default.textColor(_cgdi2.default.green);
					_cgdi2.default.textAtPos(this.center(), this.id());
				}
			}
		}, {
			key: 'inside',
			value: function inside(pos) {
				var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'NORMAL';
	
				if (r == 'NORMAL') {
					return pos.x > this.m_dLeft && pos.x < this.m_dRight && pos.y > this.m_dTop && pos.y < this.m_dBottom;
				} else {
					var marginX = this.width() * 0.25;
					var marginY = this.height() * 0.25;
					return pos.x > this.m_dLeft + marginX && pos.x < this.m_dRight - marginX && pos.y > this.m_dTop + marginY && pos.y < this.m_dBottom - marginY;
				}
			}
		}, {
			key: 'getRandomPosition',
			value: function getRandomPosition() {
				return new _vector2d2.default(this.m_dLeft + Math.random() * (this.m_dRight - this.m_dLeft), this.m_dTop + Math.random() * (this.m_dBottom - this.m_dTop));
			}
		}, {
			key: 'top',
			value: function top() {
				return this.m_dTop;
			}
		}, {
			key: 'bottom',
			value: function bottom() {
				return this.m_dBottom;
			}
		}, {
			key: 'left',
			value: function left() {
				return this.m_dLeft;
			}
		}, {
			key: 'right',
			value: function right() {
				return this.m_dRight;
			}
		}, {
			key: 'width',
			value: function width() {
				return Math.abs(this.m_dRight - this.m_dLeft);
			}
		}, {
			key: 'height',
			value: function height() {
				return Math.abs(this.m_dBottom - this.m_dTop);
			}
		}, {
			key: 'length',
			value: function length() {
				return Math.max(this.width(), this.height());
			}
		}, {
			key: 'breadth',
			value: function breadth() {
				return Math.min(this.width(), this.height());
			}
		}, {
			key: 'center',
			value: function center() {
				return this.m_vCenter;
			}
		}, {
			key: 'id',
			value: function id() {
				return this.m_iID;
			}
		}]);
	
		return Region;
	}();
	
	exports.default = Region;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CLOCKWISE = 1;
	var ANTICLOCKWISE = -1;
	
	var Vector2D = function () {
		function Vector2D(x, y) {
			_classCallCheck(this, Vector2D);
	
			this.x = x || 0;
			this.y = y || 0;
		}
	
		_createClass(Vector2D, [{
			key: "zero",
			value: function zero() {
				this.x = 0;
				this.y = 0;
			}
		}, {
			key: "isZero",
			value: function isZero() {
				return this.x * this.x + this.y * this.y <= 0;
			}
		}, {
			key: "length",
			value: function length() {
				return Math.sqrt(this.lengthSq());
			}
		}, {
			key: "lengthSq",
			value: function lengthSq() {
				return Math.pow(this.x, 2) + Math.pow(this.y, 2);
			}
		}, {
			key: "normalize",
			value: function normalize() {
				var length = this.length();
				this.x /= length;
				this.y /= length;
				return this;
			}
		}, {
			key: "add",
			value: function add(vec) {
				return new Vector2D(this.x + vec.x, this.y + vec.y);
			}
		}, {
			key: "crossNum",
			value: function crossNum(val) {
				return new Vector2D(this.x * val, this.y * val);
			}
		}, {
			key: "dot",
			value: function dot(vec) {
				return this.x * vec.x + this.y * vec.y;
			}
		}, {
			key: "sign",
			value: function sign(vec) {
				// Y axis pointing down, x axis pointing right
				if (this.y * vec.x > this.x * vec.y) {
					return ANTICLOCKWISE;
				} else {
					return CLOCKWISE;
				}
			}
		}, {
			key: "perp",
			value: function perp() {
				return new Vector2D(-this.y, this.x);
			}
		}, {
			key: "distance",
			value: function distance(vec) {
				return Math.sqrt(this.distanceSq(vec));
			}
		}, {
			key: "distanceSq",
			value: function distanceSq(vec) {
				var xDiff = vec.x - this.x;
				var yDiff = vec.y - this.y;
				return xDiff * xDiff + yDiff * yDiff;
			}
		}, {
			key: "truncate",
			value: function truncate(max) {
				if (this.length() > max) {
					this.normalize();
					this.x *= max;
					this.y *= max;
				}
			}
		}, {
			key: "getReverse",
			value: function getReverse() {
				return new Vector2D(-this.x, -this.y);
			}
		}, {
			key: "reflect",
			value: function reflect(normVec) {
				var diff = normVec.getReverse().crossNum(2 * this.dot(normVec));
				this.x += diff.x;
				this.y += diff.y;
			}
		}, {
			key: "clone",
			value: function clone() {
				return new Vector2D(this.x, this.y);
			}
		}]);
	
		return Vector2D;
	}();
	
	function vec2dNormalize(vec) {
		var length = vec.length();
		return new Vector2D(vec.x / length, vec.y / length);
	}
	
	function wrapAround(pos, maxX, maxY) {
		if (pos.x > maxX) {
			pos.x = 0;
		}
		if (pos.x < 0) {
			pos.x = maxX;
		}
		if (pos.y > maxY) {
			pos.y = 0;
		}
		if (pos.y < 0) {
			pos.y = maxY;
		}
	}
	
	function vec2DDistanceSq(v1, v2) {
		var ySeparation = v2.y - v1.y;
		var xSeparation = v2.x - v1.x;
		return ySeparation * ySeparation + xSeparation * xSeparation;
	}
	
	function vec2DDistance(v1, v2) {
		return Math.sqrt(vec2DDistanceSq(v1, v2));
	}
	
	exports.default = Vector2D;
	exports.vec2dNormalize = vec2dNormalize;
	exports.wrapAround = wrapAround;
	exports.vec2DDistanceSq = vec2DDistanceSq;
	exports.vec2DDistance = vec2DDistance;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _geometry = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Goal = function () {
		function Goal(left, right, facing) {
			_classCallCheck(this, Goal);
	
			this.m_vLeftPost = left;
			this.m_vRightPost = right;
			this.m_vFacing = facing;
			this.m_vCenter = left.add(right).crossNum(1 / 2);
			this.m_iNumGoalsScored = 0;
		}
	
		_createClass(Goal, [{
			key: 'scored',
			value: function scored(ball) {
				var scoreInfo = (0, _geometry.lineIntersection2D)(ball.pos(), ball.oldPos(), this.m_vLeftPost, this.m_vRightPost);
				if (scoreInfo.result) {
					++this.m_iNumGoalsScored;
					return true;
				}
				return false;
			}
		}, {
			key: 'center',
			value: function center() {
				return this.m_vCenter;
			}
		}, {
			key: 'facing',
			value: function facing() {
				return this.m_vFacing;
			}
		}, {
			key: 'leftPost',
			value: function leftPost() {
				return this.m_vLeftPost;
			}
		}, {
			key: 'rightPost',
			value: function rightPost() {
				return this.m_vRightPost;
			}
		}, {
			key: 'numGoalsScored',
			value: function numGoalsScored() {
				return this.m_iNumGoalsScored;
			}
		}, {
			key: 'resetGoalScored',
			value: function resetGoalScored() {
				this.m_iNumGoalsScored = 0;
			}
		}]);
	
		return Goal;
	}();
	
	exports.default = Goal;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getLineSegmentCircleClosestIntersectionPoint = exports.lineSegmentCircleIntersection = exports.pointInCircle = exports.circleArea = exports.twoCirclesIntersectionArea = exports.twoCirclesIntersectionPoints = exports.twoCirclesEnclosed = exports.twoCirclesOverlapped = exports.segmentObjectIntersection2D = exports.objectIntersection2D = exports.lineIntersection2D = exports.distToLineSegmentSq = exports.distToLineSegment = exports.getTangentPoints = exports.doRayCircleIntersect = exports.getRayCircleIntersect = exports.whereIsPoint = exports.distanceToRayPlaneIntersection = undefined;
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _transformations = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isEqual(a, b) {
		return Math.abs(a - b) < 1e-12;
	}
	
	function distanceToRayPlaneIntersection(rayOrigin, rayHeading, planePoint, planeNormal) {
		var d = -planeNormal.dot(planePoint);
		var numer = planeNormal.dot(rayOrigin) + d;
		var denom = planeNormal.dot(rayHeading);
		if (denom < 0.000001 && denom > -0.000001) {
			return -1;
		}
		return -(numer / denom);
	}
	
	function whereIsPoint(point, pointOnPlane, planeNormal) {
		var dir = pointOnPlane.add(point.getReverse());
		var d = dir.dot(planeNormal);
		switch (true) {
			case d < -0.000001:
				return 'PLANE_FRONT';
			case d > 0.000001:
				return 'PLANE_BACKSIDE';
			default:
				return 'ON_PLANE';
		}
	}
	
	function getRayCircleIntersect(rayOrigin, rayHeading, circleOrigin, radius) {
		var toCircle = circleOrigin.add(rayOrigin.getReverse());
		var length = toCircle.length();
		var v = toCircle.dot(rayHeading);
		var d = radius * radius - (length * length - v * v);
		if (d < 0) return -1;
		return v - Math.sqrt(d);
	}
	
	function doRayCircleIntersect(rayOrigin, rayHeading, circleOrigin, radius) {
		var toCircle = circleOrigin.add(rayOrigin.getReverse());
		var length = toCircle.length();
		var d = radius * radius - (length * length - v * v);
		return d < 0;
	}
	
	function getTangentPoints(circleOrigin, radius, point, T1, T2) {
		var toCircle = circleOrigin.add(point.getReverse());
		var lengthSq = toCircle.lengthSq();
		var rSq = radius * radius;
		if (lengthSq <= rSq) {
			return false;
		}
		var invLengthSq = 1 / lengthSq;
		var Root = Math.sqrt(Math.abs(lengthSq - rSq));
		T1.x = circleOrigin.x + radius * (radius * toCircle.x - toCircle.y * Root) * invLengthSq;
		T1.y = circleOrigin.y + radius * (radius * toCircle.y + toCircle.x * Root) * invLengthSq;
		T2.x = circleOrigin.x + radius * (radius * toCircle.x + toCircle.y * Root) * invLengthSq;
		T2.y = circleOrigin.y + radius * (radius * toCircle.y - toCircle.x * Root) * invLengthSq;
		return true;
	}
	
	function distToLineSegment(A, B, P) {
		var dotA = (P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y);
		if (dotA <= 0) {
			return (0, _vector2d.vec2DDistance)(A, P);
		}
		var dotB = (P.x - B.x) * (A.x - B.x) + (P.y - B.y) * (A.y - B.y);
		if (dotB <= 0) {
			return (0, _vector2d.vec2DDistance)(B, P);
		}
		var point = A.add(B.add(A.getReverse()).crossNum(dotA / (dotA + dotB)));
		return (0, _vector2d.vec2DDistance)(P, point);
	}
	
	function distToLineSegmentSq(A, B, P) {
		var dotA = (P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y);
		if (dotA <= 0) {
			return (0, _vector2d.vec2DDistanceSq)(A, P);
		}
		var dotB = (P.x - B.x) * (A.x - B.x) + (P.y - B.y) * (A.y - B.y);
		if (dotB <= 0) {
			return (0, _vector2d.vec2DDistanceSq)(B, P);
		}
		var point = A.add(B.add(A.getReverse()).crossNum(dotA / (dotA + dotB)));
		return (0, _vector2d.vec2DDistanceSq)(P, point);
	}
	
	function lineIntersection2D(A, B, C, D, dist, point) {
		var ret = {
			result: false
		};
		if (typeof dist != 'undefined') {
			ret.dist = dist;
		}
		if (typeof point != 'undefined') {
			ret.point = point;
		}
		var rTop = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
		var sTop = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
		var Bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		if (Bot == 0) {
			if (typeof dist != 'undefined' && typeof point == 'undefined') {
				if (isEqual(rTop, 0) && isEqual(sTop, 0)) {
					ret.result = true;
					return ret;
				}
			}
			ret.result = false;
			return ret;
		}
		var invBot = 1 / Bot;
		var r = rTop * invBot;
		var s = sTop * invBot;
		if (r > 0 && r < 1 && s > 0 && s < 1) {
			if (typeof ret.dist != 'undefined') {
				ret.dist = (0, _vector2d.vec2DDistance)(A, B) * r;
			}
			if (typeof ret.point != 'undefined') {
				ret.point = A.add(B.add(A.getReverse()).crossNum(r));
			}
			ret.result = true;
			return ret;
		} else {
			if (typeof ret.dist != 'undefined') {
				ret.dist = 0;
			}
			ret.result = false;
			return ret;
		}
	}
	
	function objectIntersection2D(obj1, obj2) {
		for (var r = 0; r < obj1.length - 1; r++) {
			for (var t = 0; t < obj2.length - 1; t++) {
				if (lineIntersection2D(obj2[t], obj2[t + 1], obj1[r], obj1[r + 1])) {
					return true;
				}
			}
		}
		return false;
	}
	
	function segmentObjectIntersection2D(A, B, obj) {
		for (var r = 0; r < obj.length - 1; r++) {
			if (lineIntersection2D(A, B, obj[r], obj[r + 1])) {
				return true;
			}
		}
		return false;
	}
	
	function twoCirclesOverlapped(x1, y1, r1, x2, y2, r2) {
		var distBetweenCenters = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		if (distBetweenCenters < r1 + r2 || distBetweenCenters < Math.abs(r1 - r2)) {
			return true;
		}
		return false;
	}
	
	function twoCirclesEnclosed(x1, y1, r1, x2, y2, r2) {
		var distBetweenCenters = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		if (distBetweenCenters < Math.abs(r1 - r2)) {
			return true;
		}
		return false;
	}
	
	function twoCirclesIntersectionPoints(x1, y1, r1, x2, y2, r2, p3, p4) {
		if (!twoCirclesOverlapped(x1, y1, r1, x2, y2, r2)) {
			return false;
		}
		var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		var a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
		var b = (r2 * r2 - r1 * r1 + d * d) / (2 * d);
	
		var p2x = void 0,
		    p2y = void 0;
		p2x = x1 + (x2 - x1) * a / d;
		p2y = y1 + (y2 - y1) * a / d;
		var h1 = Math.sqrt(r1 * r1 - a * a);
		p3.x = p2x + (y2 - y1) * h1 / d;
		p3.y = p2y + (x2 - x1) * h1 / d;
		p4.x = p2x - (y2 - y1) * h1 / d;
		p4.y = p2y - (x2 - x1) * h1 / d;
		return true;
	}
	
	function twoCirclesIntersectionArea(x1, y1, r1, x2, y2, r2) {
		var i1 = new _vector2d2.default();
		var i2 = new _vector2d2.default();
		if (!twoCirclesIntersectionPoints(x1, y1, r1, x2, y2, r2, i1, i2)) {
			return 0;
		}
		var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		var CBD = 2 * Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
		var CAD = 2 * Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
		var areaB = CBD * r2 * r2 / 2 + Math.sin(CBD) * r2 * r2 / 2;
		var areaA = CAD * r1 * r1 / 2 + Math.sin(CAD) * r1 * r1 / 2;
		return areaA + areaB;
	}
	
	function circleArea(radius) {
		return Math.PI * radius * radius;
	}
	
	function pointInCircle(circleOrigin, radius, point) {
		var distSq = circleOrigin.add(point.getReverse()).lengthSq();
		if (distSq < radius) {
			return true;
		}
		return false;
	}
	
	function lineSegmentCircleIntersection(A, B, P, radius) {
		var distToLineSq = distToLineSegmentSq(A, B, P);
		if (distToLineSq < radius * radius) {
			return true;
		}
		return false;
	}
	
	function getLineSegmentCircleClosestIntersectionPoint(A, B, pos, radius, interSectionPoint) {
		var toBNorm = (0, _vector2d.vec2dNormalize)(B.add(A.getReverse()));
		var localPos = (0, _transformations.pointToLocalSpace)(pos, toBNorm, toBNorm.perp(), A);
		var ipFound = false;
		var tempPoint = new _vector2d2.default();
		if (localPos.x + radius >= 0 && (localPos.x - radius) * (localPos.x - radius) <= (0, _vector2d.vec2DDistanceSq)(B, A)) {
			if (Math.abs(localPos.y) < radius) {
				var a = localPos.x;
				var b = localPos.y;
				var ip = a - Math.sqrt(radius * radius - b * b);
				if (ip <= 0) {
					ip = a + Math.sqrt(radius * radius - b * b);
				}
				ipFound = true;
				tempPoint = A.add(toBNorm.crossNum(ip));
				interSectionPoint.x = tempPoint.x;
				interSectionPoint.y = tempPoint.y;
			}
		}
		return ipFound;
	}
	
	exports.distanceToRayPlaneIntersection = distanceToRayPlaneIntersection;
	exports.whereIsPoint = whereIsPoint;
	exports.getRayCircleIntersect = getRayCircleIntersect;
	exports.doRayCircleIntersect = doRayCircleIntersect;
	exports.getTangentPoints = getTangentPoints;
	exports.distToLineSegment = distToLineSegment;
	exports.distToLineSegmentSq = distToLineSegmentSq;
	exports.lineIntersection2D = lineIntersection2D;
	exports.objectIntersection2D = objectIntersection2D;
	exports.segmentObjectIntersection2D = segmentObjectIntersection2D;
	exports.twoCirclesOverlapped = twoCirclesOverlapped;
	exports.twoCirclesEnclosed = twoCirclesEnclosed;
	exports.twoCirclesIntersectionPoints = twoCirclesIntersectionPoints;
	exports.twoCirclesIntersectionArea = twoCirclesIntersectionArea;
	exports.circleArea = circleArea;
	exports.pointInCircle = pointInCircle;
	exports.lineSegmentCircleIntersection = lineSegmentCircleIntersection;
	exports.getLineSegmentCircleClosestIntersectionPoint = getLineSegmentCircleClosestIntersectionPoint;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.worldTransform = exports.vec2dRotateAroundOrigin = exports.pointToLocalSpace = exports.vectorToWorldSpace = exports.pointToWorldSpace = undefined;
	
	var _c2dmatrix = __webpack_require__(9);
	
	var _c2dmatrix2 = _interopRequireDefault(_c2dmatrix);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function pointToWorldSpace(point, agentHeading, agentSide, agentPosition) {
		var transPoint = point.clone();
		var matTrandform = new _c2dmatrix2.default();
		matTrandform.rotate(agentHeading, agentSide);
		matTrandform.translate(agentPosition.x, agentPosition.y);
		matTrandform.transformVector2D(transPoint);
		return transPoint;
	}
	
	function vectorToWorldSpace(vec, agentHeading, agentSide) {
		var transVec = vec.clone();
		var matTrandform = new _c2dmatrix2.default();
		matTrandform.rotate(agentHeading, agentSide);
		matTrandform.transformVector2D(transVec);
		return transVec;
	}
	
	function pointToLocalSpace(point, agentHeading, agentSide, agentPosition) {
		var transPoint = point.clone();
		var matTrandform = new _c2dmatrix2.default();
		var tx = agentPosition.getReverse().dot(agentHeading);
		var ty = agentPosition.getReverse().dot(agentSide);
		matTrandform._11 = agentHeading.x;matTrandform._12 = agentSide.x;
		matTrandform._21 = agentHeading.y;matTrandform._22 = agentSide.y;
		matTrandform._31 = tx;matTrandform._32 = ty;
		matTrandform.transformVector2D(transPoint);
		return transPoint;
	}
	
	function vec2dRotateAroundOrigin(v, ang) {
		var mat = new _c2dmatrix2.default();
		mat.rotate(ang);
		mat.transformVector2D(v);
	}
	
	function worldTransform(points, pos, forward, side) {
		var transVector2Ds = [];
		for (var i = 0; i < points.length; i++) {
			transVector2Ds[i] = points[i].clone();
		}
		var matTransform = new _c2dmatrix2.default();
		matTransform.rotate(forward, side);
		matTransform.translate(pos.x, pos.y);
		matTransform.transformVector2Ds(transVector2Ds);
		return transVector2Ds;
	}
	
	exports.pointToWorldSpace = pointToWorldSpace;
	exports.vectorToWorldSpace = vectorToWorldSpace;
	exports.pointToLocalSpace = pointToLocalSpace;
	exports.vec2dRotateAroundOrigin = vec2dRotateAroundOrigin;
	exports.worldTransform = worldTransform;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var C2DMatrix = function () {
	  function C2DMatrix() {
	    _classCallCheck(this, C2DMatrix);
	
	    this.identity();
	  }
	
	  _createClass(C2DMatrix, [{
	    key: 'identity',
	    value: function identity() {
	      this._11 = 1;this._12 = 0;this._13 = 0;
	      this._21 = 0;this._22 = 1;this._23 = 0;
	      this._31 = 0;this._32 = 0;this._33 = 1;
	    }
	  }, {
	    key: 'multiply',
	    value: function multiply(mIn) {
	      var tempM = new C2DMatrix();
	      //first row
	      tempM._11 = this._11 * mIn._11 + this._12 * mIn._21 + this._13 * mIn._31;
	      tempM._12 = this._11 * mIn._12 + this._12 * mIn._22 + this._13 * mIn._32;
	      tempM._13 = this._11 * mIn._13 + this._12 * mIn._23 + this._13 * mIn._33;
	
	      //second
	      tempM._21 = this._21 * mIn._11 + this._22 * mIn._21 + this._23 * mIn._31;
	      tempM._22 = this._21 * mIn._12 + this._22 * mIn._22 + this._23 * mIn._32;
	      tempM._23 = this._21 * mIn._13 + this._22 * mIn._23 + this._23 * mIn._33;
	
	      //third
	      tempM._31 = this._31 * mIn._11 + this._32 * mIn._21 + this._33 * mIn._31;
	      tempM._32 = this._31 * mIn._12 + this._32 * mIn._22 + this._33 * mIn._32;
	      tempM._33 = this._31 * mIn._13 + this._32 * mIn._23 + this._33 * mIn._33;
	
	      this._11 = tempM._11;
	      this._12 = tempM._12;
	      this._13 = tempM._13;
	
	      this._21 = tempM._21;
	      this._22 = tempM._22;
	      this._23 = tempM._23;
	
	      this._31 = tempM._31;
	      this._32 = tempM._32;
	      this._33 = tempM._33;
	    }
	  }, {
	    key: 'transformVector2D',
	    value: function transformVector2D(vec) {
	      var tempX = this._11 * vec.x + this._21 * vec.y + this._31;
	      var tempY = this._12 * vec.x + this._22 * vec.y + this._32;
	      vec.x = tempX;
	      vec.y = tempY;
	    }
	  }, {
	    key: 'transformVector2Ds',
	    value: function transformVector2Ds(vecs) {
	      for (var i = 0; i < vecs.length; i++) {
	        this.transformVector2D(vecs[i]);
	      }
	    }
	  }, {
	    key: 'translate',
	    value: function translate(x, y) {
	      var mat = new C2DMatrix();
	      mat._11 = 1;mat._12 = 0;mat._13 = 0;
	      mat._21 = 0;mat._22 = 1;mat._23 = 0;
	      mat._31 = x;mat._32 = y;mat._33 = 1;
	      this.multiply(mat);
	    }
	  }, {
	    key: 'scale',
	    value: function scale(xScale, yScale) {
	      var mat = new C2DMatrix();
	      mat._11 = xScale || 1;mat._12 = 0;mat._13 = 0;
	      mat._21 = 0;mat._22 = yScale || 1;mat._23 = 0;
	      mat._31 = 0;mat._32 = 0;mat._33 = 1;
	      this.multiply(mat);
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(fwd, side) {
	      var mat = new C2DMatrix();
	      if (typeof side == 'undefined') {
	        var sin = Math.sin(fwd);
	        var cos = Math.cos(fwd);
	        mat._11 = cos;mat._12 = sin;mat._13 = 0;
	        mat._21 = -sin;mat._22 = cos;mat._23 = 0;
	        mat._31 = 0;mat._32 = 0;mat._33 = 1;
	      } else {
	        mat._11 = fwd.x;mat._12 = fwd.y;mat._13 = 0;
	        mat._21 = side.x;mat._22 = side.y;mat._23 = 0;
	        mat._31 = 0;mat._32 = 0;mat._33 = 1;
	      }
	      this.multiply(mat);
	    }
	  }]);
	
	  return C2DMatrix;
	}();
	
	exports.default = C2DMatrix;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var BallWithinReceivingRange = 10;
	var KeeperInBallRange = 10.0;
	var PlayerInTargetRange = 10.0;
	var PlayerKickingDistance = 6.0;
	var BallSize = 5.0;
	var PlayerComfortZone = 60.0;
	var GoalKeeperInterceptRange = 100.0;
	var WithinRangeOfSupportSpot = 15.0;
	
	var PRM = {
		GoalWidth: 100,
		//use to set up the sweet spot calculator,
		NumSupportSpotsX: 13,
		NumSupportSpotsY: 6,
		//these values tweak the various rules used to calculate the support spots,
		Spot_CanPassScore: 2.0,
		Spot_CanScoreFromPositionScore: 1.0,
		Spot_DistFromControllingPlayerScore: 2.0,
		Spot_ClosenessToSupportingPlayerScore: 0.0,
		Spot_AheadOfAttackerScore: 0.0,
		//how many times per second the support spots will be calculated,
		SupportSpotUpdateFreq: 1,
		//the chance a player might take a random pot shot at the goal,
		ChancePlayerAttemptsPotShot: 0.005,
		//this is the chance that a player will receive a pass using the arrive,
		//steering behavior, rather than Pursuit,
		ChanceOfUsingArriveTypeReceiveBehavior: 0.5,
		BallSize: BallSize,
		BallMass: 1.0,
		Friction: -0.015,
		//the goalkeeper has to be this close to the ball to be able to interact with it,
		KeeperInBallRange: KeeperInBallRange,
		PlayerInTargetRange: PlayerInTargetRange,
		//player has to be this close to the ball to be able to kick it. The higher,
		//the value this gets, the easier it gets to tackle. ,
		// PlayerKickingDistance:           6.0,
		//the number of times a player can kick the ball per second,
		PlayerKickFrequency: 8,
		PlayerMass: 3.0,
		PlayerMaxForce: 1.0,
		PlayerMaxSpeedWithBall: 1.2,
		PlayerMaxSpeedWithoutBall: 1.6,
		PlayerMaxTurnRate: 0.4,
		PlayerScale: 1.0,
		//when an opponents comes within this range the player will attempt to pass,
		//the ball. Players tend to pass more often, the higher the value,
		PlayerComfortZone: PlayerComfortZone,
		//in the range zero to 1.0. adjusts the amount of noise added to a kick,,
		//the lower the value the worse the players get.,
		PlayerKickingAccuracy: 0.99,
		//the number of times the SoccerTeam::CanShoot method attempts to find,
		//a valid shot,
		NumAttemptsToFindValidStrike: 5,
		MaxDribbleForce: 1.5,
		MaxShootingForce: 6.0,
		MaxPassingForce: 3.0,
		//the distance away from the center of its home region a player,
		//must be to be considered at home,
		WithinRangeOfHome: 15.0,
		//how close a player must get to a sweet spot before he can change state,
		WithinRangeOfSupportSpot: WithinRangeOfSupportSpot,
		//the minimum distance a receiving player must be from the passing player,
		MinPassDistance: 120.0,
		//the minimum distance a player must be from the goalkeeper before it will,
		//pass the ball,
		GoalkeeperMinPassDistance: 50.0,
		//this is the distance the keeper puts between the back of the net ,
		//and the ball when using the interpose steering behavior,
		GoalKeeperTendingDistance: 20.0,
		//when the ball becomes within this distance of the goalkeeper he,
		//changes state to intercept the ball,
		GoalKeeperInterceptRange: GoalKeeperInterceptRange,
		//how close the ball must be to a receiver before he starts chasing it,
		BallWithinReceivingRange: BallWithinReceivingRange,
		//these (boolean) values control the amount of player and pitch info shown,
		//1=ON; 0=OFF,
		ViewStates: 1,
		ViewIDs: 1,
		bSupportSpots: 1,
		ViewRegions: 0,
		bShowControllingTeam: 1,
		ViewTargets: 0,
		HighlightIfThreatened: 0,
		//simple soccer's physics are calculated using each tick as the unit of time,
		//so changing this will adjust the speed,
		FrameRate: 60,
		//--------------------------------------------steering behavior stuff,
		SeparationCoefficient: 10.0,
		//how close a neighbour must be to be considered for separation,
		ViewDistance: 30.0,
		//1=ON; 0=OFF,
		bNonPenetrationConstraint: 0,
		BallWithinReceivingRangeSq: BallWithinReceivingRange * BallWithinReceivingRange,
		KeeperInBallRangeSq: KeeperInBallRange * KeeperInBallRange,
		PlayerInTargetRangeSq: PlayerInTargetRange * PlayerInTargetRange,
		PlayerKickingDistance: PlayerKickingDistance + BallSize,
		PlayerKickingDistanceSq: (PlayerKickingDistance + BallSize) * (PlayerKickingDistance + BallSize),
		PlayerComfortZoneSq: PlayerComfortZone * PlayerComfortZone,
		GoalKeeperInterceptRangeSq: GoalKeeperInterceptRange * GoalKeeperInterceptRange,
		WithinRangeOfSupportSpotSq: WithinRangeOfSupportSpot * WithinRangeOfSupportSpot
	};
	
	exports.default = PRM;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.addNoiseToKick = exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_entity = __webpack_require__(12);
	
	var _moving_entity2 = _interopRequireDefault(_moving_entity);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _utils = __webpack_require__(15);
	
	var _transformations = __webpack_require__(8);
	
	var _geometry = __webpack_require__(7);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function addNoiseToKick(ballPos, ballTarget) {
		var displacement = Math.PI * (1 - _params2.default.PlayerKickingAccuracy) * (0, _utils.randomClamped)();
		var toTarget = ballTarget.add(ballPos.getReverse());
		(0, _transformations.vec2dRotateAroundOrigin)(toTarget, displacement);
		return ballPos.add(toTarget);
	}
	
	var SoccerBall = function (_MovingEntity) {
		_inherits(SoccerBall, _MovingEntity);
	
		function SoccerBall(pos, ballSize, mass, pitchBoundary) {
			_classCallCheck(this, SoccerBall);
	
			var _this = _possibleConstructorReturn(this, (SoccerBall.__proto__ || Object.getPrototypeOf(SoccerBall)).call(this, pos, ballSize, new _vector2d2.default(), -1, new _vector2d2.default(0, 1), mass, new _vector2d2.default(1, 1), 0, 0));
	
			_this.m_vOldPos = pos;
			_this.m_PitchBoundary = pitchBoundary;
			return _this;
		}
	
		_createClass(SoccerBall, [{
			key: 'testCollisionWithWalls',
			value: function testCollisionWithWalls(walls) {
				var idxClosest = -1;
				var velNormal = (0, _vector2d.vec2dNormalize)(this.m_vVelocity);
				var intersectionPoint = new _vector2d2.default();
				var collisionPoint = new _vector2d2.default();
				var distToIntersection = _utils.MaxFloat;
				for (var w = 0; w < walls.length; w++) {
					var thisCollisionPoint = this.pos().add(walls[w].normal().crossNum(this.bRadius()).getReverse());
					var distToWall = 0;
					if ((0, _geometry.whereIsPoint)(thisCollisionPoint, walls[w].from(), walls[w].normal()) == 'PLANE_BACKSIDE') {
						distToWall = (0, _geometry.distanceToRayPlaneIntersection)(thisCollisionPoint, walls[w].normal(), walls[w].from(), walls[w].normal());
						intersectionPoint = thisCollisionPoint.add(walls[w].normal().crossNum(distToWall));
					} else {
						distToWall = (0, _geometry.distanceToRayPlaneIntersection)(thisCollisionPoint, velNormal, walls[w].from(), walls[w].normal());
						intersectionPoint = thisCollisionPoint.add(velNormal.crossNum(distToWall));
					}
					var onLineSegment = false;
					var intersectionInfo = (0, _geometry.lineIntersection2D)(walls[w].from(), walls[w].to(), thisCollisionPoint.add(walls[w].normal().crossNum(20).getReverse()), thisCollisionPoint.add(walls[w].normal().crossNum(20)));
					if (intersectionInfo.result) {
						onLineSegment = true;
					}
					var distSq = (0, _vector2d.vec2DDistanceSq)(thisCollisionPoint, intersectionPoint);
					if (distSq <= this.m_vVelocity.lengthSq() && distSq < distToIntersection && onLineSegment) {
						distToIntersection = distSq;
						idxClosest = w;
						collisionPoint = intersectionPoint;
					}
				}
				if (idxClosest >= 0 && velNormal.dot(walls[idxClosest].normal()) < 0) {
					this.m_vVelocity.reflect(walls[idxClosest].normal());
				}
			}
		}, {
			key: 'update',
			value: function update(timeElapsed) {
				this.m_vOldPos = this.m_vPos;
				this.testCollisionWithWalls(this.m_PitchBoundary);
				if (this.m_vVelocity.lengthSq() > _params2.default.Friction * _params2.default.Friction) {
					this.m_vVelocity = this.m_vVelocity.add((0, _vector2d.vec2dNormalize)(this.m_vVelocity).crossNum(_params2.default.Friction));
					this.m_vPos = this.m_vPos.add(this.m_vVelocity);
					this.m_vHeading = (0, _vector2d.vec2dNormalize)(this.m_vVelocity);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_cgdi2.default.blackBrush();
				_cgdi2.default.circle(this.m_vPos, this.m_dBoundingRadius);
			}
		}, {
			key: 'handleMessage',
			value: function handleMessage(msg) {
				return false;
			}
		}, {
			key: 'kick',
			value: function kick(direction, force) {
				direction.normalize();
				var acceleration = direction.crossNum(force / this.m_dMass);
				this.m_vVelocity = acceleration;
			}
		}, {
			key: 'timeToCoverDistance',
			value: function timeToCoverDistance(A, B, force) {
				var speed = force / this.m_dMass;
				var distanceToCover = (0, _vector2d.vec2DDistance)(A, B);
				var term = speed * speed + 2 * distanceToCover * _params2.default.Friction;
				if (term <= 0) {
					return -1;
				}
				var v = Math.sqrt(term);
				return (v - speed) / _params2.default.Friction;
			}
		}, {
			key: 'futurePosition',
			value: function futurePosition(time) {
				var ut = this.m_vVelocity.crossNum(time);
				var half_a_t_squared = 0.5 * _params2.default.Friction * time * time;
				var scalarToVector = (0, _vector2d.vec2dNormalize)(this.m_vVelocity).crossNum(half_a_t_squared);
				return this.pos().add(ut).add(scalarToVector);
			}
		}, {
			key: 'trap',
			value: function trap() {
				this.m_vVelocity.zero();
			}
		}, {
			key: 'oldPos',
			value: function oldPos() {
				return this.m_vOldPos;
			}
		}, {
			key: 'placeAtPosition',
			value: function placeAtPosition(newPos) {
				this.m_vPos = newPos;
				this.m_vOldPos = this.m_vPosition;
				this.m_vVelocity.zero();
			}
		}]);
	
		return SoccerBall;
	}(_moving_entity2.default);
	
	exports.default = SoccerBall;
	exports.addNoiseToKick = addNoiseToKick;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base_game_entity = __webpack_require__(13);
	
	var _base_game_entity2 = _interopRequireDefault(_base_game_entity);
	
	var _c2dmatrix = __webpack_require__(9);
	
	var _c2dmatrix2 = _interopRequireDefault(_c2dmatrix);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _utils = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MovingEntity = function (_BaseGameEntity) {
	  _inherits(MovingEntity, _BaseGameEntity);
	
	  function MovingEntity(pos, r, velocity, maxSpeed, heading, mass, scale, turnRate, maxForce) {
	    _classCallCheck(this, MovingEntity);
	
	    var _this = _possibleConstructorReturn(this, (MovingEntity.__proto__ || Object.getPrototypeOf(MovingEntity)).call(this, 0, pos, r));
	
	    _this.m_vVelocity = velocity;
	    _this.m_vHeading = heading;
	    _this.m_vSide = heading.perp();
	    _this.m_dMass = mass;
	    _this.m_dMaxSpeed = maxSpeed;
	    _this.m_dMaxForce = maxForce;
	    _this.m_dMaxTurnRate = turnRate;
	    _this.m_vScale = scale;
	    return _this;
	  }
	
	  _createClass(MovingEntity, [{
	    key: 'velocity',
	    value: function velocity() {
	      return this.m_vVelocity;
	    }
	  }, {
	    key: 'setVelocity',
	    value: function setVelocity(newVel) {
	      this.m_vVelocity = newVel;
	    }
	  }, {
	    key: 'mass',
	    value: function mass() {
	      return this.m_dMass;
	    }
	  }, {
	    key: 'side',
	    value: function side() {
	      return this.m_vSide;
	    }
	  }, {
	    key: 'maxSpeed',
	    value: function maxSpeed() {
	      return this.m_dMaxSpeed;
	    }
	  }, {
	    key: 'setMaxSpeed',
	    value: function setMaxSpeed(newSpeed) {
	      this.m_dMaxSpeed = newSpeed;
	    }
	  }, {
	    key: 'maxForce',
	    value: function maxForce() {
	      return this.m_dMaxForce;
	    }
	  }, {
	    key: 'setMaxForce',
	    value: function setMaxForce(mf) {
	      this.m_dMaxForce = mf;
	    }
	  }, {
	    key: 'speedSq',
	    value: function speedSq() {
	      return this.m_vVelocity.lengthSq();
	    }
	  }, {
	    key: 'speed',
	    value: function speed() {
	      return this.m_vVelocity.length();
	    }
	  }, {
	    key: 'isSpeedMaxOut',
	    value: function isSpeedMaxOut() {
	      return this.m_dMaxSpeed * this.m_dMaxSpeed >= this.speedSq();
	    }
	  }, {
	    key: 'heading',
	    value: function heading() {
	      return this.m_vHeading;
	    }
	  }, {
	    key: 'setHeading',
	    value: function setHeading(newHeading) {
	      this.m_vHeading = newHeading;
	      this.m_vSide = this.m_vHeading.perp();
	    }
	  }, {
	    key: 'rotateHeadingToFacePosition',
	    value: function rotateHeadingToFacePosition(target) {
	      var heading = this.m_vHeading.clone();
	      var toTarget = new _vector2d2.default(target.x - this.m_vPos.x, target.y - this.m_vPos.y).normalize();
	      var angle = Math.acos((0, _utils.clamp)(this.m_vHeading.dot(toTarget), -1, 1));
	      var rotationMatrix = new _c2dmatrix2.default();
	      if (angle < 0.00001) {
	        return true;
	      }
	      if (angle > this.m_dMaxTurnRate) {
	        angle = this.m_dMaxTurnRate;
	      }
	      rotationMatrix.rotate(angle * this.m_vHeading.sign(toTarget));
	      rotationMatrix.transformVector2D(this.m_vHeading);
	      rotationMatrix.transformVector2D(this.m_vVelocity);
	      this.m_vSide = this.m_vHeading.perp();
	      if (this.m_vHeading.x == 0 && this.m_vHeading.y == 0 || isNaN(this.m_vHeading.x)) {
	        console.log(toTarget, heading, angle);
	      }
	      return false;
	    }
	  }, {
	    key: 'maxTurnRate',
	    value: function maxTurnRate() {
	      return this.m_dMaxTurnRate;
	    }
	  }, {
	    key: 'setMaxTurnRate',
	    value: function setMaxTurnRate(val) {
	      this.m_dMaxTurnRate = val;
	    }
	  }]);
	
	  return MovingEntity;
	}(_base_game_entity2.default);
	
	exports.default = MovingEntity;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entity_type = __webpack_require__(14);
	
	var _entity_type2 = _interopRequireDefault(_entity_type);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var nextID = 0;
	function nextValidID() {
	  return nextID++;
	}
	
	var BaseGameEntity = function () {
	  function BaseGameEntity(entityType, pos, r, forceID) {
	    _classCallCheck(this, BaseGameEntity);
	
	    this.m_ID = forceID || nextValidID();
	    this.m_dBoundingRadius = r || 0.0;
	    this.m_vPos = pos || new _vector2d2.default(0, 0);
	    this.m_vScale = new _vector2d2.default(1.0, 1.0);
	    this.m_EntityType = entityType || _entity_type2.default.default;
	    this.m_bTag = false;
	  }
	
	  _createClass(BaseGameEntity, [{
	    key: 'update',
	    value: function update() {}
	  }, {
	    key: 'render',
	    value: function render() {}
	  }, {
	    key: 'handleMessage',
	    value: function handleMessage(telegram) {
	      return false;
	    }
	  }, {
	    key: 'write',
	    value: function write() {}
	  }, {
	    key: 'read',
	    value: function read() {}
	  }, {
	    key: 'pos',
	    value: function pos() {
	      return this.m_vPos;
	    }
	  }, {
	    key: 'setPos',
	    value: function setPos(newPos) {
	      this.m_vPos = newPos;
	    }
	  }, {
	    key: 'bRadius',
	    value: function bRadius() {
	      return this.m_dBoundingRadius;
	    }
	  }, {
	    key: 'setBRadius',
	    value: function setBRadius(r) {
	      this.m_dBoundingRadius = r;
	    }
	  }, {
	    key: 'id',
	    value: function id() {
	      return this.m_ID;
	    }
	  }, {
	    key: 'isTagged',
	    value: function isTagged() {
	      return this.m_bTag;
	    }
	  }, {
	    key: 'tag',
	    value: function tag() {
	      this.m_bTag = true;
	    }
	  }, {
	    key: 'unTag',
	    value: function unTag() {
	      this.m_bTag = false;
	    }
	  }, {
	    key: 'scale',
	    value: function scale() {
	      return this.m_vScale;
	    }
	  }, {
	    key: 'setScale',
	    value: function setScale(vec) {
	      if (typeof vec == 'number') {
	        this.m_dBoundingRadius *= vec / Math.max(this.m_vScale.x, this.m_vScale.y);
	        this.m_vScale = new _vector2d2.default(vec, vec);
	      } else {
	        this.m_dBoundingRadius *= Math.max(vec.x, vec.y) / Math.max(this.m_vScale.x, this.m_vScale.y);
	        this.m_vScale = vec;
	      }
	    }
	  }, {
	    key: 'entityType',
	    value: function entityType() {
	      return this.m_EntityType;
	    }
	  }, {
	    key: 'setEntityType',
	    value: function setEntityType(newType) {
	      this.m_EntityType = newType;
	    }
	  }]);
	
	  return BaseGameEntity;
	}();
	
	exports.default = BaseGameEntity;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ENTITYTYPE = {
	  default: -1
	};
	
	exports.default = ENTITYTYPE;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var MaxFloat = 999999;
	
	function clamp(arg, minVal, maxVal) {
		var ret = arg;
		if (ret < minVal) {
			ret = minVal;
		}
		if (ret > maxVal) {
			ret = maxVal;
		}
		return ret;
	}
	
	function randomClamped() {
		return Math.random() - Math.random();
	}
	
	function timeGetTime() {
		return new Date().getTime();
	}
	
	function randFloat() {
		return Math.random();
	}
	
	function isEqual(a, b) {
		if (Math.abs(a - b) < 1e-12) {
			return true;
		}
		return false;
	}
	
	function randInRange(x, y) {
		return x + randFloat() * (y - x);
	}
	
	function randInt(x, y) {
		if (y >= x) {
			return Math.floor(Math.random() * (y - x + 1) + x);
		}
	}
	
	exports.clamp = clamp;
	exports.randomClamped = randomClamped;
	exports.MaxFloat = MaxFloat;
	exports.timeGetTime = timeGetTime;
	exports.randFloat = randFloat;
	exports.isEqual = isEqual;
	exports.randInRange = randInRange;
	exports.randInt = randInt;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TEAM_COLOR = exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _state_machine = __webpack_require__(17);
	
	var _state_machine2 = _interopRequireDefault(_state_machine);
	
	var _team_state = __webpack_require__(18);
	
	var _utils = __webpack_require__(15);
	
	var _support_spot_calculator = __webpack_require__(19);
	
	var _support_spot_calculator2 = _interopRequireDefault(_support_spot_calculator);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _geometry = __webpack_require__(7);
	
	var _transformations = __webpack_require__(8);
	
	var _message_dispatcher = __webpack_require__(21);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	var _soccer_messages = __webpack_require__(24);
	
	var _soccer_messages2 = _interopRequireDefault(_soccer_messages);
	
	var _player_base = __webpack_require__(25);
	
	var _goalkeeper_state = __webpack_require__(28);
	
	var _field_player_state = __webpack_require__(29);
	
	var _goal_keeper = __webpack_require__(30);
	
	var _goal_keeper2 = _interopRequireDefault(_goal_keeper);
	
	var _field_player = __webpack_require__(32);
	
	var _field_player2 = _interopRequireDefault(_field_player);
	
	var _entity_manager = __webpack_require__(22);
	
	var _entity_manager2 = _interopRequireDefault(_entity_manager);
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TEAM_COLOR = {
		blue: 'BLUE',
		red: 'RED'
	};
	
	var SoccerTeam = function () {
		function SoccerTeam(homeGoal, opponentsGoal, pitch, color) {
			_classCallCheck(this, SoccerTeam);
	
			this.m_Players = [];
			this.m_Color = color;
			this.m_pPitch = pitch;
			this.m_pOpponentsGoal = opponentsGoal;
			this.m_pHomeGoal = homeGoal;
			this.m_pOpponents = null;
			this.m_pControllingPlayer = null;
			this.m_pSupportingPlayer = null;
			this.m_pReceivingPlayer = null;
			this.m_pPlayerClosestToBall = null;
			this.m_dDistSqToBallOfClosestPlayer = 0;
			this.m_pStateMachine = new _state_machine2.default(this);
			this.m_pStateMachine.setCurrentState(_team_state.Defending);
			this.m_pStateMachine.setPreviousState(_team_state.Defending);
			this.m_pStateMachine.setGlobalState(null);
			this.createPlayers();
			for (var i = 0; i < this.m_Players.length; i++) {
				var it = this.m_Players[i];
				it.steering().separationOn();
			}
			this.m_pSupportSpotCalc = new _support_spot_calculator2.default(_params2.default.NumSupportSpotsX, _params2.default.NumSupportSpotsY, this);
		}
	
		_createClass(SoccerTeam, [{
			key: 'createPlayers',
			value: function createPlayers() {
				if (this.teamColor() == TEAM_COLOR.blue) {
					this.m_Players.push(new _goal_keeper2.default(this, 1, _goalkeeper_state.TendGoal, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale));
					this.m_Players.push(new _field_player2.default(this, 6, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.attacker));
					this.m_Players.push(new _field_player2.default(this, 8, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.attacker));
					this.m_Players.push(new _field_player2.default(this, 3, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.defender));
					this.m_Players.push(new _field_player2.default(this, 5, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.defender));
				} else {
					this.m_Players.push(new _goal_keeper2.default(this, 16, _goalkeeper_state.TendGoal, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale));
					this.m_Players.push(new _field_player2.default(this, 9, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.attacker));
					this.m_Players.push(new _field_player2.default(this, 11, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.attacker));
					this.m_Players.push(new _field_player2.default(this, 12, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.defender));
					this.m_Players.push(new _field_player2.default(this, 14, _field_player_state.Wait, new _vector2d2.default(0, 1), new _vector2d2.default(0, 0), _params2.default.PlayerMass, _params2.default.PlayerMaxForce, _params2.default.PlayerMaxSpeedWithoutBall, _params2.default.PlayerMaxTurnRate, _params2.default.PlayerScale, _player_base.PLAYERROLE.defender));
				}
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					_entity_manager2.default.registerEntity(it);
				}
			}
		}, {
			key: 'calculateClosestPlayerToBall',
			value: function calculateClosestPlayerToBall() {
				var closestSoFar = _utils.MaxFloat;
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					var dist = (0, _vector2d.vec2DDistanceSq)(it.pos(), this.pitch().ball().pos());
					it.setDistSqToBall(dist);
					if (dist < closestSoFar) {
						closestSoFar = dist;
						this.m_pPlayerClosestToBall = it;
					}
				}
				this.m_dDistSqToBallOfClosestPlayer = closestSoFar;
			}
		}, {
			key: 'render',
			value: function render() {
				for (var i = 0; i < this.m_Players.length; i++) {
					this.m_Players[i].render();
				}
				if (_params2.default.bShowControllingTeam) {
					_cgdi2.default.textColor(_cgdi2.default.WHITE);
					if (this.teamColor() == TEAM_COLOR.blue && this.inControl()) {
						_cgdi2.default.textAtPos(20, 3, 'Blue in Control');
					} else if (this.teamColor() == TEAM_COLOR.red && this.inControl()) {
						_cgdi2.default.textAtPos(20, 3, 'Red in Control');
					}
					if (this.m_pControllingPlayer != null) {
						_cgdi2.default.textAtPos(this.pitch().cxClient() - 150, 3, 'Controlling Player: this.m_pControllingPlayer.id()');
					}
				}
				if (_params2.default.bSupportSpots && this.inControl()) {
					this.m_pSupportSpotCalc.render();
				}
			}
		}, {
			key: 'update',
			value: function update(timeElapsed) {
				this.calculateClosestPlayerToBall();
				this.m_pStateMachine.update();
				for (var i = 0; i < this.m_Players.length; i++) {
					this.m_Players[i].update(timeElapsed);
				}
			}
		}, {
			key: 'returnAllFieldPlayersToHome',
			value: function returnAllFieldPlayersToHome() {
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					if (it.role() != _player_base.PLAYERROLE.goalKeeper) {
						_message_dispatcher2.default.dispatchMessage(0, 1, it.id(), _soccer_messages2.default.Msg_GoHome, null);
					}
				}
			}
		}, {
			key: 'canShoot',
			value: function canShoot(ballPos, power) {
				var shotTarget = new _vector2d2.default();
				var numAttempts = _params2.default.NumAttemptsToFindValidStrike;
				while (numAttempts--) {
					shotTarget = this.opponentsGoal().center();
					var minYVal = this.opponentsGoal().leftPost().y + this.pitch().ball().bRadius();
					var maxYVal = this.opponentsGoal().rightPost().y - this.pitch().ball().bRadius();
					shotTarget.y = (0, _utils.randInt)(minYVal, maxYVal);
					var time = this.pitch().ball().timeToCoverDistance(ballPos, shotTarget, power);
					if (time >= 0) {
						if (this.isPassSafeFromAllOpponents(ballPos, shotTarget, null, power)) {
							return {
								result: true,
								target: shotTarget
							};
						}
					}
				}
				return {
					result: false,
					target: shotTarget
				};
			}
		}, {
			key: 'findPass',
			value: function findPass(passer, power, minPassingDistance) {
				var receiver = null;
				var result = false;
				var closestToGoalSoFar = _utils.MaxFloat;
				var target = null;
				for (var i = 0; i < this.members().length; i++) {
					var curPlayer = this.members()[i];
					if (curPlayer != passer && (0, _vector2d.vec2DDistanceSq)(passer.pos(), curPlayer.pos()) > minPassingDistance * minPassingDistance) {
						var passInfo = this.getBestPassToReceiver(passer, curPlayer, power);
						if (passInfo.result) {
							target = passInfo.passTarget;
							var dist2Goal = Math.abs(target.x - this.opponentsGoal().center().x);
							if (dist2Goal < closestToGoalSoFar) {
								closestToGoalSoFar = dist2Goal;
								receiver = curPlayer;
								target = passInfo.passTarget;
								result = true;
							}
						}
					}
				}
				return {
					result: result,
					target: target,
					receiver: receiver
				};
			}
		}, {
			key: 'getBestPassToReceiver',
			value: function getBestPassToReceiver(passer, receiver, power) {
				var time = this.pitch().ball().timeToCoverDistance(this.pitch().ball().pos(), receiver.pos(), power);
				if (time < 0) {
					return false;
				}
				var interceptRange = time * receiver.maxSpeed();
				var ScalingFactor = 0.3;
				interceptRange *= ScalingFactor;
				var ip1 = new _vector2d2.default();
				var ip2 = new _vector2d2.default();
				(0, _geometry.getTangentPoints)(receiver.pos(), interceptRange, this.pitch().ball().pos(), ip1, ip2);
				var NumPassesToTry = 3;
				var passes = [ip1, receiver.pos(), ip2];
				var closestSoFar = _utils.MaxFloat;
				var bResult = false;
				var passTarget = null;
				for (var pass = 0; pass < NumPassesToTry; pass++) {
					var dist = Math.abs(passes[pass].x - this.opponentsGoal().center().x);
					if (dist < closestSoFar && this.pitch().playingArea().inside(passes[pass]) && this.isPassSafeFromAllOpponents(this.pitch().ball().pos(), passes[pass], receiver, power)) {
						closestSoFar = dist;
						passTarget = passes[pass];
						bResult = true;
					}
				}
				return {
					passTarget: passTarget,
					result: bResult
				};
			}
		}, {
			key: 'isPassSafeFromOpponent',
			value: function isPassSafeFromOpponent(from, target, receiver, opp, passingForce) {
				var toTarget = target.add(from.getReverse());
				var toTargetNormalized = (0, _vector2d.vec2dNormalize)(toTarget);
				var localPosOpp = (0, _transformations.pointToLocalSpace)(opp.pos(), toTargetNormalized, toTargetNormalized.perp(), from);
				if (localPosOpp.x < 0) {
					return true;
				}
				if ((0, _vector2d.vec2DDistanceSq)(from, target) < (0, _vector2d.vec2DDistanceSq)(opp.pos(), from)) {
					if (receiver) {
						if ((0, _vector2d.vec2DDistanceSq)(target, opp.pos()) > (0, _vector2d.vec2DDistanceSq)(target, receiver.pos())) {
							return true;
						} else {
							return false;
						}
					} else {
						return true;
					}
				}
				var timeForBall = this.pitch().ball().timeToCoverDistance(new _vector2d2.default(), new _vector2d2.default(localPosOpp.x, 0), passingForce);
				var reach = opp.maxSpeed() * timeForBall + this.pitch().ball().bRadius() + opp.bRadius();
				if (Math.abs(localPosOpp.y) < reach) {
					return false;
				}
				return true;
			}
		}, {
			key: 'isPassSafeFromAllOpponents',
			value: function isPassSafeFromAllOpponents(from, target, receiver, passingForce) {
				for (var i = 0; i < this.opponents().members().length; i++) {
					if (!this.isPassSafeFromOpponent(from, target, receiver, this.opponents().members()[i], passingForce)) {
						return false;
					}
				}
				return true;
			}
		}, {
			key: 'isOpponentWithinRadius',
			value: function isOpponentWithinRadius(pos, rad) {
				for (var i = 0; i < this.members().length; i++) {
					var it = this.members()[i];
					if ((0, _vector2d.vec2DDistanceSq)(pos, it.pos()) < rad * rad) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: 'requestPass',
			value: function requestPass(requester) {
				if ((0, _utils.randFloat)() > 0.1) {
					return;
				}
				if (this.isPassSafeFromAllOpponents(this.controllingPlayer().pos(), requester.pos(), requester, _params2.default.MaxPassingForce)) {
					_message_dispatcher2.default.dispatchMessage(0, requester.id(), this.controllingPlayer().id(), _soccer_messages2.default.Msg_PassToMe, requester);
				}
			}
		}, {
			key: 'determineBestSupportingAttacker',
			value: function determineBestSupportingAttacker() {
				var closestSoFar = _utils.MaxFloat;
				var bestPlayer = null;
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					if (it.role() == _player_base.PLAYERROLE.attacker && it != this.m_pControllingPlayer) {
						var dist = (0, _vector2d.vec2DDistanceSq)(it.pos(), this.m_pSupportSpotCalc.getBestSupportingSpot());
						if (dist < closestSoFar) {
							closestSoFar = dist;
							bestPlayer = it;
						}
					}
				}
				return bestPlayer;
			}
		}, {
			key: 'members',
			value: function members() {
				return this.m_Players;
			}
		}, {
			key: 'getFSM',
			value: function getFSM() {
				return this.m_pStateMachine;
			}
		}, {
			key: 'homeGoal',
			value: function homeGoal() {
				return this.m_pHomeGoal;
			}
		}, {
			key: 'opponentsGoal',
			value: function opponentsGoal() {
				return this.m_pOpponentsGoal;
			}
		}, {
			key: 'pitch',
			value: function pitch() {
				return this.m_pPitch;
			}
		}, {
			key: 'opponents',
			value: function opponents() {
				return this.m_pOpponents;
			}
		}, {
			key: 'setOpponents',
			value: function setOpponents(opps) {
				this.m_pOpponents = opps;
			}
		}, {
			key: 'teamColor',
			value: function teamColor() {
				return this.m_Color;
			}
		}, {
			key: 'setPlayerClosestToBall',
			value: function setPlayerClosestToBall(player) {
				this.m_pPlayerClosestToBall = player;
			}
		}, {
			key: 'playerClosestToBall',
			value: function playerClosestToBall() {
				return this.m_pPlayerClosestToBall;
			}
		}, {
			key: 'closestDistToBallSq',
			value: function closestDistToBallSq() {
				return this.m_dDistSqToBallOfClosestPlayer;
			}
		}, {
			key: 'getSupportSpot',
			value: function getSupportSpot() {
				return this.m_pSupportSpotCalc.getBestSupportingSpot();
			}
		}, {
			key: 'supportingPlayer',
			value: function supportingPlayer() {
				return this.m_pSupportingPlayer;
			}
		}, {
			key: 'setSupportingPlayer',
			value: function setSupportingPlayer(player) {
				this.m_pSupportingPlayer = player;
			}
		}, {
			key: 'receiver',
			value: function receiver() {
				return this.m_pReceivingPlayer;
			}
		}, {
			key: 'setReceiver',
			value: function setReceiver(player) {
				this.m_pReceivingPlayer = player;
			}
		}, {
			key: 'controllingPlayer',
			value: function controllingPlayer() {
				return this.m_pControllingPlayer;
			}
		}, {
			key: 'setControllingPlayer',
			value: function setControllingPlayer(player) {
				this.m_pControllingPlayer = player;
				this.opponents().lostControl();
			}
		}, {
			key: 'inControl',
			value: function inControl() {
				if (this.m_pControllingPlayer) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: 'lostControl',
			value: function lostControl() {
				this.m_pControllingPlayer = null;
			}
		}, {
			key: 'getPlayerFromID',
			value: function getPlayerFromID(id) {
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					if (it.id() == id) {
						return it;
					}
				}
				return null;
			}
		}, {
			key: 'setPlayerHomeRegion',
			value: function setPlayerHomeRegion(player, region) {
				if (player >= 0 && player < this.m_Players.length) {
					this.m_Players[player].setHomeRegion(region);
				}
			}
		}, {
			key: 'determineBestSupportingPosition',
			value: function determineBestSupportingPosition() {
				this.m_pSupportSpotCalc.determineBestSupportingPosition();
			}
		}, {
			key: 'updateTargetsOfWaitingPlayers',
			value: function updateTargetsOfWaitingPlayers() {
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					if (it.role() != _player_base.PLAYERROLE.goalKeeper) {
						if (it.getFSM().isInstate(_field_player_state.Wait) || it.getFSM().isInstate(_field_player_state.ReturnToHomeRegion)) {
							it.steering().setTarget(it.homeRegion().center());
						}
					}
				}
			}
		}, {
			key: 'allPlayersAtHome',
			value: function allPlayersAtHome() {
				for (var i = 0; i < this.m_Players.length; i++) {
					var it = this.m_Players[i];
					if (!it.inHomeRegion()) {
						return false;
					}
				}
				return true;
			}
		}, {
			key: 'name',
			value: function name() {
				if (this.m_Color == TEAM_COLOR.blue) {
					return 'Blue';
				} else {
					return 'Red';
				}
			}
		}]);
	
		return SoccerTeam;
	}();
	
	exports.default = SoccerTeam;
	exports.TEAM_COLOR = TEAM_COLOR;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StateMachine = function () {
	  function StateMachine(owner) {
	    _classCallCheck(this, StateMachine);
	
	    this.m_pOwner = owner;
	    this.m_pCurrentState = null;
	    this.m_pPreviousState = null;
	    this.m_pGlobalState = null;
	  }
	
	  _createClass(StateMachine, [{
	    key: "setCurrentState",
	    value: function setCurrentState(state) {
	      this.m_pCurrentState = state;
	    }
	  }, {
	    key: "setGlobalState",
	    value: function setGlobalState(state) {
	      this.m_pGlobalState = state;
	    }
	  }, {
	    key: "setPreviousState",
	    value: function setPreviousState(state) {
	      this.m_pPreviousState = state;
	    }
	  }, {
	    key: "currentState",
	    value: function currentState() {
	      return this.m_pCurrentState;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (this.m_pGlobalState) {
	        this.m_pGlobalState.execute(this.m_pOwner);
	      }
	      if (this.m_pCurrentState) {
	        this.m_pCurrentState.execute(this.m_pOwner);
	      }
	    }
	  }, {
	    key: "changeState",
	    value: function changeState(state) {
	      this.m_pPreviousState = this.m_pCurrentState;
	      this.m_pCurrentState.exit(this.m_pOwner);
	      this.m_pCurrentState = state;
	      this.m_pCurrentState.enter(this.m_pOwner);
	    }
	  }, {
	    key: "revertToPreviousState",
	    value: function revertToPreviousState() {
	      this.changeState(this.m_pPreviousState);
	    }
	  }, {
	    key: "handleMessage",
	    value: function handleMessage(telegram) {
	      if (this.m_pCurrentState && this.m_pCurrentState.onMessage(this.m_pOwner, telegram)) {
	        return true;
	      }
	      if (this.m_pGlobalState && this.m_pGlobalState.onMessage(this.m_pOwner, telegram)) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "isInstate",
	    value: function isInstate(state) {
	      if (this.m_pCurrentState == state) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "getNameOfCurrentState",
	    value: function getNameOfCurrentState() {
	      return this.m_pCurrentState.name;
	    }
	  }]);
	
	  return StateMachine;
	}();
	
	exports.default = StateMachine;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PrepareForKickOff = exports.Defending = exports.Attacking = undefined;
	
	var _soccer_team = __webpack_require__(16);
	
	function changePlayerHomeRegions(team, newRegions) {
		for (var player = 0; player < newRegions.length; player++) {
			team.setPlayerHomeRegion(player, newRegions[player]);
		}
	}
	
	var Attacking = {
		enter: function enter(team) {
			var BlueRegions = [1, 12, 14, 6, 4];
			var RedRegions = [16, 3, 5, 9, 13];
			if (team.teamColor() == _soccer_team.TEAM_COLOR.blue) {
				changePlayerHomeRegions(team, BlueRegions);
			} else {
				changePlayerHomeRegions(team, RedRegions);
			}
			team.updateTargetsOfWaitingPlayers();
		},
		execute: function execute(team) {
			if (!team.inControl()) {
				team.getFSM().changeState(Defending);
				return;
			}
			team.determineBestSupportingPosition();
		},
		exit: function exit(team) {
			team.setSupportingPlayer(null);
		},
		onMessage: function onMessage(team, telegram) {
			return false;
		}
	};
	
	var Defending = {
		enter: function enter(team) {
			var BlueRegions = [1, 6, 8, 3, 5];
			var RedRegions = [16, 9, 11, 12, 14];
			if (team.teamColor() == _soccer_team.TEAM_COLOR.blue) {
				changePlayerHomeRegions(team, BlueRegions);
			} else {
				changePlayerHomeRegions(team, RedRegions);
			}
			team.updateTargetsOfWaitingPlayers();
		},
		execute: function execute(team) {
			if (team.inControl()) {
				team.getFSM().changeState(Attacking);
			}
		},
		exit: function exit(team) {},
		onMessage: function onMessage(team, telegram) {
			return false;
		}
	};
	
	var PrepareForKickOff = {
		enter: function enter(team) {
			team.setControllingPlayer(null);
			team.setSupportingPlayer(null);
			team.setReceiver(null);
			team.setPlayerClosestToBall(null);
			team.returnAllFieldPlayersToHome();
		},
		execute: function execute(team) {
			if (team.allPlayersAtHome() && team.opponents().allPlayersAtHome()) {
				team.getFSM().changeState(Defending);
			}
		},
		exit: function exit(team) {
			team.pitch().setGameOn();
		},
		onMessage: function onMessage(team, telegram) {
			return false;
		}
	};
	
	exports.Attacking = Attacking;
	exports.Defending = Defending;
	exports.PrepareForKickOff = PrepareForKickOff;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _soccer_team = __webpack_require__(16);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _regulator = __webpack_require__(20);
	
	var _regulator2 = _interopRequireDefault(_regulator);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SupportSpot = function SupportSpot(pos, value) {
		_classCallCheck(this, SupportSpot);
	
		this.m_vPos = pos;
		this.m_dScore = value;
	};
	
	var SupportSpotCalculator = function () {
		function SupportSpotCalculator(numX, numY, team) {
			_classCallCheck(this, SupportSpotCalculator);
	
			this.m_pTeam = team;
			this.m_Spots = [];
			this.m_pBestSupportingSpot = null;
			var playingField = team.pitch().playingArea();
			var heightOfSSRegion = playingField.height() * 0.8;
			var widthOfSSRegion = playingField.width() * 0.9;
			var sliceX = widthOfSSRegion / numX;
			var sliceY = heightOfSSRegion / numY;
			var left = playingField.left() + (playingField.width() - widthOfSSRegion) / 2 + sliceX / 2;
			var right = playingField.right() - (playingField.width() - widthOfSSRegion) / 2 - sliceX / 2;
			var top = playingField.top() + (playingField.height() - heightOfSSRegion) / 2 + sliceY / 2;
			for (var x = 0; x < numX / 2 - 1; x++) {
				for (var y = 0; y < numY; y++) {
					if (this.m_pTeam.teamColor == _soccer_team.TEAM_COLOR.blue) {
						this.m_Spots.push(new SupportSpot(new _vector2d2.default(left + x * sliceX, top + y * sliceY), 0));
					} else {
						this.m_Spots.push(new SupportSpot(new _vector2d2.default(right - x * sliceX, top + y * sliceY), 0));
					}
				}
			}
			this.m_pRegulator = new _regulator2.default(_params2.default.SupportSpotUpdateFreq);
		}
	
		_createClass(SupportSpotCalculator, [{
			key: 'render',
			value: function render() {
				_cgdi2.default.greyPen();
				for (var spt = 0; spt < this.m_Spots.length; spt++) {
					_cgdi2.default.circle(this.m_Spots[spt].m_vPos, this.m_Spots[spt].m_dScore);
				}
				if (this.m_pBestSupportingSpot) {
					_cgdi2.default.greenPen();
					_cgdi2.default.circle(this.m_pBestSupportingSpot.m_vPos, this.m_pBestSupportingSpot.m_dScore);
				}
			}
		}, {
			key: 'determineBestSupportingPosition',
			value: function determineBestSupportingPosition() {
				if (!this.m_pRegulator.isReady() && this.m_pBestSupportingSpot) {
					return this.m_pBestSupportingSpot.m_vPos;
				}
				this.m_pBestSupportingSpot = null;
				var bestScoreSoFar = 0;
				for (var i = 0; i < this.m_Spots.length; i++) {
					var curSpot = this.m_Spots[i];
					curSpot.m_dScore = 1;
					if (this.m_pTeam.isPassSafeFromAllOpponents(this.m_pTeam.controllingPlayer().pos(), curSpot.m_vPos, null, _params2.default.MaxPassingForce)) {
						curSpot.m_dScore += _params2.default.Spot_CanPassScore;
					}
					if (this.m_pTeam.canShoot(curSpot.m_vPos, _params2.default.MaxShootingForce)) {
						curSpot.m_dScore += _params2.default.Spot_CanScoreFromPositionScore;
					}
					if (this.m_pTeam.supportingPlayer()) {
						var optimalDistance = 200;
						var dist = (0, _vector2d.vec2DDistance)(this.m_pTeam.controllingPlayer().pos(), curSpot.m_vPos);
						var temp = Math.abs(optimalDistance - dist);
						if (temp < optimalDistance) {
							curSpot.m_dScore += _params2.default.Spot_DistFromControllingPlayerScore * (optimalDistance - temp) / optimalDistance;
						}
					}
					if (curSpot.m_dScore > bestScoreSoFar) {
						bestScoreSoFar = curSpot.m_dScore;
						this.m_pBestSupportingSpot = curSpot;
					}
				}
				return this.m_pBestSupportingSpot.m_vPos;
			}
		}, {
			key: 'getBestSupportingSpot',
			value: function getBestSupportingSpot() {
				if (this.m_pBestSupportingSpot) {
					return this.m_pBestSupportingSpot.m_vPos;
				} else {
					return this.determineBestSupportingPosition();
				}
			}
		}]);
	
		return SupportSpotCalculator;
	}();
	
	exports.default = SupportSpotCalculator;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Regulator = function () {
		function Regulator(numUpdatesPerSecondRqd) {
			_classCallCheck(this, Regulator);
	
			this.m_dwNextUpdateTime = (0, _utils.timeGetTime)() + (0, _utils.randFloat)() * 1000;
			if (numUpdatesPerSecondRqd > 0) {
				this.m_dUpdatePeriod = 1000 / numUpdatesPerSecondRqd;
			} else if ((0, _utils.isEqual)(0, numUpdatesPerSecondRqd)) {
				this.m_dUpdatePeriod = 0;
			} else if (numUpdatesPerSecondRqd < 0) {
				this.m_dUpdatePeriod = -1;
			}
		}
	
		_createClass(Regulator, [{
			key: 'isReady',
			value: function isReady() {
				if ((0, _utils.isEqual)(0, this.m_dUpdatePeriod)) {
					return true;
				}
				if (this.m_dUpdatePeriod < 0) {
					return false;
				}
				var currentTime = (0, _utils.timeGetTime)();
				var updatePeriodVariator = 10;
				if (currentTime >= this.m_dwNextUpdateTime) {
					this.m_dwNextUpdateTime = currentTime + this.m_dUpdatePeriod + (0, _utils.randInRange)(-updatePeriodVariator, updatePeriodVariator);
					return true;
				}
				return false;
			}
		}]);
	
		return Regulator;
	}();
	
	exports.default = Regulator;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entity_manager = __webpack_require__(22);
	
	var _entity_manager2 = _interopRequireDefault(_entity_manager);
	
	var _telegram = __webpack_require__(23);
	
	var _telegram2 = _interopRequireDefault(_telegram);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function sortPriorityQ(r1, r2) {
	  return r1.dispatchTime - r2.dispatchTime;
	}
	
	var MessageDispatcher = function () {
	  function MessageDispatcher() {
	    _classCallCheck(this, MessageDispatcher);
	
	    this.prioritQ = [];
	  }
	
	  _createClass(MessageDispatcher, [{
	    key: 'discharge',
	    value: function discharge(pReceiver, telegram) {
	      if (!pReceiver.handleMessage(telegram)) {
	        console.error('Message not handled');
	      }
	    }
	  }, {
	    key: 'dispatchMessage',
	    value: function dispatchMessage(delay, senderID, receiverID, msg, extraInfo) {
	      var pSender = _entity_manager2.default.getEntityFromID(senderID);
	      var pReceiver = _entity_manager2.default.getEntityFromID(receiverID);
	      if (!pReceiver) {
	        console.error('Warning! No Receiver with ID of ' + receiverID + ' found');
	        return;
	      }
	      var telegram = new _telegram2.default(0, senderID, receiverID, msg, extraInfo);
	      if (delay <= 0) {
	        // console.log(`即时telegram触发于: ${(new Date()).getTime()}, 由${getNameOfEntity(senderID)}发给${getNameOfEntity(receiverID)}, 信息为: ${msgToStr(msg)}`);
	        this.discharge(pReceiver, telegram);
	      } else {
	        var currentTime = new Date().getTime();
	        telegram.dispatchTime = currentTime + delay;
	        this.prioritQ.push(telegram);
	        this.prioritQ.sort(sortPriorityQ);
	        // console.log(`延时telegram记录于: ${new Date().getTime()}, 由${getNameOfEntity(senderID)}发给${getNameOfEntity(receiverID)}, 信息为: ${msgToStr(msg)}`);
	      }
	    }
	  }, {
	    key: 'dispatchDelayedMessages',
	    value: function dispatchDelayedMessages() {
	      var currentTime = new Date().getTime();
	      while (this.prioritQ.length && this.prioritQ[0].dispatchTime < currentTime && this.prioritQ[0].dispatchTime > 0) {
	        var telegram = this.prioritQ[0];
	        var pReceiver = _entity_manager2.default.getEntityFromID(telegram.receiverID);
	        // console.log(`队列telegram准备触发: 发给${getNameOfEntity(pReceiver.id())}. 消息为: ${msgToStr(telegram.msg)}`);
	        this.discharge(pReceiver, telegram);
	        this.prioritQ.shift();
	      }
	    }
	  }]);
	
	  return MessageDispatcher;
	}();
	
	exports.default = new MessageDispatcher();

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EntityManager = function () {
	  function EntityManager() {
	    _classCallCheck(this, EntityManager);
	
	    this.m_EntityMap = {};
	  }
	
	  _createClass(EntityManager, [{
	    key: "registerEntity",
	    value: function registerEntity(newEntity) {
	      this.m_EntityMap[newEntity.id()] = newEntity;
	    }
	  }, {
	    key: "getEntityFromID",
	    value: function getEntityFromID(id) {
	      return this.m_EntityMap[id];
	    }
	  }, {
	    key: "removeEntity",
	    value: function removeEntity(pEntity) {
	      this.m_EntityMap[pEntity.id()] = null;
	    }
	  }]);
	
	  return EntityManager;
	}();
	
	exports.default = new EntityManager();

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Telegram = function Telegram(dispatchTime, senderID, receiverID, msg, extraInfo) {
	  _classCallCheck(this, Telegram);
	
	  this.dispatchTime = dispatchTime;
	  this.senderID = senderID;
	  this.receiverID = receiverID;
	  this.msg = msg;
	  this.extraInfo = extraInfo;
	};
	
	exports.default = Telegram;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MessageType = {
	  Msg_ReceiveBall: 'Msg_ReceiveBall',
	  Msg_PassToMe: 'Msg_PassToMe',
	  Msg_SupportAttacker: 'Msg_SupportAttacker',
	  Msg_GoHome: 'Msg_GoHome',
	  Msg_Wait: 'Msg_Wait'
	};
	
	exports.default = MessageType;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PLAYERROLE = exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_entity = __webpack_require__(12);
	
	var _moving_entity2 = _interopRequireDefault(_moving_entity);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _utils = __webpack_require__(15);
	
	var _steering_behavior = __webpack_require__(26);
	
	var _steering_behavior2 = _interopRequireDefault(_steering_behavior);
	
	var _message_dispatcher = __webpack_require__(21);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	var _soccer_messages = __webpack_require__(24);
	
	var _soccer_messages2 = _interopRequireDefault(_soccer_messages);
	
	var _autolist = __webpack_require__(27);
	
	var _autolist2 = _interopRequireDefault(_autolist);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PLAYERROLE = {
	  attacker: 'attacker',
	  defender: 'defender',
	  goalKeeper: 'goalKeeper'
	};
	
	function sortByDistanceToOpponentsGoal(p1, p2) {
	  return p1.distToOppGoal() < p2.distToOppGoal();
	}
	
	function sortByReversedDistanceToOpponentsGoal(p1, p2) {
	  return p1.distToOppGoal() > p2.distToOppGoal();
	}
	
	var PlayerBase = function (_MovingEntity) {
	  _inherits(PlayerBase, _MovingEntity);
	
	  function PlayerBase(homeTeam, homeRegion, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, role) {
	    _classCallCheck(this, PlayerBase);
	
	    var _this = _possibleConstructorReturn(this, (PlayerBase.__proto__ || Object.getPrototypeOf(PlayerBase)).call(this, homeTeam.pitch().getRegionFromIndex(homeRegion).center(), scale * 10, velocity, maxSpeed, heading, mass, new _vector2d2.default(scale, scale), maxTurnRate, maxForce));
	
	    _autolist2.default.addMember(_this);
	    _this.m_pTeam = homeTeam;
	    _this.m_dDistSqToBall = _utils.MaxFloat;
	    _this.m_iHomeRegion = homeRegion;
	    _this.m_iDefaultRegion = homeRegion;
	    _this.m_playerRole = role;
	    _this.m_vecPlayerVB = [];
	    _this.m_vecPlayerVBTrans = [];
	    var NumPlayerVerts = 4;
	    var player = [new _vector2d2.default(-3, 8), new _vector2d2.default(3, 10), new _vector2d2.default(3, -10), new _vector2d2.default(-3, -8)];
	    for (var vtx = 0; vtx < NumPlayerVerts; vtx++) {
	      _this.m_vecPlayerVB.push(player[vtx]);
	      if (Math.abs(player[vtx].x) > _this.m_dBoundingRadius) {
	        _this.m_dBoundingRadius = Math.abs(player[vtx].x);
	      }
	      if (Math.abs(player[vtx].y) > _this.m_dBoundingRadius) {
	        _this.m_dBoundingRadius = Math.abs(player[vtx].y);
	      }
	    }
	    _this.m_pSteering = new _steering_behavior2.default(_this, _this.m_pTeam.pitch(), _this.ball());
	    _this.m_pSteering.setTarget(homeTeam.pitch().getRegionFromIndex(homeRegion).center());
	    return _this;
	  }
	
	  _createClass(PlayerBase, [{
	    key: 'isThreatened',
	    value: function isThreatened() {
	      var oppTeamMemberList = this.team().opponents().members();
	      for (var i = 0; i < oppTeamMemberList.length; i++) {
	        var curOpp = oppTeamMemberList[i];
	        if (this.positionInFrontOfPlayer(curOpp.pos()) && (0, _vector2d.vec2DDistanceSq)(this.pos(), curOpp.pos()) < _params2.default.PlayerComfortZoneSq) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'trackBall',
	    value: function trackBall() {
	      this.rotateHeadingToFacePosition(this.ball().pos());
	    }
	  }, {
	    key: 'trackTarget',
	    value: function trackTarget() {
	      this.setHeading((0, _vector2d.vec2dNormalize)(this.steering().target().add(this.pos().getReverse())));
	    }
	  }, {
	    key: 'findSupport',
	    value: function findSupport() {
	      var bestSupportPly = void 0;
	      if (this.team().supportingPlayer() == null) {
	        bestSupportPly = this.team().determineBestSupportingAttacker();
	        this.team().setSupportingPlayer(bestSupportPly);
	        _message_dispatcher2.default.dispatchMessage(0, this.id(), this.team().supportingPlayer().id(), _soccer_messages2.default.Msg_SupportAttacker, null);
	      }
	      bestSupportPly = this.team().determineBestSupportingAttacker();
	      if (bestSupportPly && bestSupportPly != this.team().supportingPlayer()) {
	        if (this.team().supportingPlayer()) {
	          _message_dispatcher2.default.dispatchMessage(0, this.id(), this.team().supportingPlayer().id(), _soccer_messages2.default.Msg_GoHome, null);
	        }
	        this.team().setSupportingPlayer(bestSupportPly);
	        _message_dispatcher2.default.dispatchMessage(0, this.id(), this.team().supportingPlayer().id(), _soccer_messages2.default.Msg_SupportAttacker, null);
	      }
	    }
	  }, {
	    key: 'ballWithinKeeperRange',
	    value: function ballWithinKeeperRange() {
	      return (0, _vector2d.vec2DDistanceSq)(this.pos(), this.ball().pos()) < _params2.default.KeeperInBallRangeSq;
	    }
	  }, {
	    key: 'ballWithinKickingRange',
	    value: function ballWithinKickingRange() {
	      return (0, _vector2d.vec2DDistanceSq)(this.pos(), this.ball().pos()) < _params2.default.PlayerKickingDistanceSq;
	    }
	  }, {
	    key: 'ballWithinReceivingRange',
	    value: function ballWithinReceivingRange() {
	      return (0, _vector2d.vec2DDistanceSq)(this.pos(), this.ball().pos()) < _params2.default.BallWithinReceivingRangeSq;
	    }
	  }, {
	    key: 'inHomeRegion',
	    value: function inHomeRegion() {
	      if (this.m_playerRole == PLAYERROLE.goalKeeper) {
	        return this.pitch().getRegionFromIndex(this.m_iHomeRegion).inside(this.pos(), 'NORMAL');
	      } else {
	        return this.pitch().getRegionFromIndex(this.m_iHomeRegion).inside(this.pos(), 'HALF_SIZE');
	      }
	    }
	  }, {
	    key: 'isAheadOfAttacker',
	    value: function isAheadOfAttacker() {
	      return Math.abs(this.pos().x - this.team().opponentsGoal().center().x) < Math.abs(this.team().controllingPlayer().pos().x - this.team().opponentsGoal().center().x);
	    }
	  }, {
	    key: 'atSupportSpot',
	    value: function atSupportSpot() {}
	  }, {
	    key: 'atTarget',
	    value: function atTarget() {
	      return (0, _vector2d.vec2DDistanceSq)(this.pos(), this.steering().target()) < _params2.default.PlayerInTargetRangeSq;
	    }
	  }, {
	    key: 'isClosestTeamMemberToBall',
	    value: function isClosestTeamMemberToBall() {
	      return this.team().playerClosestToBall() == this;
	    }
	  }, {
	    key: 'positionInFrontOfPlayer',
	    value: function positionInFrontOfPlayer(position) {
	      var toSubject = position.add(this.pos().getReverse());
	      if (toSubject.dot(this.heading()) > 0) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'isClosestPlayerOnPitchToBall',
	    value: function isClosestPlayerOnPitchToBall() {
	      return this.isClosestTeamMemberToBall() && this.distSqToBall() < this.team().opponents().closestDistToBallSq();
	    }
	  }, {
	    key: 'isControllingPlayer',
	    value: function isControllingPlayer() {
	      return this.team().controllingPlayer() == this;
	    }
	  }, {
	    key: 'inHotregion',
	    value: function inHotregion() {
	      return Math.abs(this.pos().y - this.team().opponentsGoal().center().y) < this.pitch().playingArea().length / 3;
	    }
	  }, {
	    key: 'role',
	    value: function role() {
	      return this.m_playerRole;
	    }
	  }, {
	    key: 'distSqToBall',
	    value: function distSqToBall() {
	      return this.m_dDistSqToBall;
	    }
	  }, {
	    key: 'setDistSqToBall',
	    value: function setDistSqToBall(val) {
	      this.m_dDistSqToBall = val;
	    }
	  }, {
	    key: 'distToOppGoal',
	    value: function distToOppGoal() {
	      return Math.abs(this.pos().x - this.team().opponentsGoal().center().x);
	    }
	  }, {
	    key: 'distToHomeGoal',
	    value: function distToHomeGoal() {
	      return Math.abs(this.pos().x - this.team().homeGoal().center().x);
	    }
	  }, {
	    key: 'setDefaultHomeRegion',
	    value: function setDefaultHomeRegion() {
	      this.m_iHomeRegion = this.m_iDefaultRegion;
	    }
	  }, {
	    key: 'ball',
	    value: function ball() {
	      return this.team().pitch().ball();
	    }
	  }, {
	    key: 'pitch',
	    value: function pitch() {
	      return this.team().pitch();
	    }
	  }, {
	    key: 'steering',
	    value: function steering() {
	      return this.m_pSteering;
	    }
	  }, {
	    key: 'homeRegion',
	    value: function homeRegion() {
	      return this.pitch().getRegionFromIndex(this.m_iHomeRegion);
	    }
	  }, {
	    key: 'setHomeRegion',
	    value: function setHomeRegion(newRegion) {
	      this.m_iHomeRegion = newRegion;
	    }
	  }, {
	    key: 'team',
	    value: function team() {
	      return this.m_pTeam;
	    }
	  }]);
	
	  return PlayerBase;
	}(_moving_entity2.default);
	
	exports.default = PlayerBase;
	exports.PLAYERROLE = PLAYERROLE;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _transformations = __webpack_require__(8);
	
	var _geometry = __webpack_require__(7);
	
	var _utils = __webpack_require__(15);
	
	var _autolist = __webpack_require__(27);
	
	var _autolist2 = _interopRequireDefault(_autolist);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var slow = 3;
	var normal = 2;
	var fast = 1;
	var WanderRad = 1.2;
	var WanderDist = 2;
	var WanderJitterPerSec = 80;
	var WaypointSeekDist = 20;
	var BehaviorType = {
		none: 0x0000,
		seek: 0x0001,
		arrive: 0x0002,
		separation: 0x0004,
		pursuit: 0x0008,
		interpose: 0x0010
	};
	
	var SteeringBehavior = function () {
		function SteeringBehavior(agent, world, ball) {
			_classCallCheck(this, SteeringBehavior);
	
			this.m_pPlayer = agent;
			this.m_iFlags = 0;
			this.m_dMultSeparation = _params2.default.SeparationCoefficient;
			this.bTagged = false;
			this.m_dViewDistance = _params2.default.ViewDistance;
			this.m_pBall = ball;
			this.m_dInterposeDist = 0;
			this.m_vSteeringForce = new _vector2d2.default();
			this.m_Antenna = [new _vector2d2.default(), new _vector2d2.default(), new _vector2d2.default(), new _vector2d2.default(), new _vector2d2.default()];
		}
	
		_createClass(SteeringBehavior, [{
			key: 'force',
			value: function force() {
				return this.m_vSteeringForce;
			}
		}, {
			key: 'target',
			value: function target() {
				return this.m_vTarget;
			}
		}, {
			key: 'setTarget',
			value: function setTarget(t) {
				this.m_vTarget = t;
			}
		}, {
			key: 'interposeDistance',
			value: function interposeDistance() {
				return this.m_dInterposeDist;
			}
		}, {
			key: 'setInterposeDistance',
			value: function setInterposeDistance(d) {
				this.m_dInterposeDist = d;
			}
		}, {
			key: 'tagged',
			value: function tagged() {
				return this.m_bTagged;
			}
		}, {
			key: 'tag',
			value: function tag() {
				this.m_bTagged = true;
			}
		}, {
			key: 'unTag',
			value: function unTag() {
				this.m_bTagged = false;
			}
		}, {
			key: 'on',
			value: function on(bt) {
				return (this.m_iFlags & bt) == bt;
			}
		}, {
			key: 'seekOn',
			value: function seekOn() {
				this.m_iFlags |= BehaviorType.seek;
			}
		}, {
			key: 'seekOff',
			value: function seekOff() {
				if (this.on(BehaviorType.seek)) {
					this.m_iFlags ^= BehaviorType.seek;
				}
			}
		}, {
			key: 'seekIsOn',
			value: function seekIsOn() {
				return this.on(BehaviorType.seek);
			}
		}, {
			key: 'arriveOn',
			value: function arriveOn() {
				this.m_iFlags |= BehaviorType.arrive;
			}
		}, {
			key: 'arriveOff',
			value: function arriveOff() {
				if (this.on(BehaviorType.arrive)) {
					this.m_iFlags ^= BehaviorType.arrive;
				}
			}
		}, {
			key: 'arriveIsOn',
			value: function arriveIsOn() {
				return this.on(BehaviorType.arrive);
			}
		}, {
			key: 'pursuitOn',
			value: function pursuitOn() {
				this.m_iFlags |= BehaviorType.pursuit;
			}
		}, {
			key: 'pursuitOff',
			value: function pursuitOff() {
				if (this.on(BehaviorType.pursuit)) {
					this.m_iFlags ^= BehaviorType.pursuit;
				}
			}
		}, {
			key: 'pursuitIsOn',
			value: function pursuitIsOn() {
				return this.on(BehaviorType.pursuit);
			}
		}, {
			key: 'separationOn',
			value: function separationOn() {
				this.m_iFlags |= BehaviorType.separation;
			}
		}, {
			key: 'separationOff',
			value: function separationOff() {
				if (this.on(BehaviorType.separation)) {
					this.m_iFlags ^= BehaviorType.separation;
				}
			}
		}, {
			key: 'separationIsOn',
			value: function separationIsOn() {
				return this.on(BehaviorType.separation);
			}
		}, {
			key: 'interposeOn',
			value: function interposeOn(d) {
				this.m_iFlags |= BehaviorType.interpose;
				this.m_dInterposeDist = d;
			}
		}, {
			key: 'interposeOff',
			value: function interposeOff() {
				if (this.on(BehaviorType.interpose)) {
					this.m_iFlags ^= BehaviorType.interpose;
				}
			}
		}, {
			key: 'interposeIsOn',
			value: function interposeIsOn() {
				return this.on(BehaviorType.interpose);
			}
		}, {
			key: 'accumulateForce',
			value: function accumulateForce(steeringForce, forceToAdd) {
				var returnForce = new _vector2d2.default();
				var result = false;
				var magnitudeSoFar = steeringForce.length();
				var magnitudeRemaining = this.m_pPlayer.maxForce() - magnitudeSoFar;
				if (magnitudeRemaining <= 0) {
					return {
						result: result,
						returnForce: returnForce
					};
				}
				var magnitudeToAdd = forceToAdd.length();
				if (magnitudeToAdd > magnitudeRemaining) {
					magnitudeToAdd = magnitudeRemaining;
				}
				returnForce = steeringForce.add((0, _vector2d.vec2dNormalize)(forceToAdd).crossNum(magnitudeToAdd));
				result = true;
				return {
					result: result,
					returnForce: returnForce
				};
			}
		}, {
			key: 'calculate',
			value: function calculate() {
				this.m_vSteeringForce.zero();
				this.m_vSteeringForce = this.sumForces();
				this.m_vSteeringForce.truncate(this.m_pPlayer.maxForce());
				return this.m_vSteeringForce;
			}
		}, {
			key: 'sumForces',
			value: function sumForces() {
				var force = new _vector2d2.default();
				var accumulateForceInfo = null;
				if (this.on(BehaviorType.separation)) {
					force = force.add(this.separation().crossNum(this.m_dMultSeparation));
					accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
					if (accumulateForceInfo.result) {
						this.m_vSteeringForce = accumulateForceInfo.returnForce;
					} else {
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.seek)) {
					force = force.add(this.seek(this.m_vTarget));
					accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
					if (accumulateForceInfo.result) {
						this.m_vSteeringForce = accumulateForceInfo.returnForce;
					} else {
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.arrive)) {
					force = force.add(this.arrive(this.m_vTarget, fast));
					accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
					if (accumulateForceInfo.result) {
						this.m_vSteeringForce = accumulateForceInfo.returnForce;
					} else {
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.pursuit)) {
					force = force.add(this.pursuit(this.m_pBall));
					accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
					if (accumulateForceInfo.result) {
						this.m_vSteeringForce = accumulateForceInfo.returnForce;
					} else {
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.interpose)) {
					force = force.add(this.interpose(this.m_pBall, this.m_vTarget, this.m_dInterposeDist));
					accumulateForceInfo = this.accumulateForce(this.m_vSteeringForce, force);
					if (accumulateForceInfo.result) {
						this.m_vSteeringForce = accumulateForceInfo.returnForce;
					} else {
						return this.m_vSteeringForce;
					}
				}
				return this.m_vSteeringForce;
			}
		}, {
			key: 'forwardComponent',
			value: function forwardComponent() {
				return this.m_pPlayer.heading().dot(this.m_vSteeringForce);
			}
		}, {
			key: 'sideComponent',
			value: function sideComponent() {
				return this.m_pPlayer.side().dot(this.m_vSteeringForce) * this.m_pPlayer.maxTurnRate();
			}
		}, {
			key: 'seek',
			value: function seek(targetPos) {
				var desiredVelocity = (0, _vector2d.vec2dNormalize)(targetPos.add(this.m_pPlayer.pos().getReverse())).crossNum(this.m_pPlayer.maxSpeed());
				return desiredVelocity.add(this.m_pPlayer.velocity().getReverse());
			}
		}, {
			key: 'arrive',
			value: function arrive(targetPos, deceleration) {
				var toTarget = targetPos.add(this.m_pPlayer.pos().getReverse());
				var dist = toTarget.length();
				if (dist > 0) {
					var decelerationTweaker = 0.3;
					var speed = dist / (deceleration * decelerationTweaker);
					speed = Math.min(speed, this.m_pPlayer.maxSpeed());
					var desiredVelocity = toTarget.crossNum(speed / dist);
					return desiredVelocity.add(this.m_pPlayer.velocity().getReverse());
				}
				return new _vector2d2.default(0, 0);
			}
		}, {
			key: 'pursuit',
			value: function pursuit(ball) {
				var toBall = ball.pos().add(this.m_pPlayer.pos().getReverse());
				var lookAheadTime = 0;
				if (ball.speed() != 0) {
					lookAheadTime = toBall.length() / ball.speed();
				}
				this.m_vTarget = ball.futurePosition(lookAheadTime);
				return this.arrive(this.m_vTarget, fast);
			}
		}, {
			key: 'findNeighbours',
			value: function findNeighbours() {
				var allPlayers = _autolist2.default.getAllMembers();
				for (var i = 0; i < allPlayers.length; i++) {
					var curPlayer = allPlayers[i];
					curPlayer.steering().unTag();
					var to = curPlayer.pos().add(this.m_pPlayer.pos().getReverse());
					if (to.lengthSq() < this.m_dViewDistance * this.m_dViewDistance) {
						curPlayer.steering().tag();
					}
				}
			}
		}, {
			key: 'separation',
			value: function separation() {
				var steeringForce = new _vector2d2.default();
				var allPlayers = _autolist2.default.getAllMembers();
				this.findNeighbours();
				for (var i = 0; i < allPlayers.length; i++) {
					var curPlayer = allPlayers[i];
					if (curPlayer != this.m_pPlayer && curPlayer.steering().tagged()) {
						var toAgent = this.m_pPlayer.pos().add(curPlayer.pos().getReverse());
						steeringForce = steeringForce.add((0, _vector2d.vec2dNormalize)(toAgent).crossNum(1 / toAgent.length()));
					}
				}
				return steeringForce;
			}
		}, {
			key: 'interpose',
			value: function interpose(ball, target, distFromTarget) {
				return this.arrive(target.add((0, _vector2d.vec2dNormalize)(ball.pos().add(target.getReverse())).crossNum(distFromTarget)), normal);
			}
		}, {
			key: 'renderAids',
			value: function renderAids() {
				_cgdi2.default.redPen();
				_cgdi2.default.line(this.m_pPlayer.pos(), this.m_pPlayer.pos().add(this.m_vSteeringForce.crossNum(20)));
			}
		}]);
	
		return SteeringBehavior;
	}();
	
	exports.default = SteeringBehavior;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AutoList = function () {
		function AutoList() {
			_classCallCheck(this, AutoList);
	
			this.m_Members = [];
		}
	
		_createClass(AutoList, [{
			key: "addMember",
			value: function addMember(member) {
				this.m_Members.push(member);
			}
		}, {
			key: "getAllMembers",
			value: function getAllMembers() {
				return this.m_Members;
			}
		}]);
	
		return AutoList;
	}();
	
	var autoList = new AutoList();
	
	exports.default = autoList;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PutBallBackInPlay = exports.ReturnHome = exports.InterceptBall = exports.TendGoal = exports.GlobalKeeperState = undefined;
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _soccer_messages = __webpack_require__(24);
	
	var _soccer_messages2 = _interopRequireDefault(_soccer_messages);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _message_dispatcher = __webpack_require__(21);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GlobalKeeperState = {
		name: 'GlobalKeeperState',
		enter: function enter(keeper) {
			// 
		},
		execute: function execute(keeper) {
			// 
		},
		exit: function exit(keeper) {
			// 
		},
		onMessage: function onMessage(keeper, telegram) {
			switch (telegram.msg) {
				case _soccer_messages2.default.Msg_GoHome:
					keeper.setDefaultHomeRegion();
					keeper.getFSM().changeState(ReturnHome);
					return true;
					break;
				case _soccer_messages2.default.Msg_ReceiveBall:
					keeper.getFSM().changeState(InterceptBall);
					return true;
					break;
			}
			return false;
		}
	};
	
	var TendGoal = {
		name: 'TendGoal',
		enter: function enter(keeper) {
			keeper.steering().interposeOn(_params2.default.GoalKeeperTendingDistance);
			keeper.steering().setTarget(keeper.getRearInterposeTarget());
		},
		execute: function execute(keeper) {
			keeper.steering().setTarget(keeper.getRearInterposeTarget());
			if (keeper.ballWithinKeeperRange()) {
				keeper.ball().trap();
				keeper.pitch().setGoalKeeperHasBall(true);
				keeper.getFSM().changeState(PutBallBackInPlay);
				return;
			}
			if (keeper.ballWithinRangeForIntercept() && !keeper.team().inControl()) {
				keeper.getFSM().changeState(InterceptBall);
			}
			if (keeper.tooFarFromGoalMouth() && keeper.team().inControl()) {
				keeper.getFSM().changeState(ReturnHome);
				return;
			}
		},
		exit: function exit(keeper) {
			keeper.steering().interposeOff();
		},
		onMessage: function onMessage(keeper, telegram) {
			return false;
		}
	};
	
	var InterceptBall = {
		name: 'InterceptBall',
		enter: function enter(keeper) {
			keeper.steering().pursuitOn();
		},
		execute: function execute(keeper) {
			if (keeper.tooFarFromGoalMouth() && !keeper.isClosestPlayerOnPitchToBall()) {
				keeper.getFSM().changeState(ReturnHome);
				return;
			}
			if (keeper.ballWithinKeeperRange()) {
				keeper.ball().trap();
				keeper.pitch().setGoalKeeperHasBall(true);
				keeper.getFSM().changeState(PutBallBackInPlay);
			}
		},
		exit: function exit(keeper) {
			keeper.steering().pursuitOff();
		},
		onMessage: function onMessage(keeper, telegram) {
			return false;
		}
	};
	
	var ReturnHome = {
		name: 'ReturnHome',
		enter: function enter(keeper) {
			keeper.steering().arriveOn();
		},
		execute: function execute(keeper) {
			keeper.steering().setTarget(keeper.homeRegion().center());
			if (keeper.inHomeRegion() || !keeper.team().inControl()) {
				keeper.getFSM().changeState(TendGoal);
			}
		},
		exit: function exit(keeper) {
			keeper.steering().arriveOff();
		},
		onMessage: function onMessage(keeper, telegram) {
			return false;
		}
	};
	
	var PutBallBackInPlay = {
		name: 'PutBallBackInPlay',
		enter: function enter(keeper) {
			keeper.team().setControllingPlayer(keeper);
			keeper.team().opponents().returnAllFieldPlayersToHome();
			keeper.team().returnAllFieldPlayersToHome();
		},
		execute: function execute(keeper) {
			var passInfo = keeper.team().findPass(keeper, _params2.default.MaxPassingForce, _params2.default.GoalkeeperMinPassDistance);
			if (passInfo.result) {
				keeper.ball().kick((0, _vector2d.vec2dNormalize)(passInfo.target.add(keeper.ball().pos().getReverse())), _params2.default.MaxPassingForce);
				keeper.pitch().setGoalKeeperHasBall(false);
				_message_dispatcher2.default.dispatchMessage(0, keeper.id(), passInfo.receiver.id(), _soccer_messages2.default.Msg_ReceiveBall, passInfo.target);
				keeper.getFSM().changeState(TendGoal);
				return;
			}
			keeper.setVelocity(new _vector2d2.default());
		},
		exit: function exit(keeper) {
			// 
		},
		onMessage: function onMessage(keeper, telegram) {
			return false;
		}
	};
	
	exports.GlobalKeeperState = GlobalKeeperState;
	exports.TendGoal = TendGoal;
	exports.InterceptBall = InterceptBall;
	exports.ReturnHome = ReturnHome;
	exports.PutBallBackInPlay = PutBallBackInPlay;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SupportAttacker = exports.ReceiveBall = exports.KickBall = exports.Wait = exports.ReturnToHomeRegion = exports.Dribble = exports.ChaseBall = exports.GlobalPlayerState = undefined;
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _soccer_messages = __webpack_require__(24);
	
	var _soccer_messages2 = _interopRequireDefault(_soccer_messages);
	
	var _message_dispatcher = __webpack_require__(21);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _utils = __webpack_require__(15);
	
	var _soccer_ball = __webpack_require__(11);
	
	var _transformations = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GlobalPlayerState = {
	  name: 'GlobalPlayerState',
	  enter: function enter(player) {},
	  execute: function execute(player) {
	    if (player.ballWithinReceivingRange() && player.isControllingPlayer()) {
	      player.setMaxSpeed(_params2.default.PlayerMaxSpeedWithBall);
	    } else {
	      player.setMaxSpeed(_params2.default.PlayerMaxSpeedWithoutBall);
	    }
	  },
	  exit: function exit(player) {},
	  onMessage: function onMessage(player, telegram) {
	    switch (telegram.msg) {
	      case _soccer_messages2.default.Msg_ReceiveBall:
	        player.steering().setTarget(telegram.extraInfo);
	        player.getFSM().changeState(ReceiveBall);
	        return true;
	        break;
	      case _soccer_messages2.default.Msg_SupportAttacker:
	        if (player.getFSM().isInstate(SupportAttacker)) {
	          return true;
	        }
	        player.steering().setTarget(player.team().getSupportSpot());
	        player.getFSM().changeState(SupportAttacker);
	        return true;
	        break;
	      case _soccer_messages2.default.Msg_Wait:
	        player.getFSM().changeState(Wait);
	        return true;
	        break;
	      case _soccer_messages2.default.Msg_GoHome:
	        player.setDefaultHomeRegion();
	        player.getFSM().changeState(ReturnToHomeRegion);
	        return true;
	        break;
	      case _soccer_messages2.default.Msg_PassToMe:
	        var receiver = telegram.extraInfo;
	        if (player.team().receiver() != null || !player.ballWithinKickingRange()) {
	          console.warn('player cannot make requested pass');
	          return true;
	        }
	        player.ball().kick(receiver.pos().add(player.ball().pos().getReverse()), _params2.default.MaxPassingForce);
	        _message_dispatcher2.default.dispatchMessage(0, player.id(), receiver.id(), _soccer_messages2.default.Msg_ReceiveBall, receiver.pos());
	        player.getFSM().changeState(Wait);
	        player.findSupport();
	        return true;
	        break;
	    }
	    return false;
	  }
	};
	
	var ChaseBall = {
	  name: 'ChaseBall',
	  enter: function enter(player) {
	    player.steering().seekOn();
	  },
	  execute: function execute(player) {
	    if (player.ballWithinKickingRange()) {
	      player.getFSM().changeState(KickBall);
	      return;
	    }
	    if (player.isClosestTeamMemberToBall()) {
	      player.steering().setTarget(player.ball().pos());
	      return;
	    }
	    player.getFSM().changeState(ReturnToHomeRegion);
	  },
	  exit: function exit(player) {
	    player.steering().seekOff();
	  },
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	var Dribble = {
	  name: 'Dribble',
	  enter: function enter(player) {
	    player.team().setControllingPlayer(player);
	  },
	  execute: function execute(player) {
	    var dot = player.team().homeGoal().facing().dot(player.heading());
	    if (dot < 0) {
	      var direction = player.heading();
	      var angle = Math.PI / 4 * -1 * player.team().homeGoal().facing().sign(player.heading());
	      (0, _transformations.vec2dRotateAroundOrigin)(direction, angle);
	      var kickingForce = 0.8;
	      player.ball().kick(direction, kickingForce);
	    } else {
	      player.ball().kick(player.team().homeGoal().facing(), _params2.default.MaxDribbleForce);
	    }
	    player.getFSM().changeState(ChaseBall);
	    return;
	  },
	  exit: function exit(player) {},
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	var ReturnToHomeRegion = {
	  name: 'ReturnToHomeRegion',
	  enter: function enter(player) {
	    player.steering().arriveOn();
	    if (!player.homeRegion().inside(player.steering().target(), 'HALF_SIZE')) {
	      player.steering().setTarget(player.homeRegion().center());
	    }
	  },
	  execute: function execute(player) {
	    if (player.pitch().gameOn()) {
	      if (player.isClosestTeamMemberToBall() && player.team().receiver() == null && !player.pitch().goalKeeperHasBall()) {
	        player.getFSM().changeState(ChaseBall);
	        return;
	      }
	    }
	    if (player.pitch().gameOn() && player.homeRegion().inside(player.pos(), 'HALF_SIZE')) {
	      player.steering().setTarget(player.pos());
	      player.getFSM().changeState(Wait);
	    } else if (!player.pitch().gameOn() && player.atTarget()) {
	      player.getFSM().changeState(Wait);
	    }
	  },
	  exit: function exit(player) {
	    player.steering().arriveOff();
	  },
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	var Wait = {
	  name: 'Wait',
	  enter: function enter(player) {
	    if (!player.pitch().gameOn()) {
	      player.steering().setTarget(player.homeRegion().center());
	    }
	  },
	  execute: function execute(player) {
	    if (!player.atTarget()) {
	      player.steering().arriveOn();
	      return;
	    } else {
	      player.steering().arriveOff();
	      player.setVelocity(new _vector2d2.default(0, 0));
	      player.trackBall();
	    }
	    if (player.pitch().gameOn()) {
	      if (player.isClosestTeamMemberToBall() && player.team().receiver() == null && !player.pitch().goalKeeperHasBall()) {
	        player.getFSM().changeState(ChaseBall);
	        return;
	      }
	    }
	  },
	  exit: function exit(player) {},
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	var KickBall = {
	  name: 'KickBall',
	  enter: function enter(player) {
	    player.team().setControllingPlayer(player);
	    if (!player.isReadyFornextKick()) {
	      player.getFSM().changeState(ChaseBall);
	    }
	  },
	  execute: function execute(player) {
	    var toBall = player.ball().pos().add(player.pos().getReverse());
	    var dot = player.heading().dot((0, _vector2d.vec2dNormalize)(toBall));
	    var ballTarget = void 0;
	    var kickDirection = void 0;
	    if (player.team().receiver() != null || player.pitch().goalKeeperHasBall() || dot < 0) {
	      console.warn('goaly has ball / ball behind player');
	      player.getFSM().changeState(ChaseBall);
	      return;
	    }
	    var power = _params2.default.MaxShootingForce * dot;
	    var shootInfo = player.team().canShoot(player.ball().pos(), power);
	    if (shootInfo.result || (0, _utils.randFloat)() < _params2.default.ChancePlayerAttemptsPotShot) {
	      ballTarget = (0, _soccer_ball.addNoiseToKick)(player.ball().pos(), shootInfo.target);
	      kickDirection = ballTarget.add(player.ball().pos().getReverse());
	      player.ball().kick(kickDirection, power);
	      player.getFSM().changeState(Wait);
	      player.findSupport();
	      return;
	    }
	    power = _params2.default.MaxPassingForce * dot;
	    var passInfo = player.team().findPass(player, power, _params2.default.MinPassDistance);
	    if (player.isThreatened() && passInfo.result) {
	      ballTarget = (0, _soccer_ball.addNoiseToKick)(player.ball().pos(), passInfo.target);
	      kickDirection = ballTarget.add(player.ball().pos().getReverse());
	      player.ball().kick(kickDirection, power);
	      _message_dispatcher2.default.dispatchMessage(0, player.id(), passInfo.receiver.id(), _soccer_messages2.default.Msg_ReceiveBall, ballTarget);
	      player.getFSM().changeState(Wait);
	      player.findSupport();
	      return;
	    } else {
	      player.findSupport();
	      player.getFSM().changeState(Dribble);
	    }
	  },
	  exit: function exit(player) {},
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	var ReceiveBall = {
	  name: 'ReceiveBall',
	  enter: function enter(player) {
	    player.team().setReceiver(player);
	    player.team().setControllingPlayer(player);
	    var passThreatRadius = 70;
	    if (player.inHotregion() || (0, _utils.randFloat)() < _params2.default.ChanceOfUsingArriveTypeReceiveBehavior && !player.team().isOpponentWithinRadius(player.pos(), passThreatRadius)) {
	      player.steering().arriveOn();
	    } else {
	      player.steering().pursuitOn();
	    }
	  },
	  execute: function execute(player) {
	    if (player.ballWithinReceivingRange() || !player.team().inControl()) {
	      player.getFSM().changeState(ChaseBall);
	      return;
	    }
	    if (player.steering().pursuitIsOn()) {
	      player.steering().setTarget(player.ball().pos());
	    }
	    if (player.atTarget()) {
	      player.steering().arriveOff();
	      player.steering().pursuitOff();
	      player.trackBall();
	      player.setVelocity(new _vector2d2.default(0, 0));
	    }
	  },
	  exit: function exit(player) {
	    player.steering().arriveOff();
	    player.steering().pursuitOff();
	    player.team().setReceiver(null);
	  },
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	var SupportAttacker = {
	  name: 'SupportAttacker',
	  enter: function enter(player) {
	    player.steering().arriveOn();
	    player.steering().setTarget(player.team().getSupportSpot());
	  },
	  execute: function execute(player) {
	    if (!player.team().inControl()) {
	      player.getFSM().changeState(ReturnToHomeRegion);
	      return;
	    }
	    if (player.team().getSupportSpot() != player.steering().target()) {
	      player.steering().setTarget(player.team().getSupportSpot());
	      player.steering().arriveOn();
	    }
	    if (player.team().canShoot(player.pos(), _params2.default.MaxShootingForce)) {
	      player.team().requestPass(player);
	    }
	    if (player.atTarget()) {
	      player.steering().arriveOff();
	      player.trackBall();
	      player.setVelocity(new _vector2d2.default(0, 0));
	      if (!player.isThreatened()) {
	        player.team().requestPass(player);
	      }
	    }
	  },
	  exit: function exit(player) {
	    player.team().setSupportingPlayer(null);
	    player.steering().arriveOff();
	  },
	  onMessage: function onMessage(player, telegram) {
	    return false;
	  }
	};
	
	exports.GlobalPlayerState = GlobalPlayerState;
	exports.ChaseBall = ChaseBall;
	exports.Dribble = Dribble;
	exports.ReturnToHomeRegion = ReturnToHomeRegion;
	exports.Wait = Wait;
	exports.KickBall = KickBall;
	exports.ReceiveBall = ReceiveBall;
	exports.SupportAttacker = SupportAttacker;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player_base = __webpack_require__(25);
	
	var _player_base2 = _interopRequireDefault(_player_base);
	
	var _state_machine = __webpack_require__(17);
	
	var _state_machine2 = _interopRequireDefault(_state_machine);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _entity_function_templates = __webpack_require__(31);
	
	var _autolist = __webpack_require__(27);
	
	var _autolist2 = _interopRequireDefault(_autolist);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _soccer_team = __webpack_require__(16);
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _transformations = __webpack_require__(8);
	
	var _goalkeeper_state = __webpack_require__(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GoalKeeper = function (_PlayerBase) {
		_inherits(GoalKeeper, _PlayerBase);
	
		function GoalKeeper(homeTeam, homeRegion, startState, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale) {
			_classCallCheck(this, GoalKeeper);
	
			var _this = _possibleConstructorReturn(this, (GoalKeeper.__proto__ || Object.getPrototypeOf(GoalKeeper)).call(this, homeTeam, homeRegion, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, _player_base.PLAYERROLE.goalKeeper));
	
			_this.m_pStateMachine = new _state_machine2.default(_this);
			_this.m_pStateMachine.setCurrentState(startState);
			_this.m_pStateMachine.setPreviousState(startState);
			_this.m_pStateMachine.setGlobalState(_goalkeeper_state.GlobalKeeperState);
			_this.m_pStateMachine.currentState().enter(_this);
			return _this;
		}
	
		_createClass(GoalKeeper, [{
			key: 'getFSM',
			value: function getFSM() {
				return this.m_pStateMachine;
			}
		}, {
			key: 'handleMessage',
			value: function handleMessage(msg) {
				return this.m_pStateMachine.handleMessage(msg);
			}
		}, {
			key: 'update',
			value: function update(timeElapsed) {
				this.m_pStateMachine.update();
				var steeringForce = this.m_pSteering.calculate();
				var acceleration = steeringForce.crossNum(1 / this.m_dMass);
				this.m_vVelocity = this.m_vVelocity.add(acceleration);
				this.m_vVelocity.truncate(this.m_dMaxSpeed);
				this.m_vPos = this.m_vPos.add(this.m_vVelocity);
				if (_params2.default.bNonPenetrationConstraint) {
					(0, _entity_function_templates.enforceNonPenetrationConstraint)(this, _autolist2.default.getAllMembers());
				}
				if (!this.m_vVelocity.isZero()) {
					this.m_vHeading = (0, _vector2d.vec2dNormalize)(this.m_vVelocity);
					this.m_vSide = this.m_vHeading.perp();
				}
				if (!this.pitch().goalKeeperHasBall()) {
					this.m_vLookAt = (0, _vector2d.vec2dNormalize)(this.ball().pos().add(this.pos().getReverse()));
				}
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.team().teamColor() == _soccer_team.TEAM_COLOR.blue) {
					_cgdi2.default.bluePen();
				} else {
					_cgdi2.default.redPen();
				}
				this.m_vecPlayerVBTrans = (0, _transformations.worldTransform)(this.m_vecPlayerVB, this.pos(), this.m_vLookAt, this.m_vLookAt.perp(), this.scale());
				_cgdi2.default.closedShape(this.m_vecPlayerVBTrans);
				_cgdi2.default.brownBrush();
				_cgdi2.default.circle(this.pos(), 6);
				if (_params2.default.ViewIDs) {
					_cgdi2.default.textColor('rgb(0, 170, 0)');
					_cgdi2.default.textAtPos(this.pos().x - 20, this.pos().y - 20, this.id());
				}
				if (_params2.default.ViewStates) {
					_cgdi2.default.textColor('rgb(0, 170, 0)');
					_cgdi2.default.transparentText();
					_cgdi2.default.textAtPos(this.pos().x, this.pos().y - 20, this.m_pStateMachine.getNameOfCurrentState());
				}
			}
		}, {
			key: 'ballWithinRangeForIntercept',
			value: function ballWithinRangeForIntercept() {
				return (0, _vector2d.vec2DDistanceSq)(this.team().homeGoal().center(), this.ball().pos()) <= _params2.default.GoalKeeperInterceptRangeSq;
			}
		}, {
			key: 'tooFarFromGoalMouth',
			value: function tooFarFromGoalMouth() {
				return (0, _vector2d.vec2DDistanceSq)(this.pos(), this.getRearInterposeTarget()) > _params2.default.GoalKeeperInterceptRangeSq;
			}
		}, {
			key: 'getRearInterposeTarget',
			value: function getRearInterposeTarget() {
				var xPosTarget = this.team().homeGoal().center().x;
				var yPosTarget = this.pitch().playingArea().center().y - _params2.default.GoalWidth * 0.5 + this.ball().pos().y / this.pitch().playingArea().height() * _params2.default.GoalWidth;
				return new _vector2d2.default(xPosTarget, yPosTarget);
			}
		}]);
	
		return GoalKeeper;
	}(_player_base2.default);
	
	exports.default = GoalKeeper;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getClosestEntityLineSegmentIntersection = exports.getEntityLineSegmentIntersections = exports.enforceNonPenetrationConstraint = exports.tagNeighbors = exports.overlapped = undefined;
	
	var _geometry = __webpack_require__(7);
	
	var _vector2d = __webpack_require__(5);
	
	var maxDouble = 999999;
	
	function overlapped(ob, conOb) {
		var minDistBetweenObstacles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
	
		for (var i = 0; i < conOb.length; i++) {
			var it = conOb[i];
			if ((0, _geometry.twoCirclesOverlapped)(ob.pos().x, ob.pos().y, ob.bRadius() + minDistBetweenObstacles, it.pos().x, it.pos().y, it.bRadius())) {
				return true;
			}
		}
		return false;
	}
	
	function tagNeighbors(entity, containerOfEntities, radius) {
		for (var i = 0; i < containerOfEntities.length; i++) {
			var curEntity = containerOfEntities[i];
			curEntity.unTag();
			var to = curEntity.pos().add(entity.pos().getReverse());
			var range = radius + curEntity.bRadius();
			if (curEntity != entity && to.lengthSq() < range * range) {
				curEntity.tag();
			}
		}
	}
	
	function enforceNonPenetrationConstraint(entity, containerOfEntities) {
		for (var i = 0; i < containerOfEntities.length; i++) {
			var curEntity = containerOfEntities[i];
			if (curEntity != entity) {
				var toEntity = entity.pos().add(curEntity.pos().getReverse());
				var distFromEachOther = toEntity.length();
				var amountOfOverLap = curEntity.bRadius() + entity.bRadius() - distFromEachOther;
				if (amountOfOverLap >= 0) {
					entity.setPos(entity.pos().add(toEntity.crossNum(1 / distFromEachOther * amountOfOverLap)));
				}
			}
		}
	}
	
	function getEntityLineSegmentIntersections(entities, theOneToIgnore, A, B) {
		var range = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : maxDouble;
	
		var hits = [];
		for (var i = 0; i < entities.length; i++) {
			var it = entities[i];
			if (it.id() === theOneToIgnore || (0, _vector2d.vec2DDistanceSq)(it.pos(), A) > range * range) {
				// do nothing
			} else {
				if ((0, _geometry.distToLineSegment)(A, B, it.pos()) < it.bRadius()) {
					hits.push(it);
				}
			}
		}
		return hits;
	}
	
	function getClosestEntityLineSegmentIntersection(entities, theOneToIgnore, A, B) {
		var range = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : MaxDouble;
	
		var closestEntity = null;
		var closestDist = maxDouble;
		for (var i = 0; i < entities.length; i++) {
			var it = entities[i];
			var distSq = (0, _vector2d.vec2DDistanceSq)(it.pos(), A);
			if (it.id() === theOneToIgnore || distSq > range * range) {
				// do nothing
			} else {
				if ((0, _geometry.distToLineSegment)(A, B, it.pos()) < it.bRadius()) {
					if (distSq < closestDist) {
						closestDist = distSq;
						closestEntity = it;
					}
				}
			}
		}
		return closestEntity;
	}
	
	exports.overlapped = overlapped;
	exports.tagNeighbors = tagNeighbors;
	exports.enforceNonPenetrationConstraint = enforceNonPenetrationConstraint;
	exports.getEntityLineSegmentIntersections = getEntityLineSegmentIntersections;
	exports.getClosestEntityLineSegmentIntersection = getClosestEntityLineSegmentIntersection;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player_base = __webpack_require__(25);
	
	var _player_base2 = _interopRequireDefault(_player_base);
	
	var _state_machine = __webpack_require__(17);
	
	var _state_machine2 = _interopRequireDefault(_state_machine);
	
	var _field_player_state = __webpack_require__(29);
	
	var _regulator = __webpack_require__(20);
	
	var _regulator2 = _interopRequireDefault(_regulator);
	
	var _params = __webpack_require__(10);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _utils = __webpack_require__(15);
	
	var _transformations = __webpack_require__(8);
	
	var _entity_function_templates = __webpack_require__(31);
	
	var _autolist = __webpack_require__(27);
	
	var _autolist2 = _interopRequireDefault(_autolist);
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _soccer_team = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FieldPlayer = function (_PlayerBase) {
		_inherits(FieldPlayer, _PlayerBase);
	
		function FieldPlayer(homeTeam, homeRegion, startState, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, role) {
			_classCallCheck(this, FieldPlayer);
	
			var _this = _possibleConstructorReturn(this, (FieldPlayer.__proto__ || Object.getPrototypeOf(FieldPlayer)).call(this, homeTeam, homeRegion, heading, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale, role));
	
			_this.m_pStateMachine = new _state_machine2.default(_this);
			if (startState) {
				_this.m_pStateMachine.setCurrentState(startState);
				_this.m_pStateMachine.setPreviousState(startState);
				_this.m_pStateMachine.setGlobalState(_field_player_state.GlobalPlayerState);
				_this.m_pStateMachine.currentState().enter(_this);
			}
			_this.m_pSteering.separationOn();
			_this.m_pKickLimiter = new _regulator2.default(_params2.default.PlayerKickFrequency);
			return _this;
		}
	
		_createClass(FieldPlayer, [{
			key: 'update',
			value: function update(timeElapsed) {
				this.m_pStateMachine.update();
				this.m_pSteering.calculate();
				if (this.m_pSteering.force().isZero()) {
					var BrakingRate = 0.8;
					this.m_vVelocity = this.m_vVelocity.crossNum(BrakingRate);
				}
				var turningForce = this.m_pSteering.sideComponent();
				turningForce = (0, _utils.clamp)(turningForce, -_params2.default.PlayerMaxTurnRate, _params2.default.PlayerMaxTurnRate);
				(0, _transformations.vec2dRotateAroundOrigin)(this.m_vHeading, turningForce);
				this.m_vVelocity = this.m_vHeading.crossNum(this.m_vVelocity.length());
				this.m_vSide = this.m_vHeading.perp();
				var accel = this.m_vHeading.crossNum(this.m_pSteering.forwardComponent() / this.m_dMass);
				this.m_vVelocity = this.m_vVelocity.add(accel);
				this.m_vVelocity.truncate(this.m_dMaxSpeed);
				this.m_vPos = this.m_vPos.add(this.m_vVelocity);
				if (_params2.default.bNonPenetrationConstraint) {
					(0, _entity_function_templates.enforceNonPenetrationConstraint)(this, _autolist2.default.getAllMembers());
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_cgdi2.default.transparentText();
				_cgdi2.default.textColor(_cgdi2.default.GREY);
				if (this.team().teamColor() == _soccer_team.TEAM_COLOR.blue) {
					_cgdi2.default.bluePen();
				} else {
					_cgdi2.default.redPen();
				}
				this.m_vecPlayerVBTrans = (0, _transformations.worldTransform)(this.m_vecPlayerVB, this.pos(), this.heading(), this.side(), this.scale());
				_cgdi2.default.closedShape(this.m_vecPlayerVBTrans);
				// threaten
				_cgdi2.default.brownBrush();
				if (_params2.default.HighlightIfThreatened && this.team().controllingPlayer() == this && this.isThreatened()) {
					_cgdi2.default.yellowBrush();
				}
				_cgdi2.default.circle(this.pos(), 6);
				// state
				if (_params2.default.ViewStates) {
					_cgdi2.default.textColor('rgb(0, 170, 0)');
					_cgdi2.default.textAtPos(this.m_vPos.x, this.m_vPos.y - 20, this.m_pStateMachine.getNameOfCurrentState());
				}
				// id
				if (_params2.default.ViewIDs) {
					_cgdi2.default.textColor('rgb(0, 170, 0)');
					_cgdi2.default.textAtPos(this.pos().x - 20, this.pos().y - 20, this.id());
				}
				if (_params2.default.ViewTargets) {
					_cgdi2.default.redBrush();
					_cgdi2.default.circle(this.steering().target(), 3);
					_cgdi2.default.textAtPos(this.steering().target().x, this.steering().target().y, this.id());
				}
			}
		}, {
			key: 'handleMessage',
			value: function handleMessage(msg) {
				return this.m_pStateMachine.handleMessage(msg);
			}
		}, {
			key: 'getFSM',
			value: function getFSM() {
				return this.m_pStateMachine;
			}
		}, {
			key: 'isReadyFornextKick',
			value: function isReadyFornextKick() {
				return this.m_pKickLimiter.isReady();
			}
		}]);
	
		return FieldPlayer;
	}(_player_base2.default);
	
	exports.default = FieldPlayer;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _vector2d = __webpack_require__(5);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Wall2D = function () {
		function Wall2D(A, B, N) {
			_classCallCheck(this, Wall2D);
	
			this.m_vA = new _vector2d2.default();
			this.m_vB = new _vector2d2.default();
			this.m_vN = new _vector2d2.default();
			if (A && B) {
				this.m_vA = A;
				this.m_vB = B;
				if (N) {
					this.m_vN = N;
				} else {
					this.calculateNormal();
				}
			}
		}
	
		_createClass(Wall2D, [{
			key: 'calculateNormal',
			value: function calculateNormal() {
				var temp = (0, _vector2d.vec2dNormalize)(this.m_vB.add(this.m_vA.getReverse()));
				this.m_vN.x = -temp.y;
				this.m_vN.y = temp.x;
			}
		}, {
			key: 'render',
			value: function render() {
				var renderNormals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
				_cgdi2.default.line(this.m_vA, this.m_vB);
				if (renderNormals) {
					var midX = (this.m_vA.x + this.m_vB.x) / 2;
					var midY = (this.m_vA.y + this.m_vB.y) / 2;
	
					_cgdi2.default.line(new _vector2d2.default(midX, midY), new _vector2d2.default(midX + this.m_vN.x * 5, midY + this.m_vN.y * 5));
				}
			}
		}, {
			key: 'from',
			value: function from() {
				return this.m_vA;
			}
		}, {
			key: 'setFrom',
			value: function setFrom(v) {
				this.m_vA = v;
				this.calculateNormal();
			}
		}, {
			key: 'to',
			value: function to() {
				return this.m_vB;
			}
		}, {
			key: 'setTo',
			value: function setTo(v) {
				this.m_vB = v;
				this.calculateNormal();
			}
		}, {
			key: 'normal',
			value: function normal() {
				return this.m_vN;
			}
		}, {
			key: 'setNormal',
			value: function setNormal(n) {
				this.m_vN = n;
			}
		}, {
			key: 'center',
			value: function center() {
				return this.m_vA.add(this.m_vB).crossNum(0.5);
			}
		}]);
	
		return Wall2D;
	}();
	
	exports.default = Wall2D;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map