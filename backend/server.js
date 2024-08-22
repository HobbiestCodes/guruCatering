import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import { readFood } from './mongo/read.js';
import { CreateFood } from './mongo/create.js';
import { deleteFood } from './mongo/delete.js';
import { updateFood } from './mongo/update.js';

const app = express();
const port = 8080;
dotenv.config();
const URI = 'mongodb+srv://adarshpanditdev:hNkoJthz1QxRGOcy@cluster0.ox8j0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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