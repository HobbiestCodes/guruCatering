import mongoose from "mongoose";

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
    createdAt: Date,
    updatedAt: Date
})

const foodModel = mongoose.model('foods', foodSchema);

export default foodModel;