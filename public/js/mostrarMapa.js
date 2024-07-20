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

/***/ "./src/js/mostrarMapa.js":
/*!*******************************!*\
  !*** ./src/js/mostrarMapa.js ***!
  \*******************************/
/***/ (() => {

  eval("(function () {\n\tconst lat = document.getElementById(\"lat\").textContent;\n\tconst lng = document.getElementById(\"lng\").textContent;\n\n\tconst mapa = L.map(\"mapa\").setView([lat, lng], 16);\n\n\tL.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n\t\tattribution:\n\t\t\t'&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n  }).addTo(mapa);\n\n  L.marker([lat, lng]).addTo(mapa);\n})();\n\n\n//# sourceURL=webpack://bienes-raices-web-site/./src/js/mostrarMapa.js?");

  /***/ })
  
  /******/ 	});
  /************************************************************************/
  /******/ 	
  /******/ 	// startup
  /******/ 	// Load entry module and return exports
  /******/ 	// This entry module can't be inlined because the eval devtool is used.
  /******/ 	var __webpack_exports__ = {};
  /******/ 	__webpack_modules__["./src/js/mostrarMapa.js"]();
  /******/ 	
  /******/ })()
  ;