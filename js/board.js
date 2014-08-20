/**
 * Enumeration of board types.
 */
var BOARD_TYPE = {
    SQUARE: 0,
    HEXAGON: 1,
    CIRCLE: 2
};

/**
 * The Board class.
 *
 * @class Board
 * @param type {Number} The enumeration of the type of board.
 * @param width {Number} The width of the board.
 * @param height {Number} The height of the board.
 */
function Board(type, width, height) {
    this.element = $("#board");
    this.type = type;
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.trees = [];

    // initialize the board
    this.init();
}
/**
 * Initializes the board.
 *
 * @method init
 */
Board.prototype.init = function() {
    var self = this,
        $el = self.element;

    // add the tiles to the board
    for (var y=0; y<self.height; y++) {
        self.tiles[y] = [];
        for (var x=0; x<self.width; x++) {
            self.tiles[y][x] = new Tile(self,x,y);
        }
    }
    // set the dimensions of the board
    $el.css({
        width: self.width * TILE.width,
        height: (self.height+1) * TILE.height
    });
    // determine hover events over which tiles
    $el.mouseover(function(e){
        var coord = self.getCoord(e);

        if (coord) {
            $("#tree-mask").show().css({
                left: coord.x * TILE.width,
                top: coord.y * TILE.height - TILE.height/2
            });
        }
    });
    $el.mouseout(function(e){
        var coord = self.getCoord(e);

        $("#tree-mask").hide();
    });
    $el.click(function(e){
        var coord = self.getCoord(e);

        // ...
    });
};
/**
 * Destroys the board.
 *
 * @method destroy
 */
Board.prototype.destroy = function() {
    var self = this,
        $el = self.element;

    for (var y=0; y<self.height; y++) {
        for (var x=0; x<self.width; x++) {
            if (self.tiles[y][x]) {
                self.tiles[y][x].destroy();
            }
        }
    }
    $el.unbind("mouseover");
    $el.unbind("mouseout");
    $el.unbind("click");

    $el.empty();
};
/**
 * Get the board coordinates from a mouse event.
 *
 * @method getCoord
 * @param e {Object} The mouse event data.
 * @return {Object} The board coordinates.
 */
Board.prototype.getCoord = function(e) {
    var left = e.clientX - this.element.offset().left,
        top = e.clientY - this.element.offset().top,
        x = Math.min(Math.floor(left / TILE.width), this.width),
        y = Math.min(Math.floor(top / TILE.height), this.height-1);
    return {x:x,y:y};
}
/**
 * Resets the board.
 *
 * @method reset
 */
Board.prototype.reset = function() {
    var self = this;

    self.destroy();
    self.init();
};
