/**
 * Last callback selects last passed argument.
 * If this last argument is a function, it will be invoke with
 * given context, and arguments.
 *
 * Last callback returns safe function ready to call.
 * Basically last-callback it's a wrapper around your callback function.
 *
 * @function last-callback
 * @author Paweł Zadrożny <pawel.zny@gmail.com> (https://pawelzny.com/)
 * @copyright Paweł Zadrożny 2016
 * @license MIT
 * @version 2.0.1
 *
 * @example
 * var callback = lastCallback.apply(null, arguments); // set callback
 * callback(arg, ..., n); // invoke callback with arguments
 *
 * @returns {Function} callback wrapper
 */
function lastCallback() {
    'use strict';
    var last = arguments[arguments.length - 1];

    /**
     * Callable vessel.
     *
     * @this allow to pass context from caller to callback.
     *
     * @returns {*}
     */
    function callback() {
        if (typeof last === 'function') {
            return last.apply(this, Array.prototype.slice.call(arguments));
        }
    }

    return callback;
}
