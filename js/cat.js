/**
 * Constants for the cat.
 */
var CAT = {
    width: 48,
    height: 41
};
var DIRECTION = {
    0: {x:-1},
    1: {y:+1},
    2: {x:+1},
    3: {y:-1}
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
        .hover(
            function() { $(this).addClass("hover"); },
            function() { $(this).removeClass("hover"); }
        )
        .appendTo(self.board.element);

    // render the cat
    this.render();
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
/**
 * Renders the cat.
 *
 * @method render
 */
Cat.prototype.render = function() {
    this.element.css({
        zIndex: 1000 + this.y,
        left: this.x * CAT.width,
        top: this.y * CAT.height - CAT.height/2
    });


    // everywhere the cat goes, the tile below it turns to dirt
    $(".tile[x="+this.x+"][y="+this.y+"]").addClass("dirt");
    console.log($(".tile[x="+this.x+"][y="+this.y+"]"));
};
/**
 * The cat must now make a move.
 *
 * @method move
 * @return {Object} The new coordinate of the cat.
 */
Cat.prototype.move = function() {
    var self = this,
        coord = {x:self.x, y:self.y};

    // select a random direction
    var s = rand(0,4);

    // apply the change(s)
    for (var c in DIRECTION[s]) {
        coord[c] += DIRECTION[s][c];
    }

    // update position
    self.x = coord.x;
    self.y = coord.y;
    self.element.attr("x",self.x);
    self.element.attr("y",self.y);

    self.render();
};
/**
 * Checks if the cat can move to the coordinate.
 *
 * @method canMove
 * @param coord {Object} The request coordinates.
 * @return {Boolean} The result of the evaluation.
 */
Cat.prototype.canMove = function(coord) {
    var scoord = "[x="+coord.x+"][y="+coord.y+"]";
    return $(".tree"+scoord).length == 0 &&
           $(".puddle"+scoord).length == 0 &&
           $(".cat"+scoord).length == 0;
}