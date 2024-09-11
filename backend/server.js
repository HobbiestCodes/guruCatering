import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import "./passport.js";
import {
  readAdmins,
  readById,
  readFood,
  readOrders,
  readCatogery,
  readAllFoods,
} from "./mongo/read.js";
import {
  CreateFood,
  Catogery,
  createOrders,
  createAdmins,
} from "./mongo/create.js";

import { deleteData } from "./mongo/delete.js";
import { updateFood, updateUser } from "./mongo/update.js";
import foodModel, { adminModel, orderModel } from "./mongo/schema.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

const connection = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("\nDatabase connected");
    })
    .catch((e) => {
      console.log(e);
    });
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(
  session({
    secret: process.env.SESSION_BYTE,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }), // Store sessions in MongoDB
    cookie: {
      name: "connection.sid",
      maxAge: 24 * 60 * 60 * 1000, // 1 hour
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "Lax",
    },
  })
);

app.get("/", (req, res) => {
  res.redirect("http://localhost:5173");
});

app.post('/admins/new', async function(req, res) {
  const { email, password, name } = req.body;
  const userEmail = await adminModel.find({ email: email});
  
  if (email !== userEmail[0]?.email) {
    await createAdmins(name, email, password)
    res.send({"message": "Added successfully", "success": "true"});
  }
})


app.get('/admins/dashboard', async function(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
  const user = await adminModel.findById(req.session.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found', success: false });
  }
  console.log(req.session.userId);
  return res.status(200).json({ message: 'OK', success: true, data: user });

}); 

// Error handling middleware (optional)


app.post('/admins/login', async function(req, res) {
  const { email, password } = req.body;
  const cred = await adminModel.find({email: email, password: password });

  if (cred.length === 0) {
    return res.status(200).json({ message: "Not found", success: false });
  }

  req.session.userId = cred._id;
  return res.status(200).json({
    user: { id: cred._id, role: cred.role, email: cred.email },
    message: "OK",
    success: true
  });

});

app.get("/catogery", async (req, res) => {
  const response = await readCatogery();
  return res.send(response);
});

app.post("/catogery/create", async (req, res) => {
  const data = req.body;
  const image = data.image;
  const lowerCase = data.name.toLowerCase();
  const response = await Catogery(lowerCase, image);
  res.send(response);
});

app.put("/update", async (req, res) => {
  const { id, name, description, price, image, rating, isVeg, catogery } = req.body;
  await updateFood(
    id,
    name,
    description,
    price,
    image,
    rating,
    isVeg,
    catogery
  );
  res.send({
    message: "Data updated successfully",
  });
});

app.get("/Admins", async (req, res) => {
  const users = await readAdmins();  
  res.send(users);
});


app.get("/Foods", async (req, res) => {
  const food = await readAllFoods();
  res.send(food);
});

app.get("/Foods/:catogery", async (req, res) => {
  const { catogery } = req.params;
  const food = await readFood(catogery);
  res.send(food);
});

app.post("/search", async (req, res) => {
  const { endpoint, id } = req.body;
  const food = await readById(endpoint, id);
  res.send(food);
});
app.post("/delete", async (req, res) => {
  const { endpoint, id } = req.body;
  const response = await deleteData(endpoint, id);
  res.send({
    message: "Data deleted successfully",
  });
});
app.put("/users/update", async (req, res) => {
  const { id, name, email, password, role } = req.body;
  const response = await updateUser(id, name, email, password, role);
  res.send({
    message: { response },
  });
});

app.post("/createFood", async (req, res) => {
  const { name, description, price, image, rating, isVeg, catogery } = req.body;
  await CreateFood(name, description, price, image, rating, isVeg, catogery);
  res.send({
    message: "Data added successfully",
  });
});

app.post("/plate", async (req, res) => {
  const data = req.body;
  const response = await foodModel.find({ _id: { $in: data } });
  res.send(response);
});

app.post("/addOrder", async (req, res) => {
  const {
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
  } = req.body;
  // console.log(req.body);

  await createOrders(
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
  );
  res.send({ message: "Added successfully...!" });
});

app.get("/Orders", async (req, res) => {
  const orders = await readOrders();
  res.send(orders);
});

app.put('/status', async (req, res) => {
  const { id, status } = req.body;
  await orderModel.updateOne({ _id: id }, { $set: { status: status } });
  res.send({ message: "Updated successfully" });
})

connection();
