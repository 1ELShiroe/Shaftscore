const Redis = require("ioredis");
const redis = new Redis({
    host: 'redis',
    port: 6379,
    password: 'testbr'
});

module.exports = redis;