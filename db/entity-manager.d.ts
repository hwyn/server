import { ApplicationContext } from '@hwy-fm/core/platform';
import { Injector, Type, TypeClass } from '@hwy-fm/di';
import { Model, ModelAttributes, ModelStatic } from 'sequelize';
import { EntityTransform } from './entity-transform';
export type EntityType = Type | (() => Type);
export declare class EntityManager {
    protected ctx: ApplicationContext;
    protected injector: Injector;
    entityTransform: EntityTransform;
    private seq;
    protected treeEntity: Map<any, any[]>;
    private entityMapping;
    constructor(ctx: ApplicationContext, injector: Injector);
    protected properties(entity: Type, isMapping?: boolean): any;
    protected addTree(entity: Type, entices: Type[]): void;
    protected getEntityDbMapping(entity: Type): ModelAttributes;
    protected createAssociationThrough(options: any, entity: Type): any;
    protected createAssociation(entity: Type): void;
    protected createEntity(entity: TypeClass): ModelStatic<Model<any, any>>;
    protected syncEntity(entity: Type): Promise<void>;
    getModel(entity: EntityType): ModelStatic<Model<any, any>>;
    initEntices(entices: Type[]): Promise<void>;
}
