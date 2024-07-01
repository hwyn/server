"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var di_1 = require("@hwy-fm/di");
var express_1 = tslib_1.__importStar(require("express"));
var lodash_1 = require("lodash");
var constant_1 = require("./constant");
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
        return metadataName !== constant_1.RequestMethod[metadataName] || metadataName === constant_1.RequestMethod.requestCustom;
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
        var annotations = di_1.reflectCapabilities.getParamAnnotations(type, method);
        var methodAnnotations = di_1.reflectCapabilities.getMethodAnnotations(type, method)
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
            return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return _agent.apply(void 0, tslib_1.__spreadArray([resolve], args, false)); })];
            }); });
        };
    };
    RouterManager.prototype.createAgent = function (metadataName, agent) {
        var _this = this;
        if (metadataName === constant_1.RequestMethod.middleware)
            return agent;
        return function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var map, router, _i, _a, _b, descriptor, method, _c, url, middleware, metadataName, params;
            var _d;
            var _e;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        map = new Map();
                        router = (0, express_1.Router)(options);
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
                        if (!(metadataName === constant_1.RequestMethod.middleware)) return [3 /*break*/, 3];
                        return [4 /*yield*/, map.get(method)(router)];
                    case 2:
                        _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                        (_d = (0, lodash_1.get)(router, metadataName)).call.apply(_d, tslib_1.__spreadArray([router], params.concat.apply(params, tslib_1.__spreadArray(tslib_1.__spreadArray([], middleware, false), [map.get(method)], false)), false));
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cls, metadata, baseUrl, options, _options, router;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.injector.get(controller);
                        metadata = di_1.reflectCapabilities.getAnnotation(controller, constant_1.CONTROLLER);
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
    tslib_1.__decorate([
        (0, di_1.Inject)(express_1.default),
        tslib_1.__metadata("design:type", Function)
    ], RouterManager.prototype, "app", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], RouterManager.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.MethodProxy),
        tslib_1.__metadata("design:type", di_1.MethodProxy)
    ], RouterManager.prototype, "mp", void 0);
    RouterManager = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], RouterManager);
    return RouterManager;
}());
exports.RouterManager = RouterManager;
