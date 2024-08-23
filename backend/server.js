import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import './pass.js';
import MongoStore from 'connect-mongo';

// import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';
import cors from 'cors';
// import {OAuth2Client} from 'google-auth-library';
// import {userModel} from "./mongo/schema.js";
 
import { readFood } from './mongo/read.js';
import { CreateFood } from './mongo/create.js';
import { deleteFood } from './mongo/delete.js';
import { updateFood } from './mongo/update.js';


dotenv.config();

const app = express();

const port = process.env.PORT || 7000;
const URI = process.env.MONGO_URI

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

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Store sessions in MongoDB
    cookie: {
      name: 'connection.sid',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: false, // Set to true if using HTTPS
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
})
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect to the dashboard or another page
  }
);
// Logout Route
app.get('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy() // Logout from Passport.js
  res.clearCookie('connection.sid'); // Clear the session cookie
  req.logout((err) => { // Passport's logout method
    if (err) {
      return res.status(500).send('Error logging out');
    }
    req.session.destroy((err) => { // Destroy the session
      if (err) {
        return res.status(500).send('Error destroying session');
      }
  res.clearCookie('connection.sid'); // Clear the session cookie
      res.send('ok'); // Send the final response
    });
  });
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
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