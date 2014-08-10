(function(win, doc){
  
  "use strict";
  
  var searchInput = doc.getElementById("searchInput"),
      nav         = doc.getElementById("searchButtons"),
      engines;
  
  config.require("search.conf", init);
  
  /**
   * construct
   */
  function init(cfg) {
    engines = cfg.engines.map(function(engine) {
      return {name: engine[0], param: engine[1], url: engine[2]};
    });
    printEngines();
    win.addEventListener("click", function() {
      searchInput.focus();
    }, false);
  };
  
  /**
   * evaluate searchString after submit
   * if URL -> redirect
   * @param engineId which search engine to set
   * */
  function evalSearch(engineId) {
    var searchString = searchInput.value.trim(),
        regexURL = /^((https?)|(ftp)):\/\//i, // regular url
        regexTLD = /^(([a-z0-9-]+\.)+((de)|(com)|(org)|(net)|(me)|(info)|(im)|(fr)|(co\.uk)|(io)|(cc)))(\/.*)?$/i,
        regexReddit = /^r\/\w+$/;
    
    if (regexURL.test(searchString)) {
      win.location.replace(searchString);
      return false;
    }
    if (regexTLD.test(searchString)) {
      win.location.replace("http://" + searchString);
      return false;
    }
    if (regexReddit.test(searchString)) {
      win.location.replace("http://www.reddit.com/" + searchString);
      return false;
    }
    
    doc.getElementById("search").setAttribute("action", engines[engineId].url);
    searchInput.setAttribute("name", engines[engineId].param);
    return true;
  };

  /**
   * echo the search buttons
   * */
  function printEngines() {
    var btn;
    for ( var i=0 ; i < engines.length ; i++ ) {
      btn = doc.createElement("button");
      btn.innerHTML = engines[i].name;
      btn.setAttribute("formaction", engines[i].url);
      
      (function(i){
        btn.addEventListener("click", function(e) {
          if (!evalSearch(i)) e.preventDefault();
        }, false);
      })(i);
      
      nav.appendChild(btn);
    }
  };
  
  
})(window, document);
