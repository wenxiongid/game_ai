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

	"use strict";
	
	var _miner = __webpack_require__(1);
	
	var _miner2 = _interopRequireDefault(_miner);
	
	var _miner_wife = __webpack_require__(10);
	
	var _miner_wife2 = _interopRequireDefault(_miner_wife);
	
	var _entity_name = __webpack_require__(5);
	
	var _entity_manager = __webpack_require__(7);
	
	var _entity_manager2 = _interopRequireDefault(_entity_manager);
	
	var _message_dispatcher = __webpack_require__(6);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var miner = new _miner2.default(_entity_name.ENTITYNAME.ent_Miner_Bob);
	var minersWife = new _miner_wife2.default(_entity_name.ENTITYNAME.ent_Elsa);
	_entity_manager2.default.registerEntity(miner);
	_entity_manager2.default.registerEntity(minersWife);
	setInterval(function () {
	  miner.update();
	  minersWife.update();
	  _message_dispatcher2.default.dispatchDelayedMessages();
	}, 1600);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base_game_entity = __webpack_require__(2);
	
	var _base_game_entity2 = _interopRequireDefault(_base_game_entity);
	
	var _state_machine = __webpack_require__(3);
	
	var _state_machine2 = _interopRequireDefault(_state_machine);
	
	var _state = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var STATE = {
	  comfortLevel: 5,
	  maxNuggets: 3,
	  thirstLevel: 5,
	  tirednessThreshold: 5
	};
	
	var Miner = function (_BaseGameEntity) {
	  _inherits(Miner, _BaseGameEntity);
	
	  function Miner(id) {
	    _classCallCheck(this, Miner);
	
	    var _this = _possibleConstructorReturn(this, (Miner.__proto__ || Object.getPrototypeOf(Miner)).call(this, id));
	
	    _this.stateMachine = new _state_machine2.default(_this);
	    _this.stateMachine.setCurrentState(_state.GoHomeAndSleepTilRested);
	    _this.m_Location = "shack";
	    _this.m_iGoldCarried = 0;
	    _this.m_iMoneyInBank = 0;
	    _this.m_iThirsty = 0;
	    _this.m_iFatigue = 0;
	    return _this;
	  }
	
	  _createClass(Miner, [{
	    key: 'getFSM',
	    value: function getFSM() {
	      return this.stateMachine;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.m_iThirsty += 1;
	      this.stateMachine.update();
	    }
	  }, {
	    key: 'changeLocation',
	    value: function changeLocation(pNewLocation) {
	      this.m_Location = pNewLocation;
	    }
	  }, {
	    key: 'location',
	    value: function location() {
	      return this.m_Location;
	    }
	  }, {
	    key: 'addToGoldCarried',
	    value: function addToGoldCarried(count) {
	      this.m_iGoldCarried += count;
	      if (this.m_iGoldCarried < 0) {
	        this.m_iGoldCarried = 0;
	      }
	    }
	  }, {
	    key: 'setGoldCarried',
	    value: function setGoldCarried(count) {
	      this.m_iGoldCarried = count;
	    }
	  }, {
	    key: 'goldCarried',
	    value: function goldCarried() {
	      return this.m_iGoldCarried;
	    }
	  }, {
	    key: 'increaseFatigue',
	    value: function increaseFatigue() {
	      this.m_iFatigue++;
	    }
	  }, {
	    key: 'decreaseFatigue',
	    value: function decreaseFatigue() {
	      this.m_iFatigue--;
	    }
	  }, {
	    key: 'fatigued',
	    value: function fatigued() {
	      return this.m_iFatigue > STATE.tirednessThreshold;
	    }
	  }, {
	    key: 'pocketsFull',
	    value: function pocketsFull() {
	      return this.m_iGoldCarried >= STATE.maxNuggets;
	    }
	  }, {
	    key: 'thirsty',
	    value: function thirsty() {
	      return this.m_iThirsty >= STATE.thirstLevel;
	    }
	  }, {
	    key: 'addToWealth',
	    value: function addToWealth(count) {
	      this.m_iMoneyInBank += this.m_iGoldCarried;
	      if (this.m_iMoneyInBank < 0) {
	        this.m_iMoneyInBank = 0;
	      }
	    }
	  }, {
	    key: 'wealth',
	    value: function wealth() {
	      return this.m_iMoneyInBank;
	    }
	  }, {
	    key: 'wealthEnough',
	    value: function wealthEnough() {
	      return this.wealth() >= STATE.comfortLevel;
	    }
	  }, {
	    key: 'buyAndDrinkAWhiskey',
	    value: function buyAndDrinkAWhiskey() {
	      this.m_iThirsty = 0;
	      this.m_iMoneyInBank -= 2;
	    }
	  }, {
	    key: 'handleMessage',
	    value: function handleMessage(telegram) {
	      return this.stateMachine.handleMessage(telegram);
	    }
	  }]);
	
	  return Miner;
	}(_base_game_entity2.default);
	
	exports.default = Miner;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var m_iNextValidID = 0;
	
	var BaseGameEntity = function () {
	  function BaseGameEntity(id) {
	    _classCallCheck(this, BaseGameEntity);
	
	    this.setID(id);
	  }
	
	  _createClass(BaseGameEntity, [{
	    key: "setID",
	    value: function setID(id) {
	      if (id >= m_iNextValidID) {
	        this.m_ID = id;
	        m_iNextValidID = id + 1;
	      }
	    }
	  }, {
	    key: "update",
	    value: function update() {}
	  }, {
	    key: "id",
	    value: function id() {
	      return this.m_ID;
	    }
	  }]);
	
	  return BaseGameEntity;
	}();
	
	exports.default = BaseGameEntity;

