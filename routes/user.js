const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');

router.post('/', (req, res) => {
    // const { username, password } = req.body
    const username = req.body.username;
    const password = req.body.password;
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            });
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                description: "",
                routes: []
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            });
        }
    });
});

router.post(
    '/login',
    (req, res, next) => {
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in');
        if(req.user){
            User.findOne({username: req.user.username})
        .then(response => {
            if(response.password === req.user.password) {
                let responseObj = {
                    id: response._id,
                    username: response.username,
                    routes: response.routes,
                    description: response.description
                };
                res.send({user:responseObj, username:responseObj.username});
            }
            else {
                res.json( { user: null } );
            }
        });
        }
        // var userInfo = {
        //     username: req.user.username
        // };
        // res.send(userInfo);
    }
);

router.get('/', (req, res, next) => {
    if (req.user) {
        // Retrieve rest of user info once valid
        User.findOne({username: req.user.username})
        .then(response => {
            if(response.password === req.user.password) {
                let responseObj = response;
                delete responseObj.password;
                res.json(responseObj);
            }
            else {
                res.json( { user: null } );
            }
        });
    } else {
        res.json({ user: null })
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
});

router.post('/routes/:id', (req, res) => {
    User.findByIdAndUpdate({
        _id: req.params.id
    }, {
        $push: {
            routes: req.body.routes
        }
    })
    .then(route => res.json(route))
    .catch(err => res.json(err));
});

module.exports = router;