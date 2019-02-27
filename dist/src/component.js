"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var AceEditorComponent_1;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
require("@supermemo/brace");
require("@supermemo/brace/theme/monokai");
let AceEditorComponent = AceEditorComponent_1 = class AceEditorComponent {
    constructor(elementRef, zone) {
        this.zone = zone;
        this.textChanged = new core_1.EventEmitter();
        this.textChange = new core_1.EventEmitter();
        this.style = {};
        this._options = {};
        this._readOnly = false;
        this._theme = "monokai";
        this._mode = "html";
        this._autoUpdateContent = true;
        this._durationBeforeCallback = 0;
        this._text = "";
        this._onChange = (_) => {
        };
        this._onTouched = () => {
        };
        let el = elementRef.nativeElement;
        this.zone.runOutsideAngular(() => {
            this._editor = ace['edit'](el);
        });
        this._editor.$blockScrolling = Infinity;
    }
    ngOnInit() {
        this.init();
        this.initEvents();
    }
    ngOnDestroy() {
        this._editor.destroy();
    }
    init() {
        this.setOptions(this._options || {});
        this.setTheme(this._theme);
        this.setMode(this._mode);
        this.setReadOnly(this._readOnly);
    }
    initEvents() {
        this._editor.on('change', () => this.updateText());
        this._editor.on('paste', () => this.updateText());
    }
    updateText() {
        let newVal = this._editor.getValue();
        if (newVal === this.oldText) {
            return;
        }
        if (!this._durationBeforeCallback) {
            this._text = newVal;
            this.zone.run(() => {
                this.textChange.emit(newVal);
                this.textChanged.emit(newVal);
            });
            this._onChange(newVal);
        }
        else {
            if (this.timeoutSaving) {
                clearTimeout(this.timeoutSaving);
            }
            this.timeoutSaving = setTimeout(() => {
                this._text = newVal;
                this.zone.run(() => {
                    this.textChange.emit(newVal);
                    this.textChanged.emit(newVal);
                });
                this.timeoutSaving = null;
            }, this._durationBeforeCallback);
        }
        this.oldText = newVal;
    }
    set options(options) {
        this.setOptions(options);
    }
    setOptions(options) {
        this._options = options;
        this._editor.setOptions(options || {});
    }
    set readOnly(readOnly) {
        this.setReadOnly(readOnly);
    }
    setReadOnly(readOnly) {
        this._readOnly = readOnly;
        this._editor.setReadOnly(readOnly);
    }
    set theme(theme) {
        this.setTheme(theme);
    }
    setTheme(theme) {
        this._theme = theme;
        this._editor.setTheme(`ace/theme/${theme}`);
    }
    set mode(mode) {
        this.setMode(mode);
    }
    setMode(mode) {
        this._mode = mode;
        if (typeof this._mode === 'object') {
            this._editor.getSession().setMode(this._mode);
        }
        else {
            this._editor.getSession().setMode(`ace/mode/${this._mode}`);
        }
    }
    get value() {
        return this.text;
    }
    set value(value) {
        this.setText(value);
    }
    writeValue(value) {
        this.setText(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this.setText(text);
    }
    setText(text) {
        if (text === null || text === undefined) {
            text = "";
        }
        if (this._text !== text && this._autoUpdateContent === true) {
            this._text = text;
            this._editor.setValue(text);
            this._onChange(text);
            this._editor.clearSelection();
        }
    }
    set autoUpdateContent(status) {
        this.setAutoUpdateContent(status);
    }
    setAutoUpdateContent(status) {
        this._autoUpdateContent = status;
    }
    set durationBeforeCallback(num) {
        this.setDurationBeforeCallback(num);
    }
    setDurationBeforeCallback(num) {
        this._durationBeforeCallback = num;
    }
    getEditor() {
        return this._editor;
    }
};
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AceEditorComponent.prototype, "textChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AceEditorComponent.prototype, "textChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AceEditorComponent.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AceEditorComponent.prototype, "options", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AceEditorComponent.prototype, "readOnly", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AceEditorComponent.prototype, "theme", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AceEditorComponent.prototype, "mode", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AceEditorComponent.prototype, "value", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AceEditorComponent.prototype, "text", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AceEditorComponent.prototype, "autoUpdateContent", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], AceEditorComponent.prototype, "durationBeforeCallback", null);
AceEditorComponent = AceEditorComponent_1 = __decorate([
    core_1.Component({
        selector: 'ace-editor',
        template: '',
        styles: [':host { display:block;width:100%; }'],
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => AceEditorComponent_1),
                multi: true
            }]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], AceEditorComponent);
exports.AceEditorComponent = AceEditorComponent;
//# sourceMappingURL=component.js.map
