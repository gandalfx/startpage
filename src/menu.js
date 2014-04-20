function Menu(menuName) {
  
  var _this = this,
      _parent = document.getElementById(menuName),
      _logo = document.getElementById('logo'),
      _links = core.getConfig(menuName);
  
  function _init() {
    var anchor;
    for ( var i = 0 ; i < _links.length ; i++ ) {
      anchor = document.createElement('a');
      anchor.innerHTML = _links[i].name;
      anchor.setAttribute('href', _links[i].url);
      _parent.appendChild(anchor);
    }
    // first entry as link on logo
    _logo.setAttribute('href',_links[0].url);
  };
  
  _init();
}
