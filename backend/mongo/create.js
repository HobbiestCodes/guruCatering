// import mongoose from "mongoose";
import foodModel from "./schema.js";
export async function CreateFood(name, description, price, image, rating, isVeg, isAvailable) {
    try {
        const foods = new foodModel({
               name: name,
                description: description,
                price: price,
                image: image,
                rating: rating,
                isVeg: isVeg,
                isAvailable: isAvailable,
        })
        await foods.save();
    }
    catch(e) {
        console.log("error" + e);
        
    }
}

