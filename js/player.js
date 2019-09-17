<<<<<<< HEAD
var player = (function Player() {
    //Player Attributes
    var playerX; //The point at which the game character is centered around
=======
var player = (function InputControl() {
    //Player Attributes
    var playerPoint; //The point at which the game character is centered around
>>>>>>> developement
    var playerRadius = 25;
    var velocityY = 0;
    var posistionY = 0;
    var jumping = false;

<<<<<<< HEAD
    function updateX() {
        playerX = hills.getPoints()[Math.floor(hills.getPoints().length / 3)];
    }

    function updateY() {
=======
    //updates the players (x,y) posistion and velocities
    function update() {
        //update the x of the player
        playerPoint = pts1[Math.floor(pts1.length / 3)];

>>>>>>> developement
        velocityY += 1.5;// gravity
        posistionY += Math.round(velocityY);
        velocityY *= 0.95;// friction


        // if player is falling below hill line
<<<<<<< HEAD
        if (posistionY + playerRadius >= playerX.y) {
            jumping = false;
            posistionY = playerX.y - playerRadius;
=======
        if (posistionY + playerRadius >= playerPoint.y) {
            jumping = false;
            posistionY = playerPoint.y - playerRadius;
>>>>>>> developement
            velocityY = 0;
        }

        //Is thep player jumping?   
        if (ic.spacePressed() && jumping == false) {
            velocityY -= speed;
            jumping = true;
        }
    }
<<<<<<< HEAD
    //updates the players (x,y) posistion and velocities
    function update() {
        updateX();
        updateY();
    }
=======
>>>>>>> developement

    //Draw the Player to the canvas
    function draw() {
        ctx.beginPath();
        ctx.strokeStyle = "gold";
<<<<<<< HEAD
        ctx.arc(playerX.x, posistionY, playerRadius, 0, 2 * Math.PI);
=======
        ctx.arc(playerPoint.x, posistionY, playerRadius, 0, 2 * Math.PI);
>>>>>>> developement
        ctx.stroke();
    }

    return {
<<<<<<< HEAD
        draw: draw,
        update: update,
    }
=======
        draw:draw,
        update:update,
    }

>>>>>>> developement
})();