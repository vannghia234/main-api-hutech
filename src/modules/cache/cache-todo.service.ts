import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { IoRedis } from '../../lib/persistent/ioredis/ioredis';

@Injectable()
export class CacheTodoService {

    constructor(
        private readonly ioRedis: IoRedis,
    ) { }

    public classKey: string = CacheTodoService.name;

    public async create(key, data: any[]) {
        //1. kiem tra cache cua room nay minh da build chua
        const isExists = await this.ioRedis.getRedis.exists(this.classKey + '_' + key);
        //2. neu build roi bo qua báo về 0
        if (isExists !== 0) {
            return 0;
        }
        let pipeline = this.ioRedis.getRedis.pipeline();
        data.forEach((elem) => {
            pipeline.hset(this.classKey + '_' + key, elem.key, JSON.stringify(elem.value))
        })
        await pipeline.exec();
        return 1;
    }

    public async addToSet(key, data: any[]) {
        let pipeline = this.ioRedis.getRedis.pipeline();
        data.forEach((elem) => {
            pipeline.sadd(this.classKey + '_' + key, elem)
        })
        await pipeline.exec();
        return 1;
    }

    public async removeFromSet(key, element) {
        await this.ioRedis.getRedis.srem(this.classKey + '_' + key, element);
        return 1;
    }

    public async getRandomFromSet(key, count) {
        return await this.ioRedis.getRedis.srandmember(this.classKey + '_' + key, count);
    }

    public async getFromSet(key) {
        return await this.ioRedis.getRedis.smembers(this.classKey + '_' + key);
    }

    // public async getRandom(key, count) {
    //     return await this.ioRedis.getRedis.hrandfield(this.classKey + '_' + key, count)
    // }

    public async getAll(key) {
        let list = await this.ioRedis.getRedis.hgetall(this.classKey + '_' + key)
        return _.values(list)
            .map((elem: any) => JSON.parse(elem))
    }

    public async del(key, elements: any[]) {
        let pipeline = this.ioRedis.getRedis.pipeline();
        elements.forEach(elem => {
            pipeline.hdel(this.classKey + '_' + key, elem)
        });
        return await pipeline.exec()
    }

    public async delAll(key) {
        return await this.ioRedis.getRedis.del(this.classKey + '_' + key)
    }
}
