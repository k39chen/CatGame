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
        $el.append( "<div style='clear:both;'></div>" );
    }
    // set the dimensions of the board
    $el.css({
        width: self.width * (TILE.width + TILE.hPadding*2),
        height: self.height * (TILE.height + TILE.vPadding*2)
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

    $el.empty();
};
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
