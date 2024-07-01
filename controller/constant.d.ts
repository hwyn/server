import { InjectorToken } from '@hwy-fm/di';
export declare const CONTROLLER_MODULE = "ControllerModel";
export declare const CONTROLLER = "Controller";
export declare enum RouterParams {
    ip = "ip",
    req = "req",
    res = "res",
    next = "next",
    body = "body",
    query = "query",
    params = "params",
    headers = "headers",
    routerCustom = "routerCustom"
}
export declare enum RequestMethod {
    post = "post",
    get = "get",
    delete = "delete",
    put = "put",
    all = "all",
    options = "options",
    param = "param",
    use = "use",
    middleware = "middleware",
    requestCustom = "requestCustom"
}
export declare const MODULE_QUEUE: InjectorToken;
