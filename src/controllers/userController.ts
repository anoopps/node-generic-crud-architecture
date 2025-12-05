import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import redis from "../config/redis";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const jwt_secret = process.env.JWT_SECRET || "mysecret123";
    const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET || "refreshsecret123";

    if (!email || !password) {
      throw new Error("Username and Password is required");
    }

    // select user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // user.password; has to be hashed for the purpose we are storing ti as pain text
    const hashedPassword = user.password;
    if (hashedPassword != password) {
      throw new Error("Error login!");
    }

    // generate jwt token on success
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },jwt_secret,
      { expiresIn: "1m" }
    );

    // generate jwt token on success
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      jwt_refresh_secret,
      { expiresIn: "7d" }
    );

    await redis.set(
      `refresh_${user._id}`,
      refreshToken,
      "EX",
      60 * 60 * 24 * 7
    );
 
    return res.status(200).json({
      success: true,
      message: "login sucessfull",
      accessToken,
      refreshToken,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}; 


export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.token;
    const userId = req.user?.userId;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    // Blacklist the token for the remaining expiry time (1 day = 86400 sec)
    await redis.set(`bl_${token}`, "1", "EX", 86400);
    await redis.del(`refresh_${userId}`);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({
      success: false,
      message: "Refresh token required",
    });
  }

  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET || "refreshsecret123";

    const decoded: any = jwt.verify(refreshToken, refreshSecret);

    console.log(decoded);

    const storedToken = await redis.get(`refresh_${decoded.userId}`);

    if (!storedToken || storedToken != refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Refresh token required",
      });
    }

    // Create new access token
    const newAccessToken = await jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: `Refresh Error ${error.message}`,
    });
  }
};