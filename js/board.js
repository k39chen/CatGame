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
    this.puddles = [];
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
        $el = self.element,
        $hit = $("#board-hit");

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
    $hit.css({
        width: self.width * TILE.width,
        height: (self.height+1) * TILE.height,
        left: $el.offset().left,
        top: $el.offset().top
    });
    $(window).resize(function(){
        $hit.css({
            left: $el.offset().left,
            top: $el.offset().top
        });
    });

    // place puddles in random coordinates
    var numPuddles = 20;
    for (var i=0; i<numPuddles; i++) {
        var x = rand(0,self.width-1),
            y = rand(0,self.height-1);

        if (!self.hasPuddle({x:x,y:y})) {
            self.tiles[y][x].element.addClass("puddle");
        }
    }
    var numDirt = 20;
    for (var i=0; i<numDirt; i++) {
        var x = rand(0,self.width-1),
            y = rand(0,self.height-1);

        if (!self.hasPuddle({x:x,y:y})) {
            self.tiles[y][x].element.addClass("dirt");
        }
    }

    // determine hover events over which tiles
    $hit.mousemove(function(e){
        var coord = self.getCoord(e);

        $("#tree-mask").show().removeClass("block").css({
            zIndex: 1000 + coord.y,
            left: coord.x * TILE.width,
            top: coord.y * TILE.height - TILE.height/2
        });

        if (coord && !self.hasTree(coord) && !self.hasCat(coord) && !self.hasPuddle(coord) && !self.hasDirt(coord)) {
            // ...
        } else {
            $("#tree-mask").addClass("block");
        }
    });
    $hit.mouseout(function(e){
        $("#tree-mask").removeClass("block").hide();
    });
    $hit.click(function(e){
        var coord = self.getCoord(e);

        if (!self.hasTree(coord) && !self.hasCat(coord) && !self.hasPuddle(coord) && !self.hasDirt(coord)) {
            self.trees.push(new Tree(self,coord.x,coord.y));

            // have the cat make its next move
            for (var i=0; i<Game.Components.cats.length; i++) {
                Game.Components.cats[i].move();
            }
        }
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
        $hit = $("#board-hit")

    for (var y=0; y<self.height; y++) {
        for (var x=0; x<self.width; x++) {
            if (self.tiles[y][x]) {
                self.tiles[y][x].destroy();
            }
        }
    }
    for (var i=0; i<self.trees.length; i++) {
        self.trees[i].destroy();
    }
    for (var i=0; i<self.puddles.length; i++) {
        self.puddles[i].destroy();
    }
    $hit.unbind("mouseover");
    $hit.unbind("mouseout");
    $hit.unbind("click");

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
    var left = e.pageX - this.element.offset().left,
        top = e.pageY - this.element.offset().top,
        x = Math.min(Math.floor(left / TILE.width), this.width),
        y = Math.min(Math.floor(top / TILE.height), this.height-1);
    return {x:x,y:y};
}
/**
 * Checks for a tree at the given coordinate.
 *
 * @method hasTree
 * @param coord {Object} The coordinate object.
 * @return {Boolean} The result of the evaluation.
 */
Board.prototype.hasTree = function(coord) {
    return $(".tree[x="+coord.x+"][y="+coord.y+"]").length > 0;
};
/**
 * Checks for a puddle at the given coordinate.
 *
 * @method hasPuddle
 * @param coord {Object} The coordinate object.
 * @return {Boolean} The result of the evaluation.
 */
Board.prototype.hasPuddle = function(coord) {
    return $(".puddle[x="+coord.x+"][y="+coord.y+"]").length > 0;
};
/**
 * Checks for a dirt at the given coordinate.
 *
 * @method hasDirt
 * @param coord {Object} The coordinate object.
 * @return {Boolean} The result of the evaluation.
 */
Board.prototype.hasDirt = function(coord) {
    return $(".dirt[x="+coord.x+"][y="+coord.y+"]").length > 0;
};
/**
 * Checks for a cat at the given coordinate.
 *
 * @method hasCat
 * @param coord {Object} The coordinate object.
 * @return {Boolean} The result of the evaluation.
 */
Board.prototype.hasCat = function(coord) {
    return $(".cat[x="+coord.x+"][y="+coord.y+"]").length > 0;
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
