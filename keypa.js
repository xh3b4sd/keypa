/*
 *
 * Keypa module to dispatch keyevents.
 *
 * Version 0.0.3
 */

/*
 * Class function definition.
 */
var Keypa = function() {
    /*
     *
     * public
     *
     */

    var self = {};

    self.keyCodes = {
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

    /*
     * Object to register key callbacks.
     */
    self.keyCallbacks = {};

    /*
     * Object to register ctrl key callbacks.
     */
    self.ctrlKeyCallbacks = {};

    /*
     * Object to register shift key callbacks.
     */
    self.shiftKeyCallbacks = {};

    /*
     * Object to register blocking keys.
     */
    self.blockingKeys = {};

    /*
     * Register callbacks for events.
     *
     * @param string e, name of the event.
     * @param function cb, callback to register.
     */
    self.on = function(e, cb) {
        self.keyCallbacks[self.keyCodes[e]] = cb;
    };

    /*
     * Register callbacks for ctrl events.
     *
     * @param string e, name of the event.
     * @param function cb, callback to register.
     */
    self.onCtrl = function(e, cb) {
        self.ctrlKeyCallbacks[self.keyCodes[e]] = cb;
    };

    /*
     * Register callbacks for shift events.
     *
     * @param string e, name of the event.
     * @param function cb, callback to register.
     */
    self.onShift = function(e, cb) {
        self.shiftKeyCallbacks[self.keyCodes[e]] = cb;
    };

    /*
     * Dispatch keys to block and unblock key events.
     *
     * @param array blockingKeys, the keys that blocks key events.
     * @param array unblockingKeys, the keys that unblock key events.
     */
    self.blocks = function(blockingKeys, unblockingKeys) {
        blockingKeys = parseKeyCodes(blockingKeys);
        unblockingKeys = parseKeyCodes(unblockingKeys);

        registerBlockingKeys(blockingKeys, unblockingKeys);
    };

    /*
     *
     * private
     *
     */

    /*
     * Check if an element exists in an array.
     *
     * @param needle, the term to search for.
     * @param array haystack, the array to search trough.
     *
     * @return boolean, if the search term was found or not.
     */
    function inArray(needle, haystack) {
        if(haystack.indexOf(needle) === -1) return false;
        else return true;
    }

    /*
     * Check if a variable is an array or not.
     *
     * @param unknown object, the variable to check.
     *
     * @return boolean, if object is array or not.
     */
    function isArray(object) {
        if(object.constructor.toString().indexOf('Array') === -1) return false;
        else return true;
    }

    /*
     * Iterate trough an iteratable array or object.
     *
     * @param array || object object, the iteratable array or object to walk trough.
     * @param function cb, the callback to execute.
     */
    function forEach(object, cb) {
        var i = 0;

        if(isArray(object)) {
            var ii = object.length;

            for(i; i < ii; i++) {
                var returnValue = cb(i, object[i]);

                if(returnValue === 'break') break;
                if(returnValue === 'continue') continue;
            }
        } else {
            var keys = Object.keys(object)
              , ii = keys.length;

            for(i; i < ii; i++) {
                var key = keys[i];

                if(object.hasOwnProperty(key)) {
                    var returnValue = cb(key, object[key]);

                    if(returnValue === 'break') break;
                    if(returnValue === 'continue') continue;
                }
            }
        }
    }

    /*
     * Merge arrays uniquly.
     *
     * @param arrays, minimum 2 arrays to merge.
     *
     * @return array
     */
    function merge() {
        var data = [];

        forEach(arguments, function(key, array) {
            forEach(array, function(index, value) {
                if(data.indexOf(value) === -1) data.push(value);
            });
        });

        return data;
    }

    /*
     * Add a new eventlistener to the given object.
     *
     * @param object obj, the object to add a new event listener.
     * @param string e, name of the event to add.
     */
    function addEvent(obj, e) {
        if(obj.addEventListener) {
            return obj.addEventListener(e, dispatch, false);
        }

        if(obj.attachEvent) {
            return obj.attachEvent('on' + e, function() {
                dispatch(window.event);
            });
        }
    }

    /*
     * Dispatch events.
     *
     * @param object e, object of a current event.
     */
    function dispatch(e) {
        var keyCode = e.keyCode || e.wich || ''
          , blocking = blockKeys(keyCode);

        switchBlockingStates(keyCode);

        if(blocking) return;

        var method = self.keyCallbacks[keyCode]
          , ctrlMethod = self.ctrlKeyCallbacks[keyCode]
          , shiftMethod = self.shiftKeyCallbacks[keyCode]

        if(typeof ctrlMethod === 'function' && e.ctrlKey === true) {
            return ctrlMethod(e);
        }

        if(typeof shiftMethod === 'function' && e.shiftKey === true) {
            return shiftMethod(e);
        }

        if(typeof method === 'function' && e.ctrlKey === false && e.shiftKey === false) {
            return method(e);
        }
    }

    /*
     * Check if the currently pressed key is blocked or not.
     *
     * @param number keyCode, key code of the currently pressed key.
     *
     * @return boolean blocking, if the currently pressed key is blocked or not.
     */
    function blockKeys(keyCode) {
        var blocking = false;

        forEach(self.blockingKeys, function(key, value) {
            if(!value.active) return 'continue';

            if(!inArray(keyCode, value.unblockingKeys)) {
                blocking = true;
                return 'break';
            }
        });

        return blocking;
    }

    /*
     * Switch the blocking state of a registered blocking key.
     *
     * @return boolean blocking, if the currently pressed key is blocked or not.
     */
    function switchBlockingStates(keyCode) {
        forEach(self.blockingKeys, function(key, value) {
            if(key == keyCode && !value.active) {
                value.active = true;
            } else if(value.active && inArray(keyCode, value.unblockingKeys)) {
                value.active = false;
            }
        });
    }

    /*
     * Parse human readable keys into key codes.
     *
     * @param array keys, the keys to parse.
     *
     * @return array keys, the parsed key codes.
     */
    function parseKeyCodes(keys) {
        forEach(keys, function(index, value) {
            keys.push(self.keyCodes[keys.shift()]);
        });

        return keys;
    }

    /*
     * Register keys that blocks and unblock key events.
     *
     * @param array blockingKeys, the keys that blocks key events.
     * @param array unblockingKeys, the keys that unblock key events.
     */
    function registerBlockingKeys(blockingKeys, unblockingKeys) {
        forEach(blockingKeys, function(index, value) {
            var blockingKey = self.blockingKeys[value];

            if(typeof blockingKey === 'undefined') {
                self.blockingKeys[value] = {
                    active: false,
                    unblockingKeys: unblockingKeys
                }
            } else {
                self.blockingKeys[value].unblockingKeys =
                    merge(blockingKey.unblockingKeys, unblockingKeys);
            }
        });
    }

    // Add event listeners.
    addEvent(document, 'keydown');

    return self;
};

