import foodModel from "./schema.js";

export const readFood = async () => {
    const data = await foodModel.find();
    return data;
};
