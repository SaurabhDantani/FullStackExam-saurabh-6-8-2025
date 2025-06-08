import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a user'],
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Cart item must have a product'],
        },
        quantity: {
          type: Number,
          required: [true, 'Cart item must have a quantity'],
          min: [1, 'Quantity must be at least 1'],
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
cartSchema.index({ userId: 1 });

// Virtual populate for product details
cartSchema.virtual('items.product', {
  ref: 'Product',
  localField: 'items.productId',
  foreignField: '_id',
  justOne: true
});

export const Cart = mongoose.model<ICart>('Cart', cartSchema); 