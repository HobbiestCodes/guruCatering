import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
});

export const adminModel = new mongoose.model("admins", adminSchema);

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  catogery: {
    type: String,
    required: true,
  },
});

const foodModel = new mongoose.model("foods", foodSchema);
export default foodModel;

const orderItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const foodOrdersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  orders: [orderItemSchema],
  date: {
    type: String,
    required: true,
  },
});

export const foodOrdersModel = mongoose.model("foodOrders", foodOrdersSchema);

const Orders = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  functionType: {
    type: String,
    required: false,
  },
  noOfPeople: {
    type: String,
    required: false,
  },
  foodPreference: {
    type: String,
    required: false,
  },
  items: {
    type: [orderItemSchema],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const orderModel = mongoose.model("orders", Orders);

const catogerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
});

export const catogeryModel = mongoose.model("catogery", catogerySchema);
