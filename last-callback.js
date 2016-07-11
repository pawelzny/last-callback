/**
 * Get last argument and call if it is a function.
 *
 * @returns {Function}
 */
module.exports = function lastCallback () {
    var last = arguments[arguments.length -1];

    return function callback () {
        if (typeof last === 'function') {
            last.apply(this, arguments);
        }
    };
};
