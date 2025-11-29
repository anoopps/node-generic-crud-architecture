import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

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
      { userId: user._id, email: user.email }, jwt_secret,
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
