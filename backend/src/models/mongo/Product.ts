import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export const Product = mongoose.model('Product', ProductSchema);
