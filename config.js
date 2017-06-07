const dotenv = require('dotenv').config();

module.exports = {
    // server port number
    PORT: process.env.PORT || 3000,

    // front-end theme
    THEME: process.env.THEME || 'default',

    // secret key for API authorization
    AUTH_KEY: process.env.AUTH_KEY || 'vueme-this-should-not-be-used',

    // number of salt rounds
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10
};