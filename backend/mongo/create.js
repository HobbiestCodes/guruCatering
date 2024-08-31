import foodModel, { foodOrdersModel } from "./schema.js";
export async function CreateFood(
  name,
  description,
  price,
  image,
  rating,
  isVeg,
  isAvailable
) {
  try {
    const foods = new foodModel({
      name: name,
      description: description,
      price: price,
      image: image,
      rating: rating,
      isVeg: isVeg,
      isAvailable: isAvailable,
    });
    await foods.save();
  } catch (e) {
    console.log("error" + e);
  }
}

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
