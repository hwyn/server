import { __assign, __awaiter, __generator } from "tslib";
/* eslint-disable max-len */
import { createRegisterLoader, runtimeInjector } from '@hwy-fm/core/platform/decorator';
import { Inject, makeDecorator, makeMethodDecorator, makePropDecorator, setInjectableDef } from '@hwy-fm/di';
import { Sequelize } from 'sequelize';
import { ASSOCIATION, BELONGS_TO, BELONGS_TO_MANY, COLUMN, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC, TABLE, TRANSACTION } from './constant';
import { EntityManager } from './entity-manager';
var sequelize;
runtimeInjector(function (injector) { return sequelize = injector.get(Sequelize); });
var registerEntity = createRegisterLoader(ENTITY_QUEUE);
var columnProps = function (options) { return (__assign({ allowNull: true }, options)); };
var associationsProps = function (relations) { return function (type, options) { return (__assign({ type: type, relations: relations }, options)); }; };
function transaction(_cls, _method, descriptor, options) {
    if (options === void 0) { options = {}; }
    var fn = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return sequelize.transaction(options, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, fn.apply(this, args)];
        }); }); });
    };
}
export { forwardRef } from '@hwy-fm/di';
export var Sync = makeDecorator(SYNC, function (options) { return (__assign({ force: true }, options)); });
export var Entity = makeDecorator(ENTITY, undefined, function (type) { return registerEntity(setInjectableDef(type)); });
export var Table = makeDecorator(TABLE, function (tableName, options) { return (__assign({ tableName: tableName }, options)); });
export var HasOne = makePropDecorator(ASSOCIATION, associationsProps(HAS_ONE));
export var HasMany = makePropDecorator(ASSOCIATION, associationsProps(HAS_MANY));
export var BelongsTo = makePropDecorator(ASSOCIATION, associationsProps(BELONGS_TO));
export var BelongsToMany = makePropDecorator(ASSOCIATION, associationsProps(BELONGS_TO_MANY));
export var PrimaryKey = makePropDecorator(COLUMN, function () { return columnProps({ primaryKey: true, allowNull: false }); });
export var Column = makePropDecorator(COLUMN, function (field, options) { return columnProps(__assign({ field: field }, options)); });
export var Convert = makePropDecorator(COLUMN, function (type) { return ({ convert: type }); });
export var Transaction = makeMethodDecorator(TRANSACTION, function (options) { return (__assign({}, options)); }, transaction);
export var InjectEntity = function (entity) { return Inject(EntityManager, { transform: function (_, m) { return m.getModel(entity); } }); };
