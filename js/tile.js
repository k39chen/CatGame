/**
 * Constants for tiles.
 */
var TILE = {
    width: 32,
    height: 32,
    hPadding: 4,
    vPadding: 4
};
/**
 * The Tile class.
 *
 * @class Tile
 * @param board {Object} The board object.
 * @param x {Number} The x position of the tile.
 * @param y {Number} The y position of the tile.
 */
function Tile(board,x,y) {
    this.element = null; // this will be created in the init.
    this.board = board;
    this.x = x;
    this.y = y;

    // initializes the tile
    this.init();
}
/**
 * Initializes the tile.
 *
 * @method init
 */
Tile.prototype.init = function() {
    var self = this;

    self.element = $("<div>")
        .addClass("tile")
        .data("x",this.x)
        .data("y",this.y)
        .css({
            width: TILE.width,
            height: TILE.height
        })
        .hover(
            function() { $(this).addClass("hover"); },
            function() { $(this).removeClass("hover"); }
        )
        .click(function(){
            self.placeWall();
        })
        .appendTo(self.board.element);
};
/**
 * Destroys the tile
 *
 * @method destroy
 */
Tile.prototype.destroy = function() {
    var self = this,
        $el = self.element;

    $el.remove();
};
/**
 * Turns this tile into a wall.
 *
 * @method placeWall
 */
Tile.prototype.placeWall = function() {
    var self = this,
        $el = self.element;

    if (!self.isWall()) {
        $el.addClass("selected");
    }
};
/**
 * Determines if this tile is a wall.
 *
 * @method isWall
 * @return {Boolean} The result of the check.
 */
Tile.prototype.isWall = function() {
    return this.element.hasClass("selected");
};
