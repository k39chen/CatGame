window.Game = {
    /**
     * Contains all the important game components.
     */
    Components: {
        board: null,
        cats: null,
        treeMask: null
    },
    /**
     * Initialize the game components and reset the game states.
     *
     * @method init
     */
    init: function() {

        // create the game board
        var boardWidth = rand(15,20);
        var boardHeight = rand(8,Math.min(boardWidth-2,16));

        Game.Components.board = new Board(BOARD_TYPE.SQUARE, boardWidth, boardHeight);
        Game.Components.cats = {
            cat1: new Cat("cat1",Game.Components.board)
        };

        // create a tree mask
        Game.Components.treeMask = $("<div>")
            .attr("id","tree-mask")
            .addClass("entity")
            .appendTo(Game.Components.board.element);

        // initialize all the game buttons
        $(".button").hover(
            function() { $(this).addClass("hover"); },
            function() { $(this).removeClass("hover"); }
        );
        $("#restart-game").click(function(){
            // reset the game board
            Game.reset();
        });
    },
    /**
     * Destroys the current instance of the game.
     *
     * @method destroy
     */
    destroy: function() {

        // destroys the board and associated components
        Game.Components.board.destroy();

        // unbind all the button events
        $(".button")
            .unbind("mouseover")
            .unbind("mouseout")
            .unbind("click");
    },
    /**
     * Resets the game to initial state.
     *
     * @method reset
     */
    reset: function() {
        Game.destroy();
        Game.init();
    }
};
Template.game.rendered = function() {
    // initialize the game
    Game.init();
};
