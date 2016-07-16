/**
 * Last callback selects last passed argument.
 * If this last argument is a function, it will be invoke with
 * given context, and arguments.
 *
 * Last callback returns safe function ready to call.
 * Basicly last-callback it's a wrapper around your callback function.
 *
 * @function last-callback
 * @author Paweł Zadrożny <pawel.zany@gmail.com> (https://pawelzny.com/)
 * @copyright Paweł Zadrożny 2016
 * @license MIT
 * @version 1.0.3
 *
 * @example
 * var callback = lastCallback.apply(null, arguments); // set callback
 * callback.apply(this, arguments); // invoke callback with arguments
 *
 * @returns {Function} callback wrapper
 */
function lastCallback () {
    var last = arguments[arguments.length - 1];

    return function callback () {
        if (typeof last === 'function') {
            last.apply(this, arguments);
        }
    };
}
