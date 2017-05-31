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

// set routes to accept application/json
router.use(bodyParser.json());

/**
* Get all site stats
*/
router.get('/stats', function(req, res) {
    let dirpath = path.join(__dirname, '..', '..');

    let users = fs.readdirSync(path.join(dirpath, 'content', 'users'))
        .filter((user) => 'yaml' === user.split('.').pop());
    let pages = fs.readdirSync(path.join(dirpath, 'content', 'pages'))
        .filter(file => fs.lstatSync(path.join(dirpath, 'content', 'pages', file)).isDirectory());

    // recursive function to get all child pages
    const recurse = function(current_path, parent_page) {
        let child_pages = fs.readdirSync(current_path)
            .filter(file => fs.lstatSync(path.join(current_path, file)).isDirectory());

        child_pages.forEach(child_page => {
            pages.push(child_page);
            recurse(path.join(current_path, child_page), child_page);
        });
    };

    pages.forEach((page) => recurse(path.join(dirpath, 'content', 'pages', page), page));

    res.send({error: false, stats: {page_count: pages.length, user_count: users.length}});
});

module.exports = router;