/***/ },
/* 3 */
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
	  }]);
	
	  return StateMachine;
	}();
	
	exports.default = StateMachine;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EatStew = exports.GoHomeAndSleepTilRested = exports.QuenchThirst = exports.VisitBankAndDepositGold = exports.EnterMineAndDigForNugget = undefined;
	
	var _entity_name = __webpack_require__(5);
	
	var _entity_name2 = _interopRequireDefault(_entity_name);
	
	var _message_dispatcher = __webpack_require__(6);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EnterMineAndDigForNugget = exports.EnterMineAndDigForNugget = {
	  enter: function enter(pMiner) {
	    if (pMiner.location() != 'goldmine') {
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': \u8D70\u8FDB\u91D1\u77FF');
	      pMiner.changeLocation('goldmine');
	    }
	  },
	  execute: function execute(pMiner) {
	    pMiner.addToGoldCarried(1);
	    pMiner.increaseFatigue();
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u6361\u8D77\u4E00\u5757\u91D1');
	    if (pMiner.pocketsFull()) {
	      pMiner.getFSM().changeState(VisitBankAndDepositGold);
	    }
	    if (pMiner.thirsty()) {
	      pMiner.getFSM().changeState(QuenchThirst);
	    }
	  },
	  exit: function exit(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u6361\u591F\u4E86\uFF0C\u51FA\u53BB\u4E86');
	  },
	  onMessage: function onMessage(pMiner, telegram) {
	    return false;
	  }
	};
	
	var VisitBankAndDepositGold = exports.VisitBankAndDepositGold = {
	  enter: function enter(pMiner) {
	    if (pMiner.location() != 'bank') {
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': \u53BB\u94F6\u884C\u5B58\u94B1\u4E86Yeah');
	      pMiner.changeLocation('bank');
	    }
	  },
	  execute: function execute(pMiner) {
	    pMiner.addToWealth(pMiner.goldCarried());
	    pMiner.setGoldCarried(0);
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u5B58\u94B1. \u73B0\u5728\u603B\u5171\u5B58\u4E86: ' + pMiner.wealth());
	    if (pMiner.wealthEnough()) {
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': WooHoo! \u591F\u6709\u94B1\u4E86. \u56DE\u5BB6\u7761\u89C9');
	      pMiner.getFSM().changeState(GoHomeAndSleepTilRested);
	    } else {
	      pMiner.getFSM().changeState(EnterMineAndDigForNugget);
	    }
	  },
	  exit: function exit(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u8D70\u51FA\u94F6\u884C');
	  },
	  onMessage: function onMessage(pMiner, telegram) {
	    return false;
	  }
	};
	
	var QuenchThirst = exports.QuenchThirst = {
	  enter: function enter(pMiner) {
	    if (pMiner.location() != 'saloon') {
	      pMiner.changeLocation('saloon');
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': \u6E34\u6B7B\u6211\u4E86! \u53BB\u9152\u5427');
	    }
	  },
	  execute: function execute(pMiner) {
	    if (pMiner.thirsty()) {
	      pMiner.buyAndDrinkAWhiskey();
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': \u70B9\u4E86\u4E00\u676F\u9152');
	      pMiner.getFSM().changeState(EnterMineAndDigForNugget);
	    } else {
	      console.log('error drink');
	    }
	  },
	  exit: function exit(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u8D70\u51FA\u9152\u5427\uFF0C\u8212\u670D\u591A\u4E86');
	  },
	  onMessage: function onMessage(pMiner, telegram) {
	    return false;
	  }
	};
	
	var GoHomeAndSleepTilRested = exports.GoHomeAndSleepTilRested = {
	  enter: function enter(pMiner) {
	    if (pMiner.location() != 'shack') {
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': \u56DE\u5BB6');
	      pMiner.changeLocation('shack');
	      _message_dispatcher2.default.dispatchMessage(0, pMiner.id(), _entity_name.ENTITYNAME.ent_Elsa, 'MSG_HiHoneyImHome');
	    }
	  },
	  execute: function execute(pMiner) {
	    if (!pMiner.fatigued()) {
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': \u7761\u4E86\u4E2A\u597D\u89C9! \u8BE5\u53BB\u5E72\u6D3B\u4E86');
	      pMiner.getFSM().changeState(EnterMineAndDigForNugget);
	    } else {
	      pMiner.decreaseFatigue();
	      console.log((0, _entity_name2.default)(pMiner.id()) + ': ZZZZ...');
	    }
	  },
	  exit: function exit(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u8D70\u51FA\u5BB6\u95E8');
	  },
	  onMessage: function onMessage(pMiner, telegram) {
	    switch (telegram.msg) {
	      case 'MSG_StewReady':
	        console.log((0, _entity_name2.default)(pMiner.id()) + '\u4E8E' + new Date().getTime() + '\u6536\u5230telegram');
	        console.log((0, _entity_name2.default)(pMiner.id()) + ': \u597D\u7684\uFF0C\u5403\u996D\u5587');
	        pMiner.getFSM().changeState(EatStew);
	        return true;
	    }
	    return false;
	  }
	};
	
	var EatStew = exports.EatStew = {
	  enter: function enter(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u8001\u5A46\u95FB\u8D77\u6765\u597D\u9999\u554A!');
	  },
	  execute: function execute(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u63E1\u5608\u63E1\u5608\u597D\u5403\u597D\u5403!!!');
	    pMiner.getFSM().revertToPreviousState();
	  },
	  exit: function exit(pMiner) {
	    console.log((0, _entity_name2.default)(pMiner.id()) + ': \u8C22\u8C22\u8001\u5A46\uFF0C\u56DE\u6765\u518D\u89C1');
	  },
	  onMessage: function onMessage(pMiner) {
	    return false;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getNameOfEntity;
	var ENTITYNAME = exports.ENTITYNAME = {
	  ent_Miner_Bob: 0,
	  ent_Elsa: 1
	};
	
	function getNameOfEntity(n) {
	  switch (n) {
	    case ENTITYNAME.ent_Miner_Bob:
	      return "Miner Bob";
	    case ENTITYNAME.ent_Elsa:
	      return "Elsa";
	    default:
	      return "UNKNOW!";
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entity_name = __webpack_require__(5);
	
	var _entity_name2 = _interopRequireDefault(_entity_name);
	
	var _entity_manager = __webpack_require__(7);
	
	var _entity_manager2 = _interopRequireDefault(_entity_manager);
	
	var _telegram = __webpack_require__(8);
	
	var _telegram2 = _interopRequireDefault(_telegram);
	
	var _message_types = __webpack_require__(9);
	
	var _message_types2 = _interopRequireDefault(_message_types);
	
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
	        console.log('\u5373\u65F6telegram\u89E6\u53D1\u4E8E: ' + new Date().getTime() + ', \u7531' + (0, _entity_name2.default)(senderID) + '\u53D1\u7ED9' + (0, _entity_name2.default)(receiverID) + ', \u4FE1\u606F\u4E3A: ' + (0, _message_types2.default)(msg));
	        this.discharge(pReceiver, telegram);
	      } else {
	        var currentTime = new Date().getTime();
	        telegram.dispatchTime = currentTime + delay;
	        this.prioritQ.push(telegram);
	        this.prioritQ.sort(sortPriorityQ);
	        console.log('\u5EF6\u65F6telegram\u8BB0\u5F55\u4E8E: ' + new Date().getTime() + ', \u7531' + (0, _entity_name2.default)(senderID) + '\u53D1\u7ED9' + (0, _entity_name2.default)(receiverID) + ', \u4FE1\u606F\u4E3A: ' + (0, _message_types2.default)(msg));
	      }
	    }
	  }, {
	    key: 'dispatchDelayedMessages',
	    value: function dispatchDelayedMessages() {
	      var currentTime = new Date().getTime();
	      while (this.prioritQ.length && this.prioritQ[0].dispatchTime < currentTime && this.prioritQ[0].dispatchTime > 0) {
	        var telegram = this.prioritQ[0];
	        var pReceiver = _entity_manager2.default.getEntityFromID(telegram.receiverID);
	        console.log('\u961F\u5217telegram\u51C6\u5907\u89E6\u53D1: \u53D1\u7ED9' + (0, _entity_name2.default)(pReceiver.id()) + '. \u6D88\u606F\u4E3A: ' + (0, _message_types2.default)(telegram.msg));
	        this.discharge(pReceiver, telegram);
	        this.prioritQ.shift();
	      }
	    }
	  }]);
	
	  return MessageDispatcher;
	}();
	
	exports.default = new MessageDispatcher();

