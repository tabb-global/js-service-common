"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ConfigService_1 = require("../config/ConfigService");
const redis = require("redis");
let CacheService = class CacheService {
    constructor(config) {
        this.config = config;
        this.redis = redis.createClient(Number(config.get('REDIS_PORT')), config.get('REDIS_HOST'), {
            db: Number(config.get('REDIS_DB')),
        });
    }
    put(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redis.set(id, data, (err) => {
                    if (err)
                        return reject(err);
                    else
                        return resolve();
                });
            });
        });
    }
    putObject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redis.set(id, JSON.stringify(data), (err) => {
                    if (err)
                        return reject(err);
                    else
                        return resolve();
                });
            });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redis.get(id, (e, d) => {
                    if (e)
                        return reject(e);
                    else
                        return resolve(d);
                });
            });
        });
    }
    getObject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redis.get(id, (err, res) => {
                    if (err)
                        return reject(err);
                    else
                        return resolve(JSON.parse(res));
                });
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redis.DEL(id, (err) => {
                    if (err)
                        return reject(err);
                    else
                        return resolve();
                });
            });
        });
    }
};
CacheService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [ConfigService_1.ConfigService])
], CacheService);
exports.CacheService = CacheService;
