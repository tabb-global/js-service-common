import { ConfigService } from '../config/ConfigService';
export declare class CacheService {
    private readonly config;
    private redis;
    constructor(config: ConfigService);
    put(id: string, data: string): Promise<void>;
    putObject(id: string, data: any): Promise<void>;
    get(id: string): Promise<string>;
    getObject(id: string): Promise<any>;
    delete(id: string): Promise<void>;
}
