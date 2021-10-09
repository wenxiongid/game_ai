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
	
	var _game_world = __webpack_require__(2);
	
	var _game_world2 = _interopRequireDefault(_game_world);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WIDTH = 600;
	var HEIGHT = 600;
	
	_cgdi2.default.setCanvas(document.getElementById('canvasWrapper'), WIDTH, HEIGHT);
	var g_GameWorld = new _game_world2.default(WIDTH, HEIGHT);
	
	document.addEventListener('keydown', function (e) {
		g_GameWorld.handleKeyPresses(e.key);
	});
	
	var lastTime = new Date().getTime();
	function render() {
		var currentTime = new Date().getTime();
		_cgdi2.default.clear();
		g_GameWorld.update((currentTime - lastTime) / 1000);
		g_GameWorld.render();
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
		}, {
			key: 'hollowBrush',
			value: function hollowBrush() {}
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
				for (var i = 0; i < posList.length - 1; i++) {
					this.line(posList[i], posList[i + 1]);
				}
				this.line(posList[posList.length - 1], posList[0]);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _entity_function_templates = __webpack_require__(4);
	
	var _cell_space_partition = __webpack_require__(8);
	
	var _cell_space_partition2 = _interopRequireDefault(_cell_space_partition);
	
	var _utils = __webpack_require__(10);
	
	var _geometry = __webpack_require__(5);
	
	var _path = __webpack_require__(11);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _params = __webpack_require__(12);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _vehicle = __webpack_require__(13);
	
	var _vehicle2 = _interopRequireDefault(_vehicle);
	
	var _smoother = __webpack_require__(18);
	
	var _smoother2 = _interopRequireDefault(_smoother);
	
	var _wall2d = __webpack_require__(19);
	
	var _wall2d2 = _interopRequireDefault(_wall2d);
	
	var _obstacle = __webpack_require__(20);
	
	var _obstacle2 = _interopRequireDefault(_obstacle);
	
	var _resource = __webpack_require__(21);
	
	var _resource2 = _interopRequireDefault(_resource);
	
	var _invertedaabbox2d = __webpack_require__(9);
	
	var _invertedaabbox2d2 = _interopRequireDefault(_invertedaabbox2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameWorld = function () {
		function GameWorld(cx, cy) {
			_classCallCheck(this, GameWorld);
	
			var border = 30;
			this.m_Vehicles = [];
			this.m_Obstacles = [];
			this.m_Walls = [];
			this.m_pCellSpace = new _cell_space_partition2.default(cx, cy, _params2.default.NumCellsX, _params2.default.NumCellsY, _params2.default.NumAgents);
			this.m_pPath = new _path2.default(5, border, border, cx - border, cy - border, true);
			this.m_bPaused = false;
			this.m_cxClient = cx;
			this.m_cyClient = cy;
			this.m_vCrosshair = new _vector2d2.default(cx / 2, cx / 2);
			this.m_dAvFrameTime = 0;
			this.m_bShowWalls = true;
			this.m_bShowObstacles = true;
			this.m_bShowPath = false;
			this.m_bShowDetectionBox = false;
			this.m_bShowWanderCircle = false;
			this.m_bShowFeelers = false;
			this.m_bShowSteeringForce = false;
			this.m_bShowFPS = true;
			this.m_bRenderNeighbors = false;
			this.m_bViewKeys = true;
			this.m_bShowCellSpaceInfo = true;
			// for(let a = 0; a < 2; a++){
			// 	let spawnPos = new Vector2D(cx / 2 * (1 + randomClamped()), cy / 2 * (1 + randomClamped()));
			// 	let pVehicle = new Vehicle(this, spawnPos, Math.random() * 2 * Math.PI, new Vector2D(), PRM.VehicleMass, PRM.MaxSteeringForce, PRM.MaxSpeed, PRM.MaxTurnRatePerSecond, PRM.VehicleScale);
			// 	pVehicle.steering().wanderOn();
			// 	this.m_Vehicles.push(pVehicle);
			// 	this.m_pCellSpace.addEntity(pVehicle);
			// }
			// for(let i = 0; i < 2; i++){
			// 	let vehicle = this.m_Vehicles[i];
			// 	let targetVehicle = this.m_Vehicles[1 - i];
			// 	// vehicle.steering().evadeOn(targetVehicle);
			// 	vehicle.steering().pursuitOn(targetVehicle);
			// }
	
			for (var a = 0; a < _params2.default.NumAgents; a++) {
				var spawnPos = new _vector2d2.default(cx / 2 * (1 + (0, _utils.randomClamped)()), cy / 2 * (1 + (0, _utils.randomClamped)()));
				var pVehicle = new _vehicle2.default(this, spawnPos, Math.random() * 2 * Math.PI, new _vector2d2.default(), _params2.default.VehicleMass, _params2.default.MaxSteeringForce, _params2.default.MaxSpeed, _params2.default.MaxTurnRatePerSecond, _params2.default.VehicleScale);
				pVehicle.steering().flockingOn();
				// pVehicle.smoothingOn();
				this.m_Vehicles.push(pVehicle);
				this.m_pCellSpace.addEntity(pVehicle);
			}
			// SHOAL
			var vehicle0Index = -1;
			for (var _i = 0; _i < _params2.default.NumAgents; _i++) {
				var vehicle = this.m_Vehicles[_i];
				if (vehicle.id() === 0) {
					vehicle.steering().flockingOff();
					vehicle.setScale(10);
					vehicle.steering().wanderOn();
					vehicle.setMaxSpeed(70);
					vehicle0Index = _i;
				}
			}
			for (var _i2 = 0; _i2 < _params2.default.NumAgents; _i2++) {
				if (_i2 != vehicle0Index) {
					this.m_Vehicles[_i2].steering().evadeOn(this.m_Vehicles[vehicle0Index]);
				}
			}
			// 
		}
	
		_createClass(GameWorld, [{
			key: 'createObstacles',
			value: function createObstacles() {
				for (var o = 0; o < _params2.default.NumObstacles; o++) {
					var bOverlapped = true;
					var numTrys = 0;
					var numAllowableTrys = 2000;
					while (bOverlapped) {
						numTrys++;
						if (numTrys > numAllowableTrys) {
							return;
						}
						var radius = _params2.default.MinObstacleRadius + Math.floor(Math.random() * (_params2.default.MaxObstacleRadius - _params2.default.MinObstacleRadius + 1));
						var border = 10;
						var minGapBetweenObstacles = 20;
						var ob = new _obstacle2.default(radius + border + Math.floor(Math.random() * (this.m_cxClient - 2 * radius - 2 * border + 1)), radius + border + Math.floor(Math.random() * (this.m_cyClient - 2 * radius - 30 - 2 * border + 1)), radius);
						if (!(0, _entity_function_templates.overlapped)(ob, this.m_Obstacles, minGapBetweenObstacles)) {
							this.m_Obstacles.push(ob);
							bOverlapped = false;
						} else {
							ob = null;
						}
					}
				}
			}
		}, {
			key: 'createWalls',
			value: function createWalls() {
				var borderSize = 20;
				var cornerSize = 0.2;
				var vDist = this.m_cyClient - 2 * borderSize;
				var hDist = this.m_cxClient - 2 * borderSize;
				var numWallVerts = 8;
				var walls = [new _vector2d2.default(hDist * cornerSize + borderSize, borderSize), new _vector2d2.default(this.m_cxClient - borderSize - hDist * cornerSize, borderSize), new _vector2d2.default(this.m_cxClient - borderSize, borderSize + vDist * cornerSize), new _vector2d2.default(this.m_cxClient - borderSize, this.m_cyClient - borderSize - vDist * cornerSize), new _vector2d2.default(this.m_cxClient - borderSize - hDist * cornerSize, this.m_cyClient - borderSize), new _vector2d2.default(borderSize + hDist * cornerSize, this.m_cyClient - borderSize), new _vector2d2.default(borderSize, this.m_cyClient - borderSize - vDist * cornerSize), new _vector2d2.default(borderSize, borderSize + vDist * cornerSize)];
				for (var w = 0; w < numWallVerts - 1; w++) {
					this.m_Walls.push(new _wall2d2.default(walls[w], walls[w + 1]));
				}
				this.m_Walls.push(new _wall2d2.default(walls[numWallVerts - 1], walls[0]));
			}
		}, {
			key: 'update',
			value: function update(time_elapsed) {
				if (this.m_bPaused) {
					return;
				}
				var sampleRate = 10;
				var frameRateSmoother = new _smoother2.default(sampleRate, 0);
				this.m_dAvFrameTime = frameRateSmoother.update(time_elapsed);
				for (var a = 0; a < this.m_Vehicles.length; a++) {
					this.m_Vehicles[a].update(time_elapsed);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_cgdi2.default.transparentText();
				_cgdi2.default.blackPen();
				for (var w = 0; w < this.m_Walls.length; w++) {
					this.m_Walls[w].render(true);
				}
				_cgdi2.default.blackPen();
				for (var ob = 0; ob < this.m_Obstacles.length; ob++) {
					_cgdi2.default.circle(this.m_Obstacles[ob].pos(), this.m_Obstacles[ob].bRadius());
				}
				for (var a = 0; a < this.m_Vehicles.length; a++) {
					this.m_Vehicles[a].render();
					if (this.m_bShowCellSpaceInfo && a == 0) {
						_cgdi2.default.hollowBrush();
						var box = new _invertedaabbox2d2.default(this.m_Vehicles[a].pos().add(new _vector2d2.default(_params2.default.ViewDistance, _params2.default.ViewDistance).getReverse()), this.m_Vehicles[a].pos().add(new _vector2d2.default(_params2.default.ViewDistance, _params2.default.ViewDistance)));
						box.render();
						_cgdi2.default.redPen();
						this.cellSpace().calculateNeighbors(this.m_Vehicles[a].pos(), _params2.default.ViewDistance);
						for (var _i3 = 0; _i3 < this.cellSpace().neighbours().length; _i3++) {
							var pV = this.cellSpace().neighbours()[_i3];
							_cgdi2.default.circle(pV.pos(), pV.bRadius());
						}
						_cgdi2.default.greenPen();
						_cgdi2.default.circle(this.m_Vehicles[a].pos(), _params2.default.ViewDistance);
					}
				}
				_cgdi2.default.textColor(_cgdi2.default.GREY);
				if (this.renderPath()) {
					_cgdi2.default.textAtPos(this.cxClient() / 2 - 80, this.cyClient() - 20, "Press 'U' for random path");
					this.m_pPath.render();
				}
				if (this.renderFPS()) {
					_cgdi2.default.textColor(_cgdi2.default.GREY);
					_cgdi2.default.textAtPos(5, this.cyClient() - 20, (1 / this.m_dAvFrameTime).toFixed(2));
				}
				if (this.m_bShowCellSpaceInfo) {
					this.m_pCellSpace.renderCells();
				}
			}
		}, {
			key: 'nonPenetraitionContraint',
			value: function nonPenetraitionContraint(v) {
				(0, _entity_function_templates.enforceNonPenetrationConstraint)(v, this.m_Vehicles);
			}
		}, {
			key: 'tagVehiclesWithinViewRange',
			value: function tagVehiclesWithinViewRange(pVehicle, range) {
				(0, _entity_function_templates.tagNeighbors)(pVehicle, this.m_Vehicles, range);
			}
		}, {
			key: 'tagObstaclesWithinViewRange',
			value: function tagObstaclesWithinViewRange(pVehicle, range) {
				(0, _entity_function_templates.tagNeighbors)(pVehicle, this.m_Obstacles, range);
			}
		}, {
			key: 'walls',
			value: function walls() {
				return this.m_Walls;
			}
		}, {
			key: 'cellSpace',
			value: function cellSpace() {
				return this.m_pCellSpace;
			}
		}, {
			key: 'obstacles',
			value: function obstacles() {
				return this.m_Obstacles;
			}
		}, {
			key: 'agents',
			value: function agents() {
				return this.m_Vehicles;
			}
		}, {
			key: 'handleKeyPresses',
			value: function handleKeyPresses(wParam) {
				switch (wParam) {
					case 'u':
						delete this.m_pPath;
						var border = 60;
						this.m_pPath = new _path2.default(3 + Math.floor(Math.random() * 5), border, this.cxClient() - border, this.cyClient() - border, true);
						this.m_bShowPath = true;
						for (var _i4 = 0; _i4 < this.m_Vehicles.length; _i4++) {
							this.m_Vehicles[_i4].steering().setPath(this.m_pPath.getPath());
							if (this.m_Vehicles[_i4].id() !== 0) {
								this.m_Vehicles[_i4].steering().followPathOn();
							}
						}
						break;
					case 'p':
						this.togglePause();
						break;
					case 'o':
						this.toggleRenderNeighbors();
						break;
					case 'i':
						for (var _i5 = 0; _i5 < this.m_Vehicles.length; _i5++) {
							this.m_Vehicles[_i5].toggleSmoothing();
						}
						break;
					case 'y':
						this.m_bShowObstacles = !this.m_bShowObstacles;
						if (!this.m_bShowObstacles) {
							this.m_Obstacles = [];
							for (var _i6 = 0; _i6 < this.m_Vehicles.length; _i6++) {
								this.m_Vehicles[_i6].steering().obstacleAvoidanceOff();
							}
						} else {
							this.createObstacles();
							for (var _i7 = 0; _i7 < this.m_Vehicles.length; _i7++) {
								this.m_Vehicles[_i7].steering().obstacleAvoidanceOn();
							}
						}
						break;
					case 'w':
						this.m_bShowWalls = !this.m_bShowWalls;
						if (!this.m_bShowWalls) {
							this.m_Walls = [];
							for (var _i8 = 0; _i8 < this.m_Vehicles.length; _i8++) {
								this.m_Vehicles[_i8].steering().wallAvoidanceOff();
							}
						} else {
							this.createWalls();
							for (var _i9 = 0; _i9 < this.m_Vehicles.length; _i9++) {
								this.m_Vehicles[_i9].steering().wallAvoidanceOn();
							}
						}
						break;
				}
			}
		}, {
			key: 'handleMenuItems',
			value: function handleMenuItems(wParam, hwnd) {}
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
			key: 'crosshair',
			value: function crosshair() {
				return this.m_vCrosshair;
			}
		}, {
			key: 'setCrosshair',
			value: function setCrosshair(p) {
				var proposedPosition = new _vector2d2.default(p.x, p.y);
				for (i = 0; i < this.m_Obstacles.lenght; i++) {
					var curOb = this.m_Obstacles[i];
					if ((0, _geometry.pointInCircle)(curOb.pos(), curOb.bRadius(), proposedPosition)) {
						return;
					}
				}
				this.m_vCrosshair.x = p.x;
				this.m_vCrosshair.y = p.y;
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
			key: 'renderWalls',
			value: function renderWalls() {
				return this.m_bShowWalls;
			}
		}, {
			key: 'renderObstacles',
			value: function renderObstacles() {
				return this.m_bShowObstacles;
			}
		}, {
			key: 'renderPath',
			value: function renderPath() {
				return this.m_bShowPath;
			}
		}, {
			key: 'renderDetectionBox',
			value: function renderDetectionBox() {
				return this.m_bShowDetectionBox;
			}
		}, {
			key: 'renderWanderCircle',
			value: function renderWanderCircle() {
				return this.m_bShowWanderCircle;
			}
		}, {
			key: 'renderFeelers',
			value: function renderFeelers() {
				return this.m_bShowFeelers;
			}
		}, {
			key: 'renderSteeringForce',
			value: function renderSteeringForce() {
				return this.m_bShowSteeringForce;
			}
		}, {
			key: 'renderFPS',
			value: function renderFPS() {
				return this.m_bShowFPS;
			}
		}, {
			key: 'toggleShowFPS',
			value: function toggleShowFPS() {
				this.m_bShowFPS = !this.m_bShowFPS;
			}
		}, {
			key: 'toggleRenderNeighbors',
			value: function toggleRenderNeighbors() {
				this.m_bRenderNeighbors = !this.m_bRenderNeighbors;
			}
		}, {
			key: 'renderNeighbors',
			value: function renderNeighbors() {
				return this.m_bRenderNeighbors;
			}
		}, {
			key: 'toggleViewKeys',
			value: function toggleViewKeys() {
				this.m_bViewKeys = !this.m_bViewKeys;
			}
		}, {
			key: 'viewKeys',
			value: function viewKeys() {
				return this.m_bViewKeys;
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				for (var a = 0; a < this.m_Vehicles.length; a++) {
					delete this.m_Vehicles[a];
				}
				for (var ob = 0; ob < this.m_Obstacles.length; ob++) {
					delete this.m_Obstacles[ob];
				}
				delete this.m_pCellSpace;
				delete this.m_pPath;
			}
		}]);
	
		return GameWorld;
	}();
	
	exports.default = GameWorld;

/***/ },
/* 3 */
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
				var diff = 2 * this.dot(normVec) * normVec.getReverse();
				this.x += diff;
				this.y += diff;
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getClosestEntityLineSegmentIntersection = exports.getEntityLineSegmentIntersections = exports.enforceNonPenetrationConstraint = exports.tagNeighbors = exports.overlapped = undefined;
	
	var _geometry = __webpack_require__(5);
	
	var _vector2d = __webpack_require__(3);
	
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getLineSegmentCircleClosestIntersectionPoint = exports.lineSegmentCircleIntersection = exports.pointInCircle = exports.circleArea = exports.twoCirclesIntersectionArea = exports.twoCirclesIntersectionPoints = exports.twoCirclesEnclosed = exports.twoCirclesOverlapped = exports.segmentObjectIntersection2D = exports.objectIntersection2D = exports.lineIntersection2D = exports.distToLineSegmentSq = exports.distToLineSegment = exports.getTangentPoints = exports.doRayCircleIntersect = exports.getRayCircleIntersect = exports.whereIsPoint = exports.distanceToRayPlaneIntersection = undefined;
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _transformations = __webpack_require__(6);
	
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
				return 'PLANE_BACKIDE';
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
		var rSq = r * r;
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
		for (var _r = 0; _r < obj1.length - 1; _r++) {
			for (var t = 0; t < obj2.length - 1; t++) {
				if (lineIntersection2D(obj2[t], obj2[t + 1], obj1[_r], obj1[_r + 1])) {
					return true;
				}
			}
		}
		return false;
	}
	
	function segmentObjectIntersection2D(A, B, obj) {
		for (var _r2 = 0; _r2 < obj.length - 1; _r2++) {
			if (lineIntersection2D(A, B, obj[_r2], obj[_r2 + 1])) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.worldTransform = exports.vec2dRotateAroundOrigin = exports.pointToLocalSpace = exports.vectorToWorldSpace = exports.pointToWorldSpace = undefined;
	
	var _c2dmatrix = __webpack_require__(7);
	
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invertedaabbox2d = __webpack_require__(9);
	
	var _invertedaabbox2d2 = _interopRequireDefault(_invertedaabbox2d);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function Cell(topLeft, botRight) {
		_classCallCheck(this, Cell);
	
		this.members = [];
		this.bBox = new _invertedaabbox2d2.default(topLeft, botRight);
	};
	
	var CellSpacePartition = function () {
		function CellSpacePartition(width, height, cellsX, cellsY, maxEntitys) {
			_classCallCheck(this, CellSpacePartition);
	
			this.m_Cells = [];
			this.m_Neighbors = [];
			this.m_curNeighbor = null;
			this.m_dSpaceWidth = width;
			this.m_dSpaceHeight = height;
			this.m_iNumCellsX = cellsX;
			this.m_iNumCellsY = cellsY;
			this.m_dCellSizeX = width / cellsX;
			this.m_dCellSizeY = height / cellsY;
			for (var y = 0; y < this.m_iNumCellsY; y++) {
				for (var x = 0; x < this.m_iNumCellsX; x++) {
					var left = x * this.m_dCellSizeX;
					var right = left + this.m_dCellSizeX;
					var top = y * this.m_dCellSizeY;
					var bot = top + this.m_dCellSizeY;
					this.m_Cells.push(new Cell(new _vector2d2.default(left, top), new _vector2d2.default(right, bot)));
				}
			}
		}
	
		_createClass(CellSpacePartition, [{
			key: 'neighbours',
			value: function neighbours() {
				return this.m_Neighbors;
			}
		}, {
			key: 'calculateNeighbors',
			value: function calculateNeighbors(targetPos, queryRadius) {
				this.m_Neighbors = [];
				var queryBox = new _invertedaabbox2d2.default(targetPos.add(new _vector2d2.default(queryRadius, queryRadius).getReverse()), targetPos.add(new _vector2d2.default(queryRadius, queryRadius)));
				var curCell = void 0;
				for (var i = 0; i < this.m_Cells.length; i++) {
					curCell = this.m_Cells[i];
					if (curCell.bBox.isOverlappedWith(queryBox) && curCell.members.length != 0) {
						for (var j = 0; j < curCell.members.length; j++) {
							var it = curCell.members[j];
							if ((0, _vector2d.vec2DDistanceSq)(it.pos(), targetPos) < queryRadius) {
								this.m_Neighbors.push(it);
							}
						}
					}
				}
			}
		}, {
			key: 'emptyCells',
			value: function emptyCells() {
				var it = void 0;
				for (var i = 0; i < this.m_Cells.length; i++) {
					it.members = [];
				}
			}
		}, {
			key: 'positionToIndex',
			value: function positionToIndex(pos) {
				var idx = Math.floor(pos.x / (this.m_dSpaceWidth / this.m_iNumCellsX)) + Math.floor(pos.y / (this.m_dSpaceHeight / this.m_iNumCellsY)) * this.m_iNumCellsX;
				if (idx > this.m_Cells.length - 1) {
					idx = this.m_Cells.length - 1;
				}
				return idx;
			}
		}, {
			key: 'addEntity',
			value: function addEntity(ent) {
				var idx = this.positionToIndex(ent.pos());
				this.m_Cells[idx].members.push(ent);
			}
		}, {
			key: 'updateEntity',
			value: function updateEntity(ent, oldPos) {
				var oldIdx = this.positionToIndex(oldPos);
				var newIdx = this.positionToIndex(ent.pos());
				if (newIdx == oldIdx) {
					return;
				}
				var tempOldMembers = [];
				for (var i = 0; i < this.m_Cells[oldIdx].members.length; i++) {
					if (this.m_Cells[oldIdx].members[i] != ent) {
						tempOldMembers.push(this.m_Cells[oldIdx].members[i]);
					}
				}
				this.m_Cells[oldIdx].members = tempOldMembers;
				this.m_Cells[newIdx].members.push(ent);
			}
		}, {
			key: 'renderCells',
			value: function renderCells() {
				for (var i = 0; i < this.m_Cells.length; i++) {
					var curCell = this.m_Cells[i];
					curCell.bBox.render(false);
				}
			}
		}]);
	
		return CellSpacePartition;
	}();
	
	exports.default = CellSpacePartition;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InvertedAABBox2D = function () {
		function InvertedAABBox2D(tl, br) {
			_classCallCheck(this, InvertedAABBox2D);
	
			this.m_vTopLeft = tl;
			this.m_vBottomRight = br;
			this.m_vCenter = tl.add(br).crossNum(0.5);
		}
	
		_createClass(InvertedAABBox2D, [{
			key: 'isOverlappedWith',
			value: function isOverlappedWith(other) {
				return !(other.top() > this.bottom() || other.bottom() < this.top() || other.left() > this.right() || other.right() < this.left());
			}
		}, {
			key: 'topLeft',
			value: function topLeft() {
				return this.m_vTopLeft;
			}
		}, {
			key: 'bottomRight',
			value: function bottomRight() {
				return this.m_vBottomRight;
			}
		}, {
			key: 'top',
			value: function top() {
				return this.m_vTopLeft.y;
			}
		}, {
			key: 'left',
			value: function left() {
				return this.m_vTopLeft.x;
			}
		}, {
			key: 'bottom',
			value: function bottom() {
				return this.m_vBottomRight.y;
			}
		}, {
			key: 'right',
			value: function right() {
				return this.m_vBottomRight.x;
			}
		}, {
			key: 'center',
			value: function center() {
				return this.m_vCenter;
			}
		}, {
			key: 'render',
			value: function render() {
				var renderCenter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
				_cgdi2.default.line(this.left(), this.top(), this.right(), this.top());
				_cgdi2.default.line(this.left(), this.bottom(), this.right(), this.bottom());
				_cgdi2.default.line(this.left(), this.top(), this.left(), this.bottom());
				_cgdi2.default.line(this.right(), this.top(), this.right(), this.bottom());
				if (renderCenter) {
					_cgdi2.default.circle(this.m_vCenter, 5);
				}
			}
		}]);
	
		return InvertedAABBox2D;
	}();
	
	exports.default = InvertedAABBox2D;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
	
	exports.clamp = clamp;
	exports.randomClamped = randomClamped;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _transformations = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Path = function () {
		function Path(numWaypoints, minX, minY, maxX, maxY, looped) {
			_classCallCheck(this, Path);
	
			this.m_WayPoints = [];
			this.curWaypoint = this.m_WayPoints[0];
			this.m_bLooped = looped || false;
			this.createRandomPath(numWaypoints, minX, minY, maxX, maxY);
		}
	
		_createClass(Path, [{
			key: 'currentWaypoint',
			value: function currentWaypoint() {
				return this.curWaypoint;
			}
		}, {
			key: 'finished',
			value: function finished() {
				return !(this.curWaypoint != this.m_WayPoints[this.m_WayPoints.length - 1]);
			}
		}, {
			key: 'setNextWaypoint',
			value: function setNextWaypoint() {
				if (this.m_WayPoints.length > 0) {
					var curIndex = -1;
					for (var i = 0; i < this.m_WayPoints.length; i++) {
						if (this.m_WayPoints[i] == this.curWaypoint) {
							curIndex = i;
						}
					}
					if (curIndex >= 0) {
						if (curIndex == this.m_WayPoints.length - 1) {
							curIndex = 0;
						} else {
							++curIndex;
						}
						this.curWaypoint = this.m_WayPoints[curIndex];
					}
				}
			}
		}, {
			key: 'createRandomPath',
			value: function createRandomPath(numWaypoints, minX, minY, maxX, maxY) {
				this.m_WayPoints = [];
				var midX = (maxX + minX) / 2;
				var midY = (maxY + minY) / 2;
				var smaller = Math.min(midX, midY);
				var spacing = 2 * Math.PI / numWaypoints;
				for (var i = 0; i < numWaypoints; ++i) {
					var radialDist = (0.2 + Math.random() * 0.8) * smaller;
					var temp = new _vector2d2.default(radialDist, 0);
					(0, _transformations.vec2dRotateAroundOrigin)(temp, i * spacing);
					temp.x += midX;
					temp.y += midY;
					this.m_WayPoints.push(temp);
				}
				this.curWaypoint = this.m_WayPoints[0];
				return this.m_WayPoints;
			}
		}, {
			key: 'loopOn',
			value: function loopOn() {
				this.m_bLooped = true;
			}
		}, {
			key: 'loopOff',
			value: function loopOff() {
				this.m_bLooped = false;
			}
		}, {
			key: 'addWayPoint',
			value: function addWayPoint(newPoint) {
				// 
			}
		}, {
			key: 'set',
			value: function set(path) {
				if (path instanceof Path) {
					this.m_WayPoints = path.getPath();
					this.curWaypoint = this.m_WayPoints[0];
				}
				if (path instanceof Array) {
					this.m_WayPoints = path;
					this.curWaypoint = this.m_WayPoints[0];
				}
			}
		}, {
			key: 'clear',
			value: function clear() {
				this.m_WayPoints = [];
			}
		}, {
			key: 'getPath',
			value: function getPath() {
				return this.m_WayPoints;
			}
		}, {
			key: 'render',
			value: function render() {
				_cgdi2.default.orangePen();
				for (var i = 0; i < this.m_WayPoints.length; i++) {
					var it = this.m_WayPoints[i];
					var wp = void 0;
					if (i != this.m_WayPoints.length - 1) {
						wp = this.m_WayPoints[i + 1];
					} else {
						if (this.m_bLooped) {
							wp = this.m_WayPoints[0];
						}
					}
					if (wp) {
						_cgdi2.default.line(wp, it);
					}
				}
			}
		}]);
	
		return Path;
	}();
	
	exports.default = Path;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var PRM = {
		NumAgents: 300,
		NumObstacles: 7,
		MinObstacleRadius: 10,
		MaxObstacleRadius: 30,
		//number of horizontal cells used for spatial partitioning
		NumCellsX: 7,
		//number of vertical cells used for spatial partitioning
		NumCellsY: 7,
		//how many samples the smoother will use to average a value
		NumSamplesForSmoothing: 10,
		//this is used to multiply the steering force AND all the multipliers
		//found in SteeringBehavior
		SteeringForceTweaker: 200.0,
		SteeringForce: 2.0,
		MaxSteeringForce: 2 * 200,
		MaxSpeed: 150.0,
		VehicleMass: 1.0,
		VehicleScale: 3.0,
		//use these values to tweak the amount that each steering force
		//contributes to the total steering force
		SeparationWeight: 1.0 * 200,
		AlignmentWeight: 1.0 * 200,
		CohesionWeight: 2.0 * 200,
		ObstacleAvoidanceWeight: 10.0 * 200,
		WallAvoidanceWeight: 10.0 * 200,
		WanderWeight: 1.0 * 200,
		SeekWeight: 1.0 * 200,
		FleeWeight: 1.0 * 200,
		ArriveWeight: 1.0 * 200,
		PursuitWeight: 1.0 * 200,
		OffsetPursuitWeight: 1.0 * 200,
		InterposeWeight: 1.0 * 200,
		HideWeight: 1.0 * 200,
		EvadeWeight: 0.01 * 200,
		FollowPathWeight: 0.05 * 200,
		//how close a neighbour must be before an agent perceives it (considers it
		//to be within its neighborhood)
		ViewDistance: 50.0,
		//used in obstacle avoidance
		MinDetectionBoxLength: 40.0,
		//used in wall avoidance
		WallDetectionFeelerLength: 40.0,
		//these are the probabilities that a steering behavior will be used
		//when the Prioritized Dither calculate method is used to sum
		//combined behaviors
		prWallAvoidance: 0.5,
		prObstacleAvoidance: 0.5,
		prSeparation: 0.2,
		prAlignment: 0.3,
		prCohesion: 0.6,
		prWander: 0.8,
		prSeek: 0.8,
		prFlee: 0.6,
		prEvade: 1.0,
		prHide: 0.8,
		prArrive: 0.5,
		MaxTurnRatePerSecond: Math.PI
	};
	
	exports.default = PRM;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _moving_entity = __webpack_require__(14);
	
	var _moving_entity2 = _interopRequireDefault(_moving_entity);
	
	var _steering_behavior = __webpack_require__(17);
	
	var _steering_behavior2 = _interopRequireDefault(_steering_behavior);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _params = __webpack_require__(12);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _transformations = __webpack_require__(6);
	
	var _smoother = __webpack_require__(18);
	
	var _smoother2 = _interopRequireDefault(_smoother);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Vehicle = function (_MovingEntity) {
		_inherits(Vehicle, _MovingEntity);
	
		function Vehicle(world, position, rotation, velocity, mass, maxForce, maxSpeed, maxTurnRate, scale) {
			_classCallCheck(this, Vehicle);
	
			var _this = _possibleConstructorReturn(this, (Vehicle.__proto__ || Object.getPrototypeOf(Vehicle)).call(this, position, scale, velocity, maxSpeed, new _vector2d2.default(Math.sin(rotation), -Math.cos(rotation)), mass, new _vector2d2.default(scale, scale), maxTurnRate, maxForce));
	
			_this.m_pWorld = world;
			_this.m_vSmoothedHeading = new _vector2d2.default(0, 0);
			_this.m_bSmoothingOn = false;
			_this.m_dTimeElapsed = 0;
			_this.m_vecVehicleVB = [];
			_this.initializeBuffer();
			_this.m_pSteering = new _steering_behavior2.default(_this);
			_this.m_pHeadingSmoother = new _smoother2.default(_params2.default.NumsamplesForSmoothing, new _vector2d2.default(0, 0));
			return _this;
		}
	
		_createClass(Vehicle, [{
			key: 'initializeBuffer',
			value: function initializeBuffer() {
				this.m_vecVehicleVB = [new _vector2d2.default(-4.0, 2.4), new _vector2d2.default(4.0, 0.0), new _vector2d2.default(-4.0, -2.4)];
			}
		}, {
			key: 'update',
			value: function update(time_elapsed) {
				this.m_dTimeElapsed = time_elapsed;
				var oldPos = this.pos();
				var steeringForce = this.m_pSteering.calculate();
				var acceleration = steeringForce.crossNum(1 / this.m_dMass);
				this.m_vVelocity = this.m_vVelocity.add(acceleration.crossNum(time_elapsed));
				this.m_vVelocity.truncate(this.m_dMaxSpeed);
				this.m_vPos = this.m_vPos.add(this.m_vVelocity.crossNum(time_elapsed));
				if (this.m_vVelocity.lengthSq() > 0.00000001) {
					this.m_vHeading = (0, _vector2d.vec2dNormalize)(this.m_vVelocity);
					this.m_vSide = this.m_vHeading.perp();
				}
				(0, _vector2d.wrapAround)(this.m_vPos, this.m_pWorld.cxClient(), this.m_pWorld.cyClient());
				if (this.steering().isSpacePartitioningOn()) {
					this.world().cellSpace().updateEntity(this, oldPos);
				}
				if (this.isSmoothingOn()) {
					this.m_vSmoothedHeading = this.m_pHeadingSmoother.update(this.heading());
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var m_vecVehicleVBTrans = [];
				if (this.m_pWorld.renderNeighbors()) {
					if (this.id() === 0) {
						_cgdi2.default.redPen();
					} else if (this.isTagged()) {
						_cgdi2.default.greenPen();
					} else {
						_cgdi2.default.bluePen();
					}
				} else {
					_cgdi2.default.bluePen();
				}
	
				if (this.steering().isInterposeOn()) {
					_cgdi2.default.redPen();
				}
	
				if (this.steering().isHideOn()) {
					_cgdi2.default.greenPen();
				}
	
				if (this.isSmoothingOn()) {
					m_vecVehicleVBTrans = (0, _transformations.worldTransform)(this.m_vecVehicleVB, this.pos(), this.smoothedHeading(), this.smoothedHeading().perp(), this.scale());
				} else {
					m_vecVehicleVBTrans = (0, _transformations.worldTransform)(this.m_vecVehicleVB, this.pos(), this.heading(), this.side(), this.scale());
				}
	
				_cgdi2.default.closedShape(m_vecVehicleVBTrans);
	
				if (this.id() === 0 && this.m_pWorld.viewKeys()) {
					this.steering().renderAids();
				}
			}
		}, {
			key: 'steering',
			value: function steering() {
				return this.m_pSteering;
			}
		}, {
			key: 'world',
			value: function world() {
				return this.m_pWorld;
			}
		}, {
			key: 'smoothedHeading',
			value: function smoothedHeading() {
				return this.m_vSmoothedHeading;
			}
		}, {
			key: 'isSmoothingOn',
			value: function isSmoothingOn() {
				return this.m_bSmoothingOn;
			}
		}, {
			key: 'smoothingOn',
			value: function smoothingOn() {
				this.m_bSmoothingOn = true;
			}
		}, {
			key: 'smoothingOff',
			value: function smoothingOff() {
				this.m_bSmoothingOn = false;
			}
		}, {
			key: 'toggleSmoothing',
			value: function toggleSmoothing() {
				this.m_bSmoothingOn = !this.m_bSmoothingOn;
			}
		}, {
			key: 'timeElapsed',
			value: function timeElapsed() {
				return this.m_dTimeElapsed;
			}
		}]);
	
		return Vehicle;
	}(_moving_entity2.default);
	
	exports.default = Vehicle;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base_game_entity = __webpack_require__(15);
	
	var _base_game_entity2 = _interopRequireDefault(_base_game_entity);
	
	var _c2dmatrix = __webpack_require__(7);
	
	var _c2dmatrix2 = _interopRequireDefault(_c2dmatrix);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
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
	      var toTarget = new _vector2d2.default(target.x - this.m_vPos.x, target.y - this.m_vPos.y).normalize();
	      var angle = Math.acos(this.m_vHeading.dot(toTarget));
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entity_type = __webpack_require__(16);
	
	var _entity_type2 = _interopRequireDefault(_entity_type);
	
	var _vector2d = __webpack_require__(3);
	
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _params = __webpack_require__(12);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _transformations = __webpack_require__(6);
	
	var _geometry = __webpack_require__(5);
	
	var _utils = __webpack_require__(10);
	
	var _path = __webpack_require__(11);
	
	var _path2 = _interopRequireDefault(_path);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MaxDouble = 999999;
	
	function randomClamped() {
		return 1 - Math.random() * 2;
	}
	
	var slow = 3;
	var normal = 3;
	var fast = 3;
	var WanderRad = 1.2;
	var WanderDist = 2;
	var WanderJitterPerSec = 80;
	var WaypointSeekDist = 20;
	var BehaviorType = {
		none: 0x00000,
		seek: 0x00002,
		flee: 0x00004,
		arrive: 0x00008,
		wander: 0x00010,
		cohesion: 0x00020,
		separation: 0x00040,
		allignment: 0x00080,
		obstacle_avoidance: 0x00100,
		wall_avoidance: 0x00200,
		follow_path: 0x00400,
		pursuit: 0x00800,
		evade: 0x01000,
		interpose: 0x02000,
		hide: 0x04000,
		flock: 0x08000,
		offset_pursuit: 0x10000
	};
	
	var SteeringBehavior = function () {
		function SteeringBehavior(agent) {
			_classCallCheck(this, SteeringBehavior);
	
			this.m_pVehicle = agent;
			this.m_vTarget = null;
			this.m_vOffset = null;
			this.m_vSteeringForce = new _vector2d2.default();
			this.m_iFlags = 0;
			this.m_dDBoxLength = _params2.default.MinDetectionBoxLength;
			this.m_dWeightCohesion = _params2.default.CohesionWeight;
			this.m_dWeightAlignment = _params2.default.AlignmentWeight;
			this.m_dWeightSeparation = _params2.default.SeparationWeight;
			this.m_dWeightObstacleAvoidance = _params2.default.ObstacleAvoidanceWeight;
			this.m_dWeightWander = _params2.default.WanderWeight;
			this.m_dWeightWallAvoidance = _params2.default.WallAvoidanceWeight;
			this.m_dViewDistance = _params2.default.ViewDistance;
			this.m_dWallDetectionFeelerLength = _params2.default.WallDetectionFeelerLength;
			this.m_Feelers = [new _vector2d2.default(0, 0), new _vector2d2.default(0, 0), new _vector2d2.default(0, 0)];
			this.m_Deceleration = normal;
			this.m_pTargetAgent1 = null;
			this.m_pTargetAgent2 = null;
			this.m_dWanderDistance = WanderDist;
			this.m_dWanderJitter = WanderJitterPerSec;
			this.m_dWanderRadius = WanderRad;
			this.m_dWaypointSeekDistSq = WaypointSeekDist * WaypointSeekDist;
			this.m_dWeightSeek = _params2.default.SeekWeight;
			this.m_dWeightFlee = _params2.default.FleeWeight;
			this.m_dWeightArrive = _params2.default.ArriveWeight;
			this.m_dWeightPursuit = _params2.default.PursuitWeight;
			this.m_dWeightOffsetPursuit = _params2.default.OffsetPursuitWeight;
			this.m_dWeightInterpose = _params2.default.InterposeWeight;
			this.m_dWeightHide = _params2.default.HideWeight;
			this.m_dWeightEvade = _params2.default.EvadeWeight;
			this.m_dWeightFollowPath = _params2.default.FollowPathWeight;
			this.m_bCellSpaceOn = false;
			this.m_SummingMethod = 'prioritized';
			this.theta = Math.random() * Math.PI * 2;
			this.m_vWanderTarget = new _vector2d2.default(this.m_dWanderRadius * Math.cos(this.theta), this.m_dWanderRadius * Math.sin(this.theta));
			this.m_pPath = new _path2.default();
			this.m_pPath.loopOn();
		}
	
		_createClass(SteeringBehavior, [{
			key: 'forwardComponent',
			value: function forwardComponent() {
				return this.m_pVehicle.heading().dot(this.m_vSteeringForce);
			}
		}, {
			key: 'sideComponent',
			value: function sideComponent() {
				return this.m_pVehicle.side().dot(this.m_vSteeringForce);
			}
		}, {
			key: 'renderAids',
			value: function renderAids() {
				var _this = this;
	
				_cgdi2.default.transparentText();
				_cgdi2.default.textColor(_cgdi2.default.GREY);
				var nextSlot = 20;
				var slotSize = 20;
				document.addEventListener('keydown', function (e) {
					switch (e.key) {
						case 'PageDown':
							_this.m_pVehicle.setMaxForce(_this.m_pVehicle.maxForce() + 1000 * _this.m_pVehicle.timeElapsed());
							break;
						case 'PageUp':
							if (_this.m_pVehicle.maxForce() > 0.2) {
								_this.m_pVehicle.setMaxForce(_this.m_pVehicle.maxForce() - 1000 * _this.m_pVehicle.timeElapsed());
							}
							break;
						case 'Home':
							_this.m_pVehicle.setMaxSpeed(_this.m_pVehicle.maxSpeed() + 5 * _this.m_pVehicle.timeElapsed());
							break;
						case 'End':
							if (_this.m_pVehicle.maxSpeed() > 0.2) {
								_this.m_pVehicle.setMaxSpeed(_this.m_pVehicle.maxSpeed() - 5 * _this.m_pVehicle.timeElapsed());
							}
							break;
					}
				});
				if (this.m_pVehicle.maxForce() < 0) {
					this.m_pVehicle.setMaxForce(0);
				}
				if (this.m_pVehicle.maxSpeed() < 0) {
					this.m_pVehicle.setMaxSpeed(0);
				}
				if (this.m_pVehicle.id() == 0) {
					_cgdi2.default.textAtPos(5, nextSlot, 'MaxForce(PgUp/PgDn):');
					_cgdi2.default.textAtPos(160, nextSlot, this.m_pVehicle.maxForce() / _params2.default.SteeringForceTweaker);
					nextSlot += slotSize;
				}
				if (this.m_pVehicle.id() == 0) {
					_cgdi2.default.textAtPos(5, nextSlot, 'MaxSpeed(Home/End):');
					_cgdi2.default.textAtPos(160, nextSlot, this.m_pVehicle.maxSpeed());
					nextSlot += slotSize;
				}
				if (this.m_pVehicle.world().renderSteeringForce()) {
					_cgdi2.default.redPen();
					var F = this.m_vSteeringForce.crossNum(1 / _params2.default.SteeringForceTweaker * _params2.default.VehicleScale);
					_cgdi2.default.line(this.m_pVehicle.pos(), this.m_pVehicle.pos().add(F));
				}
				if (this.on(SteeringBehavior.wander) && this.m_pVehicle.world().renderWanderCircle()) {
					document.addEventListener('keydown', function (e) {
						switch (e.key) {
							case 'f':
								_this.m_dWanderJitter += 1 * _this.m_pVehicle.timeElapsed();
								_this.m_dWanderJitter = (0, _utils.clamp)(_this.m_dWanderJitter, 0, 100);
								break;
							case 'v':
								_this.m_dWanderJitter -= 1 * _this.m_pVehicle.timeElapsed();
								_this.m_dWanderJitter = (0, _utils.clamp)(_this.m_dWanderJitter, 0, 100);
								break;
							case 'g':
								_this.m_dWanderDistance += 2 * _this.m_pVehicle.timeElapsed();
								_this.m_dWanderDistance = (0, _utils.clamp)(_this.m_dWanderDistance, 0, 50);
								break;
							case 'b':
								_this.m_dWanderDistance -= 2 * _this.m_pVehicle.timeElapsed();
								_this.m_dWanderDistance = (0, _utils.clamp)(_this.m_dWanderDistance, 0, 50);
								break;
							case 'h':
								_this.m_dWanderRadius += 2 * _this.m_pVehicle.timeElapsed();
								_this.m_dWanderRadius = (0, _utils.clamp)(_this.m_dWanderRadius, 0, 100);
								break;
							case 'n':
								_this.m_dWanderRadius -= 2 * _this.m_pVehicle.timeElapsed();
								_this.m_dWanderRadius = (0, _utils.clamp)(_this.m_dWanderRadius, 0, 100);
								break;
						}
					});
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'Jitter(F/V): ');
						_cgdi2.default.textAtPos(160, nextSlot, this.m_dWanderJitter);
						nextSlot += slotSize;
					}
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'Distance(G/B): ');
						_cgdi2.default.textAtPos(160, nextSlot, this.m_dWanderDistance);
						nextSlot += slotSize;
					}
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'Radius(H/N): ');
						_cgdi2.default.textAtPos(160, nextSlot, this.m_dWanderRadius);
						nextSlot += slotSize;
					}
					var m_vTCC = (0, _transformations.pointToWorldSpace)(new _vector2d2.default(this.m_dWanderRadius * this.m_pVehicle.bRadius(), 0), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
					_cgdi2.default.greenPen();
					_cgdi2.default.hollowBrush();
					_cgdi2.default.circle(m_vTCC, this.m_dWanderRadius * this.m_pVehicle.bRadius());
					_cgdi2.default.redPen();
					_cgdi2.default.circle((0, _transformations.pointToWorldSpace)(this.m_vWanderTarget.add(new _vector2d2.default(this.m_dWanderDistance, 0).crossNum(this.m_pVehicle.bRadius())), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos()), 3);
				}
				if (this.m_pVehicle.world().renderDetectionBox()) {
					_cgdi2.default.greyPen();
					var box = [];
					var length = _params2.default.MinDetectionBoxLength + this.m_pVehicle.speed() / this.m_pVehicle.maxSpeed() * _params2.default.MinDetectionBoxLength;
					box[0] = new _vector2d2.default(0, this.m_pVehicle.bRadius());
					box[1] = new _vector2d2.default(length, this.m_pVehicle.bRadius());
					box[2] = new _vector2d2.default(length, -this.m_pVehicle.bRadius());
					box[3] = new _vector2d2.default(0, -this.m_pVehicle.bRadius());
					if (!this.m_pVehicle.isSmoothingOn()) {
						box = (0, _transformations.worldTransform)(box, this.m_pVehicle.pos(), this.m_pVehicle.heading(), this.m_pVehicle.side());
					} else {
						box = (0, _transformations.worldTransform)(box, this.m_pVehicle.pos(), this.m_pVehicle.smoothedHeading(), this.m_pVehicle.smoothedHeading().perp());
					}
					_cgdi2.default.closedShape(box);
	
					this.m_dDBoxLength = length;
					this.m_pVehicle.world().tagObstaclesWithinViewRange(this.m_pVehicle, this.m_dDBoxLength);
					var closestIntersectingObstacle = null;
					var distToClosestIP = MaxDouble;
					var localPosOfClosestObstacle = new _vector2d2.default();
					for (var i = 0; i < this.m_pVehicle.world().obstacles().length; i++) {
						var curOb = this.m_pVehicle.world().obstacles()[i];
						if (curOb.isTagged()) {
							var localPos = (0, _transformations.pointToLocalSpace)(curOb.pos(), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
							if (localPos.x >= 0) {
								if (Math.abs(localPos.y) < curOb.bRadius() + this.m_pVehicle.bRadius()) {
									_cgdi2.default.thickRedPen();
									// FIXME: ???
									_cgdi2.default.closedShape(box);
								}
							}
						}
					}
				}
				if (this.on(SteeringBehavior.wall_avoidance) && this.m_pVehicle.world().renderFeelers()) {
					_cgdi2.default.orangePen();
					for (var flr = 0; flr < this.m_Feelers.length; flr++) {
						_cgdi2.default.line(this.m_pVehicle.pos(), this.m_Feelers[flr]);
					}
				}
				if (this.on(SteeringBehavior.follow_path) && this.m_pVehicle.world().renderPath()) {
					this.m_pPath.render();
				}
				if (this.on(SteeringBehavior.separation)) {
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'Separation(S/X):');
						_cgdi2.default.textAtPos(160, nextSlot, this.m_dWeightSeparation / _params2.default.SteeringForceTweaker);
						nextSlot += slotSize;
					}
					docuemnt.addEventListener('keydown', function (e) {
						switch (e.key) {
							case 's':
								_this.m_dWeightSeparation += 200 * _this.m_pVehicle.timeElapsed();
								_this.m_dWeightSeparation = (0, _utils.clamp)(_this.m_dWeightSeparation, 0, 50 * _params2.default.SteeringForceTweaker);
								break;
							case 'x':
								_this.m_dWeightSeparation -= 200 * _this.m_pVehicle.timeElapsed();
								_this.m_dWeightSeparation = (0, _utils.clamp)(_this.m_dWeightSeparation, 0, 50 * _params2.default.SteeringForceTweaker);
								break;
						}
					});
				}
				if (this.on(SteeringBehavior.allignment)) {
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'Alignment(A/Z):');
						_cgdi2.default.textAtPos(160, nextSlot, this.m_dWeightAlignment / _params2.default.SteeringForceTweaker);
						nextSlot += slotSize;
					}
					docuemnt.addEventListener('keydown', function (e) {
						switch (e.key) {
							case 'a':
								_this.m_dWeightAlignment += 200 * _this.m_pVehicle.timeElapsed();
								_this.m_dWeightAlignment = (0, _utils.clamp)(_this.m_dWeightAlignment, 0, 50 * _params2.default.SteeringForceTweaker);
								break;
							case 'z':
								_this.m_dWeightAlignment -= 200 * _this.m_pVehicle.timeElapsed();
								_this.m_dWeightAlignment = (0, _utils.clamp)(_this.m_dWeightAlignment, 0, 50 * _params2.default.SteeringForceTweaker);
								break;
						}
					});
				}
				if (this.on(SteeringBehavior.cohesion)) {
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'Cohesion(D/C):');
						_cgdi2.default.textAtPos(160, nextSlot, this.m_dWeightCohesion / _params2.default.SteeringForceTweaker);
						nextSlot += slotSize;
					}
					docuemnt.addEventListener('keydown', function (e) {
						switch (e.key) {
							case 'd':
								_this.m_dWeightCohesion += 200 * _this.m_pVehicle.timeElapsed();
								_this.m_dWeightCohesion = (0, _utils.clamp)(_this.m_dWeightCohesion, 0, 50 * _params2.default.SteeringForceTweaker);
								break;
							case 'c':
								_this.m_dWeightCohesion -= 200 * _this.m_pVehicle.timeElapsed();
								_this.m_dWeightCohesion = (0, _utils.clamp)(_this.m_dWeightCohesion, 0, 50 * _params2.default.SteeringForceTweaker);
								break;
						}
					});
				}
				if (this.on(SteeringBehavior.follow_path)) {
					var sd = Math.sqrt(this.m_dWaypointSeekDistSq);
					if (this.m_pVehicle.id() == 0) {
						_cgdi2.default.textAtPos(5, nextSlot, 'SeekDistance(D/C):');
						_cgdi2.default.textAtPos(160, nextSlot, sd);
						nextSlot += slotSize;
					}
					docuemnt.addEventListener('keydown', function (e) {
						switch (e.key) {
							case 'd':
								_this.m_dWaypointSeekDistSq += 1;
								break;
							case 'c':
								_this.m_dWaypointSeekDistSq -= 1;
								_this.m_dWaypointSeekDistSq = (0, _utils.clamp)(_this.m_dWaypointSeekDistSq, 0, 400);
								break;
						}
					});
				}
			}
		}, {
			key: 'setTarget',
			value: function setTarget(t) {
				this.m_vTarget = t;
			}
		}, {
			key: 'setTargetAgent1',
			value: function setTargetAgent1(agent) {
				this.m_pTargetAgent1 = agent;
			}
		}, {
			key: 'setTargetAgent2',
			value: function setTargetAgent2(agent) {
				this.m_pTargetAgent2 = agent;
			}
		}, {
			key: 'setOffset',
			value: function setOffset(offset) {
				this.m_vOffset = offset;
			}
		}, {
			key: 'getOffset',
			value: function getOffset() {
				return this.m_vOffset;
			}
		}, {
			key: 'setPath',
			value: function setPath(new_path) {
				this.m_pPath.set(new_path);
			}
		}, {
			key: 'createPath',
			value: function createPath(num_waypoints, mx, my, cx, cy) {
				this.m_pPath.createRandomPath(num_waypoints, mx, my, cx, cy);
			}
		}, {
			key: 'force',
			value: function force() {
				return this.m_vSteeringForce;
			}
		}, {
			key: 'toggleSpacePartitioningOnOff',
			value: function toggleSpacePartitioningOnOff() {
				this.m_bCellSpaceOn = !this.m_bCellSpaceOn;
			}
		}, {
			key: 'isSpacePartitioningOn',
			value: function isSpacePartitioningOn() {
				return this.m_bCellSpaceOn;
			}
		}, {
			key: 'setSummingMethod',
			value: function setSummingMethod(sm) {
				this.m_SummingMethod = sm;
			}
		}, {
			key: 'on',
			value: function on(bt) {
				return (this.m_iFlags & bt) == bt;
			}
		}, {
			key: 'fleeOn',
			value: function fleeOn() {
				this.m_iFlags |= BehaviorType.flee;
			}
		}, {
			key: 'fleeOff',
			value: function fleeOff() {
				if (this.on(BehaviorType.flee)) {
					this.m_iFlags ^= BehaviorType.flee;
				}
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
			key: 'wanderOn',
			value: function wanderOn() {
				this.m_iFlags |= BehaviorType.wander;
			}
		}, {
			key: 'wanderOff',
			value: function wanderOff() {
				if (this.on(BehaviorType.wander)) {
					this.m_iFlags ^= BehaviorType.wander;
				}
			}
		}, {
			key: 'pursuitOn',
			value: function pursuitOn(v) {
				this.m_iFlags |= BehaviorType.pursuit;
				this.m_pTargetAgent1 = v;
			}
		}, {
			key: 'pursuitOff',
			value: function pursuitOff() {
				if (this.on(BehaviorType.pursuit)) {
					this.m_iFlags ^= BehaviorType.pursuit;
				}
			}
		}, {
			key: 'evadeOn',
			value: function evadeOn(v) {
				this.m_iFlags |= BehaviorType.evade;
				this.m_pTargetAgent1 = v;
			}
		}, {
			key: 'evadeOff',
			value: function evadeOff() {
				if (this.on(BehaviorType.evade)) {
					this.m_iFlags ^= BehaviorType.evade;
				}
			}
		}, {
			key: 'cohesionOn',
			value: function cohesionOn() {
				this.m_iFlags |= BehaviorType.cohesion;
			}
		}, {
			key: 'cohensionOff',
			value: function cohensionOff() {
				if (this.on(BehaviorType.cohension)) {
					this.m_iFlags ^= BehaviorType.cohension;
				}
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
			key: 'alignmentOn',
			value: function alignmentOn() {
				this.m_iFlags |= BehaviorType.allignment;
			}
		}, {
			key: 'alignmentOff',
			value: function alignmentOff() {
				if (this.on(BehaviorType.alignment)) {
					this.m_iFlags ^= BehaviorType.alignment;
				}
			}
		}, {
			key: 'obstacleAvoidanceOn',
			value: function obstacleAvoidanceOn() {
				this.m_iFlags |= BehaviorType.obstacle_avoidance;
			}
		}, {
			key: 'obstacleAvoidanceOff',
			value: function obstacleAvoidanceOff() {
				if (this.on(BehaviorType.obstacle_avoidance)) {
					this.m_iFlags ^= BehaviorType.obstacle_avoidance;
				}
			}
		}, {
			key: 'wallAvoidanceOn',
			value: function wallAvoidanceOn() {
				this.m_iFlags |= BehaviorType.wall_avoidance;
			}
		}, {
			key: 'wallAvoidanceOff',
			value: function wallAvoidanceOff() {
				if (this.on(BehaviorType.wall_avoidance)) {
					this.m_iFlags ^= BehaviorType.wall_avoidance;
				}
			}
		}, {
			key: 'followPathOn',
			value: function followPathOn() {
				this.m_iFlags |= BehaviorType.follow_path;
			}
		}, {
			key: 'followPathOff',
			value: function followPathOff() {
				if (this.on(BehaviorType.follow_path)) {
					this.m_iFlags ^= BehaviorType.follow_path;
				}
			}
		}, {
			key: 'isInterposeOn',
			value: function isInterposeOn() {
				return this.on(BehaviorType.interpose);
			}
		}, {
			key: 'interposeOn',
			value: function interposeOn(v1, v2) {
				this.m_iFlags |= BehaviorType.interpose;
				this.m_pTargetAgent1 = v1;
				this.m_pTargetAgent2 = v2;
			}
		}, {
			key: 'interposeOff',
			value: function interposeOff() {
				if (this.on(BehaviorType.interpose)) {
					this.m_iFlags ^= BehaviorType.interpose;
				}
			}
		}, {
			key: 'isHideOn',
			value: function isHideOn() {
				return this.on(BehaviorType.hide);
			}
		}, {
			key: 'hideOn',
			value: function hideOn(v) {
				this.m_iFlags |= BehaviorType.hide;
				this.m_pTargetAgent1 = v;
			}
		}, {
			key: 'hideOff',
			value: function hideOff() {
				if (this.on(BehaviorType.hide)) {
					this.m_iFlags ^= BehaviorType.hide;
				}
			}
		}, {
			key: 'offsetPursuitOn',
			value: function offsetPursuitOn(v1, offset) {
				this.m_iFlags |= BehaviorType.offset_pursuit;
				this.m_pTargetAgent1 = v1;
				this.m_vOffset = offset;
			}
		}, {
			key: 'offsetPursuitOff',
			value: function offsetPursuitOff() {
				if (this.on(BehaviorType.offset_pursuit)) {
					this.m_iFlags ^= BehaviorType.offset_pursuit;
				}
			}
		}, {
			key: 'flockingOn',
			value: function flockingOn() {
				this.cohesionOn();
				this.alignmentOn();
				this.separationOn();
				this.wanderOn();
			}
		}, {
			key: 'flockingOff',
			value: function flockingOff() {
				this.cohensionOff();
				this.alignmentOff();
				this.separationOff();
				this.wanderOff();
			}
		}, {
			key: 'dBoxLength',
			value: function dBoxLength() {
				return this.m_dDBoxLength;
			}
		}, {
			key: 'getFeelers',
			value: function getFeelers() {
				return this.m_Feelers;
			}
		}, {
			key: 'wanderJitter',
			value: function wanderJitter() {
				return this.m_dWanderJitter;
			}
		}, {
			key: 'wanderDistance',
			value: function wanderDistance() {
				return this.m_dWanderDistance;
			}
		}, {
			key: 'wanderRadius',
			value: function wanderRadius() {
				return this.m_dWanderRadius;
			}
		}, {
			key: 'separationWeight',
			value: function separationWeight() {
				return this.m_dWeightSeparation;
			}
		}, {
			key: 'alignmentWeight',
			value: function alignmentWeight() {
				return this.m_dWeightAlignment;
			}
		}, {
			key: 'cohensionWeight',
			value: function cohensionWeight() {
				return this.m_dWeightCohesion;
			}
		}, {
			key: 'calculate',
			value: function calculate() {
				this.m_vSteeringForce.zero();
				if (!this.isSpacePartitioningOn()) {
					if (this.on(BehaviorType.separation) || this.on(BehaviorType.allignment) || this.on(BehaviorType.cohesion)) {
						this.m_pVehicle.world().tagVehiclesWithinViewRange(this.m_pVehicle, this.m_dViewDistance);
					}
				} else {
					if (this.on(BehaviorType.separation) || this.on(BehaviorType.allignment) || this.on(BehaviorType.cohesion)) {
						this.m_pVehicle.world().cellSpace().calculateNeighbors(this.m_pVehicle.pos(), this.m_dViewDistance);
					}
				}
				switch (this.m_SummingMethod) {
					case 'weighted_average':
						this.m_vSteeringForce = this.calculateWeightedSum();
						break;
					case 'prioritized':
						this.m_vSteeringForce = this.calculatePrioritized();
						break;
					case 'dithered':
						this.m_vSteeringForce = this.calculateDithered();
						break;
					default:
						this.m_vSteeringForce = new _vector2d2.default(0, 0);
				}
				return this.m_vSteeringForce;
			}
		}, {
			key: 'accumulateForce',
			value: function accumulateForce(runningTot, forceToAdd) {
				var magnitudeSoFar = runningTot.length();
				var magnitudeRemaining = this.m_pVehicle.maxForce() - magnitudeSoFar;
				var returnForce = new _vector2d2.default();
				if (magnitudeRemaining <= 0) {
					return false;
				}
				var magnitudeToAdd = forceToAdd.length();
				if (magnitudeToAdd < magnitudeRemaining) {
					returnForce = runningTot.add(forceToAdd);
				} else {
					returnForce = runningTot.add((0, _vector2d.vec2dNormalize)(forceToAdd).crossNum(magnitudeRemaining));
				}
				return returnForce;
			}
		}, {
			key: 'calculatePrioritized',
			value: function calculatePrioritized() {
				var force = new _vector2d2.default();
				if (this.on(BehaviorType.wall_avoidance)) {
					force = this.wallAvoidance(this.m_pVehicle.world().walls()).crossNum(this.m_dWeightWallAvoidance);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				if (this.on(BehaviorType.obstacle_avoidance)) {
					force = this.obstacleAvoidance(this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightObstacleAvoidance);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				if (this.on(BehaviorType.evade)) {
					if (this.m_pTargetAgent1) {
						force = this.evade(this.m_pTargetAgent1).crossNum(this.m_dWeightEvade);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				}
				if (this.on(BehaviorType.flee)) {
					force = this.flee(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightFlee);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				if (!this.isSpacePartitioningOn()) {
					if (this.on(BehaviorType.separation)) {
						force = this.separation(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
					if (this.on(BehaviorType.allignment)) {
						force = this.allignment(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
					if (this.on(BehaviorType.cohesion)) {
						force = this.cohesion(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				} else {
					if (this.on(BehaviorType.separation)) {
						force = this.separationPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
					if (this.on(BehaviorType.allignment)) {
						force = this.allignmentPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
					if (this.on(BehaviorType.cohesion)) {
						force = this.cohesionPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				}
				if (this.on(BehaviorType.seek)) {
					force = this.seek(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightSeek);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				if (this.on(BehaviorType.arrive)) {
					force = this.arrive(this.m_pVehicle.world().crosshair(), this.m_Deceleration).crossNum(this.m_dWeightArrive);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				if (this.on(BehaviorType.wander)) {
					force = this.wander().crossNum(this.m_dWeightWander);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				if (this.on(BehaviorType.pursuit)) {
					if (this.m_pTargetAgent1) {
						force = this.pursuit(this.m_pTargetAgent1).crossNum(this.m_dWeightPursuit);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				}
				if (this.on(BehaviorType.offset_pursuit)) {
					if (this.m_pTargetAgent1 && !this.m_vOffset.isZero()) {
						force = this.offsetPursuit(this.m_pTargetAgent1, this.m_vOffset);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				}
				if (this.on(BehaviorType.interpose)) {
					if (this.m_pTargetAgent1 && this.m_pTargetAgent2) {
						force = this.interpose(this.m_pTargetAgent1, this.m_pTargetAgent2).crossNum(this.m_dWeightInterpose);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				}
				if (this.on(BehaviorType.hide)) {
					if (this.m_pTargetAgent1) {
						force = this.hide(this.m_pTargetAgent1, this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightHide);
						if (!this.accumulateForce(this.m_vSteeringForce, force)) {
							return this.m_vSteeringForce;
						} else {
							this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
						}
					}
				}
				if (this.on(BehaviorType.follow_path)) {
					force = this.followPath().crossNum(this.m_dWeightFollowPath);
					if (!this.accumulateForce(this.m_vSteeringForce, force)) {
						return this.m_vSteeringForce;
					} else {
						this.m_vSteeringForce = this.accumulateForce(this.m_vSteeringForce, force);
					}
				}
				return this.m_vSteeringForce;
			}
		}, {
			key: 'calculateWeightedSum',
			value: function calculateWeightedSum() {
				if (this.on(BehaviorType.wall_avoidance)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.wallAvoidance(this.m_pVehicle.world().walls()).crossNum(this.m_dWeightWallAvoidance));
				}
				if (this.on(BehaviorType.obstacle_avoidance)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.obstacleAvoidance(this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightObstacleAvoidance));
				}
				if (this.on(BehaviorType.evade)) {
					if (this.m_pTargetAgent1) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.evade(this.m_pTargetAgent1).crossNum(this.m_dWeightEvade));
					}
				}
				if (!this.isSpacePartitioningOn()) {
					if (this.on(BehaviorType.separation)) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.separation(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation));
					}
					if (this.on(BehaviorType.allignment)) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignment(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment));
					}
					if (this.on(BehaviorType.cohesion)) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesion(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion));
					}
				} else {
					if (this.on(BehaviorType.separation)) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.separationPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation));
					}
					if (this.on(BehaviorType.allignment)) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignmentPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment));
					}
					if (this.on(BehaviorType.cohesion)) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesionPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion));
					}
				}
				if (this.on(BehaviorType.wander)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.wander().crossNum(this.m_dWeightWander));
				}
				if (this.on(BehaviorType.seek)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.seek(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightSeek));
				}
				if (this.on(BehaviorType.flee)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.flee(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightFlee));
				}
				if (this.on(BehaviorType.arrive)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.arrive(this.m_pVehicle.world().crosshair(), this.m_Deceleration).crossNum(this.m_dWeightArrive));
				}
				if (this.on(BehaviorType.pursuit)) {
					if (this.m_pTargetAgent1) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.pursuit(this.m_pTargetAgent1).crossNum(this.m_dWeightPursuit));
					}
				}
				if (this.on(BehaviorType.offset_pursuit)) {
					if (this.m_pTargetAgent1 && !this.m_vOffset.isZero()) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.offsetPursuit(this.m_pTargetAgent1).crossNum(this.m_dWeightPursuit));
					}
				}
				if (this.on(BehaviorType.interpose)) {
					if (this.m_pTargetAgent1 && this.m_pTargetAgent2) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.interpose(this.m_pTargetAgent1, this.m_pTargetAgent2).crossNum(this.m_dWeightInterpose));
					}
				}
				if (this.on(BehaviorType.hide)) {
					if (this.m_pTargetAgent1) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.hide(this.m_pTargetAgent1, this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightHide));
					}
				}
				if (this.on(BehaviorType.follow_path)) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.followPath().crossNum(this.m_dWeightFollowPath));
				}
				this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
				return this.m_vSteeringForce;
			}
		}, {
			key: 'calculateDithered',
			value: function calculateDithered() {
				this.m_vSteeringForce.zero();
				if (this.on(BehaviorType.wall_avoidance) && Math.random() < _params2.default.prWallAvoidance) {
					this.m_vSteeringForce = this.wallAvoidance(this.m_pVehicle.world().walls()).crossNum(this.m_dWeightWallAvoidance / _params2.default.prWallAvoidance);
					if (!this.m_vSteeringForce.isZero()) {
						this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.obstacle_avoidance) && Math.random() < _params2.default.prObstacleAvoidance) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.obstacleAvoidance(this.m_pVehicle.world().obstacles()).crossNum(this.m_dWeightObstacleAvoidance / _params2.default.prObstacleAvoidance));
					if (!this.m_vSteeringForce.isZero()) {
						this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
						return this.m_vSteeringForce;
					}
				}
				if (this.isSpacePartitioningOn()) {
					if (this.on(BehaviorType.separation) && Math.random() < _params2.default.prSeparation) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.separation(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation / _params2.default.prSeparation));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
					if (this.on(BehaviorType.allignment) && Math.random() < _params2.default.prAlignment) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignment(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment / _params2.default.prAlignment));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
					if (this.on(BehaviorType.cohesion) && Math.random() < _params2.default.cohesion) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesion(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion / _params2.default.prCohesion));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
				} else {
					if (this.on(BehaviorType.separation) && Math.random() < _params2.default.prSeparation) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.separationPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightSeparation / _params2.default.prSeparation));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
					if (this.on(BehaviorType.allignment) && Math.random() < _params2.default.prAlignment) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.allignmentPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightAlignment / _params2.default.prAlignment));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
					if (this.on(BehaviorType.cohesion) && Math.random() < _params2.default.cohesion) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.cohesionPlus(this.m_pVehicle.world().agents()).crossNum(this.m_dWeightCohesion / _params2.default.prCohesion));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
				}
				if (this.on(BehaviorType.flee) && Math.random() < _params2.default.prFlee) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.flee(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightFlee / _params2.default.prFlee));
					if (!this.m_vSteeringForce.isZero()) {
						this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.evade) && Math.random() < _params2.default.prEvade) {
					if (this.m_pTargetAgent1) {
						this.m_vSteeringForce = this.m_vSteeringForce.add(this.evade(this.m_pTargetAgent1).crossNum(this.m_dWeightEvade / _params2.default.prEvade));
						if (!this.m_vSteeringForce.isZero()) {
							this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
							return this.m_vSteeringForce;
						}
					}
				}
				if (this.on(BehaviorType.wander) && Math.random() < _params2.default.prWander) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.wander().crossNum(this.m_dWeightWander / _params2.default.prWander));
					if (!this.m_vSteeringForce.isZero()) {
						this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.seek) && Math.random() < _params2.default.prSeek) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.seek(this.m_pVehicle.world().crosshair()).crossNum(this.m_dWeightSeek / _params2.default.prSeek));
					if (!this.m_vSteeringForce.isZero()) {
						this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
						return this.m_vSteeringForce;
					}
				}
				if (this.on(BehaviorType.arrive) && Math.random() < _params2.default.prArrive) {
					this.m_vSteeringForce = this.m_vSteeringForce.add(this.arrive(this.m_pVehicle.world().crosshair(), this.m_Deceleration).crossNum(this.m_dWeightArrive / _params2.default.prArrive));
					if (!this.m_vSteeringForce.isZero()) {
						this.m_vSteeringForce.truncate(this.m_pVehicle.maxForce());
						return this.m_vSteeringForce;
					}
				}
				return this.m_vSteeringForce;
			}
		}, {
			key: 'seek',
			value: function seek(targetPos) {
				var desiredVelocity = (0, _vector2d.vec2dNormalize)(targetPos.add(this.m_pVehicle.pos().getReverse())).crossNum(this.m_pVehicle.maxSpeed());
				return desiredVelocity.add(this.m_pVehicle.velocity().getReverse());
			}
		}, {
			key: 'flee',
			value: function flee(targetPos) {
				var panicDistanceSq = 100 * 100;
				if (targetPos.add(this.m_pVehicle.pos().getReverse()).length() > panicDistanceSq) {
					return new _vector2d2.default(0, 0);
				} else {
					var desiredVelocity = (0, _vector2d.vec2dNormalize)(this.m_pVehicle.pos().add(targetPos.getReverse())).crossNum(this.m_pVehicle.maxSpeed());
					return desiredVelocity.add(this.m_pVehicle.velocity().getReverse());
				}
			}
		}, {
			key: 'arrive',
			value: function arrive(targetPos, deceleration) {
				var toTarget = targetPos.add(this.m_pVehicle.pos().getReverse());
				var dist = toTarget.length();
				if (dist > 0) {
					var decelerationTweaker = 0.3;
					var speed = dist / (deceleration * decelerationTweaker);
					speed = Math.min(speed, this.m_pVehicle.maxSpeed());
					var desiredVelocity = toTarget.crossNum(speed / dist);
					return desiredVelocity.add(this.m_pVehicle.velocity().getReverse());
				}
				return new _vector2d2.default(0, 0);
			}
		}, {
			key: 'pursuit',
			value: function pursuit(evader) {
				var toEvader = evader.pos().add(this.m_pVehicle.pos().getReverse());
				var relativeHeading = this.m_pVehicle.heading().dot(evader.heading());
				if (toEvader.dot(this.m_pVehicle.heading()) > 0 && relativeHeading < -0.95) {
					return this.seek(evader.pos());
				}
				var lookAheadTime = toEvader.length() / (this.m_pVehicle.maxSpeed() + evader.speed());
				return this.seek(evader.pos().add(evader.velocity().crossNum(lookAheadTime)));
			}
		}, {
			key: 'evade',
			value: function evade(pursuer) {
				var toPursuer = pursuer.pos().add(this.m_pVehicle.pos().getReverse());
				var thetaRange = 100;
				if (toPursuer.lengthSq() > thetaRange * thetaRange) {
					return new _vector2d2.default(0, 0);
				}
				var lookAheadTime = toPursuer.length() / (this.m_pVehicle.maxSpeed() + pursuer.speed());
				return this.flee(pursuer.pos().add(pursuer.velocity().crossNum(lookAheadTime)));
			}
		}, {
			key: 'wander',
			value: function wander() {
				var jitterThisTimeSlice = this.m_dWanderJitter * this.m_pVehicle.timeElapsed();
				this.m_vWanderTarget = this.m_vWanderTarget.add(new _vector2d2.default(randomClamped() * jitterThisTimeSlice, randomClamped() * jitterThisTimeSlice));
				this.m_vWanderTarget.normalize();
				this.m_vWanderTarget = this.m_vWanderTarget.crossNum(this.m_dWanderRadius);
				var target = this.m_vWanderTarget.add(new _vector2d2.default(this.m_dWanderDistance, 0));
				var Target = (0, _transformations.pointToWorldSpace)(target, this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
				return Target.add(this.m_pVehicle.pos().getReverse());
			}
		}, {
			key: 'obstacleAvoidance',
			value: function obstacleAvoidance(obstacles) {
				this.m_dDBoxLength = _params2.default.MinDetectionBoxLength + this.m_pVehicle.speed() / this.m_pVehicle.maxSpeed() * _params2.default.MinDetectionBoxLength;
				this.m_pVehicle.world().tagObstaclesWithinViewRange(this.m_pVehicle, this.m_dDBoxLength);
				var closestIntersectingObstacle = null;
				var distToclosestIP = MaxDouble;
				var localPosOfClosestObstacle = null;
				for (var i = 0; i < obstacles.length; i++) {
					var curOb = obstacles[i];
					if (curOb.isTagged()) {
						var localPos = (0, _transformations.pointToLocalSpace)(curOb.pos(), this.m_pVehicle.heading(), this.m_pVehicle.side(), this.m_pVehicle.pos());
						if (localPos.x >= 0) {
							var expandedRadius = curOb.bRadius() + this.m_pVehicle.bRadius();
							if (Math.abs(localPos.y) < expandedRadius) {
								var cx = localPos.x;
								var cy = localPos.y;
								var sqrtPart = Math.sqrt(expandedRadius * expandedRadius - cy * cy);
								var ip = cx - sqrtPart;
								if (ip <= 0) {
									ip = cx + sqrtPart;
								}
								if (ip < distToclosestIP) {
									distToclosestIP = ip;
									closestIntersectingObstacle = curOb;
									localPosOfClosestObstacle = localPos;
								}
							}
						}
					}
				}
				var steeringForce = new _vector2d2.default(0, 0);
				if (closestIntersectingObstacle) {
					var multiplier = 1 + (this.m_dDBoxLength - localPosOfClosestObstacle.x) / this.m_dDBoxLength;
					steeringForce.y = (closestIntersectingObstacle.bRadius() - localPosOfClosestObstacle.y) * multiplier;
					var brakingWeight = 0.2;
					steeringForce.x = (closestIntersectingObstacle.bRadius() - localPosOfClosestObstacle.x) * brakingWeight;
				}
				return (0, _transformations.vectorToWorldSpace)(steeringForce, this.m_pVehicle.heading(), this.m_pVehicle.side());
			}
		}, {
			key: 'wallAvoidance',
			value: function wallAvoidance(walls) {
				this.createFeelers();
				var distToThisIP = 0;
				var distToClosestIP = MaxDouble;
				var closestWall = -1;
				var steeringForce = new _vector2d2.default();
				var point = new _vector2d2.default();
				var closestPoint = new _vector2d2.default();
				for (var flr = 0; flr < this.m_Feelers.length; flr++) {
					for (var w = 0; w < walls.length; w++) {
						var result = (0, _geometry.lineIntersection2D)(this.m_pVehicle.pos(), this.m_Feelers[flr], walls[w].from(), walls[w].to(), distToThisIP, point);
						distToThisIP = result.dist;
						point = result.point;
						if (result.result) {
							if (distToThisIP < distToClosestIP) {
								distToClosestIP = distToThisIP;
								closestWall = w;
								closestPoint = point;
							}
						}
					}
					if (closestWall >= 0) {
						var overShoot = this.m_Feelers[flr].add(closestPoint.getReverse());
						steeringForce = walls[closestWall].normal().crossNum(overShoot.length());
					}
				}
				return steeringForce;
			}
		}, {
			key: 'separation',
			value: function separation(neighbours) {
				var steeringForce = new _vector2d2.default();
				for (var a = 0; a < neighbours.length; a++) {
					if (neighbours[a] != this.m_pVehicle && neighbours[a].isTagged() && neighbours[a] != this.m_pTargetAgent1) {
						var toAgent = this.m_pVehicle.pos().add(neighbours[a].pos().getReverse());
						steeringForce = steeringForce.add((0, _vector2d.vec2dNormalize)(toAgent).crossNum(1 / toAgent.length()));
					}
				}
				return steeringForce;
			}
		}, {
			key: 'allignment',
			value: function allignment(neighbours) {
				var averageHeading = new _vector2d2.default();
				var neighbourCount = 0;
				for (var a = 0; a < neighbours.length; a++) {
					if (neighbours[a] != this.m_pVehicle && neighbours[a].isTagged() && neighbours[a] != this.m_pTargetAgent1) {
						averageHeading = averageHeading.add(neighbours[a].heading());
						++neighbourCount;
					}
				}
				if (neighbourCount > 0) {
					averageHeading.crossNum(1 / neighbourCount);
					averageHeading = averageHeading.add(this.m_pVehicle.heading().getReverse());
				}
				return averageHeading;
			}
		}, {
			key: 'cohesion',
			value: function cohesion(neighbours) {
				var centerOfMass = new _vector2d2.default();
				var steeringForce = new _vector2d2.default();
				var neighbourCount = 0;
				for (var a = 0; a < neighbours.length; a++) {
					if (neighbours[a] != this.m_pVehicle && neighbours[a].isTagged() && neighbours[a] != this.m_pTargetAgent1) {
						centerOfMass = centerOfMass.add(neighbours[a].pos());
						++neighbourCount;
					}
				}
				if (neighbourCount > 0) {
					centerOfMass.crossNum(1 / neighbourCount);
					steeringForce = this.seek(centerOfMass);
				}
				return (0, _vector2d.vec2dNormalize)(steeringForce);
			}
		}, {
			key: 'separationPlus',
			value: function separationPlus(neighbours) {
				var steeringForce = new _vector2d2.default();
				for (var i = 0; i < this.m_pVehicle.world().cellSpace().length; i++) {
					var pV = this.m_pVehicle.world().cellSpace()[i];
					if (pV != this.m_pVehicle) {
						var toAgent = this.m_pVehicle.pos().add(pv.pos().getReverse());
						steeringForce = steeringForce.add((0, _vector2d.vec2dNormalize)(toAgent).crossNum(1 / toAgent.length()));
					}
				}
				return steeringForce;
			}
		}, {
			key: 'allignmentPlus',
			value: function allignmentPlus(neighbours) {
				var averageHeading = new _vector2d2.default();
				var neighbourCount = 0;
				for (var i = 0; i < this.m_pVehicle.world().cellSpace().length; i++) {
					var pV = this.m_pVehicle.world().cellSpace()[i];
					if (pV != this.m_pVehicle) {
						averageHeading = averageHeading.add(pV.heading());
						neighbourCount++;
					}
				}
				if (neighbourCount > 0) {
					averageHeading = averageHeading.crossNum(1 / neighbourCount);
					averageHeading = averageHeading.add(this.m_pVehicle.heading().getReverse());
				}
				return averageHeading;
			}
		}, {
			key: 'cohesionPlus',
			value: function cohesionPlus(neighbours) {
				var centerOfMass = new _vector2d2.default();
				var steeringForce = new _vector2d2.default();
				var neighbourCount = 0;
				for (var i = 0; i < this.m_pVehicle.world().cellSpace().length; i++) {
					var pV = this.m_pVehicle.world().cellSpace()[i];
					if (pV != this.m_pVehicle) {
						centerOfMass = centerOfMass.add(pV.pos());
						neighbourCount++;
					}
				}
				if (neighbourCount > 0) {
					centerOfMass = centerOfMass.crossNum(1 / neighbourCount);
					steeringForce = this.seek(centerOfMass);
				}
				return (0, _vector2d.vec2dNormalize)(steeringForce);
			}
		}, {
			key: 'interpose',
			value: function interpose(agentA, agentB) {
				var midPoint = agentA.pos().add(agentB.pos()).crossNum(1 / 2);
				var timeToReachMidPoint = (0, _vector2d.vec2DDistance)(this.m_pVehicle.pos(), midPoint) / this.m_pVehicle.maxSpeed();
				var aPos = agentA.pos().add(agentA.velocity().crossNum(timeToReachMidPoint));
				var bPos = agentB.pos().add(agentB.velocity().crossNum(timeToReachMidPoint));
				midPoint = aPos.add(bPos).crossNum(1 / 2);
				return this.arrive(midPoint, fast);
			}
		}, {
			key: 'hide',
			value: function hide(hunter, obstacles) {
				var distToClosest = MaxDouble;
				var bestHidingSpot = new _vector2d2.default();
				var closest = void 0;
				for (var i = 0; i < obstacles.length; i++) {
					var curOb = obstacles[i];
					var hidingSpot = this.getHidingPosition(curOb.pos(), curOb.bRadius(), hunter.pos());
					var dist = (0, _vector2d.vec2DDistanceSq)(hidingSpot, this.m_pVehicle.pos());
					if (dist < distToClosest) {
						distToClosest = dist;
						bestHidingSpot = hidingSpot;
						closest = curOb;
					}
				}
				if (distToClosest == MaxDouble) {
					return this.evade(hunter);
				}
				return arrive(bestHidingSpot, fast);
			}
		}, {
			key: 'getHidingPosition',
			value: function getHidingPosition(posOb, radiusOb, posHunter) {
				var DistanceFromBoundary = 30;
				var distAway = radiusOb + DistanceFromBoundary;
				var toOb = (0, _vector2d.vec2dNormalize)(posOb.add(posHunter.getReverse()));
				return toOb.crossNum(distAway).add(posOb);
			}
		}, {
			key: 'followPath',
			value: function followPath() {
				if ((0, _vector2d.vec2DDistanceSq)(this.m_pPath.currentWaypoint(), this.m_pVehicle.pos()) < this.m_dWaypointSeekDistSq) {
					this.m_pPath.setNextWaypoint();
				}
				if (!this.m_pPath.finished()) {
					return this.seek(this.m_pPath.currentWaypoint());
				} else {
					return this.arrive(this.m_pPath.currentWaypoint(), normal);
				}
			}
		}, {
			key: 'offsetPursuit',
			value: function offsetPursuit(leader, offset) {
				var worldOffsetPos = (0, _transformations.pointToWorldSpace)(offset, leader.heading(), leader.side(), leader.pos());
				var toOffset = worldOffsetPos.add(this.m_pVehicle.pos().getReverse());
				var lookAheadTime = toOffset.length() / (this.m_pVehicle.maxSpeed() + leader.speed());
				return this.arrive(worldOffsetPos.add(leader.velocity().crossNum(lookAheadTime)), fast);
			}
		}, {
			key: 'createFeelers',
			value: function createFeelers() {
				this.m_Feelers[0] = this.m_pVehicle.pos().add(this.m_pVehicle.heading().crossNum(this.m_dWallDetectionFeelerLength));
				var temp = this.m_pVehicle.heading().clone();
				(0, _transformations.vec2dRotateAroundOrigin)(temp, Math.PI * 7 / 4);
				this.m_Feelers[1] = this.m_pVehicle.pos().add(temp.crossNum(this.m_dWallDetectionFeelerLength / 2));
				temp = this.m_pVehicle.heading().clone();
				(0, _transformations.vec2dRotateAroundOrigin)(temp, Math.PI * 1 / 4);
				this.m_Feelers[2] = this.m_pVehicle.pos().add(temp.crossNum(this.m_dWallDetectionFeelerLength / 2));
			}
		}]);
	
		return SteeringBehavior;
	}();
	
	exports.default = SteeringBehavior;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Smoother = function () {
		function Smoother(sampleSize, zeroValue) {
			_classCallCheck(this, Smoother);
	
			this.m_History = [sampleSize, zeroValue];
			this.m_iNextUpdateSlot = 0;
			this.m_ZeroValue = zeroValue;
		}
	
		_createClass(Smoother, [{
			key: 'update',
			value: function update(mostRecentValue) {
				this.m_History[this.m_iNextUpdateSlot++] = mostRecentValue;
				if (this.m_iNextUpdateSlot == this.m_History.length) {
					this.m_iNextUpdateSlot = 0;
				}
				var sum = this.m_ZeroValue;
				for (var i = 0; i < this.m_History.length; i++) {
					var it = this.m_History[i];
					if (sum instanceof _vector2d2.default) {
						sum = sum.add(it);
					} else {
						sum += it;
					}
				}
				if (sum instanceof _vector2d2.default) {
					return sum.crossNum(1 / this.m_History.length);
				} else {
					return sum / this.m_History.length;
				}
			}
		}]);
	
		return Smoother;
	}();
	
	exports.default = Smoother;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _vector2d = __webpack_require__(3);
	
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

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cgdi = __webpack_require__(1);
	
	var _cgdi2 = _interopRequireDefault(_cgdi);
	
	var _base_game_entity = __webpack_require__(15);
	
	var _base_game_entity2 = _interopRequireDefault(_base_game_entity);
	
	var _vector2d = __webpack_require__(3);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obstacle = function (_BaseGameEntity) {
		_inherits(Obstacle, _BaseGameEntity);
	
		function Obstacle(x, y, r) {
			_classCallCheck(this, Obstacle);
	
			return _possibleConstructorReturn(this, (Obstacle.__proto__ || Object.getPrototypeOf(Obstacle)).call(this, 0, new _vector2d2.default(x, y), r));
		}
	
		_createClass(Obstacle, [{
			key: 'update',
			value: function update(time_elapsed) {}
		}, {
			key: 'render',
			value: function render() {
				_cgdi2.default.blackPen();
				_cgdi2.default.circle(this.pos(), this.bRadius());
			}
		}]);
	
		return Obstacle;
	}(_base_game_entity2.default);
	
	exports.default = Obstacle;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var RESOURCE = {
		IDR_MENU1: 101,
		ID_AID_WANDER: 40001,
		ID_AID_STEERINGFORCE: 40002,
		ID_AID_WALLFEELERS: 40003,
		ID_OB_WALLS: 40004,
		ID_OB_OBSTACLES: 40005,
		ID_OB_PATH: 40006,
		ID_AID_DETECTIONBOX: 40007,
		IDR_PARTITIONING: 40008,
		IDR_WEIGHTED_SUM: 40009,
		IDR_PRIORITIZED: 40010,
		IDR_DITHERED: 40011,
		ID_VIEW_KEYS: 40012,
		ID_VIEW_FPS: 40013,
		ID_MENU_SMOOTHING: 40014,
		IDM_PARTITION_VIEW_NEIGHBORS: 40015
	};
	
	exports.default = RESOURCE;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map