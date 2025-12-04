// src/config/redis.ts
import Redis from "ioredis";

const redis = new Redis({
   host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.on("connect", () => console.log("🔌 Redis connected"));
redis.on("ready", () => console.log("⚡ Redis ready"));
redis.on("error", (err) => console.error("❌ Redis error:", err));
redis.on("close", () => console.log("🔒 Redis connection closed"));
redis.on("reconnecting", () => console.log("🔄 Redis reconnecting…"));

export default redis;
