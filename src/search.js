function SearchBox() {
  
  var _this = this,
      _searchInput = document.getElementById('searchInput'),
      _nav         = document.getElementById('searchButtons'),
      _engines     = core.getConfig('engines');
  
  /**
   * construct
   */
  function _init() {
    _printEngines();
    window.addEventListener('click', function() {
      _searchInput.focus()
    }, false);
  };
  
  /**
   * evaluate searchString after submit
   * if URL -> redirect
   * @param engineId which search engine to set
   * */
  function _evalSearch(engineId) {
    var searchString = _searchInput.value.trim(),
        regexURL = /^((https?)|(ftp)):\/\//i, // regular url
        regexTLD = /^(([a-z0-9-]+\.)+((de)|(com)|(org)|(net)|(me)|(info)|(im)|(fr)|(co\.uk)|(io)|(cc)))(\/.*)?$/i,
        regexReddit = /^r\/\w+$/;
    
    if (regexURL.test(searchString)) {
      window.location.replace(searchString);
      return false;
    }
    if (regexTLD.test(searchString)) {
      window.location.replace('http://' + searchString);
      return false;
    }
    if (regexReddit.test(searchString)) {
      window.location.replace('http://www.reddit.com/' + searchString);
      return false;
    }
    
    document.getElementById('search').setAttribute('action', _engines[engineId].url);
    _searchInput.setAttribute('name', _engines[engineId].param);
    return true;
  };

  /**
   * echo the search buttons
   * */
  function _printEngines() {
    var btn;
    for ( var i=0 ; i < _engines.length ; i++ ) {
      btn = document.createElement('button');
      btn.innerHTML = _engines[i].name;
      btn.setAttribute('formaction', _engines[i].url);
      
      (function(i){
        btn.addEventListener('click', function(e) {
          if (!_evalSearch(i)) e.preventDefault();
        }, false);
      })(i);
      
      _nav.appendChild(btn);
    }
  };
  
  _init();
};
