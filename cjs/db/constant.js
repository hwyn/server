"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITY_QUEUE = exports.BELONGS_TO_MANY = exports.BELONGS_TO = exports.HAS_MANY = exports.HAS_ONE = exports.DATABASE = exports.ASSOCIATION = exports.COLUMN = exports.ENTITY = exports.TABLE = exports.SYNC = void 0;
var di_1 = require("@fm/di");
exports.SYNC = 'Sync';
exports.TABLE = 'Table';
exports.ENTITY = 'Entity';
exports.COLUMN = 'Column';
exports.ASSOCIATION = 'Association';
exports.DATABASE = 'database';
exports.HAS_ONE = 'hasOne';
exports.HAS_MANY = 'hasMany';
exports.BELONGS_TO = 'belongsTo';
exports.BELONGS_TO_MANY = 'belongsToMany';
exports.ENTITY_QUEUE = di_1.InjectorToken.get('ENTITY_QUEUE');
