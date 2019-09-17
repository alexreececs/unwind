/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/

//TODO make collision detection work properly
//Game Properties
var canvas = document.getElementById('gameCanvas'); //the games canvas
var ctx = canvas.getContext('2d'); //context of the canvas
var speed = 30; //the speed of the game in measured in speed 
var gameOver = false;
var playing = false;
var score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Score: " + score, 0, canvas.height);

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
    if ((!playing && ic.spacePressed()) || (gameOver && ic.spacePressed())) {
        hills.initialize();
        playing = true;
        gameOver = false;
        score = 0;
    }

    if (playing && !gameOver) {
        updateScore();
        hills.update();
        player.update();
        obstacle.update();
        // collision();
    }
}

function draw() {
    ctx.save();
    //Rub out the last frame.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Determine which state to draw
    if (!gameOver && !playing) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Unwind", canvas.width / 4, canvas.height / 4);
        ctx.fillText("Press Space To Begin", canvas.width / 4, canvas.height / 2);
    }
    else if (playing && !gameOver) {
        drawScore();
        hills.draw();
        obstacle.draw();
        player.draw();
    }
    else {
        ctx.font = "30px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 4);
        ctx.fillText("Score: " + score, canvas.width / 4, canvas.height / 3);
        ctx.fillText("Press Space To Try Again", canvas.width / 4, canvas.height / 2);
    }
    ctx.restore();
}

function loop() {
    update();
    draw();
}

function main() {
    //Handlers
    document.addEventListener("keydown", ic.keyDownHandler, false);
    document.addEventListener("keyup", ic.keyUpHandler, false);
    //start the game loop
    setInterval(() => { requestAnimationFrame(loop); }, 1000 / speed);
}