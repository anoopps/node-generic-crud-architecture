import { body } from "express-validator";

export const createUserValidator = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password min 6 chars"),
];

export const updateUserValidation = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email").optional().isEmail().withMessage("Valid email required"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password min 6 chars")
];
