import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/ConfigService';
import * as redis from 'redis';

@Injectable()
export class CacheService {
    private redis: redis.RedisClient;

    public constructor(
        private readonly config: ConfigService,
    ) {
        this.redis = redis.createClient(Number(config.get('REDIS_PORT')), config.get('REDIS_HOST'), {
            db: Number(config.get('REDIS_DB')),
        });
    }

    public async put(id: string, data: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.redis.set(id, data, (err) => {
                if (err)
                    return reject(err);
                else
                    return resolve();
            });
        });
    }

    public async putObject(id: string, data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.redis.set(id, JSON.stringify(data), (err) => {
                if (err)
                    return reject(err);
                else
                    return resolve();
            });
        });
    }

    public async get(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.redis.get(id, (e, d) => {
                if (e)
                    return reject(e);
                else
                    return resolve(d);
            });
        });

    }

    public async getObject(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.redis.get(id, (err, res) => {
                if (err)
                    return reject(err);
                else
                    return resolve(JSON.parse(res));
            });
        });
    }

    public async delete(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.redis.DEL(id, (err) => {
                if (err)
                    return reject(err);
                else
                    return resolve();
            });
        });
    }
}