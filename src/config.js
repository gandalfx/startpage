/**
 * Configuration loader
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
(function(win, doc, store) {
  
  "use strict";
  
  var config = {},
      cache  = {};
  
  win.config = config;
  
  /// Functions
  
  config.reset = function() {
    store.clear();
    window.location.reload(true);
  };
  
  config.require = function(filename, customParser, callback) {
    
    if (!callback) {
      callback = customParser;
      customParser = false;
    }
    
    // already cached
    if (cache.hasOwnProperty(filename)) {
      callback(cache[filename]);
    }
    
    // in localStorage
    else if (store.hasOwnProperty(filename)) {
      callback(
        cache[filename] = JSON.parse(store[filename])
      );
    }
    
    // load file
    else {
      console.log("loading '" + filename + "'");
      var request = new XMLHttpRequest;
      request.open("GET", filename);
      
      request.addEventListener("load", function(evt) {
        if (customParser) {
          var content = customParser(request.responseText);
        }
        else {
          var content = parse(request.responseText);
        }
        cache[filename] = content;
        store[filename] = JSON.stringify(content);
        callback(content);
      });
      
      request.responseType = "text";
      request.send();
    }
    return config;
  };
  
  config.store = function(filename, key, value) {
    cache[filename][key] = value;
    store[filename] = JSON.stringify(cache[filename]);
  };
  
  /**
   * Smart properties parsing
   * 
   * @see config.require
   * 
   * @param  {string} text to be parsed
   * @return {Object}      object with assigned properties
   */
  function parse(text) {
    var props = {},
        currentProp;
    
    text.split("\n")
      .map(trimComments)
      .forEach(
        function(line, lineNum) {
          
          // kept empty lines until now for correct line numbers
          if (!line) return;
          
          var matches;
          // property = value
          if (matches = line.match(/^(\S+)\s*=\s*(.*)$/)) {
            props[matches[1]] = JSON.parse(matches[2]);
          }
          
          // [property] array definition
          else if (matches = line.match(/^\[(\S+)\]$/)) {
            currentProp = matches[1];
            if (!props.hasOwnProperty(currentProp))
              props[currentProp] = [];
          }
          
          // [property] array entry
          else if (currentProp) {
            var arr = line.split(/\s+/);
            if (arr.length > 1) {
              props[currentProp].push(arr);
            }
            else {
              props[currentProp].push(arr[0]);
            }
          }
          
          else throw "Config: Syntax error on line " + (lineNum + 1);
        });
    
    return props;
  }
  
  /**
   * Remove comments preceded by "#" and trims whitespace.
   * Comments do not have to start at the beginning of the line.
   * 
   * @param  {string} string
   * @return {string}
   */
  function trimComments(string) {
    var i = string.indexOf("#");
    return (0 <= i ? string.slice(0, i) : string).trim();
  }
  
})(window, document, window.localStorage);
