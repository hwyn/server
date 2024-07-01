import { __awaiter, __decorate, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationContext } from '@hwy-fm/core/platform';
import { Inject, Injectable, Injector, reflectCapabilities } from '@hwy-fm/di';
import { get } from 'lodash';
import { Model, Sequelize } from 'sequelize';
import { ASSOCIATION, BELONGS_TO, SYNC, TABLE } from './constant';
import { ENTITY_TRANSFORM, EntityTransform } from './entity-transform';
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
let EntityManager = class EntityManager {
    constructor(ctx, injector) {
        this.ctx = ctx;
        this.injector = injector;
        this.treeEntity = new Map();
        this.entityMapping = new Map();
        if (!this.injector.get(ENTITY_TRANSFORM))
            this.ctx.addProvider({ provide: ENTITY_TRANSFORM, useClass: EntityTransform });
    }
    properties(entity, isMapping = false) {
        const properties = reflectCapabilities.properties(entity);
        return Object.keys(properties).reduce((propMetadata, key) => {
            properties[key].forEach((_a) => {
                var { metadataName } = _a, options = __rest(_a, ["metadataName"]);
                if (metadataName === ASSOCIATION !== isMapping)
                    propMetadata[key] = Object.assign(propMetadata[key] || {}, options);
            });
            return propMetadata;
        }, {});
    }
    addTree(entity, entices) {
        entices = entices.filter((entice) => { var _a; return !((_a = this.treeEntity.get(entice)) === null || _a === void 0 ? void 0 : _a.includes(entity)) && entice !== entity; });
        if (!this.treeEntity.has(entity)) {
            this.treeEntity.set(entity, entices);
        }
        else {
            const list = this.treeEntity.get(entity);
            entices.forEach((entice) => !list.includes(entice) && list.push(entice));
        }
    }
    getEntityDbMapping(entity) {
        const propsAnnotations = this.properties(entity, true);
        return Object.keys(propsAnnotations).reduceRight((mapping, key) => {
            const _a = propsAnnotations[key], { name = key, field = name } = _a, options = __rest(_a, ["name", "field"]);
            return Object.assign(mapping, { [name]: this.entityTransform.transform(Object.assign({ name, field }, options)) });
        }, {});
    }
    createAssociationThrough(options, entity) {
        var _a;
        const through = ((_a = options.through) === null || _a === void 0 ? void 0 : _a.model) || options.through;
        if (through && typeof through !== 'string') {
            const throughEntity = getEntity(through);
            const throughModel = this.createEntity(throughEntity);
            this.addTree(throughEntity, [entity, getEntity(options.type)]);
            options.through.model ? options.through.model = throughModel : options.through = throughModel;
        }
        return options;
    }
    createAssociation(entity) {
        const relyList = [];
        const propsAnnotations = this.properties(entity, false);
        for (const key of Object.keys(propsAnnotations)) {
            const _a = this.createAssociationThrough(propsAnnotations[key], entity), { type, relations } = _a, options = __rest(_a, ["type", "relations"]);
            const ModelType = this.getModel(entity);
            const AssociationsModel = this.createEntity(getEntity(type));
            if (BELONGS_TO === relations)
                relyList.push(getEntity(type));
            if (AssociationsModel)
                get(ModelType, relations).call(ModelType, AssociationsModel, options);
        }
        this.addTree(entity, relyList);
    }
    createEntity(entity) {
        const _a = reflectCapabilities.getAnnotation(entity, TABLE), { tableName } = _a, options = __rest(_a, ["tableName"]);
        if (!this.entityMapping.has(tableName)) {
            const mapping = this.getEntityDbMapping(entity);
            const tableOptions = Object.assign({ tableName, sequelize: this.seq }, options);
            const modelType = entity instanceof Model ? entity.init(mapping, tableOptions) : this.seq.define(tableName, mapping, tableOptions);
            this.entityMapping.set(tableName, modelType);
            this.createAssociation(entity);
        }
        return this.entityMapping.get(tableName);
    }
    syncEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const e = getEntity(entity);
            const syncMetadata = reflectCapabilities.getAnnotation(e, SYNC);
            if (syncMetadata)
                yield this.getModel(e).sync(syncMetadata);
        });
    }
    getModel(entity) {
        const { tableName } = reflectCapabilities.getAnnotation(getEntity(entity), TABLE);
        return this.entityMapping.get(tableName);
    }
    initEntices(entices) {
        return __awaiter(this, void 0, void 0, function* () {
            const execList = [];
            for (const entity of entices)
                this.createEntity(entity);
            while (this.treeEntity.size > 0) {
                let count = 0;
                this.treeEntity.forEach((entices, entity) => {
                    if (!entices.length) {
                        execList.push(entity);
                        this.treeEntity.forEach((value) => value.splice(value.indexOf(entity), 1));
                        this.treeEntity.delete(entity);
                        count++;
                    }
                });
                if (count === 0)
                    throw new Error('Circular dependency detected');
            }
            for (const entity of execList)
                yield this.syncEntity(entity);
        });
    }
};
__decorate([
    Inject(ENTITY_TRANSFORM),
    __metadata("design:type", EntityTransform)
], EntityManager.prototype, "entityTransform", void 0);
__decorate([
    Inject(Sequelize),
    __metadata("design:type", Sequelize)
], EntityManager.prototype, "seq", void 0);
EntityManager = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ApplicationContext, Injector])
], EntityManager);
export { EntityManager };
