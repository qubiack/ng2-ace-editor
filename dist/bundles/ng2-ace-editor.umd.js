(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	Object.defineProperty(exports, "__esModule", { value: true });
	var directive_1 = require("./src/directive");
	exports.AceEditorDirective = directive_1.AceEditorDirective;
	var component_1 = require("./src/component");
	exports.AceEditorComponent = component_1.AceEditorComponent;
	var module_1 = require("./src/module");
	exports.AceEditorModule = module_1.AceEditorModule;

}));
