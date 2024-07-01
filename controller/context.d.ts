import { Injector } from '@hwy-fm/di';
import { NextFunction, Request, Response } from 'express';
export interface FmContext {
    readonly injector: Injector;
    readonly req: Request;
    readonly res: Response;
}
export type hookFunc = (metadata: any, data: any, ctx: FmContext, next: NextFunction) => any;
export declare class Context implements FmContext {
    readonly injector: Injector;
    readonly req: Request;
    readonly res: Response;
    constructor(injector: Injector, req: Request, res: Response);
    private getObjectByKey;
    getParamByMetadata(metadata: any, data: any, next: NextFunction): any;
}
