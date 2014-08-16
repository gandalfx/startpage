/**
 * utility function
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */

if (!Array.prototype.shuffle) {
  /*
   * Add a shuffle function to Array object prototype
   * Usage :
   *  var tmpArray = ["a", "b", "c", "d", "e"];
   *  tmpArray.shuffle();
   *  
   * @see http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/
   */
  Array.prototype.shuffle = function () {
    var shuffled = [];
    this.forEach(function(value, index) {
      var rand = Math.floor( Math.random() * index );
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };
}
