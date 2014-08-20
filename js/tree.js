/**
 * Constants for trees.
 */
var TREE = {
    width: 48,
    height: 41
};
/**
 * The Tree class.
 *
 * @class Tree
 * @param board {Object} The board object.
 * @param x {Number} The x position of the tree.
 * @param y {Number} The y position of the tree.
 */
function Tree(board,x,y) {
    this.element = null; // this will be created in the init.
    this.board = board;
    this.x = x;
    this.y = y;

    // initializes the tree
    this.init();
}
/**
 * Initializes the tree.
 *
 * @method init
 */
Tree.prototype.init = function() {
    var self = this;

    self.element = $("<div>")
        .addClass("entity tree")
        .attr("x",this.x)
        .attr("y",this.y)
        .css({
            zIndex: 1000 + this.y,
            left: this.x * TREE.width,
            top: this.y * TREE.height - TREE.height / 2
        })
        .appendTo(self.board.element);
};
/**
 * Destroys the tree
 *
 * @method destroy
 */
Tree.prototype.destroy = function() {
    var self = this,
        $el = self.element;

    $el.remove();
};
