import foodModel, { userModel } from "./schema.js";

export const updateFood = (id, name, description, price, image, rating, isVeg) => {
    return foodModel.findOneAndUpdate({ _id: id }, { name, description, price, image, rating, isVeg }, { new: true })
}

export const updateItem = async (endpoint, id, data) => {
    if (endpoint === "Foods") {
        return foodModel.findOneAndUpdate({ _id: id }, data)
    }
    if (endpoint === "Users") {
        return userModel.findByIdAndUpdate({ _id: id }, data)
    }
}

export const updateUser = async ( id, role ) => {
    return userModel.findByIdAndUpdate({ _id: id }, { role: role })
}