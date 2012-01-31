# Keypa

  Keypa is a super simple key event dispatcher that makes
  registering callbacks to keyevents easy.



## Usage

  Just include the **keypa.js** file in your page and create
  a new keypa instance. So you are able to register key events.

    <script src="keypa.js"></script>

    <script>
        var keypa = Keypa.create();

        keypa.on('esc', function(e) {
            // this function is called on pressing "escape"
            // "e" is the fired key event
        });
    </script>

  Checkout the example file by pointing your browser to
  **/examples/keypa_example.html**.

  It is possible to register blocking key events. So you can
  create key events, that blocks all other keys when they are
  active. The following code will unblock all blocked keys on
  the "enter" and "esc" key, that are blocked by key "f".

    <script>
        keypa.blocks(['f'], ['enter', 'esc']);

        keypa.on('f', function(e) {
            console.log('#### key "f" was pressed and blocks now any other keys ####');
            console.log('#### press key "enter" or "esc" to unblock keys ####');
        });
    </script>



## Tests

  Tests are implemented with https://github.com/pivotal/jasmine
  Just point your browser to **/test/keypa_test.html**.



## Questions and suggestions?

  Send me a message on github.

