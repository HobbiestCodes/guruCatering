import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport'; 
import './passport.js';
import MongoStore from 'connect-mongo';
import cors from 'cors';

import { readAdmins, readById, readCatogery, readFood, readUsers } from './mongo/read.js';
import { Catogery, CreateFood } from './mongo/create.js';
import { deleteCatogery, deleteData } from './mongo/delete.js';
import { updateCatogery, updateFood, updateUser } from './mongo/update.js';


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


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
})

app.use(
  session({
    secret: process.env.SESSION_BYTE,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Store sessions in MongoDB
    cookie: {
      name: 'connection.sid',
      maxAge: 24 * 60 * 60 * 1000, // 1 hour
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: 'Lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    req.session.destroy(req.sessionID, (err) => {
      if (err) {
        return res.status(500).send('Error destroying session');
      }
      res.clearCookie('connection.sid');
      res.send('Logged out');
    });
  });
});



//  Api call to get the list of catogeries
app.get('/catogery', async (req, res) => {
  const response = await readCatogery();
  res.send(response);
})

app.delete('/catogery/delete', async (req, res) => {
  const {id} = req.body;
  const response = await deleteCatogery(id);
  res.send(response);
})

app.post('/catogery/create', async (req, res) => {
  const data = req.body;
  const response = await Catogery(data.name);
  res.send(response);
  
})


app.put('/catogery/update', async (req, res) => {
  const {id, name} = req.body;
  const response = await updateCatogery(id, name);
  res.send(response);
})



app.get('/api/current_user', (req, res) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  
  if (req.isAuthenticated()) {
    res.json({ user: req.user });

  } else {
    res.json({ user: null });
  }
});

app.put('/update', async (req, res) => {
  const {id, name, description, price, image, rating, isVeg} = req.body;
  // console.log(id, name, description, price, image, rating, isVeg);
  const response = await updateFood(id, name, description, price, image, rating, isVeg);
  res.send({
    "message": "Data updated successfully"
  })
})


app.get('/Users', async (req, res) => {
  const users = await readUsers();
  res.send(users);
})

app.get('/Admins', async (req, res) => {
  const users = await readAdmins();
  res.send(users);
})

// api to calls the list of foods
app.get('/Foods', async (req, res) => {
  const food = await readFood();
  res.send(food);
})

app.post('/search', async (req, res) => {
  const {endpoint, id} = req.body;
  const food = await readById(endpoint, id);
  res.send(food);
  
})
app.post('/delete', async (req, res) => {
  const {endpoint, id} = req.body;
  const response = await deleteData(endpoint, id);
  res.send({
    "message": "Data deleted successfully"
  })
})
app.put('/users/update', async (req, res) => {
  const {id, role} = req.body;
  const response = await updateUser(id, role);
  res.send({
    "message": {response}
  })
})

app.post('/createFood', async (req, res) => {
  const {name, description, price, image, rating, isVeg, catogery} = req.body;
  // console.log(name, description, price, image, rating, isVeg, catogery);
  // console.log(catogery);
  await CreateFood(name, description, price, image, rating, isVeg, catogery);
  res.send({
    "message": "Data added successfully"
  })
  
})

connection();