import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string; 
  userId: Schema.Types.ObjectId;
} 

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
