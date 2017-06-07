# VueMe

Flat-file CMS (Content Management System) powered by Vue.js and Express.js.

This is the main package for the VueMe project. No theme is included in this package. A default theme will eventually be provided for guidance.

## Contents

* [Requirements](https://github.com/rideron89/vueme#requirements)
* [Installation & Usage](https://github.com/rideron89/vueme#installation--usage)
    * [Setup](https://github.com/rideron89/vueme#setup)
    * [Accessing the admin panel](https://github.com/rideron89/vueme#accessing-the-admin-panel)
* [Configuration](https://github.com/rideron89/vueme#configuration)
    * [Config options](https://github.com/rideron89/vueme#config-options)
* [Contributing](https://github.com/rideron89/vueme#contributing)
* [License](https://github.com/rideron89/vueme#license)

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

#### Config options

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

Any and all contributions are greatly appreciated. If you wish to help, please refer to the Contributions [guidelines](https://github.com/rideron89/vueme/CONTRIBUTIONS.md).

## License

MIT