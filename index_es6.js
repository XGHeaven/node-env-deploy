'use strict';

var path = require('path');
var fs = require('fs');
var env = process.env;

module.exports = function(p) {
    let fullPath = getPath(p),
        string,
        data;

    if (fullPath === null) return false;

    string = fs.readFileSync(fullPath);

    try {
        data = JSON.parse(string);
    } catch(e) {
        console.error(e);
        return false;
    }

    addToEnv(data);

    return true;
};

/**
 * get exist file name
 * @param p
 * @returns {String|null} return path or null which file don't exist
 */
function getPath(p) {
    p = p || process.cwd();

    let filePath = path.resolve(p, '.env');

    if (fs.existsSync(filePath)) return filePath;
    else return null;
}

/**
 * add json object to process.env
 * @private
 * @param data
 * @param prefix
 */
function addToEnv(data, prefix = '') {
    for (let key of Object.keys(data)) {
        let value = data[key];
        if (typeof value === 'object') {
            addToEnv(value, prefix + key + '_');
        } else {
            env[prefix + key] = value;
        }
    }
}
