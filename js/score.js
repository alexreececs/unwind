/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var score = (function Score() {
    var _score;
    
    function initialize() {
        _score = 0;
    }

    function draw() {
        game.getContext().font = "16px Arial";
        game.getContext().fillStyle = "green";
        game.getContext().fillText("Score: " + _score, 0, game.getHeight());
    }

    function update() {
        _score++;
    }

    return {
        initialize:initialize,
        draw: draw,
        update: update,
    }
})();