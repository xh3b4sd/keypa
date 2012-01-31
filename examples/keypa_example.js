/*
 * Create a new keypa instance.
 */
var keypa = Keypa.create();

/*
 * Register some events.
 *
 * @param object e, object of the fired keyboard event.
 */
keypa.on('x', function(e) {
    console.log('#### key "x" was pressed ####');
});

keypa.on('a', function(e) {
    console.log('#### key "a" was pressed ####');
});

keypa.on('space', function(e) {
    console.log('#### key "space" was pressed ####');
});

keypa.on('enter', function(e) {
    console.log('#### key "enter" was pressed ####');
});

keypa.on('esc', function(e) {
    console.log('#### key "esc" was pressed ####');
});

keypa.on('down arrow', function(e) {
    console.log('#### key "down arrow" was pressed ####');
});

keypa.onCtrl('down arrow', function(e) {
    console.log('#### key "cctrl + down arrow" was pressed ####');
});

keypa.onShift('down arrow', function(e) {
    console.log('#### key "shift + down arrow" was pressed ####');
});

/*
 * Register blocking keys and unblocking keys.
 */
keypa.blocks(['f'], ['enter', 'esc']);

keypa.on('f', function(e) {
    console.log('#### key "f" was pressed and blocks now any other keys ####');
    console.log('#### press key "enter" or "esc" to unblock keys ####');
});

