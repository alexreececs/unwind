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

//Hill Attributes
var pts1, pts2, pts3;

//Obstacle Attributes
var obstacleFrequency = 0.025; //The percentage of which points spawn to be an obstacle
var obstacleRadius = 15;
var nextObstaclePoint;

//Function to generate points hills and obstacles
function generatePoints(numberOfHills, pixelStep, hillStartY) {
    var hills = [];
    var hillWidth = canvas.width / numberOfHills;
    var hillSlices = hillWidth / pixelStep;
    var coversionFactor = (2 * Math.PI) / hillWidth;
    for (var i = 0; i < numberOfHills; i++) {
        var randomHeight = Math.random() * 100;
        for (var j = 0; j < hillSlices; j++) {
            var x = Math.round(j * pixelStep + hillWidth * i);
            var cosX = Math.sin(coversionFactor * x).toFixed(2);
            var y = Math.round(hillStartY + randomHeight * cosX);
            var obstacle = false;
            if (Math.random() < obstacleFrequency) { obstacle = true; }
            hills.push({ x: x, y: y, cosX: cosX, obstacle: obstacle });
        }
    }
    return hills;
}

//Draw the Hills to the canvas from the with the points from buffer 1 
function drawHills() {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    for (var i = 0; i < pts1.length; i++) {
        ctx.lineTo(pts1[i].x, pts1[i].y);
        ctx.moveTo(pts1[i].x, pts1[i].y);
    }
    ctx.stroke();
}

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
//Feeds the points from one buffer to the next and perform the appropriate pixel transformation 
function updateHills() {
    if (pts1.length >= 1) {
        var xOffset = pts1.shift().x;
        pts1.forEach(p => { p.x -= xOffset });
        pts2.forEach(p => { p.x -= xOffset });
        pts3.forEach(p => { p.x -= xOffset });
    }
    if (pts2.length >= 1) {
        var p = pts2.shift();
        p.x += canvas.width;
        pts1.push(p);
    }
    if (pts3.length >= 1) {
        var p = pts3.shift();
        p.x += canvas.width;
        pts2.push(p);
        if (pts3 == undefined || pts3.length == 0) {
            var hillStartY = p.y;
            if (hillStartY < canvas.height / 2) {
                hillStartY = canvas.height / 2;
            }
            pts3 = generatePoints(1, 10, hillStartY);
        }
    }
}

function updateObstacles() {
    for (var i = 0; i < pts1.length; i++) {
        if (pts1[i].obstacle) {
            nextObstaclePoint = pts1[i];
            break;
        }
    }
}

function drawObstacles() {
    for (var i = 0; i < pts1.length; i++) {
        if (pts1[i].obstacle) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(pts1[i].x, pts1[i].y - obstacleRadius, obstacleRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
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
        pts1 = generatePoints(1, 10, canvas.height / 2);
        pts2 = generatePoints(2, 10, pts1[pts1.length - 1].y);
        pts3 = generatePoints(3, 10, pts2[pts2.length - 1].y);
        playerPoint = pts1[Math.floor(pts1.length / 3)];
        playing = true;
        gameOver = false;
        score = 0;
    }

    if (playing && !gameOver) {
        updateScore();
        player.update();
        updateHills();
        updateObstacles();
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
        drawHills();
        drawObstacles();
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