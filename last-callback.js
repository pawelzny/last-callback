/**
 * Last callback selects last passed argument.
 * If this last argument is a function, it will be invoke with
 * given context, and arguments.
 *
 * Last callback returns safe function ready to call.
 * Basicly last-callback it's a wrapper around your callback function.
 *
 * @module last-callback
 * @author Paweł Zadrożny <pawel.zany@gmail.com> (https://pawelzny.com/)
 * @copyright Paweł Zadrożny 2016
 * @license MIT
 * @version 1.0.3
 *
 * @example
 * const callback = lastCallback(...arguments); // set callback
 * callback(...arguments); // invoke callback with arguments
 *
 * @returns {Function} callback wrapper
 */
module.exports = function lastCallback () {
    var last = arguments[arguments.length - 1];

    return function callback () {
        if (typeof last === 'function') {
            last.apply(this, arguments);
        }
    };
};
