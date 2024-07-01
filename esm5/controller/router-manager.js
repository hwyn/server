import { __awaiter, __decorate, __generator, __metadata, __spreadArray } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, MethodProxy, reflectCapabilities } from '@hwy-fm/di';
import express, { Router } from 'express';
import { get } from 'lodash';
import { CONTROLLER, RequestMethod } from './constant';
function type(typeName) {
    return function (obj) { return Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName; };
}
var typeString = type('string');
var typeObject = type('object');
var replaceUrl = function (url) { return "/".concat(url).replace(/[\\/]+/g, '/'); };
var RouterManager = /** @class */ (function () {
    function RouterManager() {
    }
    RouterManager.prototype.checkRouterMethod = function (metadataName) {
        return metadataName !== RequestMethod[metadataName] || metadataName === RequestMethod.requestCustom;
    };
    RouterManager.prototype.methodParams = function (type, method, cls, descriptor) {
        var _this = this;
        var agent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return descriptor.value.apply(cls, args);
        };
        var annotations = reflectCapabilities.getParamAnnotations(type, method);
        var methodAnnotations = reflectCapabilities.getMethodAnnotations(type, method)
            .filter(function (_a) {
            var metadataName = _a.annotationInstance.metadataName;
            return _this.checkRouterMethod(metadataName);
        });
        var _agent = this.mp.createAgent(annotations, methodAnnotations, agent);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return _agent.apply(void 0, __spreadArray([resolve], args, false)); })];
            }); });
        };
    };
    RouterManager.prototype.createAgent = function (metadataName, agent) {
        var _this = this;
        if (metadataName === RequestMethod.middleware)
            return agent;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, agent(req, res, next)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    RouterManager.prototype.createRouter = function (type, cls, options) {
        return __awaiter(this, void 0, void 0, function () {
            var map, router, _i, _a, _b, descriptor, method, _c, url, middleware, metadataName, params;
            var _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        map = new Map();
                        router = Router(options);
                        _i = 0, _a = (_e = type.__methods__) !== null && _e !== void 0 ? _e : [];
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        _b = _a[_i], descriptor = _b.descriptor, method = _b.method, _c = _b.annotationInstance, url = _c.url, middleware = _c.middleware, metadataName = _c.metadataName;
                        if (this.checkRouterMethod(metadataName))
                            return [3 /*break*/, 4];
                        if (!map.has(method)) {
                            map.set(method, this.createAgent(metadataName, this.methodParams(type, method, cls, descriptor)));
                        }
                        if (!(metadataName === RequestMethod.middleware)) return [3 /*break*/, 3];
                        return [4 /*yield*/, map.get(method)(router)];
                    case 2:
                        _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                        (_d = get(router, metadataName)).call.apply(_d, __spreadArray([router], params.concat.apply(params, __spreadArray(__spreadArray([], middleware, false), [map.get(method)], false)), false));
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, router];
                }
            });
        });
    };
    RouterManager.prototype.register = function (_module, controller) {
        return __awaiter(this, void 0, void 0, function () {
            var cls, metadata, baseUrl, options, _options, router;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.injector.get(controller);
                        metadata = reflectCapabilities.getAnnotation(controller, CONTROLLER);
                        if (!metadata) return [3 /*break*/, 2];
                        baseUrl = metadata.baseUrl, options = metadata.options.options;
                        _options = typeObject(baseUrl) ? baseUrl : options;
                        return [4 /*yield*/, this.createRouter(controller, cls, _options)];
                    case 1:
                        router = _a.sent();
                        Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
                        typeString(baseUrl) ? this.app.use(replaceUrl(baseUrl), router) : this.app.use(router);
                        _a.label = 2;
                    case 2: return [2 /*return*/, cls];
                }
            });
        });
    };
    __decorate([
        Inject(express),
        __metadata("design:type", Function)
    ], RouterManager.prototype, "app", void 0);
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], RouterManager.prototype, "injector", void 0);
    __decorate([
        Inject(MethodProxy),
        __metadata("design:type", MethodProxy)
    ], RouterManager.prototype, "mp", void 0);
    RouterManager = __decorate([
        Injectable()
    ], RouterManager);
    return RouterManager;
}());
export { RouterManager };
