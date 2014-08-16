/**
 * startpage style choosing module
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
(function(win, doc, body) {
  
  "use strict";
  
  var style = {},
      styles = ["", "white"];
  
  win.style = style;
  
  style.set = function(name) {
    var id = styles.indexOf(name);
    if (id > -1) {
      body.dataset.styleId = id;
      body.className = name;
    }
    return style;
  };
  
  style.cycle = function() {
    body.className
      = styles[++body.dataset.styleId % styles.length];
    return style;
  };
  
  // init
  body.dataset.styleId = 0;
  body.className = styles[0];
  
  // settings button
  settingsMenu.add("toggle style", "style", style.cycle);
  
})(window, document, document.body);
