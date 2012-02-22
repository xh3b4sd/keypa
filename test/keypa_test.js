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
        toBeObject: function() {
            return typeof this.actual === 'object' && !Array.isArray(this.actual);
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

    describe('instance', function() {
        it('should be an object', function() {
            expect(Keypa()).toBeObject();
        });
    });

    describe('keypa.keyCodes', function() {
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

            expect(Keypa().keyCodes).toEqual(keyCodes);
        });
    });

    describe('keypa.keyCallbacks', function() {
        it('should be an empty object', function() {
            expect(Keypa().keyCallbacks).toBeEmptyObject();
        });
    });

    describe('keypa.ctrlKeyCallbacks', function() {
        it('should be an empty object', function() {
            expect(Keypa().ctrlKeyCallbacks).toBeEmptyObject();
        });
    });

    describe('keypa.shiftKeyCallbacks', function() {
        it('should be an empty object', function() {
            expect(Keypa().shiftKeyCallbacks).toBeEmptyObject();
        });
    });

    describe('keypa.blockingKeys', function() {
        it('should be an empty object', function() {
            expect(Keypa().blockingKeys).toBeEmptyObject();
        });
    });

    describe('keypa.on', function() {
        it('should be a function', function() {
            expect(Keypa().on).toBeFunction();
        });

        it('should register key callbacks', function() {
            var keypa = Keypa();
            keypa.on('x', function() {});

            expect(keypa.keyCallbacks['88']).toBeFunction();
        });
    });

    describe('keypa.onCtrl', function() {
        it('should be a function', function() {
            expect(Keypa().onCtrl).toBeFunction();
        });

        it('should register ctrl key callbacks', function() {
            var keypa = Keypa();
            keypa.onCtrl('x', function() {});

            expect(keypa.ctrlKeyCallbacks['88']).toBeFunction();
        });
    });

    describe('keypa.onShift', function() {
        it('should be a function', function() {
            expect(Keypa().onShift).toBeFunction();
        });

        it('should register shift key callbacks', function() {
            var keypa = Keypa();
            keypa.onShift('x', function() {});

            expect(keypa.shiftKeyCallbacks['88']).toBeFunction();
        });
    });

    describe('keypa.blocks', function() {
        it('should be a function', function() {
            expect(Keypa().blocks).toBeFunction();
        });

        it('should register blocking keys', function() {
            var keypa = Keypa();
            keypa.blocks(['x'], ['y', 'z']);

            var expected = {
                '88': {
                    active: false,
                    unblockingKeys: [89, 90]
                }
            };

            expect(keypa.blockingKeys).toEqual(expected);
        });
    });
});