/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = msgToStr;
	var MESSAGETYPE = {
	  'MSG_HiHoneyImHome': '亲爱的我回来了',
	  'MSG_StewReady': '晚饭准备好了'
	};
	
	function msgToStr(msg) {
	  if (MESSAGETYPE[msg]) {
	    return MESSAGETYPE[msg];
	  } else {
	    return 'Not recognized';
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base_game_entity = __webpack_require__(2);
	
	var _base_game_entity2 = _interopRequireDefault(_base_game_entity);
	
	var _state_machine = __webpack_require__(3);
	
	var _state_machine2 = _interopRequireDefault(_state_machine);
	
	var _miner_wife_state = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MinersWife = function (_BaseGameEntity) {
	  _inherits(MinersWife, _BaseGameEntity);
	
	  function MinersWife(id) {
	    _classCallCheck(this, MinersWife);
	
	    var _this = _possibleConstructorReturn(this, (MinersWife.__proto__ || Object.getPrototypeOf(MinersWife)).call(this, id));
	
	    _this.stateMachine = new _state_machine2.default(_this);
	    _this.stateMachine.setCurrentState(_miner_wife_state.DoHouseWork);
	    _this.stateMachine.setGlobalState(_miner_wife_state.WifesGlobalState);
	    _this.m_Location = "shack";
	    _this.isCooking = false;
	    return _this;
	  }
	
	  _createClass(MinersWife, [{
	    key: 'getFSM',
	    value: function getFSM() {
	      return this.stateMachine;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.stateMachine.update();
	    }
	  }, {
	    key: 'handleMessage',
	    value: function handleMessage(telegram) {
	      return this.stateMachine.handleMessage(telegram);
	    }
	  }, {
	    key: 'cooking',
	    value: function cooking() {
	      return this.isCooking;
	    }
	  }, {
	    key: 'setCooking',
	    value: function setCooking(isCooking) {
	      this.isCooking = isCooking;
	    }
	  }]);
	
	  return MinersWife;
	}(_base_game_entity2.default);
	
	exports.default = MinersWife;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CookStew = exports.VisitBathroom = exports.DoHouseWork = exports.WifesGlobalState = undefined;
	
	var _entity_name = __webpack_require__(5);
	
	var _entity_name2 = _interopRequireDefault(_entity_name);
	
	var _message_dispatcher = __webpack_require__(6);
	
	var _message_dispatcher2 = _interopRequireDefault(_message_dispatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WifesGlobalState = exports.WifesGlobalState = {
	  enter: function enter(wife) {},
	  execute: function execute(wife) {
	    if (Math.random() < 0.1) {
	      wife.getFSM().changeState(VisitBathroom);
	    }
	  },
	  exit: function exit(wife) {},
	  onMessage: function onMessage(wife, telegram) {
	    switch (telegram.msg) {
	      case 'MSG_HiHoneyImHome':
	        console.log((0, _entity_name2.default)(wife.id()) + "\u4E8E" + new Date().getTime() + "\u6536\u5230telegram");
	        console.log((0, _entity_name2.default)(wife.id()) + ": \u4EB2\u7231\u7684\u4F60\u56DE\u6765\u5587\uFF0C\u6211\u4E0B\u9762\u7ED9\u4F60\u5403\u54C8");
	        wife.getFSM().changeState(CookStew);
	        return true;
	    }
	    return false;
	  }
	};
	
	var DoHouseWork = exports.DoHouseWork = {
	  enter: function enter(wife) {},
	  execute: function execute(wife) {
	    switch (Math.floor(Math.random() * 3)) {
	      case 0:
	        console.log((0, _entity_name2.default)(wife.id()) + ": \u64E6\u5730\u677F");
	        break;
	      case 1:
	        console.log((0, _entity_name2.default)(wife.id()) + ": \u6D17\u76D8\u5B50");
	        break;
	      case 2:
	        console.log((0, _entity_name2.default)(wife.id()) + ": \u6574\u7406\u88AB\u5B50");
	        break;
	    }
	  },
	  exit: function exit(wife) {},
	  onMessage: function onMessage(wife, telegram) {
	    return false;
	  }
	};
	
	var VisitBathroom = exports.VisitBathroom = {
	  enter: function enter(wife) {
	    console.log((0, _entity_name2.default)(wife.id()) + ": \u8DD1\u8FDB\u6D17\u624B\u95F4\uFF0C\u9700\u8981\u91CA\u653E\u4E00\u4E0B");
	  },
	  execute: function execute(wife) {
	    console.log((0, _entity_name2.default)(wife.id()) + ": \u554A\uFF5E\uFF5E\u8212\u670D");
	    wife.getFSM().revertToPreviousState();
	  },
	  exit: function exit(wife) {
	    console.log((0, _entity_name2.default)(wife.id()) + ": \u8D70\u51FA\u6D17\u624B\u95F4");
	  },
	  onMessage: function onMessage(wife, telegram) {
	    return false;
	  }
	};
	
	var CookStew = exports.CookStew = {
	  enter: function enter(wife) {
	    if (!wife.cooking()) {
	      console.log((0, _entity_name2.default)(wife.id()) + ": \u5F00\u9505\u4E0B\u9762");
	      _message_dispatcher2.default.dispatchMessage(1500, wife.id(), wife.id(), 'MSG_StewReady');
	      wife.setCooking(true);
	    }
	  },
	  execute: function execute(wife) {
	    console.log((0, _entity_name2.default)(wife.id()) + ": \u5FD9\u7740\u4E0B\u9762");
	  },
	  exit: function exit(wife) {
	    console.log((0, _entity_name2.default)(wife.id()) + ": \u4E0A\u684C\u5587");
	  },
	  onMessage: function onMessage(wife, telegram) {
	    switch (telegram.msg) {
	      case 'MSG_StewReady':
	        console.log((0, _entity_name2.default)(wife.id()) + "\u4E8E" + new Date().getTime() + "\u6536\u5230telegram");
	        console.log((0, _entity_name2.default)(wife.id()) + ": \u9762\u597D\u5587");
	        _message_dispatcher2.default.dispatchMessage(0, wife.id(), _entity_name.ENTITYNAME.ent_Miner_Bob, "MSG_StewReady");
	        wife.setCooking(false);
	        wife.getFSM().changeState(DoHouseWork);
	        return true;
	    }
	    return false;
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map