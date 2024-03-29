import { __awaiter, __decorate, __generator, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, reflectCapabilities } from '@fm/di';
import { Sequelize } from 'sequelize';
import { BELONGS_TO, BELONGS_TO_MANY, ENTITY, HAS_MANY, HAS_ONE, SYNC } from './constant';
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
var EntityManager = /** @class */ (function () {
    function EntityManager() {
        this.entityMapping = new Map();
    }
    EntityManager.prototype.getEntityDbMapping = function (entity) {
        var propsAnnotations = reflectCapabilities.properties(entity);
        var dbMapping = {};
        Object.keys(propsAnnotations).forEach(function (key) {
            dbMapping[key] = {};
            propsAnnotations[key].forEach(function (annotation) { return Object.assign(dbMapping[key], annotation); });
        });
        return dbMapping;
    };
    EntityManager.prototype.createAssociation = function (metaKey, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, type, options, model, associationsModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = reflectCapabilities.getAnnotation(entity, metaKey);
                        if (!metadata)
                            return [2 /*return*/];
                        type = metadata.type, options = __rest(metadata, ["type"]);
                        model = this.getModel(entity);
                        return [4 /*yield*/, this.createEntity(getEntity(type))];
                    case 1:
                        associationsModel = _a.sent();
                        if (associationsModel) {
                            model[metaKey].call(model, associationsModel, options);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityManager.prototype.getModel = function (entity) {
        var tableName = reflectCapabilities.getAnnotation(getEntity(entity), ENTITY).tableName;
        return this.entityMapping.get(tableName);
    };
    EntityManager.prototype.createEntity = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tableName, options, keys, syncMetadata, model, _i, keys_1, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = reflectCapabilities.getAnnotation(entity, ENTITY), tableName = _a.tableName, options = __rest(_a, ["tableName"]);
                        if (!!this.entityMapping.has(tableName)) return [3 /*break*/, 6];
                        keys = [HAS_ONE, HAS_MANY, BELONGS_TO, BELONGS_TO_MANY];
                        syncMetadata = reflectCapabilities.getAnnotation(entity, SYNC);
                        model = this.sequelize.define(tableName, this.getEntityDbMapping(entity), options);
                        this.entityMapping.set(tableName, model);
                        _i = 0, keys_1 = keys;
                        _b.label = 1;
                    case 1:
                        if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                        key = keys_1[_i];
                        return [4 /*yield*/, this.createAssociation(key, entity)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!syncMetadata) return [3 /*break*/, 6];
                        return [4 /*yield*/, model.sync(syncMetadata)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, this.entityMapping.get(tableName)];
                }
            });
        });
    };
    __decorate([
        Inject(Sequelize),
        __metadata("design:type", Sequelize)
    ], EntityManager.prototype, "sequelize", void 0);
    EntityManager = __decorate([
        Injectable()
    ], EntityManager);
    return EntityManager;
}());
export { EntityManager };
