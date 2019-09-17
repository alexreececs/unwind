var menu = (function Menu() {
    function drawMainMenu() {
        game.getContext().font = "30px Arial";
        game.getContext().fillStyle = "green";
        game.getContext().fillText("Unwind", game.getWidth() / 4, game.getHeight() / 4);
        game.getContext().fillText("Press Enter To Select Character", game.getWidth() / 4, game.getHeight() / 2);
    }
    function drawCharacterSelect() {
        game.getContext().font = "30px Arial";
        game.getContext().fillStyle = "green";
        game.getContext().fillText("Select Character", game.getWidth() / 4, game.getHeight() / 4);
        game.getContext().fillText("Press Space To Begin Game", game.getWidth() / 4, game.getHeight() / 2);
    }

    function drawGameOverMenu() {

    }
    
    return {
        drawMainMenu: drawMainMenu,
        drawCharacterSelect: drawCharacterSelect,
        drawGameOverMenu: drawGameOverMenu,
    }
})();