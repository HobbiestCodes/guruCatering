import foodModel, { adminModel } from "./schema.js";

export async function deleteFood(foodId) {
  return await foodModel.deleteOne({ _id: foodId });
}

export async function deleteData(endpoint, id) {
  if (endpoint === "Foods") {
    return await foodModel.deleteOne({ _id: id });
  }
  if (endpoint === "Admins") {
    return await adminModel.deleteOne({ _id: id });
  }
}

export async function removeUserFoodPlate(userId) {
  try {
    const existingPlate = await userFoodPlatesModel.findOne({ userId });

    if (existingPlate) {
      existingPlate.plates = [];
      await existingPlate.save();

      return { status: 200 };
    } else {
      return { status: 404, message: "No plates found for this user" };
    }
  } catch (e) {
    console.error("Error removing food plate:", e);
    return { status: 500 };
  }
}
