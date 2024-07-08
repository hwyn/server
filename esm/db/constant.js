import { InjectorToken } from '@hwy-fm/di';
export const SYNC = 'Sync';
export const TABLE = 'Table';
export const ENTITY = 'Entity';
export const COLUMN = 'Column';
export const ASSOCIATION = 'Association';
export const DATABASE = 'database';
export const HAS_ONE = 'hasOne';
export const HAS_MANY = 'hasMany';
export const BELONGS_TO = 'belongsTo';
export const BELONGS_TO_MANY = 'belongsToMany';
export const TRANSACTION = 'Transaction';
export const ENTITY_QUEUE = InjectorToken.get('ENTITY_QUEUE');
export const ENTITY_TRANSFORM = InjectorToken.get('ENTITY_TRANSFORM');
