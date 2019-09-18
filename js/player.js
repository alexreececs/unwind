/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var player = (function Player() {
    const states = {
        JUMPING: 'JUMPING',
        MOVING: 'MOVING',
        COLLIDED: 'COLLIDED'
    }

    var _fillStyle;
    function setFillStyle(fillStyle) {
        _fillStyle = fillStyle;
    }
    //Player Attributes
    var point; //The point at which the game character is centered around
    var playerRadius = 25;
    var velocityY;
    var posistionY;
    var jumping;

    function initialize() {
        _fillStyle = "gold";
        point = hills.getPoints()[Math.floor(hills.getPoints().length / 3)];
        posistionY = point.y;
        velocityY = 0;
        jumping = false;
    }

    function updateY() {
        velocityY += 1.5;// gravity
        posistionY += Math.round(velocityY);
        velocityY *= 0.95;// friction

        // if player is falling below hill line
        if (posistionY + playerRadius >= point.y) {
            jumping = false;
            posistionY = point.y - playerRadius;
            velocityY = 0;
        }

        //Is thep player jumping?   
        if (ic.spacePressed() && jumping == false) {
            velocityY -= 30; //speed 
            jumping = true;
        }
    }

    //updates the players (x,y) posistion and velocities
    function update() {
        //update the player posistion relative to the hill 
        point = hills.getPoints()[Math.floor(hills.getPoints().length / 3)];
        //update the y posistion relative to the velecity
        updateY();
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

    //Draw the Player to the canvas
    function draw() {
        game.getContext().beginPath();
        game.getContext().fillStyle = _fillStyle;
        game.getContext().arc(point.x, posistionY, playerRadius, 0, 2 * Math.PI);
        game.getContext().fill();
    }

    return {
        setFillStyle: setFillStyle,
        initialize: initialize,
        draw: draw,
        update: update,
    }
})();