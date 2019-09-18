/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var menu = (function Menu() {

    var _mainMenu = [
        { text: "Select By Pressing a #", fillStyle: "DeepSkyBlue", indicated: false },
        { text: "1. Start Game", fillStyle: "lime", indicated: false },
        { text: "2. High Scores", fillStyle: "gold", indicated: false },
        { text: "Press Enter to Confirm Selection", fillStyle: "DeepSkyBlue", indicated: false }
    ];
    var _mainMenuIndex = 1;

    var _characterSelectMenu = [
        { text: "Select Character By Pressing a #", fillStyle: "DeepSkyBlue", indicated: false },
        { text: "1. Gold Thunder", fillStyle: "gold", indicated: false },
        { text: "2. Purple Rain", fillStyle: "magenta", indicated: false },
        { text: "3. Snow White", fillStyle: "white", indicated: false },
        { text: "Press Space To Confirm Selection", fillStyle: "DeepSkyBlue", indicated: false }
    ];
    var _characterSelectIndex = 1;

    function updateMainMenu() {
        _mainMenu.forEach(i => { i.indicated = false; });
        if (ic.onePressed()) {
            _mainMenuIndex = 1;
        }
        else if (ic.twoPressed()) {
            _mainMenuIndex = 2;
        }
        if (_mainMenuIndex)
            _mainMenu[_mainMenuIndex].indicated = true;
    }

    function updateCharacterSelect() {
        _characterSelectMenu.forEach(i => { i.indicated = false; });
        if (ic.onePressed()) {
            _characterSelectIndex = 1;
        }
        else if (ic.twoPressed()) {
            _characterSelectIndex = 2;
        }
        else if (ic.threePressed()) {
            _characterSelectIndex = 3;
        }
        if (_mainMenuIndex)
            _characterSelectMenu[_characterSelectIndex].indicated = true;

        switch (_characterSelectIndex) {
            case 1: player.setFillStyle("gold");
                break;
            case 2: player.setFillStyle("magenta")
                break;
            case 3: player.setFillStyle("white")
                break;
        }
    }

    function drawMainMenu() {
        drawMenuList(_mainMenu);
    }

    function drawCharacterSelect() {
        drawMenuList(_characterSelectMenu);
    }

    function drawIndicator(x, y) {
        var ctx = game.getContext();
        var size = 25
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x, y);
        ctx.fill();
    }

    function drawMenuList(menu) {
        var ctx = game.getContext();
        ctx.font = "30px Arial";
        for (var i = 0; i < menu.length; i++) {
            var scaleFactor = (i + 1) / 10;
            var x = game.getWidth() / 4;
            var y = scaleFactor * game.getHeight();
            ctx.fillStyle = menu[i].fillStyle;
            ctx.fillText(menu[i].text, x, y);
            if (menu[i].indicated) {
                drawIndicator(x + 240, y - parseInt(ctx.font));
            }
        }
    }

    return {
        updateMainMenu: updateMainMenu,
        updateCharacterSelect: updateCharacterSelect,
        drawMainMenu: drawMainMenu,
        drawCharacterSelect: drawCharacterSelect,
    }
})();