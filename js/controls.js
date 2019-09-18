
/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var ic = (function InputControl() {
    var _spacePressed = false;
    var _enterPressed = false;
    var _upArrowPressed = false;
    var _downArrowPressed = false;
    var _onePressed = false;
    var _twoPressed = false;
    var _threePressed = false;

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
        else if (e.keyCode == 49) {
            _onePressed = true;
        }
        else if (e.keyCode == 50) {
            _twoPressed = true;
        }
        else if (e.keyCode == 51) {
            _threePressed = true;
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
        else if (e.keyCode == 49) {
            _onePressed = false;
        }
        else if (e.keyCode == 50) {
            _twoPressed = false;
        }
        else if (e.keyCode == 51) {
            _threePressed = false;
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

    function onePressed() {
        return _onePressed;
    }

    function twoPressed() {
        return _twoPressed;
    }

    function threePressed() {
        return _threePressed;
    }

    return {
        keyDownHandler: keyDownHandler,
        keyUpHandler: keyUpHandler,
        spacePressed: spacePressed,
        enterPressed: enterPressed,
        upArrowPressed: upArrowPressed,
        downArrowPressed: downArrowPressed,
        onePressed:onePressed,
        twoPressed:twoPressed,
        threePressed:threePressed,
    }
})();