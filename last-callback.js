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
'use strict';
module.exports = lastCallback;

/**
 * Extract last argument and check if is callable.
 * If so, create inner callback function which apply all arguments for callback.
 *
 * If last argument is not callable, inner callback will provide empty callable vessel.
 * @param {*} args
 *
 * @returns {function} callback
 */
function lastCallback (...args) {
    let last = args.pop();

    /**
     * Callable vessel.
     *
     * @this allow to pass context from caller to callback.
     * @param {*} args
     *
     * @returns {*}
     */
    function callback (...args) {
        if (typeof last === 'function') {
            return last.apply(this, args);
        }
    }

    return callback;
}
