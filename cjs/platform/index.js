"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServerPlatform = void 0;
var tslib_1 = require("tslib");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var express_1 = tslib_1.__importDefault(require("express"));
var http_1 = require("http");
var controller_1 = require("../controller");
var db_manager_1 = require("../db/db-manager");
var token_2 = require("../token");
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (additionalProviders, start) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app, _a, _b, providers, _start, injector, application;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app = (0, express_1.default)();
                        _a = this.parseParams(additionalProviders, start), _b = _a[0], providers = _b === void 0 ? [] : _b, _start = _a[1];
                        injector = this.beforeBootstrapStart([providers, { provide: express_1.default, useValue: app }]);
                        return [4 /*yield*/, injector.get(token_1.APPLICATION_TOKEN)];
                    case 1:
                        application = _c.sent();
                        this.server = injector.get(token_2.HTTP_SERVER) || (0, http_1.createServer)(app);
                        return [4 /*yield*/, this.runStart(injector, undefined, application, _start)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, injector.get(db_manager_1.DBManager).register()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, injector.get(controller_1.ControllerManager).register()];
                    case 4:
                        _c.sent();
                        this.listen(injector);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return di_1.Injector.create(providers, this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector, options, application, start) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, (start || application.start).call(application, injector, options)];
            });
        });
    };
    ExpressServerPlatform.prototype.parseParams = function (providers, start) {
        return typeof providers === 'function' ? [[], providers] : [tslib_1.__spreadArray([], providers, true), start];
    };
    ExpressServerPlatform.prototype.listen = function (injector) {
        var _a = (injector.get(token_1.APPLICATION_METADATA) || {}).port, port = _a === void 0 ? this.port : _a;
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = this.server.listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
exports.ExpressServerPlatform = ExpressServerPlatform;
