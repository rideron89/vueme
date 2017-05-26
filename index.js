const fs = require('fs');
const YAML = require('yamljs');

const dotenv = require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

let theme = process.env.THEME || 'default';

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin-ajax', require('./src/routes/admin-routes'));

// Media file requests
app.get(/^\/media\//, function(req, res) {
    res.send('retrieving media file...');
});

// Plugin file requests
app.get(/^\/plugins\//, function(req, res) {
    res.send('retrieving plugin file...');
});

app.post(/^\/login\/?$/, function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let file_path = `${__dirname}/content/users/${req.body.username}.yaml`;
    let yaml = null;

    if (!username || !password) {
        return res.send({ error: true, message: 'Please supply a username and password.' });
    }

    if (fs.existsSync(file_path) === false) {
        return res.send({ error: true, message: 'That user does not exist.' });
    }

    yaml = YAML.load(file_path);

    if (password !== yaml.password) {
        return res.send({ error: true, message: 'That username/password combo is incorrect.' });
    }

    res.send({ error: false, user: yaml });
});

app.get(/^\/admin\/?([^\.]*)?$/, function(req, res) {
    let file_path = `${__dirname}/admin/index.html`;

    res.sendFile(file_path);
});

app.get(/^\/admin\/?.+/, function(req, res) {
    let file_path = `${__dirname}/${req.originalUrl}`;

    res.sendFile(file_path);
});

// Page file requests
app.get(/^\/content\/pages\//, function(req, res) {
    let file_path = `${__dirname}/${req.originalUrl}`;
    let yaml = YAML.load(`${file_path}/config.yaml`);
    let markup = fs.readFileSync(`${file_path}/markup.md`, 'utf8');

    res.send({config: yaml, markup: markup});
});

// Pretty-url requests
app.get(/(\/([^\/\.]+)|\/)$/, function(req, res) {
    let file_path = `${__dirname}/themes/${theme}/index.html`;

    res.sendFile(file_path);
});

// Asset file requests
app.get('*', function(req, res) {
    let file_path = `${__dirname}/themes/${theme}/${req.originalUrl}`;

    res.sendFile(file_path);
});

app.listen(port, function() {
    console.log('Example app listening on port 80!');
});