"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const component_1 = require("./component");
const directive_1 = require("./directive");
const list = [
    component_1.AceEditorComponent,
    directive_1.AceEditorDirective
];
let AceEditorModule = class AceEditorModule {
};
AceEditorModule = __decorate([
    core_1.NgModule({
        declarations: [
            ...list
        ],
        imports: [],
        providers: [],
        exports: list
    })
], AceEditorModule);
exports.AceEditorModule = AceEditorModule;
//# sourceMappingURL=module.js.map
