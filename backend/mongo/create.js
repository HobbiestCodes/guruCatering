import foodModel, {
  foodOrdersModel,
  catogeryModel,
  orderModel,
  adminModel
} from "./schema.js";
export async function CreateFood(
  name,
  description,
  price,
  image,
  rating,
  isVeg,
  catogery
) {
  try {
    const foods = new foodModel({
      name: name,
      description: description,
      price: price,
      image: image,
      rating: rating,
      isVeg: isVeg,
      catogery: catogery,
    });
    await foods.save();
  } catch (e) {
    console.log("error" + e);
  }
}

export const createOrders = async (
  name,
  email,
  phone,
  address,
  date,
  note,
  functionType,
  noOfPeople,
  foodPreference,
  items
) => {
  try {
    const order = new orderModel({
      name,
      email,
      phone,
      address,
      date,
      note,
      functionType,
      noOfPeople,
      foodPreference,
      items,
    });
    await order.save();
  } catch (e) {
    console.log("error" + e);
  }
};

export async function createFoodOrders(
  userId,
  address,
  phoneNumber,
  orders,
  date
) {
  // console.log(userId, address, phoneNumber, orders, date);
  try {
    const existingOrder = await foodOrdersModel.findOne({ userId });

    if (existingOrder) {
      orders.forEach((newItem) => {
        const existingItem = existingOrder.orders.find(
          (item) => item.id === newItem.id
        );

        if (existingItem) {
          existingItem.quantity = existingItem.quantity + newItem.quantity;
        } else {
          existingOrder.orders.push(newItem);
        }
      });
      // existingOrder.orders = [...existingOrder.orders, ...orders];
      existingOrder.address = address;
      existingOrder.phoneNumber = phoneNumber;
      existingOrder.date = date;

      await existingOrder.save();
      // console.log("New Food order placed successfully!");

      return { message: "New Food order placed successfully!", status: 200 };
    } else {
      const newOrder = new foodOrdersModel({
        userId,
        address,
        phone: phoneNumber,
        orders, // expected to be an array of ordered food items
        date,
      });
      await newOrder.save();
      // console.log("Food order placed successfully!");
      return { message: "Food order placed successfully!", status: 201 };
    }
  } catch (e) {
    console.error("Error creating food order:", e);
    // throw e;
    return {
      message: "Something went wrong, please try again!",
      status: 500,
    };
  }
}

export async function createUserFoodPlates(userId, plates) {
  try {
    const existingPlate = await userFoodPlatesModel.findOne({ userId });

    if (existingPlate) {
      plates.forEach((newItem) => {
        const existingItem = existingPlate.plates.find(
          (item) => item.id === newItem.id
        );

        if (existingItem) {
          existingItem.quantity =
            (existingItem.quantity || 0) + newItem.quantity;
        } else {
          existingPlate.plates.push(newItem);
        }
      });

      await existingPlate.save();

      return { status: 200, message: "Plates updated successfully." };
    } else {
      const newPlate = new userFoodPlatesModel({
        userId,
        plates,
      });
      await newPlate.save();

      return { status: 201, message: "Plates created successfully." };
    }
  } catch (error) {
    console.error("Error creating or updating food plates:", error);

    return {
      status: 500,
      message: "Internal server error.",
    };
  }
}

export async function Catogery(name, image) {
  try {
    const catogery = new catogeryModel({
      name: name,
      image: image,
    });
    await catogery.save();
  } catch (e) {
    console.log("error" + e);
  }
}


export const createAdmins = async (name, email, password) => {
  try {
    const admin = new adminModel({
      name: name,
      email: email,
      password: password,
    });
    await admin.save();
  } catch (e) {
    console.log("error" + e);
  }
}