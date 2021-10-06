import polly from "polly-js";

export const withRetry = polly().waitAndRetry(5).executeForPromise