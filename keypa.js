/*
 *
 * Keypa module to dispatch keyevents.
 *
 * Version 0.0.1
 */

/*
 * Class function definition.
 */
function Keypa() {};

/*
 *
 * Class properties.
 *
 */

/*
 * Possible key codes to register.
 */
Keypa.keyCodes = {
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
    'z': 90,
};

/*
 * Object to register key callbacks.
 */
Keypa.keyCallbacks = {};

/*
 * Add a new eventlistener to the given object.
 *
 * @param object obj, the object to add a new event listener.
 * @param string e, name of the event to add.
 * @param function cb, callback to execute when registered event is fired.
 */
Keypa.addEvent = function addEvent(obj, e, cb) {
    if(obj.addEventListener) obj.addEventListener(e, cb, false);
    else if(obj.attachEvent) obj.attachEvent('on' + e, function() { cb(window.event) });
};

/*
 * Dispatch events.
 *
 * @param object e, object of a current event.
 */
Keypa.dispatch = function dispatch(e) {
    var keyCode = e.keyCode || e.wich || ''
      , method = Keypa.keyCallbacks[keyCode];

    if(typeof method === 'function') method(e);
};

/*
 * Create a new Keypa instance.
 *
 * @return object, a new Keypa instance.
 */
Keypa.create = function create() {
    var self = new this();

    Keypa.addEvent(document, 'keydown', Keypa.dispatch);

    return self;
};

/*
 *
 * Instance properties.
 *
 */

/*
 * Register callbacks for events.
 *
 * @param string e, name of the event.
 * @param function cb, callback to register.
 */
Keypa.prototype.on = function on(e, cb) {
    Keypa.keyCallbacks[Keypa.keyCodes[e]] = cb;
};

