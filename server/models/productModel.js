import mongoose from "mongoose";

const product = {
  name: "iPhone 13 Pro",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The iPhone 13 Pro features a new super retina XDR display with ProMotion.",
  price: 129900,
  stock: 200,
  category: "Mobile Phones",
  images: ["www.img1.com", "www.img2.com", "www.img3.com"],

  spotlight: [
    {
      title: "Super Retina XDR Display",
      description: [
        "The iPhone 13 Pro features a new super retina XDR display with ProMotion.",
        "The display has a 120Hz refresh rate.",
      ],
    },
    {
      title: "A15 Bionic Chip",
      description: [
        "The iPhone 13 Pro is powered by the A15 Bionic chip.",
        "The A15 Bionic chip has a 6-core CPU.",
      ],
    },
    {
      title: "Pro Camera System",
      description: [
        "The iPhone 13 Pro has a pro camera system with 12MP + 12MP + 12MP.",
      ],
    },
  ],

  offers: [
    "10% off on HDFC Bank Cards",
    "5% Cashback on Flipkart Axis Bank Credit Card",
  ],

  specifications: [
    {
      category: "General",
      specs: [
        {
          title: "Brand",
          description: "Apple",
        },
        {
          title: "Model",
          description: "iPhone 13 Pro",
        },
        {
          title: "Release date",
          description: "14th September 2021",
        },
      ],
    },
    {
      category: "Display",
      specs: [
        {
          title: "Screen size",
          description: "6.1 inches",
        },
        {
          title: "Resolution",
          description: "1170 x 2532 pixels",
        },
        {
          title: "Refresh rate",
          description: "120Hz",
        },
      ],
    },
    {
      category: "Hardware",
      specs: [
        {
          title: "Processor",
          description: "A15 Bionic",
        },
        {
          title: "RAM",
          description: "6GB",
        },
        {
          title: "Internal storage",
          description: "128GB",
        },
      ],
    },
  ],

  seller: "Apple India",
  rating: 0,
  reviews: 0,
  deliveryEstimateDays: "3",
};

const spotlightSchema = new mongoose.Schema({
  title: String,
  description: [String],
});

const specSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const categorySpecSchema = new mongoose.Schema({
  category: String,
  specs: [specSchema],
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: { type: Number, default: 0 },
  category: String,
  images: [String],
  brand: String,
  spotlight: [spotlightSchema],
  offers: [String],
  specifications: [categorySpecSchema],
  seller: String,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  deliveryEstimateDays: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

export const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);
