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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n\tconst lat = 4.8143;\r\n\tconst lng = -75.6946;\r\n\tconst mapa = L.map('mapa-inicio').setView([lat, lng], 13);\r\n\r\n\tlet markers = new L.FeatureGroup().addTo(mapa);\r\n\tlet propiedades = [];\r\n\r\n\t//filtros\r\n\tconst filtros = {\r\n\t\tcategoria: '',\r\n\t\tprecio: '',\r\n\t};\r\n\r\n\tconst categoriaSelect = document.getElementById(\"categoria\");\r\n\tconst precioSelect = document.getElementById(\"precio\");\r\n\r\n\tL.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n\t\tattribution:\r\n\t\t\t'&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\r\n\t}).addTo(mapa);\r\n\r\n\t//filtrado de categorias y precios\r\n\tcategoriaSelect.addEventListener(\"change\", (e) => {\r\n\t\tfiltros.categoria = Number(e.target.value);\r\n\t\tfiltrarPropiedades();\r\n\t});\r\n\r\n\tprecioSelect.addEventListener(\"change\", (e) => {\r\n\t\tfiltros.precio = Number(e.target.value);\r\n\t\tfiltrarPropiedades();\r\n\t});\r\n\r\n\tconst getPropiedades = async () => {\r\n\t\ttry {\r\n\t\t\tconst url = await fetch(\"/api/propiedades\");\r\n\t\t\tpropiedades = await url.json();\r\n\t\t\tmostrarPropiedades(propiedades);\r\n\t\t} catch (error) {\r\n\t\t\tconsole.log(error);\r\n\t\t}\r\n\t};\r\n\r\n\tconst mostrarPropiedades = (propiedades) => {\r\n\t\t//limpiar los markers previos\r\n\t\tmarkers.clearLayers();\r\n\r\n\r\n\t\tpropiedades.forEach((propiedad) => {\r\n\t\t\t//agregar los pines\r\n\t\t\tconst marker = new L.marker([propiedad?.lat, propiedad?.lng], {\r\n\t\t\t\tautoPan: true,\r\n\t\t\t}).addTo(mapa).bindPopup(`\r\n\t\t\t\t\t\t<h1 class=\"font-extrabold mb-2\">${propiedad?.titulo}</h1>\r\n\t\t\t\t\t\t<img class=\"w-40 h-40 object-cover\" src=\"/uploads/${propiedad?.imagen}\" alt=\"${propiedad?.titulo}\">\r\n\t\t\t\t\t\t<p class=\"text-gray-700\">Categoría: ${propiedad?.categoria.nombre}</p>\r\n\t\t\t\t\t\t<p class=\"text-gray-700\">Precio: $${propiedad?.precio.nombre}</p>\r\n\t\t\t\t\t\t<p class=\"text-gray-700\">${propiedad?.calle}</p>\r\n\t\t\t\t\t\t<a href=\"/propiedad/${propiedad.id}\" class=\"bg-indigo-600 block text-white text-center p-2 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer font-bold\">Ver propiedad</a>\r\n\t\t\t\t`);\r\n\r\n\t\t\t\tmarkers.addLayer(marker);\r\n\t\t});\r\n\t};\r\n\r\n\tconst filtrarPropiedades = () => {\r\n\t\tconst resultado = propiedades\r\n\t\t\t.filter(filtrarCategoria)\r\n\t\t\t.filter(filtrarPrecio);\r\n\t\tmostrarPropiedades(resultado);\r\n\t};\r\n\r\n\tconst filtrarCategoria = (propiedad) => {\r\n\t\tif (filtros.categoria) {\r\n\t\t\treturn propiedad.categoriaId === filtros.categoria;\r\n\t\t}\r\n    console.log(propiedad);\r\n\t\treturn propiedad;\r\n\t};\r\n\r\n\tconst filtrarPrecio = (propiedad) => {\r\n\t\tif (filtros.precio) {\r\n\t\t\treturn propiedad.precioId === filtros.precio;\r\n\t\t}\r\n    console.log(propiedad);\r\n    return propiedad;\r\n\t};\r\n\r\n\tgetPropiedades();\r\n})();\r\n\n\n//# sourceURL=webpack://proyecto_node_js/./src/js/mapaInicio.js?");

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
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;