import * as NodeCache from "node-cache";
import { PRICE_CACHE_CHECK_PERIOD, PRICE_CACHE_LIFETIME } from "./config";

const priceCache = new NodeCache({
  stdTTL: PRICE_CACHE_LIFETIME,
  checkperiod: PRICE_CACHE_CHECK_PERIOD,
});

function setCache(key: NodeCache.Key, value: any) {
  priceCache.set(key, value);
}

function getCache(key: NodeCache.Key): any {
  return priceCache.get(key);
}

const getPriceKey = (ec: string, tokenA: string, tokenB: string): string => {
  return `${ec}-price-${tokenA}-${tokenB}`;
};

function invalidateCache(key: NodeCache.Key) {
  priceCache.del(key);
}
export { setCache, getCache, invalidateCache, getPriceKey };
