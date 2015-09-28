'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var path = require('path');
var fs = require('fs');

module.exports = function (p) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (typeof p === 'object') {
        config = p;
        p = undefined;
    }

    var fullPath = getPath(p),
        string = undefined,
        data = undefined;

    // handle config
    if (config.hasOwnProperty('autoTransformCase')) {
        config.autoTransformCase = !!config.autoTransformCase;
    } else config.autoTransformCase = true;

    if (fullPath === null) return false;

    string = fs.readFileSync(fullPath, 'utf8');

    try {
        data = JSON.parse(string);
    } catch (e) {
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

    var stats = fs.statSync(p);

    if (stats.isFile()) return p;

    var filePath = path.resolve(p, '.env');

    if (fs.existsSync(filePath)) return filePath;else return null;
}

/**
 * add json object to process.env
 * @private
 * @param {object} data
 * @param {object} config
 * @param {string} prefix=''
 */
function addToEnv(data, config) {
    var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    var env = process.env;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var value = data[key];
            if (typeof value === 'object') {
                addToEnv(value, config, prefix + key + '_');
            } else {
                env[config.autoTransformCase ? (prefix + key).toUpperCase() : prefix + key] = value.toString();
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

/**
 * parse env-like string
 * @param string
 * @returns {{}}
 */
function parseEnvData(string) {
    var result = {};

    // remove window \n
    //string = string.replace(/\r/gm, '');

    var lines = string.split('\n');

    lines.forEach(function (line) {
        var _ref = line.match(/^(.+?)=(.+)$/) || [];

        var _ref2 = _slicedToArray(_ref, 3);

        var all = _ref2[0];
        var key = _ref2[1];
        var value = _ref2[2];

        // if any of false , ignore it
        if (!key || !value) return;

        // remove spave
        key = key.trim();
        value = value.trim();
        result[key] = value;
    });

    return result;
}
