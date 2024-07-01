import { __awaiter, __decorate, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationPlugin, Input, Prov } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector } from '@hwy-fm/di';
import { Sequelize } from 'sequelize';
import { DATABASE, ENTITY_QUEUE } from './constant';
import { EntityManager } from './entity-manager';
let DBManager = class DBManager {
    getSequelize() {
        if (this.dbConfig) {
            const _a = this.dbConfig, { name, user, password } = _a, options = __rest(_a, ["name", "user", "password"]);
            return new Sequelize(name, user, password, options);
        }
        return null;
    }
    connection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.sequelize) === null || _a === void 0 ? void 0 : _a.authenticate());
            console.info('Connection has been established successfully.');
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sequelize) {
                yield this.connection();
                yield this.em.initEntices(this.injector.get(ENTITY_QUEUE) || []);
            }
        });
    }
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
export { DBManager };
