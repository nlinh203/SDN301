import { redis } from './config';

export const timeoutRedis = async (callBack) => {
  return new Promise(async (resolve, reject) => {
    const t = setTimeout(() => {
      reject('redis timeout');
    }, 10000);
    const value = await callBack();
    clearTimeout(t);
    resolve(value);
  }).catch((e) => {
    return throwErrorNo(e);
  });
};

export const reditSet = (key, value, EX = 30 * 24 * 60 * 60) => {
  return timeoutRedis(() => redis.set(key, value, 'EX', EX));
};

export const reditGet = (key) => {
  return timeoutRedis(() => redis.get(key));
};

export const redditDel = (key) => {
  return timeoutRedis(() => redis.del(key));
};

export const redisPushQueue = (key, value) => {
  return timeoutRedis(async () => {
    return redis.lpush(key, value);
  });
};

export const reditGetQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.lrange(key, 0, -1);
  });
};

export const reditDeleteQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.ltrim(key, 0, -1);
  });
};
