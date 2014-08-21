/**
 * Constants for tiles.
 */
window.TILE = {
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
window.Tile = function(board,x,y) {
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
        .appendTo(self.board.element);

    // render the tile
    this.render();
};
/**
 * Renders the tile.
 *
 * @method render
 */
Tile.prototype.render = function() {
    this.element.css({
        zIndex: 1000 +this.y,
        left: this.x * TILE.width,
        top: this.y * TILE.height
    })
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
