# Introduce

[![Build Status](https://travis-ci.org/XGHeaven/node-env-deploy.svg)](https://travis-ci.org/XGHeaven/node-env-deploy)

[![NPM](https://nodei.co/npm/env-deploy.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/env-deploy/)

You may be coding in local, use yourself mysql , mongodb, etc. But in deploy server, the mysql,mongodb's username and password is different. Usually, username and password pass into program through environment.
So, this package can auto switch env, if you have a .env file in root of project

# Usage
1.
    npm install env-deploy
2. add a `.env` file to your project in root path, write env data use json format in it
3. add `.env` to .gitignore file to ignore it
4. coding, commit, push
5. to deploy server. pull, checkout
6. without `.env` file to run project

Yeah, you don't to change any code

# Example
my project
* project
    * .env
    * index.js
    * .gitignore

.env, now only support json format. allow recursive, join with `_`
```JSON
{
    "MONGODB": "localhost",
    "MONGO": {
        "USER": "root"
    }
}
```

index.js - find `.env` file under `__dirname` which pass to it. Or it's' default is `process.cwd()`
```javascript
require('env-deploy')(__dirname);
console.log(process.env.MONGODB);
console.log(process.env.MONGO_USER);
```

.gitignore

    .env

in your local with `.env` file

    localhost
    root

in deploy server without `.env` file, but have environment like `MONGODB=111.111.111.111 MONGO_USER=data`

    111.111.111.111
    data

# Thanks
thanks for your usage, welcome you to pull request to me.

# TODO
* support key=value format