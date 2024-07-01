import { Type } from '@hwy-fm/di';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions, SyncOptions, TransactionOptions } from 'sequelize';
import { EntityType } from './entity-manager';
type Through = {
    model: EntityType;
} | EntityType;
type BelongsToManyType = (type: EntityType, options: BelongsToManyOptions | {
    through: Through;
}) => PropertyDecorator;
export { forwardRef } from '@hwy-fm/di';
export declare const Sync: (options?: SyncOptions) => ClassDecorator;
export declare const Entity: () => ClassDecorator;
export declare const Table: (tableName: string, options?: ModelOptions<import("sequelize").Model<any, any>>) => ClassDecorator;
export declare const HasOne: (type: EntityType, options?: HasOneOptions) => import("@hwy-fm/di").TargetDecorator;
export declare const HasMany: (type: EntityType, options?: HasManyOptions) => import("@hwy-fm/di").TargetDecorator;
export declare const BelongsTo: (type: EntityType, options?: BelongsToOptions) => import("@hwy-fm/di").TargetDecorator;
export declare const BelongsToMany: BelongsToManyType;
export declare const PrimaryKey: () => import("@hwy-fm/di").TargetDecorator;
export declare const Column: (field: string, options: ModelAttributes<import("sequelize").Model<any, any>, any>) => import("@hwy-fm/di").TargetDecorator;
export declare const Convert: (type: Type<any>) => import("@hwy-fm/di").TargetDecorator;
export declare const Transaction: (options?: TransactionOptions) => MethodDecorator;
export declare const InjectEntity: (entity: EntityType) => import("@hwy-fm/di").TargetDecorator;
