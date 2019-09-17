/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/

var game = (function Game() {
    //TODO make collision detection work properly
    //Game Properties
    var canvas = document.getElementById('gameCanvas'); //the games canvas
    var ctx = canvas.getContext('2d'); //context of the canvas
    var gameOver = false;
    var playing = false;
    var score = 0;

    const states = {
        MAIN_MENU: 'MAIN_MENU',
        CHARACTER_SELECTION: 'CHARACTER_SELECTION',
        PLAYING: 'PLAYING',
        GAME_OVER: 'GAME_OVER',
    }

    var gameState = states.MAIN_MENU;

    function drawScore() {
        getContext().font = "16px Arial";
        getContext().fillStyle = "green";
        getContext().fillText("Score: " + score, 0, game.getHeight());
    }
    function updateScore() {
        if (playing) {
            score++;
        }
    }

    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    function collision() {
        if (nextObstaclePoint) {
            var circle1 = { radius: playerRadius, x: playerPoint.x, y: posistionY - playerRadius };
            var circle2 = { radius: obstacleRadius, x: nextObstaclePoint.x, y: nextObstaclePoint.y - obstacleRadius };
            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circle1.radius + circle2.radius) { gameOver = true; playing = false; }
        }
    }

    //function that updates game state
    function update() {
        //State machine for the game
        switch (gameState) {
            case states.MAIN_MENU:
                if (ic.enterPressed()) {
                    gameState = states.CHARACTER_SELECTION;
                }
                break;
            case states.CHARACTER_SELECTION:
                if (ic.spacePressed()) {
                    gameState = states.PLAYING;
                    //initilize game variables fof the state transision
                    hills.initialize();
                    playing = true;
                    gameOver = false;
                    score = 0;
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
        updateScore();
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
                drawScore();
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

    function start() {
        //Handlers
        document.addEventListener("keydown", ic.keyDownHandler, false);
        document.addEventListener("keyup", ic.keyUpHandler, false);
        //start the game loop
        setInterval(() => { requestAnimationFrame(loop); }, 1000 / 33);
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
    return {
        start: start,
        getContext: getContext,
        getHeight: getHeight,
        getWidth: getWidth,
    }
    
})();