"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterManager = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var express_1 = tslib_1.__importStar(require("express"));
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
    RouterManager.prototype.methodParams = function (type, method, agent) {
        var annotations = di_1.reflectCapabilities.getParamAnnotations(type, method);
        return function (req, res, next) {
            var ctx = req.__fmCtx__;
            return agent.apply(void 0, ctx ? ctx.injectArgs(annotations, req, res, next) : [req, res, next]);
        };
    };
    RouterManager.prototype.createRouter = function (type, cls, options) {
        var _this = this;
        var map = new Map();
        var _a = type.__methods__, __methods__ = _a === void 0 ? [] : _a;
        var router = (0, express_1.Router)(options);
        __methods__.forEach(function (methodMetadata) {
            var _a;
            var descriptor = methodMetadata.descriptor, method = methodMetadata.method, _b = methodMetadata.annotationInstance, url = _b.url, middleware = _b.middleware, metadataName = _b.metadataName;
            if (!map.has(descriptor)) {
                map.set(descriptor, _this.methodParams(type, method, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return descriptor.value.apply(cls, args);
                }));
            }
            if (metadataName === constant_1.RequestMethod.middleware)
                return map.get(descriptor)(router);
            if (metadataName === constant_1.RequestMethod[metadataName]) {
                var params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                (_a = router[metadataName]).call.apply(_a, tslib_1.__spreadArray([router], params.concat.apply(params, tslib_1.__spreadArray(tslib_1.__spreadArray([], middleware, false), [map.get(descriptor)], false)), false));
            }
        });
        map.clear();
        return router;
    };
    RouterManager.prototype.register = function (_module, controller) {
        var cls = this.injector.get(controller);
        var metadata = di_1.reflectCapabilities.getAnnotation(controller, constant_1.CONTROLLER);
        if (metadata) {
            var baseUrl = metadata.baseUrl, options = metadata.options.options;
            var _options = typeObject(baseUrl) ? baseUrl : options;
            var router = this.createRouter(controller, cls, _options);
            Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
            typeString(baseUrl) ? this.app.use(replaceUrl(baseUrl), router) : this.app.use(router);
        }
        return cls;
    };
    tslib_1.__decorate([
        (0, di_1.Prop)(express_1.default),
        tslib_1.__metadata("design:type", Function)
    ], RouterManager.prototype, "app", void 0);
    tslib_1.__decorate([
        (0, di_1.Prop)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], RouterManager.prototype, "injector", void 0);
    RouterManager = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], RouterManager);
    return RouterManager;
}());
exports.RouterManager = RouterManager;
