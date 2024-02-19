import mongoose from "mongoose";

// const order = {
//   userName: "John Doe",
//   user_id: "5f43a7b8f36d287b3b3e3b3b",
//   userAddress: "123, Main Street, Bangalore",

//   productName: "iPhone 13",
//   product_id: "5f43a7b8f36d287b3b3e3b3b",
//   product_Description: "lorem asdf asdfasd fsd fdsf ",
//   image: "/images/iphone13.jpg",

//   quantity: 1,
//   price: 999,
//   discount: 0,
//   tax: 0,
//   igst: 20,
//   shippingCharge: 50,

//   seller: "Apple India",
//   sellerAddress: "Apple India, Bangalore",

//   orderDate: "Mon, 1st Nov",
//   orderedThrough: "Nishant Argade",

//   transactionId: "1234567890",
//   paymentMethod: "Credit Card",

//   paymentStatus: [
//     {
//       status: "Order Placed",
//       date: "Mon, 1st Nov",
//       content: "Your order has been received and is being processed.",
//     },
//     {
//       status: "Payment Confirmed",
//       date: "Mon, 2nd Nov",
//       content: "Your payment has been confirmed. Thank you for your purchase.",
//     },
//   ],
// };

const PaymentStatusSchema = new mongoose.Schema({
  status: String,
  date: { type: Date, default: Date.now },
  content: String,
});

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  payment: {
    transaction_id: String,
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    method: String,
    date: { type: Date, default: Date.now },
    billing_user_address: String,
  },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      name: String,
      description: String,
      images: [{ url: String, filename: String }],
      price: Number,
      quantity: Number,
      discount: Number,
      tax: Number,
      igst: Number,
      seller: String,
      seller_address: String,
    },
  ],
  order_status: {
    type: String,
    enum: ["Order Confirmed", "Shipped", "Out for delivery", "Delivered"],
    default: "Order Confirmed",
  },
  shipping_address: { type: String, required: true },
  shipping_charges: Number,
  packing_charges: Number,
  total_price: Number,
  order_through: String,
});

export const Order =
  mongoose.models.Orders || mongoose.model("Orders", OrderSchema);
