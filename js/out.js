/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    console.log('działa');\n\n    //konstruktor Furry\n    var Furry = function Furry() {\n        this.x = 0;\n        this.y = 0;\n        this.direction = \"right\";\n    };\n\n    //konstruktor monety\n    var Coin = function Coin() {\n        this.x = Math.floor(Math.random() * 10);\n        this.y = Math.floor(Math.random() * 10);\n    };\n\n    //konstruktor gry\n    var Game = function Game() {\n        this.board = document.querySelectorAll('section#board div');\n        this.furry = new Furry();\n        this.coin = new Coin();\n        this.score = 0;\n\n        this.index = function (x, y) {\n            return x + y * 10;\n        };\n\n        var self = this;\n\n        this.showFurry = function () {\n            //null - jeśli nie znaleziono dopasowań\n            if (document.querySelector('.furry') != null) {\n                self.hideVisibleFurry();\n            }\n            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');\n        };\n\n        this.hideVisibleFurry = function () {\n            document.querySelector('.furry').classList.remove('furry');\n        };\n\n        this.showCoin = function () {\n            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');\n        };\n\n        this.moveFurry = function () {\n            if (this.furry.direction === 'right') {\n                this.furry.x = this.furry.x + 1;\n            } else if (this.furry.direction === 'left') {\n                this.furry.x = this.furry.x - 1;\n            } else if (this.furry.direction === 'down') {\n                this.furry.y = this.furry.y + 1;\n            } else {\n                this.furry.y = this.furry.y - 1;\n            }\n            self.gameOver();\n            self.showFurry();\n            self.checkCoinCollision();\n        };\n\n        this.turnFurry = function (event) {\n            switch (event.which) {\n                case 37:\n                    self.furry.direction = 'left';\n                    break;\n                case 38:\n                    self.furry.direction = 'up';\n                    break;\n                case 39:\n                    self.furry.direction = 'right';\n                    break;\n                case 40:\n                    self.furry.direction = 'down';\n                    break;\n            }\n        };\n\n        this.checkCoinCollision = function () {\n            //if(this.furry.x === this.coin.x && this.furry.y === this.coin.y) {\n            if (this.board[this.index(this.coin.x, this.coin.y)] === this.board[this.index(this.furry.x, this.furry.y)]) {\n                document.querySelector('.coin').classList.remove('coin');\n                this.score++;\n                document.querySelector('section#score strong').innerText = this.score;\n                this.coin = new Coin();\n                self.showCoin();\n            }\n        };\n\n        this.gameOver = function () {\n            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {\n\n                clearInterval(this.idSetInterval);\n                self.hideVisibleFurry();\n\n                var sectionOver = document.querySelector('section#over'),\n                    spanOver = document.querySelector('section#over.score');\n                sectionOver.classList.remove('invisible');\n                sectionOver.classList.add('gameOver');\n                spanOver.innerText = 'Your score: ' + this.score;\n            }\n        };\n\n        this.startGame = function () {\n            this.idSetInterval = setInterval(function () {\n                self.moveFurry();\n            }, 250);\n        };\n    };\n\n    var game = new Game();\n    document.addEventListener('keydown', function (event) {\n        game.turnFurry(event);\n    });\n    game.showFurry();\n    game.showCoin();\n    game.startGame();\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });