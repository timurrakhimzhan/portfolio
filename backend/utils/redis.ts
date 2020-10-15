import RedisClass, {Redis} from 'ioredis';

export const redis: Redis = new RedisClass();

export function setRedisValue(uuid: string, type: string, value: string | number, expTime: number) {
    return redis.set(`${uuid}:${type}`, value, "px", expTime)
}

export function getRedisValue(uuid: string, type: string) {
    return redis.get(`${uuid}:${type}`);
}