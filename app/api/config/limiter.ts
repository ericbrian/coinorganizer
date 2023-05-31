import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
    tokensPerInterval: 10,
    interval: "sec",
    fireImmediately: true
});
