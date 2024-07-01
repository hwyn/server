import { Injector, MethodProxy, Type } from '@hwy-fm/di';
import { Express, NextFunction, RouterOptions } from 'express';
import { FmContext } from './context';
export type ControllerOptions = {
    options?: RouterOptions;
};
export type MethodHookFunc = (metadata: any, ctx: FmContext, next: NextFunction) => any;
export declare class RouterManager {
    app: Express;
    injector: Injector;
    mp: MethodProxy;
    private checkRouterMethod;
    private methodParams;
    private createAgent;
    private createRouter;
    register(_module: any, controller: Type): Promise<any>;
}
