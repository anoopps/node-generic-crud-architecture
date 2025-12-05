// src/middlewares/CheckBlacklist.ts
import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

const CheckBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const isBlacklisted = await redis.get(`bl_${token}`);

    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid (logged out)",
      });
    }

    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error checking token blacklist",
    });
  }
};

export default CheckBlacklist;
