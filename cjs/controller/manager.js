"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
require("./built-in/built-in.module");
var decorator_1 = require("@hwy-fm/core/platform/decorator");
var di_1 = require("@hwy-fm/di");
var constant_1 = require("./constant");
var router_manager_1 = require("./router-manager");
var ControllerManager = /** @class */ (function () {
    function ControllerManager() {
    }
    ControllerManager.prototype.sortByOrder = function (arr) {
        return arr.sort(function (item) { return item.__order__ || 0; });
    };
    ControllerManager.prototype.registerControllerModel = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, controller, module, _i, _b, control;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = di_1.reflectCapabilities.getAnnotation(type, constant_1.CONTROLLER_MODULE).controller, controller = _a === void 0 ? [] : _a;
                        module = this.injector.get(type);
                        _i = 0, _b = this.sortByOrder(controller);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        control = _b[_i];
                        return [4 /*yield*/, this.routerManager.register(module, control)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, module];
                }
            });
        });
    };
    ControllerManager.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, module_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.sortByOrder(this.injector.get(constant_1.MODULE_QUEUE) || []);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        module_1 = _a[_i];
                        return [4 /*yield*/, this.registerControllerModel(module_1)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], ControllerManager.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(router_manager_1.RouterManager),
        tslib_1.__metadata("design:type", router_manager_1.RouterManager)
    ], ControllerManager.prototype, "routerManager", void 0);
    ControllerManager = tslib_1.__decorate([
        (0, decorator_1.ApplicationPlugin)()
    ], ControllerManager);
    return ControllerManager;
}());
exports.ControllerManager = ControllerManager;
