import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {OAuth2Client} from 'google-auth-library';
import {userModel} from "./mongo/schema.js";

import { readFood } from './mongo/read.js';
import { CreateFood } from './mongo/create.js';
import { deleteFood } from './mongo/delete.js';
import { updateFood } from './mongo/update.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 7000;
const URI = process.env.MONGO_URI
const G_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const G_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const client = new OAuth2Client(G_CLIENT_ID);

app.use(cors());
app.use(bodyParser.json());


const connection = () => {
  mongoose.connect(URI).then(() => {
    console.log('Database connected');
    
  }).catch((e) => {
    console.log(e);
    
  });
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
}


app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
})


app.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email } = ticket.getPayload();

  // Check if user exists in DB
  let user = await userModel.findOne({ email });
  if (!user) {
    let user = new userModel({ email });
    await user.save();
  }

  // Create JWjson.createObject token
  const jwtToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token: jwtToken, role: user.role });
});


app.get('/food', async (req, res) => {
  const food = await readFood();
  res.send(food);
})

app.post('/createFood', async (req, res) => {
  const {name, description, price, image, rating, isVeg} = req.body;
  await CreateFood(name, description, price, image, rating, isVeg);
  res.send({
    "message": "Data added successfully"
  })
  
})
app.put('/updateFood', async (req, res) => {
  const {name, description, price, image, rating, isVeg} = req.body;
  const id = req.query.id;
  await updateFood(id, name, description, price, image, rating, isVeg);
  res.send({
    "message": "Data updated successfully"
  })
})
app.delete('/deleteFood/:id', async (req, res) => {
  const id = req.params.id;
  await deleteFood(id);
  res.send({
    "message": "Data deleted successfully"
  })
})

connection();