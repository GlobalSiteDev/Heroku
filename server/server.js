const express = require('express');
const bodyParser = require('body-parser');
const cookiePraser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookiePraser());

app.use(express.static('client/build'));

// GET //

// Checking if a user is logged in

app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

/*
* User log out. 
* After making a request auth middlware checks if a token is correct and gives a user back.
* Then deleting the token from the DB.
*/

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return status(400).send(err);

        res.sendStatus(200);
    })
})

// POST //

// Register user

app.post('/api/register', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(user) return res.json({isAuth: false, message: 'Email is already taken! Log in or use another email'});

        let newUser = new User(req.body);

        newUser.save((err, doc) => {
            if(err) return res.status(400).send(err);

            newUser.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                res.cookie('auth', user.token).send({
                    isAuth: true,
                    id: user._id,
                    email: user.email,
                    user: doc
                })
            })
        })
    })
})

// Login user with email and password

app.post('/api/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({isAuth: false, message: 'Email not found! Sign up please'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password!'
            });

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                res.cookie('auth', user.token).send({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

// Configuring app for production to render HTML

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client','build', 'index.html'))
    })
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING`);
})
