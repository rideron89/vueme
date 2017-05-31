const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

const express = require('express');
const app = express();

/**
* ENVIRONMENT config variables
*/
const PORT = process.env.PORT || 3000;
const THEME = process.env.THEME || 'default';

// set routes to accept application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// load route files
app.use('/admin-ajax', require('./src/routes/admin-routes'));
app.use('/admin-ajax/media', require('./src/routes/admin-media'));
app.use('/admin-ajax/pages', require('./src/routes/admin-pages'));
app.use('/admin-ajax/users', require('./src/routes/admin-users'));

/**
* Media file requests
*/
app.get('/media/:filename', function(req, res) {
    let file_path = path.join(__dirname, 'content', 'media', req.params.filename);

    res.sendFile(file_path);
});

/**
* Plugin file requests
*/
app.get(/^\/plugins\//, function(req, res) {
    res.send('retrieving plugin file...');
});

/**
* Login request
*/
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

/**
* Admin page requests
*/
app.get(/^\/admin\/?([^\.]*)?$/, function(req, res) {
    let file_path = `${__dirname}/admin/index.html`;

    res.sendFile(file_path);
});

/**
* Admin asset requests
*/
app.get(/^\/admin\/?.+/, function(req, res) {
    let file_path = `${__dirname}/${req.originalUrl}`;

    res.sendFile(file_path);
});

/**
* Page requests
*/
app.get(/^\/content\/pages\//, function(req, res) {
    let file_path = `${__dirname}/${req.originalUrl}`;
    let yaml = YAML.load(`${file_path}/config.yaml`);
    let markup = fs.readFileSync(`${file_path}/markup.md`, 'utf8');

    res.send({config: yaml, markup: markup});
});

/**
* Theme page (pretty-url) requests
*/
app.get(/(\/([^\/\.]+)|\/)$/, function(req, res) {
    let file_path = `${__dirname}/themes/${THEME}/index.html`;

    res.sendFile(file_path);
});

/**
* Theme asset requests
*/
app.get('*', function(req, res) {
    let file_path = `${__dirname}/themes/${THEME}/${req.originalUrl}`;

    res.sendFile(file_path);
});

app.listen(PORT, function() { console.log('*** Server listening on port ' + PORT + '.'); });