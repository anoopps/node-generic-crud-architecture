import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import redis from "../config/redis";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const jwt_secret = process.env.JWT_SECRET || "mysecret123";

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
    const token = jwt.sign(
      { userId: user._id, email: user.email },jwt_secret,
      { expiresIn: "1d" }
    );
 
    return res.status(200).json({
      success: true,
      message: "login sucessfull",
      token: token,
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

    if (!token) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    // Blacklist the token for the remaining expiry time (1 day = 86400 sec)
    await redis.set(`bl_${token}`, "1", "EX", 86400);

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
