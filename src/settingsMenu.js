/**
 * startpage settings menu
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
(function(doc) {
  
  "use strict";
  
  var settings = doc.getElementById("settings"),
      groups   = {};
  
  window.settingsMenu = settings;
  
  settings.add = function(label, group, callback) {
    if (!groups.hasOwnProperty(group)) {
      groups[group] = settings.appendChild(doc.createElement("div"));
      groups[group].className = group;
    }
    var btn = groups[group].appendChild(doc.createElement("a"));
    btn.innerHTML = label;
    btn.addEventListener("click", callback);
  };
  
  settings.add("reload", "reset", config.reset);
  
})(document);