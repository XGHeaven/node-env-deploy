'use strict';

var path = require('path');
var fs = require('fs');
var env = process.env;

module.exports = function (p) {
    var fullPath = getPath(p),
        string = undefined,
        data = undefined;

    if (fullPath === null) return false;

    string = fs.readFileSync(fullPath);

    try {
        data = JSON.parse(string);
    } catch (e) {
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

    var filePath = path.resolve(p, '.env');

    if (fs.existsSync(filePath)) return filePath;else return null;
}

/**
 * add json object to process.env
 * @private
 * @param data
 * @param prefix
 */
function addToEnv(data) {
    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var value = data[key];
            if (typeof value === 'object') {
                addToEnv(value, prefix + key + '_');
            } else {
                env[prefix + key] = value;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
