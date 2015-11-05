'use strict';

var path = require('path');
var fs = require('fs');

module.exports = function(p, config = {}) {
    if (typeof p === 'object') {
        config = p;
        p = undefined;
    }

    let fullPath = getPath(p),
        string,
        data;

    // handle config
    if (config.hasOwnProperty('autoTransformCase')) { config.autoTransformCase = !!config.autoTransformCase; }
    else config.autoTransformCase = true;

    if (fullPath === null) return false;

    string = fs.readFileSync(fullPath, 'utf8');

    try {
        data = JSON.parse(string);
    } catch(e) {
        data = parseEnvData(string);
    }

    addToEnv(data, config);

    return true;
};

/**
 * get exist file name
 * @param p
 * @returns {String|null} return path or null which file don't exist
 */
function getPath(p) {
    p = p || process.cwd();

    let stats = fs.statSync(p);

    if (stats.isFile()) return p;

    let filePath = path.resolve(p, '.env');

    if (fs.existsSync(filePath)) return filePath;
    else return null;
}

/**
 * add json object to process.env
 * @private
 * @param {object} data
 * @param {object} config
 * @param {string} prefix=''
 */
function addToEnv(data, config, prefix = '') {
    let env = process.env;

    for (let key of Object.keys(data)) {
        let value = data[key];
        if (typeof value === 'object') {
            addToEnv(value, config, prefix + key + '_');
        } else {
            env[config.autoTransformCase ? (prefix + key).toUpperCase() : prefix + key] = value.toString();
        }
    }
}

/**
 * parse env-like string
 * @param string
 * @returns {{}}
 */
function parseEnvData(string) {
    let result = {};

    // remove window \n
    //string = string.replace(/\r/gm, '');

    let lines = string.split('\n');

    lines.forEach(line => {
        // support comment start with `#` of `//`
        if (line[0] === '#') { return; }
        if (line[0] === '/' && line[1] === '/') { return; }

        let [all, key, value] = line.match(/^(.+?)=(.+)$/) || [];

        // if any of false , ignore it
        if (!key || !value) return;

        // remove spave
        key = key.trim();
        value = value.trim();
        result[key] = value;
    });

    return result;
}