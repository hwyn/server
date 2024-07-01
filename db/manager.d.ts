import { Injector } from '@hwy-fm/di';
import { Sequelize } from 'sequelize';
export declare class DBManager {
    injector: Injector;
    sequelize: Sequelize | null;
    private em;
    dbConfig: Record<string, any>;
    getSequelize(): Sequelize;
    private connection;
    register(): Promise<void>;
}
