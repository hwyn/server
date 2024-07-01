import { createRegisterLoader } from '@hwy-fm/core/platform/decorator';
import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@hwy-fm/di';
import { CONTROLLER, CONTROLLER_MODULE, MODULE_QUEUE, RequestMethod, RouterParams } from './constant';
const registerControlModel = createRegisterLoader(MODULE_QUEUE);
function getCtx(req) {
    return req.__fmCtx__;
}
function paramsTransform(annotation, data, ...[req, , next]) {
    return getCtx(req).getParamByMetadata(annotation, data, next);
}
function proxyMethodHook(hook) {
    return (annotation, ...[req, , next]) => hook(annotation, getCtx(req), next);
}
const moduleProps = (options) => (Object.assign({}, options));
const paramsProps = (key) => ({ key, transform: paramsTransform });
const middlewareProps = (...middleware) => ({ middleware });
const methodProps = (url, ...middleware) => ({ url, middleware });
const useProps = (url, ...middleware) => ({ url, middleware });
const controllerProps = (baseUrl, options = {}) => ({ baseUrl, options });
export const Controller = makeDecorator(CONTROLLER, controllerProps, setInjectableDef);
export const ControllerModel = makeDecorator(CONTROLLER_MODULE, moduleProps, (type) => registerControlModel(setInjectableDef(type)));
export const Get = makeMethodDecorator(RequestMethod.get, methodProps);
export const All = makeMethodDecorator(RequestMethod.all, methodProps);
export const Use = makeMethodDecorator(RequestMethod.use, useProps);
export const Put = makeMethodDecorator(RequestMethod.put, methodProps);
export const Post = makeMethodDecorator(RequestMethod.post, methodProps);
export const Param = makeMethodDecorator(RequestMethod.param, methodProps);
export const Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export const Options = makeMethodDecorator(RequestMethod.options, methodProps);
export const Middleware = makeMethodDecorator(RequestMethod.middleware, middlewareProps);
export const makeRouteMethodDecorator = (hook) => {
    return makeMethodDecorator(RequestMethod.requestCustom, (options) => (Object.assign({ hook: proxyMethodHook(hook) }, options)));
};
export const Ip = makeParamDecorator(RouterParams.ip, paramsProps);
export const Req = makeParamDecorator(RouterParams.req, paramsProps);
export const Res = makeParamDecorator(RouterParams.res, paramsProps);
export const Next = makeParamDecorator(RouterParams.next, paramsProps);
export const Body = makeParamDecorator(RouterParams.body, paramsProps);
export const Query = makeParamDecorator(RouterParams.query, paramsProps);
export const Params = makeParamDecorator(RouterParams.params, paramsProps);
export const Headers = makeParamDecorator(RouterParams.headers, paramsProps);
export const makeRouteParamsDecorator = (transform) => {
    return makeParamDecorator(RouterParams.routerCustom, (options) => (Object.assign({ transform }, options)));
};
