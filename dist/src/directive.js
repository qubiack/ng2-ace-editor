"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AceEditorDirective = void 0;

var _core = require("@angular/core");

require("brace");

require("brace/theme/monokai");

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

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AceEditorDirective =
    /** @class */
    function () {
        function AceEditorDirective(elementRef, zone) {
            var _this = this;

            this.zone = zone;
            this.textChanged = new _core.EventEmitter();
            this.textChange = new _core.EventEmitter();
            this._options = {};
            this._readOnly = false;
            this._theme = "monokai";
            this._mode = "html";
            this._autoUpdateContent = true;
            this._durationBeforeCallback = 0;
            this._text = "";
            var el = elementRef.nativeElement;
            this.zone.runOutsideAngular(function () {
                _this.editor = ace["edit"](el);
            });
            this.editor.$blockScrolling = Infinity;
        }

        AceEditorDirective.prototype.ngOnInit = function () {
            this.init();
            this.initEvents();
        };

        AceEditorDirective.prototype.ngOnDestroy = function () {
            this.editor.destroy();
        };

        AceEditorDirective.prototype.init = function () {
            this.editor.setOptions(this._options || {});
            this.editor.setTheme("ace/theme/" + this._theme);
            this.setMode(this._mode);
            this.editor.setReadOnly(this._readOnly);
        };

        AceEditorDirective.prototype.initEvents = function () {
            var _this = this;

            this.editor.on('change', function () {
                return _this.updateText();
            });
            this.editor.on('paste', function () {
                return _this.updateText();
            });
        };

        AceEditorDirective.prototype.updateText = function () {
            var _this = this;

            var newVal = this.editor.getValue();

            if (newVal === this.oldText) {
                return;
            }

            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.zone.run(function () {
                    _this.textChange.emit(newVal);

                    _this.textChanged.emit(newVal);
                });
            } else {
                if (this.timeoutSaving != null) {
                    clearTimeout(this.timeoutSaving);
                }

                this.timeoutSaving = setTimeout(function () {
                    _this._text = newVal;

                    _this.zone.run(function () {
                        _this.textChange.emit(newVal);

                        _this.textChanged.emit(newVal);
                    });

                    _this.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }

            this.oldText = newVal;
        };

        Object.defineProperty(AceEditorDirective.prototype, "options", {
            set: function set(options) {
                this._options = options;
                this.editor.setOptions(options || {});
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditorDirective.prototype, "readOnly", {
            set: function set(readOnly) {
                this._readOnly = readOnly;
                this.editor.setReadOnly(readOnly);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditorDirective.prototype, "theme", {
            set: function set(theme) {
                this._theme = theme;
                this.editor.setTheme("ace/theme/" + theme);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditorDirective.prototype, "mode", {
            set: function set(mode) {
                this.setMode(mode);
            },
            enumerable: true,
            configurable: true
        });

        AceEditorDirective.prototype.setMode = function (mode) {
            this._mode = mode;

            if (_typeof(this._mode) === 'object') {
                this.editor.getSession().setMode(this._mode);
            } else {
                this.editor.getSession().setMode("ace/mode/" + this._mode);
            }
        };

        Object.defineProperty(AceEditorDirective.prototype, "text", {
            get: function get() {
                return this._text;
            },
            set: function set(text) {
                this.setText(text);
            },
            enumerable: true,
            configurable: true
        });

        AceEditorDirective.prototype.setText = function (text) {
            if (this._text !== text) {
                if (text === null || text === undefined) {
                    text = "";
                }

                if (this._autoUpdateContent === true) {
                    this._text = text;
                    this.editor.setValue(text);
                    this.editor.clearSelection();
                }
            }
        };

        Object.defineProperty(AceEditorDirective.prototype, "autoUpdateContent", {
            set: function set(status) {
                this._autoUpdateContent = status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceEditorDirective.prototype, "durationBeforeCallback", {
            set: function set(num) {
                this.setDurationBeforeCallback(num);
            },
            enumerable: true,
            configurable: true
        });

        AceEditorDirective.prototype.setDurationBeforeCallback = function (num) {
            this._durationBeforeCallback = num;
        };

        Object.defineProperty(AceEditorDirective.prototype, "aceEditor", {
            get: function get() {
                return this.editor;
            },
            enumerable: true,
            configurable: true
        });

        __decorate([(0, _core.Output)(), __metadata("design:type", Object)], AceEditorDirective.prototype, "textChanged", void 0);

        __decorate([(0, _core.Output)(), __metadata("design:type", Object)], AceEditorDirective.prototype, "textChange", void 0);

        __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AceEditorDirective.prototype, "options", null);

        __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AceEditorDirective.prototype, "readOnly", null);

        __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AceEditorDirective.prototype, "theme", null);

        __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AceEditorDirective.prototype, "mode", null);

        __decorate([(0, _core.Input)(), __metadata("design:type", String), __metadata("design:paramtypes", [String])], AceEditorDirective.prototype, "text", null);

        __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AceEditorDirective.prototype, "autoUpdateContent", null);

        __decorate([(0, _core.Input)(), __metadata("design:type", Number), __metadata("design:paramtypes", [Number])], AceEditorDirective.prototype, "durationBeforeCallback", null);

        AceEditorDirective = __decorate([(0, _core.Directive)({
            selector: '[ace-editor]'
        }), __metadata("design:paramtypes", [_core.ElementRef, _core.NgZone])], AceEditorDirective);
        return AceEditorDirective;
    }();

exports.AceEditorDirective = AceEditorDirective;
