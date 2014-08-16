/**
 * custom menus on startpage
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
(function(doc){
  
  "use strict";
  
  config.require("menus.conf", function(menus) {
    for (var menu in menus) {
      if (menus.hasOwnProperty(menu)) {
        
        var menuElem = doc.getElementById(menu);
        
        menus[menu].forEach(function(item) {
          
          var btn = menuElem.appendChild(doc.createElement("a"));
          btn.innerHTML = item[0];
          btn.setAttribute("href", item[1]);
          
        });
        
      }
    }
  });
  
})(document);