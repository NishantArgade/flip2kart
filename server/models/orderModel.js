import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  billing_user: String,
  billing_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  payment: {
    transaction_id: String,
    status: {
      type: String,
      enum: ["captured", "failed"],
    },
    method: String,
    date: { type: Date, default: Date.now },
  },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      name: String,
      description: String,
      category: String,
      images: [{ url: String, filename: String }],
      price: Number,
      afterDiscountTotalPrice: Number,
      quantity: Number,
      discount: Number,
      tax: Number,
      igst: Number,
      seller: String,
      seller_address: String,
      delivery_estimate_days: { type: Number, default: 0 },
      order_status_history: {
        type: [
          {
            status: {
              type: String,
              enum: [
                "Order Confirmed",
                "Shipped",
                "Out for delivery",
                "Delivered",
                "Cancelled",
                "Returned",
              ],
            },
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        default: [
          {
            status: "Order Confirmed",
            date: Date.now(),
          },
        ],
        required: true,
      },
      latest_order_status: {
        type: {
          status: {
            type: String,
            enum: [
              "Order Confirmed",
              "Shipped",
              "Out for delivery",
              "Delivered",
              "Cancelled",
              "Returned",
            ],
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
        default: {
          status: "Order Confirmed",
          date: Date.now(),
        },

        required: true,
      },
    },
  ],
  shipping_address: String,
  shipping_to_user: String,
  shipping_user_phone: Number,
  shipping_charges: Number,
  packing_charges: Number,
  total_price: Number,
  totalQuantity: Number,
  order_through: String,
  created_at: { type: Date, default: Date.now, required: true },
});

export const Order =
  mongoose.models.Orders || mongoose.model("Orders", OrderSchema);
