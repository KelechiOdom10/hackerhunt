import NodeCache from "node-cache";

const stdCacheTTL = 86400;
export const cache = new NodeCache({ stdTTL: stdCacheTTL, checkperiod: 600 });
