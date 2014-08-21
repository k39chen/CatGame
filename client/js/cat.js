/**
 * Constants for the cat.
 */
window.CAT = {
    width: 48,
    height: 41
};
window.DIRECTION = {
    0: {x:-1},
    1: {y:+1},
    2: {x:+1},
    3: {y:-1}
};
window.INFINITY = 100000000000000;
/**
 * The Cat class.
 *
 * @class Cat
 * @param board {Object} The board object.
 * @param x {Number} The x position of the cat.
 * @param y {Number} The y position of the cat.
 */
window.Cat = function(id,board,x,y) {
    this.element = null; // this will be created in the init.
    this.id = id;
    this.board = board;
    this.x = x;
    this.y = y;
    this.route = [];

    // we're going to randomly position the cat in no x or y is provided!
    if (x === null || x === undefined || y === null || y === undefined) {
        var distanceFromEdgeH = Math.floor(this.board.width * 0.3);
        var distanceFromEdgeV = Math.floor(this.board.height * 0.3);
        while (true) {
            this.x = rand(distanceFromEdgeH, this.board.width - distanceFromEdgeH),
            this.y = rand(distanceFromEdgeV, this.board.height - distanceFromEdgeV);

            // make sure that we don't place the cat on a puddle or another cat
            if ($(".puddle[x="+this.x+"][y="+this.y+"]").length == 0 &&
                $(".cat[x="+this.x+"][y="+this.y+"]").length == 0) break;
        }
    }

    // initializes the cat
    this.init();
};
/**
 * Initializes the cat.
 *
 * @method init
 */
Cat.prototype.init = function() {
    var self = this;

    self.element = $("<div>")
        .attr("id",self.id)
        .addClass("entity cat")
        .attr("x",this.x)
        .attr("y",this.y)
        .hover(
            function() { $(this).addClass("hover"); },
            function() { $(this).removeClass("hover"); }
        )
        .appendTo(self.board.element);

    // render the cat
    self.render();

    // determine the initial escape route!
    self.route = self.escapeRoute();
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
};
/**
 * The cat must now make a move.
 *
 * @method move
 * @return {Object} The new coordinate of the cat.
 */
Cat.prototype.move = function() {
    var self = this,
        current = {x:self.x, y:self.y},
        coord, coord_s;

    // update the escape route
    self.route = self.escapeRoute();

    // don't try to move the cat if there is no chance of escape
    if (self.isTrapped()) {
        alert("You have trapped the cat!");
        return;
    }

    // get the next best step to escape!
    coord_s = self.route[0].split(",");
    coord = {
        x: parseInt(coord_s[0],10),
        y: parseInt(coord_s[1],10)
    };

    // update position to new coordinate
    self.x = coord.x;
    self.y = coord.y;
    self.element.attr("x",self.x);
    self.element.attr("y",self.y);
    self.render();

    // check to see if this means that the cat has escaped!
    if (self.hasEscaped()) {

        /*
        Game.Components.cats[self.id].destroy();
        delete Game.Components.cats[self.id];
        */

        alert("The cat has escaped!");
        return;
    }
};
/**
 * Checks to see if the cat has escaped.
 *
 * @method hasEscaped
 */
Cat.prototype.hasEscaped = function() {
    var x = this.x;
    var y = this.y;
    return x < 0 || y < 0 || x >= this.board.width || y >= this.board.height;
};
/**
 * Checks if the cat is in a position to be game over.
 *
 * @method isTrapped
 */
Cat.prototype.isTrapped = function() {
    // see if there any routes that will allow the cat to escape
    return this.route.length === 0;
};
/**
 * Determines an escape route for the cat. (Dijkstra)
 *
 * @method escpaeRoute
 */
