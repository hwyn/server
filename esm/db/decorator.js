import { __awaiter } from "tslib";
/* eslint-disable max-len */
import { createRegisterLoader, runtimeInjector } from '@hwy-fm/core/platform/decorator';
import { Inject, makeDecorator, makeMethodDecorator, makePropDecorator, setInjectableDef } from '@hwy-fm/di';
import { Sequelize } from 'sequelize';
import { ASSOCIATION, BELONGS_TO, BELONGS_TO_MANY, COLUMN, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC, TABLE, TRANSACTION } from './constant';
import { EntityManager } from './entity-manager';
let sequelize;
runtimeInjector((injector) => sequelize = injector.get(Sequelize));
const registerEntity = createRegisterLoader(ENTITY_QUEUE);
const columnProps = (options) => (Object.assign({ allowNull: true }, options));
const associationsProps = (relations) => (type, options) => (Object.assign({ type, relations }, options));
function transaction(_cls, _method, descriptor, options = {}) {
    const fn = descriptor.value;
    descriptor.value = function (...args) {
        return sequelize.transaction(options, () => __awaiter(this, void 0, void 0, function* () { return fn.apply(this, args); }));
    };
}
export { forwardRef } from '@hwy-fm/di';
export const Sync = makeDecorator(SYNC, (options) => (Object.assign({ force: true }, options)));
export const Entity = makeDecorator(ENTITY, undefined, (type) => registerEntity(setInjectableDef(type)));
export const Table = makeDecorator(TABLE, (tableName, options) => (Object.assign({ tableName }, options)));
export const HasOne = makePropDecorator(ASSOCIATION, associationsProps(HAS_ONE));
export const HasMany = makePropDecorator(ASSOCIATION, associationsProps(HAS_MANY));
export const BelongsTo = makePropDecorator(ASSOCIATION, associationsProps(BELONGS_TO));
export const BelongsToMany = makePropDecorator(ASSOCIATION, associationsProps(BELONGS_TO_MANY));
export const PrimaryKey = makePropDecorator(COLUMN, () => columnProps({ primaryKey: true, allowNull: false }));
export const Column = makePropDecorator(COLUMN, (field, options) => columnProps(Object.assign({ field }, options)));
export const Convert = makePropDecorator(COLUMN, (type) => ({ convert: type }));
export const Transaction = makeMethodDecorator(TRANSACTION, (options) => (Object.assign({}, options)), transaction);
export const InjectEntity = (entity) => Inject(EntityManager, { transform: (_, m) => m.getModel(entity) });
