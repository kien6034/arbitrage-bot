import * as NodeCache from "node-cache";
import { PRICE_CACHE_LIFETIME } from "./config";

const serviceCache = new NodeCache({
  stdTTL: PRICE_CACHE_LIFETIME,
  checkperiod: 600,
});

function setCache(key: NodeCache.Key, value: any) {
  serviceCache.set(key, value);
}

function getCache(key: NodeCache.Key): any {
  return serviceCache.get(key);
}

const getPriceKey = (ec: string, tokenA: string, tokenB: string): string => {
  return `${ec}-price-${tokenA}-${tokenB}`;
};

function invalidateCache(key: NodeCache.Key) {
  serviceCache.del(key);
}
export { setCache, getCache, invalidateCache, getPriceKey };
