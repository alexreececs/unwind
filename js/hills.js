/*
    Alexander Reece
    3447818
    COMP 486
    Assignment 2
*/
var hills = (function Hills() {
    //Hill Attributes
    var pts1, pts2, pts3;

    //var obstacles
    function initialize() {
        pts1 = generatePoints(1, 10, game.getHeight() / 2);
        pts2 = generatePoints(2, 10, pts1[pts1.length - 1].y);
        pts3 = generatePoints(3, 10, pts2[pts2.length - 1].y);
    }

    //Draw the Hills to the canvas from the with the points from buffer 1 
    function draw() {
        game.getContext().beginPath();
        game.getContext().strokeStyle = "green";
        for (var i = 0; i < pts1.length; i++) {
            game.getContext().lineTo(pts1[i].x, pts1[i].y);
            game.getContext().moveTo(pts1[i].x, pts1[i].y);
        }
        game.getContext().stroke();
    }

    //Function to generate points hills and obstacles
    function generatePoints(numberOfHills, pixelStep, hillStartY) {
        var hills = [];
        var hillWidth = game.getWidth() / numberOfHills;
        var hillSlices = hillWidth / pixelStep;
        var coversionFactor = (2 * Math.PI) / hillWidth;
        for (var i = 0; i < numberOfHills; i++) {
            var randomHeight = Math.random() * 100;
            for (var j = 0; j < hillSlices; j++) {
                var x = Math.round(j * pixelStep + hillWidth * i);
                var cosX = Math.sin(coversionFactor * x).toFixed(2);
                var y = Math.round(hillStartY + randomHeight * cosX);
                hills.push({ x: x, y: y, cosX: cosX });
            }
        }
        return hills;
    }

    //Feeds the points from one buffer to the next and perform the appropriate pixel transformation 
    function update() {
        if (pts1.length >= 1) {
            var xOffset = pts1.shift().x;
            pts1.forEach(p => { p.x -= xOffset });
            pts2.forEach(p => { p.x -= xOffset });
            pts3.forEach(p => { p.x -= xOffset });
        }
        if (pts2.length >= 1) {
            var p = pts2.shift();
            p.x += game.getWidth();
            pts1.push(p);
        }
        if (pts3.length >= 1) {
            var p = pts3.shift();
            p.x += game.getWidth();
            pts2.push(p);
            if (pts3 == undefined || pts3.length == 0) {
                var hillStartY = p.y;
                if (hillStartY < game.getHeight() / 2) {
                    hillStartY = game.getHeight() / 2;
                }
                pts3 = generatePoints(1, 10, hillStartY);
            }
        }
    }

    function getPoints() {
        return pts1;
    }

    return {
        getPoints:getPoints,
        initialize: initialize,
        draw: draw,
        update: update,
    }
})();