const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

/**
* ENVIRONMENT config variables
*/
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || 10);

// set routes to accept application/json
router.use(bodyParser.json());

/**
* Get a list of all users
*/
router.get('/', function(req, res) {
    const dirpath = path.join(__dirname, '..', '..', 'content', 'users');

    let user_names = fs.readdirSync(dirpath)
        .filter((user) => 'yaml' === user.split('.').pop());
    let users = [];

    user_names.forEach((user_name) => {
        let user = {};

        user = YAML.load(path.join(dirpath, user_name));

        if (user.password) { delete user.password; }

        user.id = encodeURIComponent(new Buffer(user.username).toString('base64'));

        users.push(user);
    });

    res.send({error: false, users: users});
});

/**
* Create a new user
*/
router.post('/', function(req, res) {
    let dirpath = path.join(__dirname, '..' ,'..', 'content', 'users');

    if (!req.body.username) {
        return res.send({ error: true, message: 'Please enter a username' });
    }

    if (!req.body.email) {
        return res.send({ error: true, message: 'Please enter an email address' });
    }

    if (!req.body.password) {
        return res.send({ error: true, message: 'Please enter a password' });
    }

    if (fs.existsSync(path.join(dirpath, req.body.username + '.yaml'))) {
        return res.send({ error: true, message: 'User already exists with that name' });
    }

    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            let user = {
                username: req.body.username,
                email: req.body.email,
                password: hash
            };

            fs.writeFileSync(path.join(dirpath, user.username + '.yaml'), YAML.stringify(user));

            res.send({ error: false, message: 'User added with username "' + user.username + '"' });
        });
    });
});

/**
* Get a single user
*/
router.get('/:id', function(req, res) {
    let dirpath = path.join(__dirname, '..' ,'..', 'content', 'users');

    let user_name = new Buffer(decodeURIComponent(req.params.id), 'base64').toString();
    let user = YAML.load(path.join(dirpath, user_name + '.yaml'));

    res.send({error: false, user: user});
});

/**
* Update a single user
*/
router.put('/:id', function(req, res) {
    let user_name = new Buffer(decodeURIComponent(req.params.id), 'base64').toString();
    let user_path = path.join(__dirname, '..', '..', 'content', 'users', user_name + '.yaml');
    let old_user = YAML.load(user_path);

    if (req.body.email) {
        old_user.email = req.body.email;
    }

    if (!req.body.new_password || req.body.new_password.length < 3) {
        fs.writeFileSync(user_path, YAML.stringify(old_user));

        res.send({ error: false, message: 'User updated' });
    } else {
        bcrypt.compare(req.body.old_password, old_user.password, function(err, result) {
            if (!result) {
                res.send({ error: true, message: 'Incorrect password' });
            } else {
                bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
                    bcrypt.hash(req.body.new_password, SALT_ROUNDS, function(err, hash) {
                        old_user.password = hash;

                        fs.writeFileSync(user_path, YAML.stringify(old_user));

                        res.send({error: false, message: 'User updated'});
                    });
                });
            }
        });
    }
});

module.exports = router;