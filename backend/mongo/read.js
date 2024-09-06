import foodModel, { foodOrdersModel, orderModel } from "./schema.js";
import { userModel, catogeryModel } from "./schema.js";

export const readFood = async (catogery) => {
  const data = await foodModel.find({catogery: catogery});
  return data;
};

export const readAllFoods = async () => {
  const data = await foodModel.find();
  return data;
}
export const readById = async (endpoint, id) => {
  if (endpoint === "Foods") {
    const data = await foodModel.findById(id);
    return data;
  }
  if (endpoint === "Users") {
    const data = await userModel.findById(id);
    return data;
  }
};

export const readUsers = async () => {
  const data = await userModel.find({ role: "user" });
  return data;
};

export const readAdmins = async () => {
  const data = await userModel.find({ role: "admin" });
  return data;
};

export const readOrders = async () => {
  const data = await orderModel.find();
  return data;
};
export const readUserOrdersById = async (userId) => {
  const data = await foodOrdersModel.findOne({ userId });
  return data;
};


export const readCatogery = async () => {
  const data = await catogeryModel.find()
  return data;
}