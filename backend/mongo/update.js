import foodModel from "./schema.js";

export const updateFood = (id, name, description, price, image, rating, isVeg) => {
    return foodModel.findOneAndUpdate({ _id: id }, { name, description, price, image, rating, isVeg }, { new: true })
}
