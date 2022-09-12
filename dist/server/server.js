/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/cart.js":
/*!************************!*\
  !*** ./server/cart.js ***!
  \************************/
/***/ ((module) => {

eval("var add = function add(cart, req) {\n  //req.body - массив товаров полученный после запроса\n  cart.contents.push(req.body);\n  return JSON.stringify(cart, null, 4);\n};\n\nvar change = function change(cart, req) {\n  //ищем в cart.contents по запросу клиента +req.params.id id товара в корзине el.id_product\n  var find = cart.contents.find(function (el) {\n    return el.id_product === +req.params.id;\n  }); //найденному товару корзины прибавляем данные из тела запроса\n\n  find.quantity += req.body.quantity; //возвращаем обратно данные в виде строки\n\n  return JSON.stringify(cart, null, 4);\n};\n\nvar remove = function remove(cart, req) {\n  var find = cart.contents.find(function (el) {\n    return el.id_product === +req.params.id;\n  });\n\n  if (find.quantity > 1) {\n    find.quantity -= req.body.quantity;\n  } else {\n    cart.contents.splice(cart.contents.indexOf(find), 1);\n  }\n\n  return JSON.stringify(cart, null, 4);\n};\n\nmodule.exports = {\n  add: add,\n  change: change,\n  remove: remove\n};\n\n//# sourceURL=webpack://project_express/./server/cart.js?");

/***/ }),

/***/ "./server/cartRouter.js":
/*!******************************!*\
  !*** ./server/cartRouter.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar router = express.Router(); //активируем Роутер - обрабатывает любые запросы\n\nvar handler = __webpack_require__(/*! ./handler */ \"./server/handler.js\"); // при получении запроса к корзине сервер обрабатывает его\n//\"/\" === /api/cart\n\n\nrouter.get(\"/\", function (req, res) {\n  // считываем локальный файл server/db/userCart.json с объектами корзины\n  fs.readFile(\"dist/server/db/userCart.json\", \"utf-8\", function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      //data- исходник корзины\n      res.send(data);\n    }\n  });\n}); //обновление данных корзины (вставка нового товара)\n\nrouter.post(\"/\", function (req, res) {\n  handler(req, res, \"add\", \"dist/server/db/userCart.json\");\n}); // обновление данных корзины (добавление)\n\nrouter.put(\"/:id\", function (req, res) {\n  ///:id === ${find.id_product} из cartComponents\n  //handler - описана в handler.js\n  // принимаем в параметр req - запрос на сервер, res - ответ сервера, \"change\" - что хотим сделать, server/db/userCart.json - файл который изменяем\n  handler(req, res, \"change\", \"dist/server/db/userCart.json\");\n}); //удаление данных корзины\n\nrouter[\"delete\"](\"/:id\", function (req, res) {\n  handler(req, res, \"remove\", \"dist/server/db/userCart.json\");\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://project_express/./server/cartRouter.js?");

/***/ }),

/***/ "./server/handler.js":
/*!***************************!*\
  !*** ./server/handler.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var cart = __webpack_require__(/*! ./cart */ \"./server/cart.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar actions = {\n  add: cart.add,\n  change: cart.change,\n  remove: cart.remove\n}; //HANDLER отвечает за изменение данных в самом файле\n\nvar handler = function handler(req, res, action, file) {\n  fs.readFile(file, \"utf-8\", function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      //actions[action]===cart.change, которая описана в cart.js\n      //JSON.parse(data) - исходник корзины, преобразуем в объект\n      //req - получение данных от клиента\n      var newCart = actions[action](JSON.parse(data), req); //записываем в файл данные полученные от запроса newCart, описанные в cart.js\n\n      fs.writeFile(file, newCart, function (err) {\n        if (err) {\n          res.sendStatus(404, JSON.stringify({\n            result: 0,\n            text: err\n          }));\n        } else {\n          res.send(JSON.stringify({\n            result: 1\n          }));\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack://project_express/./server/handler.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\"); //импорт модуля\n\n\nvar fs = __webpack_require__(/*! fs */ \"fs\"); //импорт модуля\n\n\nvar app = express(); // объект для обработки запросов на сервер\n\nvar cart = __webpack_require__(/*! ./cartRouter */ \"./server/cartRouter.js\"); //обработчик всех запросов корзины (расположен локально созадем его в папке server)\n\n\napp.use(express.json()); // активируем работу JSON\n\napp.use(\"/\", express[\"static\"](\"dist/public\")); //express.static('public') - запускает папку public, в которой лежит файл index.html\n\napp.use(\"/api/cart\", cart); // при запросе к /api/cart (GET, PUT, POST etc) перенаправляем в обработчик cart= require(\"./cartRouter\")\n//ожидание запроса к /api/products\n\napp.get(\"/api/products\", function (req, res) {\n  //читаем файл по пути server/db/products.json\n  fs.readFile(\"dist/server/db/products.json\", \"utf-8\", function (err, data) {\n    // data - исходник, который читаем по адресу server/db/products.json\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data); // возвращаем клиенту исходник если не было ошибки\n    }\n  });\n}); // app.get('/api/cart/:id', (req, res) => {\n//    // res.send(req.params.id);\n//     res.send(req.query);\n// });\n\nvar port = process.env.PORT || 3000;\napp.listen(port, function () {\n  return console.log(\"Listen on port \".concat(port, \"...\"));\n});\n\n//# sourceURL=webpack://project_express/./server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	
/******/ })()
;