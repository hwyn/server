"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectEntity = exports.Transaction = exports.Convert = exports.Column = exports.PrimaryKey = exports.BelongsToMany = exports.BelongsTo = exports.HasMany = exports.HasOne = exports.Table = exports.Entity = exports.Sync = exports.forwardRef = void 0;
var tslib_1 = require("tslib");
/* eslint-disable max-len */
var decorator_1 = require("@hwy-fm/core/platform/decorator");
var di_1 = require("@hwy-fm/di");
var sequelize_1 = require("sequelize");
var constant_1 = require("./constant");
var entity_manager_1 = require("./entity-manager");
var sequelize;
(0, decorator_1.runtimeInjector)(function (injector) { return sequelize = injector.get(sequelize_1.Sequelize); });
var registerEntity = (0, decorator_1.createRegisterLoader)(constant_1.ENTITY_QUEUE);
var columnProps = function (options) { return (tslib_1.__assign({ allowNull: true }, options)); };
var associationsProps = function (relations) { return function (type, options) { return (tslib_1.__assign({ type: type, relations: relations }, options)); }; };
function transaction(_cls, _method, descriptor, options) {
    if (options === void 0) { options = {}; }
    var fn = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return sequelize.transaction(options, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, fn.apply(this, args)];
        }); }); });
    };
}
var di_2 = require("@hwy-fm/di");
Object.defineProperty(exports, "forwardRef", { enumerable: true, get: function () { return di_2.forwardRef; } });
exports.Sync = (0, di_1.makeDecorator)(constant_1.SYNC, function (options) { return (tslib_1.__assign({ force: true }, options)); });
exports.Entity = (0, di_1.makeDecorator)(constant_1.ENTITY, undefined, function (type) { return registerEntity((0, di_1.setInjectableDef)(type)); });
exports.Table = (0, di_1.makeDecorator)(constant_1.TABLE, function (tableName, options) { return (tslib_1.__assign({ tableName: tableName }, options)); });
exports.HasOne = (0, di_1.makePropDecorator)(constant_1.ASSOCIATION, associationsProps(constant_1.HAS_ONE));
exports.HasMany = (0, di_1.makePropDecorator)(constant_1.ASSOCIATION, associationsProps(constant_1.HAS_MANY));
exports.BelongsTo = (0, di_1.makePropDecorator)(constant_1.ASSOCIATION, associationsProps(constant_1.BELONGS_TO));
exports.BelongsToMany = (0, di_1.makePropDecorator)(constant_1.ASSOCIATION, associationsProps(constant_1.BELONGS_TO_MANY));
exports.PrimaryKey = (0, di_1.makePropDecorator)(constant_1.COLUMN, function () { return columnProps({ primaryKey: true, allowNull: false }); });
exports.Column = (0, di_1.makePropDecorator)(constant_1.COLUMN, function (field, options) { return columnProps(tslib_1.__assign({ field: field }, options)); });
exports.Convert = (0, di_1.makePropDecorator)(constant_1.COLUMN, function (type) { return ({ convert: type }); });
exports.Transaction = (0, di_1.makeMethodDecorator)(constant_1.TRANSACTION, function (options) { return (tslib_1.__assign({}, options)); }, transaction);
var InjectEntity = function (entity) { return (0, di_1.Inject)(entity_manager_1.EntityManager, { transform: function (_, m) { return m.getModel(entity); } }); };
exports.InjectEntity = InjectEntity;
