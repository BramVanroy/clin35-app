"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_campus-map_campus-map_module_ts"],{

/***/ 6413:
/*!***************************************************************!*\
  !*** ./src/app/pages/campus-map/campus-map-routing.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CampusMapPageRoutingModule: () => (/* binding */ CampusMapPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _campus_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./campus-map */ 5936);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
var _CampusMapPageRoutingModule;




const routes = [{
  path: '',
  component: _campus_map__WEBPACK_IMPORTED_MODULE_0__.CampusMapPage
}];
class CampusMapPageRoutingModule {}
_CampusMapPageRoutingModule = CampusMapPageRoutingModule;
_CampusMapPageRoutingModule.ɵfac = function CampusMapPageRoutingModule_Factory(t) {
  return new (t || _CampusMapPageRoutingModule)();
};
_CampusMapPageRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _CampusMapPageRoutingModule
});
_CampusMapPageRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CampusMapPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 8068:
/*!*******************************************************!*\
  !*** ./src/app/pages/campus-map/campus-map.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CampusMapModule: () => (/* binding */ CampusMapModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 1507);
/* harmony import */ var _campus_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./campus-map */ 5936);
/* harmony import */ var _campus_map_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./campus-map-routing.module */ 6413);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var _CampusMapModule;





class CampusMapModule {}
_CampusMapModule = CampusMapModule;
_CampusMapModule.ɵfac = function CampusMapModule_Factory(t) {
  return new (t || _CampusMapModule)();
};
_CampusMapModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _CampusMapModule
});
_CampusMapModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _campus_map_routing_module__WEBPACK_IMPORTED_MODULE_1__.CampusMapPageRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CampusMapModule, {
    declarations: [_campus_map__WEBPACK_IMPORTED_MODULE_0__.CampusMapPage],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _campus_map_routing_module__WEBPACK_IMPORTED_MODULE_1__.CampusMapPageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_campus-map_campus-map_module_ts.js.map