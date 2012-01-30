/*
 *
 * Keypa test module.
 *
 */

beforeEach(function() {
    this.addMatchers({
        toBeFunction: function() {
            return typeof this.actual === 'function';
        },
        toBeEmptyObject: function() {
            return !Object.keys(this.actual).length;
        }
    });
});

describe('Keypa', function() {
    describe('class', function() {
        it('should be a function', function() {
            expect(Keypa).toBeFunction();
        });
    });

    describe('keyCodes', function() {
        it('should contain correct key codes', function() {
            var keyCodes = {
                'backspace': 8,
                'enter': 13,
                'ctrl': 17,
                'esc': 27,
                'space': 32,
                'left arrow': 37,
                'up arrow': 38,
                'right arrow': 39,
                'down arrow': 40,
                '0': 48,
                '1': 49,
                '2': 50,
                '3': 51,
                '4': 52,
                '5': 53,
                '6': 54,
                '7': 55,
                '8': 56,
                '9': 57,
                'a': 65,
                'b': 66,
                'c': 67,
                'd': 68,
                'e': 69,
                'f': 70,
                'g': 71,
                'h': 72,
                'i': 73,
                'j': 74,
                'k': 75,
                'l': 76,
                'm': 77,
                'n': 78,
                'o': 79,
                'p': 80,
                'q': 81,
                'r': 82,
                's': 83,
                't': 84,
                'u': 85,
                'v': 86,
                'w': 87,
                'x': 88,
                'y': 89,
                'z': 90
            };

            expect(Keypa.keyCodes).toEqual(keyCodes);
        });
    });

    describe('keyCallbacks', function() {
        it('should be an empty object', function() {
            expect(Keypa.keyCallbacks).toBeEmptyObject();
        });
    });

    describe('ctrlKeyCallbacks', function() {
        it('should be an empty object', function() {
            expect(Keypa.ctrlKeyCallbacks).toBeEmptyObject();
        });
    });

    describe('shiftKeyCallbacks', function() {
        it('should be an empty object', function() {
            expect(Keypa.shiftKeyCallbacks).toBeEmptyObject();
        });
    });

    describe('blockingKeys', function() {
        it('should be an empty object', function() {
            expect(Keypa.blockingKeys).toBeEmptyObject();
        });
    });

    describe('addEvent', function() {
        it('should be a function', function() {
            expect(Keypa.addEvent).toBeFunction();
        });

        it('should add events using "addEventListener"', function() {
            var obj = {addEventListener: jasmine.createSpy()}
              , e = 'keydown'
              , cb = function() {};

            Keypa.addEvent(obj, e, cb);

            var args = obj.addEventListener.mostRecentCall.args;

            expect(args[0]).toBe(e);
            expect(args[1]).toBeFunction();
            expect(args[2]).toBeFalsy();
        });

        it('should add events using "attachEvent"', function() {
            var obj = {attachEvent: jasmine.createSpy()}
              , e = 'keydown'
              , cb = function() {};

            Keypa.addEvent(obj, e, cb);

            var args = obj.attachEvent.mostRecentCall.args;

            expect(args[0]).toBe('on' + e);
            expect(args[1]).toBeFunction();
        });
    });

    describe('dispatch', function() {
        it('should be a function', function() {
            expect(Keypa.dispatch).toBeFunction();
        });

        it('should execute key callbacks using event key code', function() {
            var e = {
                keyCode: '27',
                ctrlKey: false,
                shiftKey: false
            };

            Keypa.keyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.keyCallbacks['27']).toHaveBeenCalledWith(e);
        });

        it('should execute key callbacks using event wich', function() {
            var e = {
                wich: '27',
                ctrlKey: false,
                shiftKey: false
            };

            Keypa.keyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.keyCallbacks['27']).toHaveBeenCalledWith(e);
        });

        it('should execute ctrl key callbacks using event key code', function() {
            var e = {
                keyCode: '27',
                ctrlKey: true,
                shiftKey: false
            };

            Keypa.ctrlKeyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.ctrlKeyCallbacks['27']).toHaveBeenCalledWith(e);
        });

        it('should execute ctrl key callbacks using event wich', function() {
            var e = {
                wich: '27',
                ctrlKey: true,
                shiftKey: false
            };

            Keypa.ctrlKeyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.ctrlKeyCallbacks['27']).toHaveBeenCalledWith(e);
        });

        it('should execute shift key callbacks using event key code', function() {
            var e = {
                keyCode: '27',
                ctrlKey: false,
                shiftKey: true
            };

            Keypa.shiftKeyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.shiftKeyCallbacks['27']).toHaveBeenCalledWith(e);
        });

        it('should execute shift key callbacks using event wich', function() {
            var e = {
                wich: '27',
                ctrlKey: false,
                shiftKey: true
            };

            Keypa.shiftKeyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.shiftKeyCallbacks['27']).toHaveBeenCalledWith(e);
        });

        it('should not execute any callback if there is no key code or wich', function() {
            Keypa.keyCallbacks['27'] = jasmine.createSpy();
            Keypa.ctrlKeyCallbacks['27'] = jasmine.createSpy();
            Keypa.shiftKeyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch({});

            expect(Keypa.keyCallbacks['27']).not.toHaveBeenCalled();
            expect(Keypa.ctrlKeyCallbacks['27']).not.toHaveBeenCalled();
            expect(Keypa.shiftKeyCallbacks['27']).not.toHaveBeenCalled();
        });

        it('should block callback execution', function() {
            var e = {
                wich: '27',
                ctrlKey: false,
                shiftKey: true
            };

            spyOn(Keypa, 'blockKeys').andReturn(true);
            Keypa.shiftKeyCallbacks['27'] = jasmine.createSpy();

            Keypa.dispatch(e);

            expect(Keypa.shiftKeyCallbacks['27']).not.toHaveBeenCalled();
        });

        it('should execute method to switch blocking states', function() {
            var e = {
                keyCode: '27',
                ctrlKey: false,
                shiftKey: true
            };

            spyOn(Keypa, 'switchBlockingStates');

            Keypa.dispatch(e);

            expect(Keypa.switchBlockingStates).toHaveBeenCalledWith(e.keyCode);
        });
    });

    describe('blockKeys', function() {
        beforeEach(function() {
            Keypa.blockingKeys = {
                '27': {
                    'active': false,
                    'unblockingKeys': ['13', '25']
                },
                '70': {
                    'active': true,
                    'unblockingKeys': ['17', '34']
                }
            };
        });

        it('should block key event', function() {
            // any other keys
            expect(Keypa.blockKeys('12')).toBeTruthy();
            expect(Keypa.blockKeys('14')).toBeTruthy();
            expect(Keypa.blockKeys('24')).toBeTruthy();
            expect(Keypa.blockKeys('26')).toBeTruthy();
            expect(Keypa.blockKeys('16')).toBeTruthy();
            expect(Keypa.blockKeys('18')).toBeTruthy();
            expect(Keypa.blockKeys('33')).toBeTruthy();
            expect(Keypa.blockKeys('35')).toBeTruthy();

            // blocking keys
            expect(Keypa.blockKeys('27')).toBeTruthy();
            expect(Keypa.blockKeys('70')).toBeTruthy();

            // unblocking keys of inactive blocking key
            expect(Keypa.blockKeys('13')).toBeTruthy();
            expect(Keypa.blockKeys('25')).toBeTruthy();
        });

        it('should block key event', function() {
            expect(Keypa.blockKeys('17')).toBeFalsy();
            expect(Keypa.blockKeys('34')).toBeFalsy();
        });
    });

    describe('switchBlockingStates', function() {
        beforeEach(function() {
            Keypa.blockingKeys = {
                '27': {
                    'active': false,
                    'unblockingKeys': ['13', '25']
                },
                '70': {
                    'active': true,
                    'unblockingKeys': ['17', '34']
                }
            };
        });

        it('should activate blocking key', function() {
            var expectedKeys = Keypa.blockingKeys;
            expectedKeys['27'].active = true;

            Keypa.switchBlockingStates('27');

            expect(Keypa.blockingKeys).toEqual(expectedKeys);
        });

        it('should deactivate blocking key using first unblocking key', function() {
            var expectedKeys = Keypa.blockingKeys;
            expectedKeys['70'].active = false;

            Keypa.switchBlockingStates('17');

            expect(Keypa.blockingKeys).toEqual(expectedKeys);
        });

        it('should deactivate blocking key using second unblocking key', function() {
            var expectedKeys = Keypa.blockingKeys;
            expectedKeys['70'].active = false;

            Keypa.switchBlockingStates('34');

            expect(Keypa.blockingKeys).toEqual(expectedKeys);
        });
    });

    describe('create', function() {
        it('should return a new instance of the keypa class', function() {
            spyOn(Keypa, 'addEvent');

            var keypa = Keypa.create()
              , args = Keypa.addEvent.mostRecentCall.args;

            expect(keypa instanceof Keypa).toBeTruthy();
            expect(Keypa.addEvent).toHaveBeenCalled();

            expect(args[0]).toBe(document);
            expect(args[1]).toBe('keydown');
            expect(args[2]).toBeFunction();
        });
    });

    describe('parseKeyCodes', function() {
        it('should parse key codes', function() {
            expect(Keypa.parseKeyCodes(['esc', 'enter'])).toEqual([27, 13]);
        });
    });

    describe('registerBlockingKeys', function() {
        beforeEach(function() {
            Keypa.blockingKeys = {
                '27': {
                    'active': false,
                    'unblockingKeys': ['13', '25']
                },
                '70': {
                    'active': true,
                    'unblockingKeys': ['17', '34']
                }
            };
        });

        it('should register new blocking keys', function() {
            var blockingKeys = ['10', '23']
              , unblockingKeys = ['13', '34'];

            var expectedKeys = {
                '27': {
                    'active': false,
                    'unblockingKeys': ['13', '25']
                },
                '70': {
                    'active': true,
                    'unblockingKeys': ['17', '34']
                },
                '10': {
                    'active': false,
                    'unblockingKeys': unblockingKeys
                },
                '23': {
                    'active': false,
                    'unblockingKeys': unblockingKeys
                }
            };

            Keypa.registerBlockingKeys(blockingKeys, unblockingKeys);

            expect(Keypa.blockingKeys).toEqual(expectedKeys);
        });

        it('should register existing blocking keys', function() {
            var blockingKeys = ['27', '70']
              , unblockingKeys = ['13', '34'];

            var expectedKeys = {
                '27': {
                    'active': false,
                    'unblockingKeys': ['13', '25', '34']
                },
                '70': {
                    'active': true,
                    'unblockingKeys': ['17', '34', '13']
                }
            };

            Keypa.registerBlockingKeys(blockingKeys, unblockingKeys);

            expect(Keypa.blockingKeys).toEqual(expectedKeys);
        });
    });

    describe('on', function() {
        it('should register callbacks for given keys', function() {
            Keypa.keyCodes['esc'] = 27;

            var keypa = Keypa.create();

            keypa.on('esc', function(e) {
                return 'test';
            });

            expect(Keypa.keyCallbacks['27']).toBeFunction();
            expect(Keypa.keyCallbacks['27']()).toBe('test');
        });
    });

    describe('onCtrl', function() {
        it('should register callbacks for given ctrl keys', function() {
            Keypa.keyCodes['esc'] = 27;

            var keypa = Keypa.create();

            keypa.onCtrl('esc', function(e) {
                return 'test';
            });

            expect(Keypa.ctrlKeyCallbacks['27']).toBeFunction();
            expect(Keypa.ctrlKeyCallbacks['27']()).toBe('test');
        });
    });

    describe('onShift', function() {
        it('should register callbacks for given shift keys', function() {
            Keypa.keyCodes['esc'] = 27;

            Keypa.create().onShift('esc', function(e) {
                return 'test';
            });

            expect(Keypa.shiftKeyCallbacks['27']).toBeFunction();
            expect(Keypa.shiftKeyCallbacks['27']()).toBe('test');
        });
    });

    describe('blocks', function() {
        it('should register blocking keys', function() {
            spyOn(Keypa, 'registerBlockingKeys');

            Keypa.create().blocks(['f', 'c'], ['a', 'esc']);

            expect(Keypa.registerBlockingKeys).toHaveBeenCalledWith([70, 67], [65, 27]);
        });
    });








    /*
     * Helper tests.
     */
    describe('inArray', function() {
        it('should be a function', function() {
            expect(inArray).toBeFunction();
        });

        it('should return true if item exists in array', function() {
            expect(inArray('a', ['c', 'a', 'b'])).toBeTruthy();
        });

        it('should return false if item not exists in array', function() {
            expect(inArray('a', ['c', 'b'])).toBeFalsy();
        });
    });

    describe('isArray', function() {
        it('should be a function', function() {
            expect(isArray).toBeFunction();
        });

        it('should return true if tested item is an array', function() {
            expect(isArray(['a', 'c', 'b'])).toBeTruthy();
        });

        it('should return false if tested item is not an array', function() {
            expect(isArray({'a': 'b'})).toBeFalsy();
            expect(isArray('abcdefgh')).toBeFalsy();
        });
    });

    describe('forEach', function() {
        it('should be a function', function() {
            expect(forEach).toBeFunction();
        });

        it('should iterate through an array', function() {
            var data = [];

            forEach(['a', 'c', 'b'], function(index, value) {
                data.push([index, value]);
            });

            expect(data.length).toBe(3);
            expect(data[0]).toEqual([0, 'a']);
            expect(data[1]).toEqual([1, 'c']);
            expect(data[2]).toEqual([2, 'b']);
        });

        it('should continue array iteration', function() {
            var data = [];

            forEach(['a', 'c', 'b'], function(index, value) {
                if(value === 'c') return 'continue';

                data.push([index, value]);
            });

            expect(data.length).toBe(2);
            expect(data[0]).toEqual([0, 'a']);
            expect(data[1]).toEqual([2, 'b']);
        });

        it('should break array iteration', function() {
            var data = [];

            forEach(['a', 'c', 'b'], function(index, value) {
                if(value === 'c') return 'break';

                data.push([index, value]);
            });

            expect(data.length).toBe(1);
            expect(data[0]).toEqual([0, 'a']);
        });

        it('should iterate through an object', function() {
            var data = [];

            forEach({'0': 'a', '1': 'c', '2': 'b'}, function(key, value) {
                data.push([key, value]);
            });

            expect(data.length).toBe(3);
            expect(data[0]).toEqual(['0', 'a']);
            expect(data[1]).toEqual(['1', 'c']);
            expect(data[2]).toEqual(['2', 'b']);
        });

        it('should continue object iteration', function() {
            var data = [];

            forEach({'0': 'a', '1': 'c', '2': 'b'}, function(index, value) {
                if(value === 'c') return 'continue';

                data.push([index, value]);
            });

            expect(data.length).toBe(2);
            expect(data[0]).toEqual(['0', 'a']);
            expect(data[1]).toEqual(['2', 'b']);
        });

        it('should break object iteration', function() {
            var data = [];

            forEach({'0': 'a', '1': 'c', '2': 'b'}, function(index, value) {
                if(value === 'c') return 'break';

                data.push([index, value]);
            });

            expect(data.length).toBe(1);
            expect(data[0]).toEqual(['0', 'a']);
        });
    });

    describe('merge', function() {
        it('should be a function', function() {
            expect(merge).toBeFunction();
        });

        it('should merge arrays uniquly', function() {
            expect(merge([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        });

        it('should not modify input arrays', function() {
            var a1 = [1, 2, 3]
              , a2 = [2, 3, 4]
              , a3 = [3, 4, 5];

            merge([1, 2, 3], [2, 3, 4], [3, 4, 5]);

            expect(a1).toEqual([1, 2, 3]);
            expect(a2).toEqual([2, 3, 4]);
            expect(a3).toEqual([3, 4, 5]);
        });
    });
});

