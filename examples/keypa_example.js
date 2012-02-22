/*
 * Create a new keypa instance.
 */
var keypa = Keypa();

/*
 * Register some events.
 *
 * @param object e, object of the fired keyboard event.
 */
keypa.on('a', function(e) {
    console.log('#### key "a" was pressed ####');
});

keypa.on('enter', function(e) {
    console.log('#### key "enter" was pressed ####');
});

keypa.on('esc', function(e) {
    console.log('#### key "esc" was pressed ####');
});

keypa.onCtrl('a', function(e) {
    console.log('#### key "ctrl + a" was pressed ####');
});

keypa.onShift('a', function(e) {
    console.log('#### key "shift + a" was pressed ####');
});

/*
 * Register blocking keys and unblocking keys.
 */
keypa.blocks(['f'], ['enter', 'esc']);

keypa.on('f', function(e) {
    console.log('#### key "f" was pressed and blocks now any other keys ####');
    console.log('#### press key "enter" or "esc" to unblock keys ####');
});

/*
 * Create a new keypa instance again.
 */
var keypa = Keypa();

keypa.on('a', function(e) {
    console.log('++++ key "a" was pressed ++++');
});

