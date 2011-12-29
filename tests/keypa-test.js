/*
 *
 * Keypa test module.
 *
 */

test('"Keypa" should be a function', function() {
    equal(typeof Keypa, 'function');
});

test('"Keypa.keyCodes" should contain correct key codes', function() {
    var keyCodes = {
        'backspace': 8,
        'enter': 13,
        'ctrl': 17,
        'esc': 27,
        'space': 32,
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
        'z': 90,
    };

    deepEqual(Keypa.keyCodes, keyCodes);
});

test('"Keypa.keyCallbacks" should be an empty object', function() {
    deepEqual(Keypa.keyCallbacks, {});
});

test('"Keypa.addEvent" adds event listeners correctly', function() {
    equal(typeof Keypa.addEvent, 'function');

    // Test "addEventListener".
    var obj = {
        addEventListener: function(e, cb, bool) {
            equal(e, 'keydown');
            equal(typeof cb, 'function');
            equal(cb(), 'test');
            equal(bool, false);
        }
    };

    var e = 'keydown';

    var cb = function cb() {
        return 'test';
    };

    Keypa.addEvent(obj, e, cb);

    // test "attachEvent".
    var obj = {
        attachEvent: function(e, cb) {
            equal(e, 'onkeydown');
            equal(typeof cb, 'function');
            cb();
        }
    };

    var e = 'keydown';

    var cb = function cb(windowEvent) {
        deepEqual(windowEvent, window.event);
    };

    Keypa.addEvent(obj, e, cb);
});

test('"Keypa.dispatch" controles event dispatching correctly', function() {
    equal(typeof Keypa.dispatch, 'function');

    // Test "e.keyCode".
    Keypa.keyCallbacks['27'] = function(e) {
        equal(e.keyCode, '27');
    };

    Keypa.dispatch({keyCode: '27'});

    // Test "e.wich".
    Keypa.keyCallbacks['27'] = function(e) {
        equal(e.wich, '27');
    };

    Keypa.dispatch({wich: '27'});

    // Test fallback.
    Keypa.keyCallbacks['27'] = function(e) {
        equal(true, false, 'callback should´t be fired if there is no "e.keyCode" or "e.wich" given');
    };

    Keypa.dispatch({});
});

test('"Keypa.create" returns a new "keypa" instance', function() {
    Keypa.addEvent = function(obj, e, cb) {
        deepEqual(obj, document);
        equal(e, 'keydown');
        equal(cb(), 'test');
    };

    Keypa.dispatch = function() {
        return 'test';
    };

    var keypa = Keypa.create();

    equal(typeof keypa.on, 'function', '"keypa.on" should be a function');
});

test('instance method "keypa.on" should register a callback to the given key', function() {
    var keypa = Keypa.create();

    Keypa.keyCodes['esc'] = 27;

    keypa.on('esc', function(e) {
        return 'test';
    });

    equal(typeof Keypa.keyCallbacks['27'], 'function');
    equal(Keypa.keyCallbacks['27'](), 'test');
});

