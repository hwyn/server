import { __awaiter, __decorate, __generator, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationPlugin, Input, Prov } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector } from '@hwy-fm/di';
import { Sequelize } from 'sequelize';
import { DATABASE, ENTITY_QUEUE } from './constant';
import { EntityManager } from './entity-manager';
var DBManager = /** @class */ (function () {
    function DBManager() {
    }
    DBManager.prototype.getSequelize = function () {
        if (this.dbConfig) {
            var _a = this.dbConfig, name_1 = _a.name, user = _a.user, password = _a.password, options = __rest(_a, ["name", "user", "password"]);
            return new Sequelize(name_1, user, password, options);
        }
        return null;
    };
    DBManager.prototype.connection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.sequelize) === null || _a === void 0 ? void 0 : _a.authenticate())];
                    case 1:
                        _b.sent();
                        console.info('Connection has been established successfully.');
                        return [2 /*return*/];
                }
            });
        });
    };
    DBManager.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sequelize) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.connection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.em.initEntices(this.injector.get(ENTITY_QUEUE) || [])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], DBManager.prototype, "injector", void 0);
    __decorate([
        Inject(Sequelize),
        __metadata("design:type", Sequelize)
    ], DBManager.prototype, "sequelize", void 0);
    __decorate([
        Inject(EntityManager),
        __metadata("design:type", EntityManager)
    ], DBManager.prototype, "em", void 0);
    __decorate([
        Input(DATABASE),
        __metadata("design:type", Object)
    ], DBManager.prototype, "dbConfig", void 0);
    __decorate([
        Prov(Sequelize),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DBManager.prototype, "getSequelize", null);
    DBManager = __decorate([
        ApplicationPlugin()
    ], DBManager);
    return DBManager;
}());
export { DBManager };
