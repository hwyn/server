import { InjectorToken } from '@hwy-fm/di';
export const CONTROLLER_MODULE = 'ControllerModel';
export const CONTROLLER = 'Controller';
export var RouterParams;
(function (RouterParams) {
    RouterParams["ip"] = "ip";
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["body"] = "body";
    RouterParams["query"] = "query";
    RouterParams["params"] = "params";
    RouterParams["headers"] = "headers";
    RouterParams["routerCustom"] = "routerCustom";
})(RouterParams || (RouterParams = {}));
export var RequestMethod;
(function (RequestMethod) {
    RequestMethod["post"] = "post";
    RequestMethod["get"] = "get";
    RequestMethod["delete"] = "delete";
    RequestMethod["put"] = "put";
    RequestMethod["all"] = "all";
    RequestMethod["options"] = "options";
    RequestMethod["param"] = "param";
    RequestMethod["use"] = "use";
    RequestMethod["middleware"] = "middleware";
    RequestMethod["requestCustom"] = "requestCustom";
})(RequestMethod || (RequestMethod = {}));
export const MODULE_QUEUE = InjectorToken.get('MODULE_QUEUE');
