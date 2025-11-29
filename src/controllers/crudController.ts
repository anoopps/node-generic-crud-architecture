import { Request, Response } from "express";
import mongoose from "mongoose";
import * as crudMethods from "../crud/crudMethods";



export const crudController = (modelName: string) => {
    const Model = mongoose.model(modelName);

    return {
        create: async (req: Request, res: Response) => {
            if (modelName == "Product") {
                req.body.userId = req.user?.userId;
            }
            crudMethods.create(Model, req, res)
        },
        read: async (req: Request, res: Response) => crudMethods.read(Model, req, res),
        list: async (req: Request, res: Response) => crudMethods.list(Model, req, res),
        update: async (req: Request, res: Response) => crudMethods.updateOne(Model, req, res),
        delete: async (req: Request, res: Response) => crudMethods.deleteOne(Model, req, res),
        search: async (req: Request, res: Response) => crudMethods.search(Model, req, res)
    };
};
