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

        Game.openDialog({
            title: "CATCH THE CAT!",
            content: "<p><b>Watch out!</b> Your cat is trying to escape the safety of your garden. Trap it by placing trees on grassy areas.</p><div style='margin:0 auto;width:101px;height:101px;background:url(assets/images/cat.png) 0px -54px'></div>",
            buttons: {"START GAME": {click:function(){Game.closeDialog();}}}
        });


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
    },


    openDialog: function(options) {
        var id = $(".modal").length;

        $("#game").addClass("blur");

        var settings = $.extend({
            title: "Empty Title",
            content: "Empty Content",
            buttons: {OK: {classes: "",click: function() {Game.closeDialog(id);}}},
            width: 600,
            height: "auto"
        }, options);

        var $modal = $("<div>").addClass("modal").attr("index",id).appendTo("body");
        var $dialog = $("<div>").addClass("dialog").attr("index",id).css({width:settings.width,height:settings.height}).appendTo($modal);
        var $header = $("<div>").addClass("dialog-header").append(settings.title).appendTo($dialog);
        var $content = $("<div>").addClass("dialog-content").append(settings.content).appendTo($dialog);
        var $buttons = $("<div>").addClass("dialog-buttons").appendTo($dialog);

        for (var label in settings.buttons) {
            var $button = $("<div>")
                .addClass("button " + settings.buttons[label].classes)
                .append(label)
                .mouseover(function(){$(this).addClass("hover");})
                .mouseout(function(){$(this).removeClass("hover");})
                .click($.proxy(settings.buttons[label].click,$dialog))
                .appendTo($buttons);
        }

        return $dialog;
    },
    closeDialog: function(id) {
        $("#game").removeClass("blur");
        if (isNaN(id)) {
            $(".modal").remove();
            $(".dialog").remove();
        } else {
            $(".modal[index="+id+"]").remove();
            $(".dialog[index="+id+"]").remove();
        }
    }
};
Template.game.rendered = function() {
    // initialize the game
    Game.init();
};
