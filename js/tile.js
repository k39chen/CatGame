/**
 * Constants for tiles.
 */
var TILE = {
    width: 48,
    height: 41
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
        .addClass("entity tile")
        .attr("x",this.x)
        .attr("y",this.y)
        .css({
            left: this.x * TILE.width,
            top: this.y * TILE.height
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
