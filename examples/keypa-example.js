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

