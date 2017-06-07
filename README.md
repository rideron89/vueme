# VueMe

Flat-file CMS (Content Management System) powered by Vue.js and Express.js.

This is the main package for the VueMe project. No theme is included in this package. A default theme will eventually be provided for guidance.

## Requirements

* [Node.js](https://nodejs.org/en/) (and NPM)
* [Express](https://expressjs.com)

## Installation & Usage

#### Building the package

Build commands for compiling VueMe and the admin panel. Feel free to replace `yarn` with `npm`.

```bash
# Run unit tests (currently unsupported)
$ yarn run test

# Build for development
$ yarn run build-dev

# Build for production
$ yarn run build-prod

# Watch files and build for development
$ yarn run watch

# Start the web server
$ yarn run serve

# Concurrently build for production and start the web server
$ yarn run start
```

#### Accessing the admin panel

By default, the admin panel is located at `/admin`. A default user has been set up with the following credentials:

Username: `admin`

Password: `admin`

**Note:** The password should be changed before deploying to production.

---

More features yet to come...

## Contributing

Section to be filled out later.