import foodModel, { catogeryModel, userModel } from "./schema.js";


export async function deleteFood(foodId) {
    return await foodModel.deleteOne({ _id: foodId });
}

export async function deleteData(endpoint, id) {
    if (endpoint==='Foods') {
        return await foodModel.deleteOne({ _id: id });
    }
    if (endpoint==='Users') {
        return await userModel.deleteOne({ _id: id });
    }
}

export async function deleteCatogery(id) {
    return await catogeryModel.deleteOne({_id: id});
}