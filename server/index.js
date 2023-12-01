const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const hotelsRoute = require('./routes/hotelsRoute');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())

// connection with the datebase
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('disconnected',()=>{
    console.log('you are not connecting with the database');
})
mongoose.connection.on('connected',()=>{
    console.log('Database connecting successful')
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

app.listen(process.env.PORT,()=>{
    console.log('your server is runing succesfuly :)')
})