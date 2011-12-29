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
  **/examples/keypa-example.html**.



## Tests

  Tests are implemented with https://github.com/jquery/qunit.
  Just point your browser to **/tests/keypa-test.html**.



## Questions and suggestions?

  Send me a message on github.

