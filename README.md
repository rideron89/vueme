# VueMe

Flat-file CMS (Content Management System) powered by Vue.js and Express.js.

This is the main package for the VueMe project. No theme is included in this package. A default theme will eventually be provided for guidance.

## Requirements

* [Node.js](https://nodejs.org/en/) (and NPM)
* [Express](https://expressjs.com)

## Installation & Usage

#### Setup

Clone the package and remove git.

```bash
$ git clone git@github.com:rideron89/vueme.git project-name
$ cd project-name
$ rm -r .git/
```

Install dependencies and startup the project.
```bash
$ npm install
$ npm run start
```

#### Build commands

Various commands are supplied for compiling VueMe and the admin panel.

```bash
# Run unit tests (currently unsupported)
$ npm run test

# Build for development
$ npm run build-dev

# Build for production
$ npm run build-prod

# Watch files and build for development
$ npm run watch

# Start the web server
$ npm run serve

# Concurrently build for production and start the web server
$ npm run start
```

#### Accessing the admin panel

By default, the admin panel is located at `http://localhost:3000/admin`. A default user has been set up with the following credentials:

Username: `admin`

Password: `admin`

**Note:** The password should be changed before deploying to production.

## Configuration

VueMe uses [dotenv](https://github.com/motdotla/dotenv) configuration with a `.env` file in the project's root directory. An example is provided:

```bash
$ cp .env.example .env
```

#### Config Options

```bash
# Secret key used for authentication (should be changed for each project)
AUTH_KEY=tm[1Inl?5-1!(4XO7+]yDl97nVpH#f

# Server port number
PORT=3000

# Number of salt rounds used for password hashing
SALT_ROUNDS=10

# Theme used in the front-end
THEME=default
```

You can generate an auth key from here: https://randomkeygen.com

You can read about bcrypt and salt rounds here: https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds

## Contributing

The project is not currently in a state ready for public contributions.

## License

MIT