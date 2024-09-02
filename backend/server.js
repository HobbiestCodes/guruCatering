import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors";
import "./passport.js";
import {
  readAdmins,
  readById,
  readFood,
  readOrders,
  readUserOrdersById,
  readUserPlatessById,
  readUsers,
} from "./mongo/read.js";
import {
  CreateFood,
  createFoodOrders,
  createUserFoodPlates,
} from "./mongo/create.js";
import { deleteData, removeUserFoodPlate } from "./mongo/delete.js";
import { updateFood, updateUser, updateUserFoodPlate } from "./mongo/update.js";

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
    console.log(`\nApp listening on port ${port}`);
  });
};

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.redirect("http://localhost:5173");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); // Redirect to the dashboard or another page
  }
);
// Logout Route
app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    req.session.destroy(req.sessionID, (err) => {
      if (err) {
        return res.status(500).send("Error destroying session");
      }
      res.clearCookie("connection.sid");
      res.send("Logged out");
    });
  });
});

app.get("/api/current_user", (req, res) => {
  // console.log("Session ID:", req.sessionID);
  // console.log("Session Data:", req.session);

  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.put("/update", async (req, res) => {
  const { id, name, description, price, image, rating, isVeg } = req.body;
  // console.log(id, name, description, price, image, rating, isVeg);
  const response = await updateFood(
    id,
    name,
    description,
    price,
    image,
    rating,
    isVeg
  );
  res.send({
    message: "Data updated successfully",
  });
});

app.get("/Users", async (req, res) => {
  const users = await readUsers();
  res.send(users);
});

app.get("/Admins", async (req, res) => {
  const users = await readAdmins();
  res.send(users);
});

app.get("/Foods", async (req, res) => {
  const food = await readFood();
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
  const { id, role } = req.body;
  const response = await updateUser(id, role);
  res.send({
    message: { response },
  });
});

app.post("/createFood", async (req, res) => {
  const { name, description, price, image, rating, isVeg } = req.body;
  await CreateFood(name, description, price, image, rating, isVeg);
  res.send({
    message: "Data added successfully",
  });
});

app.post("/create-user-food-plates", async (req, res) => {
  const { userId, plates } = req.body;
  // console.log(userId, plates);

  try {
    if (!userId || !Array.isArray(plates)) {
      return res.status(400).send({
        message: "Invalid request data",
      });
    }

    const result = await createUserFoodPlates(userId, plates);
    // console.log(result);

    if (result.status == 200) {
      res.status(200).send({
        message: result.message,
      });
    }
    if (result.status == 201) {
      res.status(200).send({
        message: result.message,
      });
    }
    if (result.status == 500) {
      res.status(500).send({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Failed to add food platess",
      error: error.message,
    });
  }
});
app.post("/read-user-food-plates", async (req, res) => {
  const { userId } = req.body;
  // console.log("user-food-orders", userId);

  const food = await readUserPlatessById(userId);

  res.send(food);
});
app.post("/remove-user-food-plates", async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).send({
        message: "Invalid request data",
      });
    }

    const result = await removeUserFoodPlate(userId);

    if (result.status === 200) {
      res.status(200).send({
        message: "Food plates removed successfully",
      });
    } else if (result.status === 404) {
      res.status(404).send({
        message: "Food plates not found",
      });
    } else {
      res.status(500).send({
        message: "Failed to remove food plate",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Failed to remove food plate",
      error: error.message,
    });
  }
});

app.post("/update-user-food-plates", async (req, res) => {
  const { userId, plateId, action } = req.body;

  if (!userId || !plateId || !action) {
    return res.status(400).send({
      message:
        "Invalid request data. User ID, plate ID, and action are required.",
    });
  }

  try {
    const result = await updateUserFoodPlate(userId, plateId, action);

    res.status(result.status).send({
      message: result.message || "Food plate updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update food plate",
      error: error.message,
    });
  }
});

app.post("/read-user-food-plates", async (req, res) => {
  const { userId } = req.body;

  try {
    const food = await readUserPlatessById(userId);
    res.send(food);
  } catch (error) {
    res.status(500).send({
      message: "Failed to read user food plates",
      error: error.message,
    });
  }
});

app.post("/create-food-order", async (req, res) => {
  const { userId, address, phoneNumber, orders, date } = req.body;
  // console.log(userId, address, phoneNumber, orders, date);

  try {
    if (
      !userId ||
      !address ||
      !phoneNumber ||
      !Array.isArray(orders) ||
      !date
    ) {
      return res.status(400).send({
        message: "Invalid request data",
      });
    }

    const result = await createFoodOrders(
      userId,
      address,
      phoneNumber,
      orders,
      date
    );
    // console.log(result);

    if (result.status == 200) {
      res.status(200).send({
        message: result.message,
      });
      await removeUserFoodPlate(userId);
    }
    if (result.status == 201) {
      res.status(200).send({
        message: result.message,
      });
    }
    if (result.status == 500) {
      res.status(500).send({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Failed to place food order",
      error: error.message,
    });
  }
});

app.post("/user-food-orders", async (req, res) => {
  const { userId } = req.body;
  console.log("user-food-orders", userId);

  const food = await readUserOrdersById(userId);

  res.send(food);
});

app.get("/Orders", async (req, res) => {
  const orders = await readOrders();
  res.send(orders);
});

connection();
