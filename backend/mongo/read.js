import foodModel from "./schema.js";
import { userModel } from "./schema.js";

export const readFood = async () => {
    const data = await foodModel.find();
    return data;
};
export const readById = async (endpoint, id) => {
    if (endpoint==="Foods") {
        const data = await foodModel.findById(id);
        return data;
    }
    if (endpoint==="Users") {
        const data = await userModel.findById(id);
        return data;
    }
};

export const readUsers = async () => {
    const data = await userModel.find({role: 'user'});
    return data;
};

export const readAdmins = async () => {
    const data = await userModel.find({ role: "admin" });
    return data;
};

