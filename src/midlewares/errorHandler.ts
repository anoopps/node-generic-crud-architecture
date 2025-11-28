import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

export const errorHandler = (error: any, req: Request, res: Response, next:NextFunction) => {
  console.log(error);
  res.status(400).json({
    success: false,
    message: "Server Error",
  });
  
};
