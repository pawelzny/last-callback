const
    lastCallback = require('../last-callback'),
    chai = require('chai'),
    assert = chai.assert,
    sinon = require('sinon');

describe('dotenv-loader interface', function () {
    describe("#lastCallback()", () => {
        it('should return function', function () {
            function testFunc (param1, param2) {
                var callback = lastCallback.call(null, param1, param2);

                assert.isFunction(callback);
            }
            testFunc();
        });

        it('should have all given parameters', function () {
            function testFunc (param1, param2, param3) {
                var callback = lastCallback.apply(null, arguments);

                this.param0 = 'private parameter 0';
                callback.call(this, param1, param2, param3);
            }

            testFunc('param 1', 'param 2', 'param 3', function (param1, param2, param3) {
                assert.equal('private parameter 0', this.param0);
                assert.equal('param 1', param1);
                assert.equal('param 2', param2);
                assert.equal('param 3', param3);
            });
        });

        it('should run the callback once if last parameter is function', function () {
            var callbackSpy = sinon.spy();

            function testFunc (param1) {
                var callback = lastCallback.apply(null, arguments);

                callback.call(null, param1);
            }

            testFunc('param 1', function (param1) {
                callbackSpy(param1);
            });

            assert.isTrue(callbackSpy.calledOnce);
            assert.isTrue(callbackSpy.calledWith('param 1'));
        });

        it('should not trying to call callback if last parameter is not a function', function () {
            var result;

            function testFunc (param1) {
                var callback = lastCallback.apply(null, arguments);

                callback.call(null, param1);

                return param1;
            }

            result = testFunc('this is not a callback');
            assert.equal('this is not a callback', result);
        });

        it('should work with spread operator', function () {
            function testFunc (param1, param2) {
                var callback = lastCallback(...arguments);

                callback(...arguments);
            }

            testFunc('param 1', 'param 2', function (param1, param2) {
                assert.equal(arguments.length, 3);
                assert.equal('param 1', param1);
                assert.equal('param 2', param2);
                assert.isFunction(arguments[arguments.length -1]);
            });
        });

        it('should allow recursive callback', function () {
            var
                number = 0,
                target = 10,
                funcSpy = sinon.spy();

            function testFunc (number) {
                var callback = lastCallback.apply(null, arguments);

                callback(number);
            }

            function recursiveCallback (number) {
                if (number === target) {
                    return;
                }
                number += 1;

                funcSpy();
                recursiveCallback(number);
            }

            testFunc(number, recursiveCallback);
            assert.equal(funcSpy.callCount, target);
        });
    });
});
