import { __awaiter } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@hwy-fm/core/token';
import { Injector } from '@hwy-fm/di';
import express from 'express';
import { createServer } from 'http';
import { HTTP_SERVER } from '../token';
export class ExpressServerPlatform {
    constructor(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    bootstrapStart() {
        return __awaiter(this, arguments, void 0, function* (providers = []) {
            const injector = this.beforeBootstrapStart(providers);
            yield this.runStart(injector);
            this.listen(injector);
        });
    }
    beforeBootstrapStart(providers = []) {
        return Injector.create([
            { provide: express, useFactory: () => express() },
            { provide: HTTP_SERVER, useFactory: createServer, deps: [express] },
            providers
        ], this.platformInjector);
    }
    runStart(injector) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const application = yield injector.get(APPLICATION_TOKEN);
            return (_a = application.main) === null || _a === void 0 ? void 0 : _a.call(application, injector);
        });
    }
    listen(injector) {
        const server = injector.get(HTTP_SERVER);
        const { port = this.port } = injector.get(APPLICATION_METADATA) || {};
        global.hotHttpHost = `http://localhost:${port}/`;
        global.hotHttpServer = server.listen(port, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
