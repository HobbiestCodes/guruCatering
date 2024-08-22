import foodModel from "./schema.js";


export async function deleteFood(foodId) {
    return await foodModel.deleteOne({ _id: foodId });
}