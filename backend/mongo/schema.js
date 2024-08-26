import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        // unique: true
    },
    name: {
      type: String,
      required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',

    }
})

export const userModel = mongoose.model('users', userSchema);


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    isVeg: {
        type: Boolean,
        required: true
    },
    catogery: {
        type: String,
        required: true
    }
})

const foodModel = mongoose.model('foods', foodSchema);

export default foodModel;
