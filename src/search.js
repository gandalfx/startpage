/**
 * searchbox with multiple search engines to choose from
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
(function(win, doc){
  
  "use strict";
  
  var form        = doc.getElementById("search"),
      searchInput = doc.getElementById("searchInput"),
      nav         = doc.getElementById("searchButtons"),
      search_prefix_delimiter = " ",
      shortcut_prefix_delimiter = "/",
      engines     = {},
      shortcuts   = {},
      defaultEngine;
  
  config.require("search.conf", init);
  
  form.addEventListener("submit", handleSubmit);
  
  // quick focus
  win.addEventListener("click", searchInput.focus.bind(searchInput));
  
  /**
   * Process configuration
   * 
   * @param  {Object} cfg configuration
   */
  function init(cfg) {
    cfg.engines.forEach(function(data) {
      var engine = {
        names:   data[0].split("|"),
        param:   data[1],
        url:     data[2],
      };
      
      // hidden engines
      if (engine.names[0]) {
        printEngine(engine);
      }
      else {
        engine.names.shift();
      }
      
      // dictionary access + name validation
      engine.names.forEach(function(name) {
        engines[name] = engine;
      });
      
      if (!defaultEngine) {
        setEngine(defaultEngine = engine);
      }
    });
    
    if (cfg.shortcuts) {
      cfg.shortcuts.forEach(function(data) {
        shortcuts[data[0]] = data[1];
      });
    }
    if (cfg.search_prefix_delimiter) {
      search_prefix_delimiter = cfg.search_prefix_delimiter;
    }
    if (cfg.shortcut_prefix_delimiter) {
      shortcut_prefix_delimiter = cfg.shortcut_prefix_delimiter;
    }
  }
  
  /**
   * Create an engines HTML button
   * 
   * @param {Object} engine
   */
  function printEngine(engine) {
    var btn = nav.appendChild(doc.createElement("button"));
    btn.engine = engine;
    btn.innerHTML = engine.names[0];
    btn.type = "button";
    btn.addEventListener("click", handleButtonClick);
    btn.addEventListener("keyup", handleButtonEnter);
  }
  
  /**
   * Activate an engine to be used in a following form submit
   * 
   * @param {Object} engine
   */
  function setEngine(engine) {
    form.action      = engine.url;
    searchInput.name = engine.param;
  }
  
  /**
   * Handle button click event (non submit).
   * Needs to be bound to event.target (default).
   */
  function handleButtonClick() {
    setEngine(this.engine);
    form.removeEventListener("submit", handleSubmit);
    form.submit();
  }
  
  /**
   * Handle button key events if key event was "Enter".
   * 
   * @param  {Event} evt keydown or keyup
   */
  function handleButtonEnter(evt) {
    if (evt.keyCode === 13) {
      handleButtonClick.call(this);
    }
  }
  
  /**
   * evaluate searchString after submit
   * if URL -> redirect
   * 
   * @param {Object} engine to be used
   */
  function handleSubmit(evt) {
    var searchString = searchInput.value.trim(),
        regexURL = /^((https?)|(ftp)):\/\//i, // regular url
        regexTLD = /^(([a-z0-9-]+\.)+((de)|(com)|(org)|(net)|(me)|(info)|(im)|(fr)|(co\.uk)|(io)|(cc)))(\/.*)?$/i,
        regexSearchPrefix = new RegExp(
            "^("
          + Object.getOwnPropertyNames(engines).join("|")
          + ")"
          + search_prefix_delimiter
          + "(.*)"
        ),
        regexShortcutPrefix = new RegExp(
            "^("
          + Object.getOwnPropertyNames(shortcuts).join("|")
          + ")"
          + shortcut_prefix_delimiter
          + "(.*)"
        ),
        match;
    
    // check for URLs
    if (regexURL.test(searchString)) {
      win.location.replace(searchString);
      evt.preventDefault();
      return false;
    }
    if (regexTLD.test(searchString)) {
      win.location.replace("http://" + searchString);
      evt.preventDefault();
      return false;
    }
    if (match = regexShortcutPrefix.exec(searchString)) {
      win.location.replace(shortcuts[match[1]] + match[2])
      evt.preventDefault();
      return false;
    }
    
    // set up form for search
    if (match = regexSearchPrefix.exec(searchString)) {
      setEngine(engines[match[1]]);
      searchInput.value = searchString = match[2].trim();
    }
  }
  
})(window, document);
