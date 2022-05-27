import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details).end();
    }
    next();
  };
};

export default validateRequest;
