const express = require("express");
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'memories'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) });
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) } );
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) } );

app.listen(3000, ()=>{
    console.log('port: 3000')
})