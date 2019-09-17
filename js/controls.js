var ic = (function InputControl() {
    var _spacePressed = false;
    var _enterPressed = false;
    var _upArrowPressed = false;
    var _downArrowPressed = false;

    function keyDownHandler(e) {
        if (e.keyCode == 32 || e.keyCode == 0) {
            _spacePressed = true;
        }
        else if (e.keyCode == 13) {
            _enterPressed = true;
        }
        else if (e.keyCode == 38) {
            _upArrowPressed = true;
        }
        else if (e.keyCode == 40) {
            _downArrowPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 32 || e.keyCode == 0) {
            _spacePressed = false;
        }
        else if (e.keyCode == 13) {
            _enterPressed = false;
        }
        else if (e.keyCode == 38) {
            _upArrowPressed = false;
        }
        else if (e.keyCode == 40) {
            _downArrowPressed = false;
        }
    }

    function spacePressed() {
        return _spacePressed;
    }

    function enterPressed() {
        return _enterPressed;
    }

    function downArrowPressed() {
        return _downArrowPressed;
    }

    function upArrowPressed() {
        return _upArrowPressed;
    }

    return {
        keyDownHandler: keyDownHandler,
        keyUpHandler: keyUpHandler,
        spacePressed: spacePressed,
    }
})();