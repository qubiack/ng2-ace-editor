"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AceEditorModule = void 0;

var _core = require("@angular/core");

var _component = require("./component");

var _directive = require("./directive");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var list = [_component.AceEditorComponent, _directive.AceEditorDirective];

var AceEditorModule =
    /** @class */
    function () {
        function AceEditorModule() {}

        AceEditorModule = __decorate([(0, _core.NgModule)({
            declarations: list.slice(),
            imports: [],
            providers: [],
            exports: list
        })], AceEditorModule);
        return AceEditorModule;
    }();

exports.AceEditorModule = AceEditorModule;
