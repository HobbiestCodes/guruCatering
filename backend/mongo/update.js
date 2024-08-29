import foodModel, { catogeryModel, userModel } from "./schema.js";

export const updateFood = (id, name, description, price, image, rating, isVeg, catogery) => {
    return foodModel.findOneAndUpdate({ _id: id }, { name, description, price, image, rating, isVeg, catogery }, { new: true })
}


export const updateUser = async ( id, role ) => {
    return userModel.findByIdAndUpdate({ _id: id }, { role: role })
}

export const updateCatogery = async ( id, name ) => {
    return catogeryModel.findByIdAndUpdate({ _id: id }, { name: name })
}
