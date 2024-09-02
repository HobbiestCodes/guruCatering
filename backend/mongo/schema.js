import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    // unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

export const userModel = new mongoose.model("users", userSchema);

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
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
    img: {
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

const userFoodPlatesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plates: [orderItemSchema],
});

export const userFoodPlatesModel = mongoose.model(
  "userFoodPlates",
  userFoodPlatesSchema
);
