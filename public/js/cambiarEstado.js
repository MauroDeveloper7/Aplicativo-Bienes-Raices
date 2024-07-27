/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n\tconst cambiarEstado = document.querySelectorAll(\".cambiar-estado\");\r\n\r\n\tconst token =document.querySelectorAll('meta[name=\"csrf-token\"]').getAttribute('content')\r\n\t\r\n\tcambiarEstado.forEach((boton) => {\r\n\t\tboton.addEventListener(\"click\", cambiarEstadoPropiedad);\r\n\t});\r\n\r\n\tasync function cambiarEstadoPropiedad(e) {\r\n\r\n\t\tconst { propiedadId: id } = e.target.dataset;\r\n\r\n\t\ttry {\r\n\t\t\tconst url = `/propiedades/${id}`;\r\n\t\t\tconst response = await fetch(url, {\r\n\t\t\t\tmethod: 'PUT',\r\n\t\t\t\theaders: {\r\n\t\t\t\t\t'CSRF-token': token\r\n\t\t\t\t},\r\n\t\t\t});\r\n\t\t\tconst resultado = await response.json();\r\n\r\n\t\t\tif (resultado) {\r\n\t\t\t\tif (e.target.classList.contains(\"bg-yellow-100\")) {\r\n\t\t\t\t\te.target.classList.remove(\"bg-yellow-100\", \"text-yellow-800\");\r\n\t\t\t\t\te.target.classList.add(\"bg-green-100\", \"text-green-800\");\r\n\t\t\t\t\te.target.textContent = \"Publicado\";\r\n\t\t\t\t} else {\r\n\t\t\t\t\te.target.classList.remove(\"bg-green-100\", \"text-green-800\");\r\n\t\t\t\t\te.target.classList.add(\"bg-yellow-100\", \"text-yellow-800\");\r\n\t\t\t\t\te.target.textContent = \"No publicado\";\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t} catch (error) {\r\n\t\t\tconsole.log(error);\r\n\t\t}\r\n\t}\r\n})();\n\n//# sourceURL=webpack://proyecto_node_js/./src/js/cambiarEstado.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;