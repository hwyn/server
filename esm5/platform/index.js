import { __awaiter, __generator } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@hwy-fm/core/token';
import { Injector } from '@hwy-fm/di';
import express from 'express';
import { createServer } from 'http';
import { HTTP_SERVER } from '../token';
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function () {
        return __awaiter(this, arguments, void 0, function (providers) {
            var injector;
            if (providers === void 0) { providers = []; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        injector = this.beforeBootstrapStart(providers);
                        return [4 /*yield*/, this.runStart(injector)];
                    case 1:
                        _a.sent();
                        this.listen(injector);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return Injector.create([
            { provide: express, useFactory: function () { return express(); } },
            { provide: HTTP_SERVER, useFactory: createServer, deps: [express] },
            providers
        ], this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var application;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, injector.get(APPLICATION_TOKEN)];
                    case 1:
                        application = _b.sent();
                        return [2 /*return*/, (_a = application.main) === null || _a === void 0 ? void 0 : _a.call(application, injector)];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.listen = function (injector) {
        var server = injector.get(HTTP_SERVER);
        var _a = (injector.get(APPLICATION_METADATA) || {}).port, port = _a === void 0 ? this.port : _a;
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = server.listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
export { ExpressServerPlatform };
