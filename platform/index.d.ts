import { Injector, Provider } from '@hwy-fm/di';
export declare class ExpressServerPlatform {
    private port;
    private platformInjector;
    constructor(port: number, platformInjector: Injector);
    bootstrapStart(providers?: Provider[]): Promise<void>;
    private beforeBootstrapStart;
    private runStart;
    private listen;
}
