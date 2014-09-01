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
      engines     = {},
      defaultEngine,
      search_prefix_delimiter = " ";
  
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
    // var btn = nav.appendChild(doc.createElement("button"));
    // btn.innerHTML = "test";
    // ["abort","afterprint","beforeprint","beforeunload","blur","canplay","canplaythrough","change","click","contextmenu","copy","cuechange","cut","dblclick","DOMContentLoaded","drag","dragend","dragenter","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","error","focus","focusin","focusout","formchange","forminput","hashchange","input","invalid","keydown","keypress","keyup","load","loadeddata","loadedmetadata","loadstart","message","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","offline","online","pagehide","pageshow","paste","pause","play","playing","popstate","progress","ratechange","readystatechange","redo","reset","resize","scroll","seeked","seeking","select","show","stalled","storage","submit","suspend","timeupdate","undo","unload","volumechange","waiting",].forEach(function(ename) {btn.addEventListener(ename,function(e) {
    //   console.log(this===e.target,e.type);
    //   e.preventDefault();
    // });});
    cfg.engines.forEach(
      function(data) {
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
          if (engines.hasOwnProperty(name)) {
            throw new Error("Engine '" + name + "' is already defined.");
          }
          else {
            engines[name] = engine;
          }
        });
        
        if (!defaultEngine) {
          setEngine(defaultEngine = engine);
        }
      }
    );
    if (cfg.search_prefix_delimiter) {
      search_prefix_delimiter = cfg.search_prefix_delimiter;
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
  function handleSubmit() {
    var searchString = searchInput.value.trim(),
        regexURL = /^((https?)|(ftp)):\/\//i, // regular url
        regexTLD = /^(([a-z0-9-]+\.)+((de)|(com)|(org)|(net)|(me)|(info)|(im)|(fr)|(co\.uk)|(io)|(cc)))(\/.*)?$/i,
        regexReddit = /^r\/\w+$/,
        regexPrefix = new RegExp(
            "^("
          + Object.getOwnPropertyNames(engines).join("|")
          + ")"
          + search_prefix_delimiter
          + "(.*)"
          );
    
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
    if (regexReddit.test(searchString)) {
      win.location.replace("http://www.reddit.com/" + searchString);
      evt.preventDefault();
      return false;
    }
    
    // set up form for search
    var match;
    if (match = regexPrefix.exec(searchString)) {
      setEngine(engines[match[1]]);
      searchInput.value = searchString = match[2].trim();
    }
  }
  
})(window, document);
