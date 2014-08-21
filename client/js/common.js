/**
 * Generates a random number within the specified range.
 *
 * @method rand
 * @param min {Number} The lower bound.
 * @param max {Number} The upper bound.
 * @return {Number} The random number.
 */
window.rand = function(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
};