Cat.prototype.escapeRoute = function() {
    var self = this,
        board = this.board;

    // compute shortest path information
    var shortestPathInfo = self.dijkstra(),
        dist = shortestPathInfo.dist,
        prev = shortestPathInfo.prev;

    // get the shortest path to escape
    var x, y, coord, minDist = INFINITY, dst = null;
    for (x=-1; x<board.width+1; x++) {
        // top
        y = -1, coord = c(x,y);
        if (dist[coord] < minDist) {
            minDist = dist[coord];
            dst = coord;
        }
        // bottom
        y = board.height, coord = c(x,y);
        if (dist[coord] < minDist) {
            minDist = dist[coord];
            dst = coord;
        }
    }
    for (y=-1; y<board.height+1; y++) {
        // left
        x = -1, coord = c(x,y);
        if (dist[coord] < minDist) {
            minDist = dist[coord];
            dst = coord;
        }
        // right
        x = board.width, coord = c(x,y);
        if (dist[coord] < minDist) {
            minDist = dist[coord];
            dst = coord;
        }
    }
    // if an escape route exists then get the full path
    var route = [];
    if (dst) {
        // trace it all the way back to the cat position
        var p  = dst;
        while (p != c(self.x,self.y)) {
            route.push(p);
            p = prev[p];
        }
        route = route.reverse();
    }

    console.log(self.id,route);
    return route;

    function c(x,y) { return x+","+y; }
};
/**
 * Calculates shortest path information from the cat to any tile.
 *
 * @method dijkstra
 */
Cat.prototype.dijkstra = function() {
    var self = this,
        board = this.board,
        Graph = {},
        current = {x:this.x, y:this.y},
        dist = {},
        prev = {},
        s = c(this.x,this.y),
        Q = [];

    // create the graph from the board
    for (var y=-1; y<board.height+1; y++) {
        for (var x=-1; x<board.width+1; x++) {
            var hasTree = $(".tree[x="+x+"][y="+y+"]").length > 0;
            var hasPuddle = $(".puddle[x="+x+"][y="+y+"]").length > 0;
            var t = "tile";
            if (hasPuddle) t = "puddle";
            if (hasTree) t = "tree";

            Graph[c(x,y)] = {t:t,x:x,y:y};
        }
    }
    // initialization
    dist[s] = 0;
    for (var v in Graph) {
        if (v != s) {
            dist[v] = INFINITY;
            prev[v] = null;
        }
        Q[v] = $.extend({},Graph[v]);
    }

    // main loop to get shortest paths
    while (size(Q) > 0) {
        var u = minDistanceVertex(Q,dist);
        if (u === null) break; 
        delete Q[u];

        var neighbors = getNeighbors(Q,u);
        for (var v in neighbors) {
            var alt = dist[u] + 1; // since length(u,v)=1 always
            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
            }
        }
    }

    return {dist:dist, prev:prev};

    // Dijkstra helpers
    function c(x,y) {
        return x+","+y;
    }
    function size(obj) {
        return Object.keys(obj).length;
    }
    function minDistanceVertex(Q,dist) {
        var minDist = INFINITY,
            minVertex = null;

        for (var v in Q) {
            if (dist[v] < minDist) {
                minVertex = v;
                minDist = dist[v];
            }
        }
        return minVertex;
    }
    function getNeighbors(Q,u) {
        var coord = u.split(",");
        var x = parseInt(coord[0],10);
        var y = parseInt(coord[1],10);
        var n = {};

        // apply each of the possible directional changes
        for (var d in DIRECTION) {
            var c_ = self.getCoordAfterDirection({x:x,y:y},d);
            var c_s = c(c_.x,c_.y);
            var v = Q[c_s];

            if (v && v.t != "puddle" && v.t != "tree") {
                n[c_s] = v;
            }
        }
        return n;
    }
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
    return $(".tree"+scoord).length === 0 &&
           $(".puddle"+scoord).length === 0 &&
           $(".cat"+scoord).length === 0;
};
/**
 * Checks if a tile at the requested coordinate is dirty.
 *
 * @method isDirty
 * @param coord {Object} The coordinate.
 * @return {Boolean} The result of the evaluation.
 */
Cat.prototype.isDirty = function(coord) {
    return $(".tile[x="+coord.x+"][y="+coord.y+"].dirt").length > 0;
};
/**
 * Gets the coordinate after applying a directional movement.
 *
 * @method getCoordAfterDirection
 * @param current {Object} The current coordinate.
 * @param direction {Object} The direction vector.
 * @return {Object} The resulting coordinate.
 */
Cat.prototype.getCoordAfterDirection = function(current,direction) {
    var coord = $.extend({},current);
    for (var c in DIRECTION[direction]) {
        coord[c] += DIRECTION[direction][c];
    }
    return coord;
};
