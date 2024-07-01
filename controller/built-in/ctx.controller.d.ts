import { Injector } from '@hwy-fm/di';
import { NextFunction, Request, Response } from 'express';
export declare class Ctx {
    injector: Injector;
    createCtx(req: Request, res: Response, next: NextFunction): void;
}
