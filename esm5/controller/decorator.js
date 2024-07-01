import { __assign } from "tslib";
import { createRegisterLoader } from '@hwy-fm/core/platform/decorator';
import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@hwy-fm/di';
import { CONTROLLER, CONTROLLER_MODULE, MODULE_QUEUE, RequestMethod, RouterParams } from './constant';
var registerControlModel = createRegisterLoader(MODULE_QUEUE);
function getCtx(req) {
    return req.__fmCtx__;
}
function paramsTransform(annotation, data) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var req = _a[0], next = _a[2];
    return getCtx(req).getParamByMetadata(annotation, data, next);
}
function proxyMethodHook(hook) {
    return function (annotation) {
        var _a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _a[_i - 1] = arguments[_i];
        }
        var req = _a[0], next = _a[2];
        return hook(annotation, getCtx(req), next);
    };
}
var moduleProps = function (options) { return (__assign({}, options)); };
var paramsProps = function (key) { return ({ key: key, transform: paramsTransform }); };
var middlewareProps = function () {
    var middleware = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middleware[_i] = arguments[_i];
    }
    return ({ middleware: middleware });
};
var methodProps = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
var useProps = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
var controllerProps = function (baseUrl, options) {
    if (options === void 0) { options = {}; }
    return ({ baseUrl: baseUrl, options: options });
};
export var Controller = makeDecorator(CONTROLLER, controllerProps, setInjectableDef);
export var ControllerModel = makeDecorator(CONTROLLER_MODULE, moduleProps, function (type) { return registerControlModel(setInjectableDef(type)); });
export var Get = makeMethodDecorator(RequestMethod.get, methodProps);
export var All = makeMethodDecorator(RequestMethod.all, methodProps);
export var Use = makeMethodDecorator(RequestMethod.use, useProps);
export var Put = makeMethodDecorator(RequestMethod.put, methodProps);
export var Post = makeMethodDecorator(RequestMethod.post, methodProps);
export var Param = makeMethodDecorator(RequestMethod.param, methodProps);
export var Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export var Options = makeMethodDecorator(RequestMethod.options, methodProps);
export var Middleware = makeMethodDecorator(RequestMethod.middleware, middlewareProps);
export var makeRouteMethodDecorator = function (hook) {
    return makeMethodDecorator(RequestMethod.requestCustom, function (options) { return (__assign({ hook: proxyMethodHook(hook) }, options)); });
};
export var Ip = makeParamDecorator(RouterParams.ip, paramsProps);
export var Req = makeParamDecorator(RouterParams.req, paramsProps);
export var Res = makeParamDecorator(RouterParams.res, paramsProps);
export var Next = makeParamDecorator(RouterParams.next, paramsProps);
export var Body = makeParamDecorator(RouterParams.body, paramsProps);
export var Query = makeParamDecorator(RouterParams.query, paramsProps);
export var Params = makeParamDecorator(RouterParams.params, paramsProps);
export var Headers = makeParamDecorator(RouterParams.headers, paramsProps);
export var makeRouteParamsDecorator = function (transform) {
    return makeParamDecorator(RouterParams.routerCustom, function (options) { return (__assign({ transform: transform }, options)); });
};
