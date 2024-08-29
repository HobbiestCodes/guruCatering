// import mongoose from "mongoose";
import foodModel from "./schema.js";
import { catogeryModel } from "./schema.js";

export async function CreateFood(name, description, price, image, rating, isVeg, catogery) {
    try {
        // console.log(name, description, price, image, rating, isVeg, catogery);
        
        const foods = new foodModel({
               name: name,
                description: description,
                price: price,
                image: image,
                rating: rating,
                isVeg: isVeg,
                catogery: catogery
        })
        await foods.save();
    }
    catch(e) {
        console.log("error" + e);
        
    }
}


export async function Catogery(name) {
    try {
        const catogery = new catogeryModel({
            name: name
        })
        await catogery.save();
    }
    catch(e) {
        console.log("error" + e);       
    }
}