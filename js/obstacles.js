/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var obstacle = (function Obstacle() {
    //Obstacle Attributes
    var _frequency = 0.025; //The percentage of which points spawn to be an obstacle
    var obstacleRadius = 15;

    function update() {
        if (hills.pts) {
            for (var i = 0; i < pts1.length; i++) {
                if (pts1[i].obstacle) {
                    nextObstaclePoint = pts1[i];
                    break;
                }
            }
        }
    }

    function draw() {
        if (hills.pts1) {
            for (var i = 0; i < pts1.length; i++) {
                if (pts1[i].isObstacle) {
                    game.getContext().beginPath();
                    game.getContext().fillStyle = "red";
                    game.getContext().arc(pts1[i].x, pts1[i].y - obstacleRadius, obstacleRadius, 0, 2 * Math.PI);
                    game.getContext().fill();
                }
            }
        }
    }

    function frequency() {
        return _frequency
    }
    return {
        frequency: frequency,
        draw: draw,
        update: update,
    }
})();