"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/account/login";
exports.ids = ["pages/api/account/login"];
exports.modules = {

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "(api)/./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_URL\": () => (/* binding */ API_URL)\n/* harmony export */ });\nconst API_URL = \"http://server:8080\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvY29uZmlnL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxPQUFPLEdBQUdDLG9CQUErQiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbmZpZy9pbmRleC5qcz8zM2E2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTFxuIl0sIm5hbWVzIjpbIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/config/index.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/account/login.js":
/*!****************************************!*\
  !*** ./src/pages/api/account/login.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/index */ \"(api)/./src/config/index.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    if (req.method === \"POST\") {\n        const { username , password  } = req.body;\n        const body = JSON.stringify({\n            username,\n            password\n        });\n        try {\n            const apiRes = await fetch(`${_config_index__WEBPACK_IMPORTED_MODULE_1__.API_URL}/api/login`, {\n                method: \"POST\",\n                headers: {\n                    \"Accept\": \"application/json\",\n                    \"Content-Type\": \"application/json\"\n                },\n                body: body\n            });\n            const data = await apiRes.json();\n            if (apiRes.status === 200) {\n                res.setHeader(\"Set-Cookie\", [\n                    cookie__WEBPACK_IMPORTED_MODULE_0___default().serialize(\"access\", data.access, {\n                        httpOnly: true,\n                        secure: \"development\" !== \"prod\",\n                        maxAge: 60 * 30,\n                        sameSite: \"strict\",\n                        path: \"/api/\"\n                    }),\n                    cookie__WEBPACK_IMPORTED_MODULE_0___default().serialize(\"refresh\", data.refresh, {\n                        httpOnly: true,\n                        secure: \"development\" !== \"prod\",\n                        maxAge: 60 * 60 * 24,\n                        sameSite: \"strict\",\n                        path: \"/api/\"\n                    })\n                ]);\n                return res.status(200).json({\n                    success: \"Logged in successfully\"\n                });\n            } else {\n                return res.status(apiRes.status).json({\n                    error: \"Authentication failed\"\n                });\n            }\n        } catch (err) {\n            return res.status(500).json({\n                error: \"Something went wrong when authenticating\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"POST\"\n        ]);\n        return res.status(405).json({\n            error: `Method ${req.method} now allowed`\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvbG9naW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE0QjtBQUNvQjtBQUdoRCxpRUFBZSxPQUFPRSxHQUFHLEVBQUVDLEdBQUcsR0FBSztJQUMvQixJQUFJRCxHQUFHLENBQUNFLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDdkIsTUFBTSxFQUFFQyxRQUFRLEdBQUVDLFFBQVEsR0FBRSxHQUFHSixHQUFHLENBQUNLLElBQUk7UUFFdkMsTUFBTUEsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQVMsQ0FBQztZQUN4QkosUUFBUTtZQUNSQyxRQUFRO1NBQ1gsQ0FBQztRQUVGLElBQUk7WUFDQSxNQUFNSSxNQUFNLEdBQUcsTUFBTUMsS0FBSyxDQUFDLENBQUMsRUFBRVYsa0RBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDL0NHLE1BQU0sRUFBRSxNQUFNO2dCQUNkUSxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0RMLElBQUksRUFBRUEsSUFBSTthQUNiLENBQUM7WUFFRixNQUFNTSxJQUFJLEdBQUcsTUFBTUgsTUFBTSxDQUFDSSxJQUFJLEVBQUU7WUFFaEMsSUFBSUosTUFBTSxDQUFDSyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN2QlosR0FBRyxDQUFDYSxTQUFTLENBQUMsWUFBWSxFQUFFO29CQUN4QmhCLHVEQUFnQixDQUNaLFFBQVEsRUFBRWEsSUFBSSxDQUFDSyxNQUFNLEVBQUU7d0JBQ25CQyxRQUFRLEVBQUUsSUFBSTt3QkFDZEMsTUFBTSxFQUFFQyxhQUFvQixLQUFLLE1BQU07d0JBQ3ZDRyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7d0JBQ2ZDLFFBQVEsRUFBRSxRQUFRO3dCQUNsQkMsSUFBSSxFQUFFLE9BQU87cUJBQ2hCLENBQ0o7b0JBQ0QxQix1REFBZ0IsQ0FDWixTQUFTLEVBQUVhLElBQUksQ0FBQ2MsT0FBTyxFQUFFO3dCQUNyQlIsUUFBUSxFQUFFLElBQUk7d0JBQ2RDLE1BQU0sRUFBRUMsYUFBb0IsS0FBSyxNQUFNO3dCQUN2Q0csTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTt3QkFDcEJDLFFBQVEsRUFBRSxRQUFRO3dCQUNsQkMsSUFBSSxFQUFFLE9BQU87cUJBQ2hCLENBQ0o7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILE9BQU92QixHQUFHLENBQUNZLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0QsSUFBSSxDQUFDO29CQUN4QmMsT0FBTyxFQUFFLHdCQUF3QjtpQkFDcEMsQ0FBQyxDQUFDO1lBQ1AsT0FBTztnQkFDSCxPQUFPekIsR0FBRyxDQUFDWSxNQUFNLENBQUNMLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUNELElBQUksQ0FBQztvQkFDbENlLEtBQUssRUFBRSx1QkFBdUI7aUJBQ2pDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxFQUFFLE9BQU1DLEdBQUcsRUFBRTtZQUNULE9BQU8zQixHQUFHLENBQUNZLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0QsSUFBSSxDQUFDO2dCQUN4QmUsS0FBSyxFQUFFLDBDQUEwQzthQUNwRCxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsT0FBTztRQUNIMUIsR0FBRyxDQUFDYSxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQUMsTUFBTTtTQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPYixHQUFHLENBQUNZLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0QsSUFBSSxDQUFDO1lBQUVlLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRTNCLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksQ0FBQztTQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0FBQ0wsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvbG9naW4uanM/Mzc2YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29va2llIGZyb20gJ2Nvb2tpZSc7XG5pbXBvcnQgeyBBUElfVVJMIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL2luZGV4JztcblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcblxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZFxuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYXBpUmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL2xvZ2luYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IGJvZHlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgYXBpUmVzLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGFwaVJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ1NldC1Db29raWUnLCBbXG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZS5zZXJpYWxpemUoXG4gICAgICAgICAgICAgICAgICAgICAgICAnYWNjZXNzJywgZGF0YS5hY2Nlc3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4QWdlOiA2MCAqIDMwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbWVTaXRlOiAnc3RyaWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnL2FwaS8nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZS5zZXJpYWxpemUoXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVmcmVzaCcsIGRhdGEucmVmcmVzaCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1lU2l0ZTogJ3N0cmljdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJy9hcGkvJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAnTG9nZ2VkIGluIHN1Y2Nlc3NmdWxseSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoYXBpUmVzLnN0YXR1cykuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAnQXV0aGVudGljYXRpb24gZmFpbGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gYXV0aGVudGljYXRpbmcnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ0FsbG93JywgWydQT1NUJ10pO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogYE1ldGhvZCAke3JlcS5tZXRob2R9IG5vdyBhbGxvd2VkYCB9KTtcbiAgICB9IFxufTsiXSwibmFtZXMiOlsiY29va2llIiwiQVBJX1VSTCIsInJlcSIsInJlcyIsIm1ldGhvZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFwaVJlcyIsImZldGNoIiwiaGVhZGVycyIsImRhdGEiLCJqc29uIiwic3RhdHVzIiwic2V0SGVhZGVyIiwic2VyaWFsaXplIiwiYWNjZXNzIiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJtYXhBZ2UiLCJzYW1lU2l0ZSIsInBhdGgiLCJyZWZyZXNoIiwic3VjY2VzcyIsImVycm9yIiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/account/login.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/account/login.js"));
module.exports = __webpack_exports__;

})();