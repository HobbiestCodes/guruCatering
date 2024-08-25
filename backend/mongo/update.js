import foodModel, { userModel } from "./schema.js";

export const updateFood = (id, name, description, price, image, rating, isVeg) => {
    return foodModel.findOneAndUpdate({ _id: id }, { name, description, price, image, rating, isVeg }, { new: true })
}


export const updateUser = async ( id, role ) => {
    return userModel.findByIdAndUpdate({ _id: id }, { role: role })
}