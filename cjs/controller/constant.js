"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMethod = exports.RouterParams = exports.CONTROLLER = exports.CONTROLLER_MODULE = void 0;
exports.CONTROLLER_MODULE = 'ControllerModel';
exports.CONTROLLER = 'Controller';
var RouterParams;
(function (RouterParams) {
    RouterParams["ip"] = "ip";
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["body"] = "body";
    RouterParams["query"] = "query";
    RouterParams["params"] = "params";
    RouterParams["headers"] = "headers";
    RouterParams["custom"] = "custom";
})(RouterParams = exports.RouterParams || (exports.RouterParams = {}));
var RequestMethod;
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
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
