/**
 * Constants for the cat.
 */
var CAT = {
    width: 48,
    height: 41
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


    // we're going to randomly position the cat in no x or y is provided!
    if (x === null || x === undefined || y === null || y === undefined) {
        var distanceFromEdge = 5;
        this.x = rand(distanceFromEdge, this.board.width - distanceFromEdge),
        this.y = rand(distanceFromEdge, this.board.height - distanceFromEdge);
    }

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
        .addClass("entity cat")
        .attr("x",this.x)
        .attr("y",this.y)
        .css({
            zIndex: 1000 + this.y,
            left: this.x * CAT.width,
            top: this.y * CAT.height - CAT.height/2
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
