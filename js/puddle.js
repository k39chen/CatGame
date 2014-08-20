/**
 * Constants for puddles.
 */
var PUDDLE = {
    width: 48,
    height: 41
};
/**
 * The Puddle class.
 *
 * @class Puddle
 * @param board {Object} The board object.
 * @param x {Number} The x position of the puddle.
 * @param y {Number} The y position of the puddle.
 */
function Puddle(board,x,y) {
    this.element = null; // this will be created in the init.
    this.board = board;
    this.x = x;
    this.y = y;

    // initializes the puddle
    this.init();
}
/**
 * Initializes the puddle.
 *
 * @method init
 */
Puddle.prototype.init = function() {
    var self = this;

    self.element = $("<div>")
        .addClass("entity puddle")
        .attr("x",this.x)
        .attr("y",this.y)
        .appendTo(self.board.element);

    // render the puddle
    this.render();
};
/**
 * Renders the puddle.
 *
 * @method render
 */
Puddle.prototype.render = function() {
    this.element.css({
        zIndex: 1000 + this.y,
        left: this.x * PUDDLE.width,
        top: this.y * PUDDLE.height
    })
};
/**
 * Destroys the puddle
 *
 * @method destroy
 */
Puddle.prototype.destroy = function() {
    var self = this,
        $el = self.element;

    $el.remove();
};
