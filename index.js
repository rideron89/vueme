const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jwt-simple');
const path = require('path');
const YAML = require('yamljs');

const express = require('express');
const app = express();

const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

// load environment variables
const config = require('./config');

/**
* IMPORTANT: Holds all user logins in memory so we don't need to keep loading them from the disk
* for JWT authentication.
*/
let USERS = {};

/**
* Strips the JS web token from the Authorization header.
*
* @param scheme string
*
* @return function
*/
const ProperAuthHeader = function (scheme) {
    if (!scheme) {
        scheme = 'JWT';
    }

    return function(req) {
        let token = null;

        if (req.headers['authorization']) {
            let auth_header = req.headers['authorization'].split(' ');

            if (auth_header.length > 1 && auth_header[0] === scheme) {
                token = auth_header[1];
            }
        }

        return token;
    };
};

// setup passport login strategy
const jwt_opts = {
    jwtFromRequest: ProperAuthHeader(),
    secretOrKey: config.AUTH_KEY
};

// passport strategy for authenticating JWT requests
passport.use(new JWTStrategy(jwt_opts, function(jwt_payload, done) {
    if (USERS[jwt_payload.username] === undefined) {
        return done(null, false, { message: 'Token has expired' });
    }

    if (USERS[jwt_payload.username] !== jwt_payload.password) {
        return done(null, false, { message: 'Token is unauthorized' });
    }

    return done(null, jwt_payload);
}));

// shows how passport should serialize user objects
passport.serializeUser(function(user, done) {
    done(null, { username: user.username, email: user.email });
});

// shows how passport should deserialize user objects
passport.deserializeUser(function(id, done) {
    done(null, {});
});

// set routes to accept application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// setup passport for use
app.use(passport.initialize());

// log the request (and response) to the console
app.use(function(req, res, next) {
    res.on('finish', function() {
        let timestamp = new Date().toISOString();
        let parts = [timestamp, req.ip, req.method, res.statusCode, req.originalUrl];

        console.log(parts.join('\t'));
    });

    next();
});

// load route files
app.use('/admin-ajax', passport.authenticate('jwt', { session: false }), require('./src/routes/admin-routes'));
app.use('/admin-ajax/media', passport.authenticate('jwt', { session: false }), require('./src/routes/admin-media'));
app.use('/admin-ajax/pages', passport.authenticate('jwt', { session: false }), require('./src/routes/admin-pages'));
app.use('/admin-ajax/users', passport.authenticate('jwt', { session: false }), require('./src/routes/admin-users'));

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
    let username = req.body.username || '';
    let password = req.body.password || '';
    let file_path = `${__dirname}/content/users/${username}.yaml`;
    let yaml = null;

    if (fs.existsSync(file_path) === false) {
        return res.send({ error: true, message: 'User does not exist' });
    }

    yaml = YAML.load(file_path);

    bcrypt.compare(password, yaml.password, function(err, result) {
        if (!result) {
            res.send({ error: true, message: 'Incorrect username/password combo' });
        } else {
            USERS[yaml.username] = yaml.password;

            res.send({ error: false, token: jwt.encode(yaml, config.AUTH_KEY) });
        }
    });
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
    let file_path = `${__dirname}/themes/${config.THEME}/index.html`;

    res.sendFile(file_path);
});

/**
* Theme asset requests
*/
app.get('*', function(req, res) {
    let file_path = `${__dirname}/themes/${config.THEME}/${req.originalUrl}`;

    res.sendFile(file_path);
});

app.listen(config.PORT, function() { console.log('*** Server listening on port ' + config.PORT + '.'); });