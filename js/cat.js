/**
 * Constants for the cat.
 */
var CAT = {
    width: 32,
    height: 32,
    hPadding: 4,
    vPadding: 4
};
/**
 * The Cat class.
 *
 * @class Cat
 * @param board {Object} The board object.
 * @param x {Number} The x position of the cat.
 * @param y {Number} The y position of the cat.
 */
function Cat(board,x,y) {
    this.element = null; // this will be created in the init.
    this.board = board;
    this.x = x;
    this.y = y;

    // initializes the cat
    this.init();
}
/**
 * Initializes the cat.
 *
 * @method init
 */
Cat.prototype.init = function() {
    var self = this;

    self.element = $("<div>")
        .addClass("cat")
        .data("x",this.x)
        .data("y",this.y)
        .css({
            width: CAT.width,
            height: CAT.height
        })
        .hover(
            function() { $(this).addClass("hover"); },
            function() { $(this).removeClass("hover"); }
        )
        .appendTo(self.board.element);
};
/**
 * Destroys the cat
 *
 * @method destroy
 */
Cat.prototype.destroy = function() {
    var self = this,
        $el = self.element;

    $el.remove();
};
