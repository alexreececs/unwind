var player = (function InputControl() {
    //Player Attributes
    var playerPoint; //The point at which the game character is centered around
    var playerRadius = 25;
    var velocityY = 0;
    var posistionY = 0;
    var jumping = false;

    //updates the players (x,y) posistion and velocities
    function update() {
        //update the x of the player
        playerPoint = pts1[Math.floor(pts1.length / 3)];

        velocityY += 1.5;// gravity
        posistionY += Math.round(velocityY);
        velocityY *= 0.95;// friction


        // if player is falling below hill line
        if (posistionY + playerRadius >= playerPoint.y) {
            jumping = false;
            posistionY = playerPoint.y - playerRadius;
            velocityY = 0;
        }

        //Is thep player jumping?   
        if (ic.spacePressed() && jumping == false) {
            velocityY -= speed;
            jumping = true;
        }
    }

    //Draw the Player to the canvas
    function draw() {
        ctx.beginPath();
        ctx.strokeStyle = "gold";
        ctx.arc(playerPoint.x, posistionY, playerRadius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    return {
        draw:draw,
        update:update,
    }

})();