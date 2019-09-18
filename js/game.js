/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var game = (function Game() {
    const states = {
        MAIN_MENU: 'MAIN_MENU',
        CHARACTER_SELECTION: 'CHARACTER_SELECTION',
        PLAYING: 'PLAYING',
        GAME_OVER: 'GAME_OVER',
    }

    var gameState;
    var canvas = document.getElementById('gameCanvas'); //the games canvas
    var ctx = canvas.getContext('2d'); //context of the canvas

    function getState() {
        return gameState;
    }

    function setState(state) {
        gameState = state;
    }

    function getContext() {
        return ctx;
    }

    function getHeight() {
        return canvas.height;
    }

    function getWidth() {
        return canvas.width;
    }

    //function that updates game state
    function update() {
        //State machine for the game
        switch (gameState) {
            case states.MAIN_MENU:
                menu.updateMainMenu();
                if (ic.enterPressed()) {
                    gameState = states.CHARACTER_SELECTION;
                }
                break;
            case states.CHARACTER_SELECTION:
                menu.updateCharacterSelect();
                if (ic.spacePressed()) {
                    gameState = states.PLAYING;
                }
                break;
            case states.PLAYING:
                updateGame();
                break;
            case states.GAME_OVER:
                if (ic.spacePressed()) {
                    gameState = states.MAIN_MENU;
                }
                break;
        }
    }

    function updateGame() {
        score.update();
        hills.update();
        player.update();
        obstacle.update();
        // collision();
    }
    function draw() {
        game.getContext().save();
        //Rub out the last frame.
        game.getContext().clearRect(0, 0, game.getWidth(), game.getHeight());

        switch (gameState) {
            case states.MAIN_MENU:
                menu.drawMainMenu();
                break;
            case states.CHARACTER_SELECTION:
                menu.drawCharacterSelect();
                break;
            case states.PLAYING:
                score.draw();
                hills.draw();
                obstacle.draw();
                player.draw();
                break;
            case states.GAME_OVER:
                game.getContext().font = "30px Arial";
                game.getContext().fillStyle = "green";
                game.getContext().fillText("Game Over", game.getWidth() / 4, game.getHeight() / 4);
                game.getContext().fillText("Score: " + score, game.getWidth() / 4, game.getHeight() / 3);
                game.getContext().fillText("Press Space To Try Again", game.getWidth() / 4, game.getHeight() / 2);
                break;
        }

        getContext().restore();
    }

    function loop() {
        update();
        draw();
    }

    function initialize() {
        gameState = states.MAIN_MENU;
        score.initialize();
        hills.initialize();
        player.initialize();
    }
    //Initialize game states and start the loop 
    function start() {
        //Initialize Game state and objects

        initialize();
        //Event Handlers
        document.addEventListener("keydown", ic.keyDownHandler, false);
        document.addEventListener("keyup", ic.keyUpHandler, false);

        //Start the game loop
        setInterval(() => { requestAnimationFrame(loop); }, 1000 / 33);
    }

    return {
        start: start,
        states: states,
        getState: getState,
        setState: setState,
        getContext: getContext,
        getHeight: getHeight,
        getWidth: getWidth,
    }
})();