var player = (function Player() {
    //Player Attributes
    var playerX; //The point at which the game character is centered around
    var playerRadius = 25;
    var velocityY = 0;
    var posistionY = 0;
    var jumping = false;

    function updateX() {
        playerX = hills.getPoints()[Math.floor(hills.getPoints().length / 3)];
    }

    function updateY() {
        velocityY += 1.5;// gravity
        posistionY += Math.round(velocityY);
        velocityY *= 0.95;// friction


        // if player is falling below hill line
        if (posistionY + playerRadius >= playerX.y) {
            jumping = false;
            posistionY = playerX.y - playerRadius;
            velocityY = 0;
        }

        //Is thep player jumping?   
        if (ic.spacePressed() && jumping == false) {
            velocityY -= speed;
            jumping = true;
        }
    }
    //updates the players (x,y) posistion and velocities
    function update() {
        updateX();
        updateY();
    }

    //Draw the Player to the canvas
    function draw() {
        ctx.beginPath();
        ctx.strokeStyle = "gold";
        ctx.arc(playerX.x, posistionY, playerRadius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    return {
        draw: draw,
        update: update,
    }
})();