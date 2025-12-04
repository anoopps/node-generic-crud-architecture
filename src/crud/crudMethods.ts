import { Request, Response } from "express";
import { Model } from "mongoose";

export const create = async (
  Model: Model<any>,
  req: Request,
  res: Response
) => {
  try {

    const doc = await Model.create(req.body);
    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const read = async (Model: Model<any>, req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Model.findById(id);

    if (!doc) {
      return res.status(400).json({
        success: false,
        error: "Record not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const list = async (Model: Model<any>, req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 1);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Model.find().skip(skip).limit(limit).lean(),
      Model.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOne = async (
  Model: Model<any>,
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    // find by id and update
    const updated = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(400).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOne = async (
  Model: Model<any>,
  req: Request,
  res: Response
) => {


  try {

    const { id } = req.params;
    //find record
    const deleted = await Model.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(300)
        .json({ succes: false, message: "Record not found" });
    }
    return res.status(200).json({ success: true, data: deleted });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const search = async (
  Model: Model<any>,
  req: Request,
  res: Response
) => {
  try {
    const q = String(req.query.q) || "";
    const regex = new RegExp(q, "i");

    // naive search: search common text fields - you can customize per model
    const docs = await Model.find({ $or: [{ name: regex }, { email: regex }] })
      .limit(50)
      .lean();
    return res.json({ success: true, data: docs });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
