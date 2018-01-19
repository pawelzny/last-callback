const
    lastCallback = require('../last-callback'),
    chai = require('chai'),
    sinon = require('sinon');

describe('dotenv-loader interface', function () {
    describe("#lastCallback()", () => {
        it('should always return a function', function () {
            let callback = lastCallback('test', () => true);
            chai.assert.isFunction(callback);
        });

        it('should receive all arguments', function () {
            const
                a = 'arg 1',
                b = 'arb 2';

            function cb (first, second) {
                chai.assert.equal(first, a);
                chai.assert.equal(second, b);
            }

            let callback = lastCallback('something', 'something else', cb);
            callback(a, b);
        });

        it('should be able to work with custom context', function () {
            const context = {secret: '32rwsdfaasd234'};

            function cb () {
                // eslint-disable-next-line
                chai.assert.equal(this.secret, context.secret);
            }

            let callback = lastCallback(cb);
            callback.call(context);
        });

        it('should run the callback only once with given arguments', function () {
            let
                secret = 'asdfasdf32sdf',
                spy = sinon.spy(),
                callback = lastCallback((str) => spy(str));

            callback(secret);

            chai.assert.isTrue(spy.calledOnce);
            chai.assert.isTrue(spy.calledWith(secret));
        });

        it('should not trying to call callback if last parameter is not a function', function () {
            let
                callback = lastCallback('arg is not a function'),
                result = callback();

            chai.assert.isUndefined(result);
        });

        it('should work with spread operator', function () {
            let
                x = 12,
                y = 7,
                expected = 19,
                callback = lastCallback((a, b) => a + b),
                result = callback(...[x, y]);

            chai.assert.equal(result, expected);
        });

        it('should allow recursive callback', function () {
            let
                start = 0,
                target = 10,
                spy = sinon.spy();

            function recursiveCb (n, t) {
                if (n < t) {
                    spy();
                    return recursiveCb(n + 1, t);
                }

                return true;
            }

            let
                callback = lastCallback(recursiveCb),
                result = callback(start, target);

            chai.assert.isTrue(result);
            chai.assert.equal(spy.callCount, target);
        });
    });
});
