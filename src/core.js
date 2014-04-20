function Core() {
  
  var _this = this,
      _settingsElem = document.getElementById('settings'),
      _currentSettingsGroup = '',
      _config;
  
  function _init() {
    if (!localStorage.length) _loadConfig();
    else _config = {};
    _this.addSettingsButton('reset', 'reset', _this.resetConfig);
  };
  
  this.getConfig = function getConfig(cfg) {
    // alert(typeof _config);
    if (!(cfg in _config)) {
      _config[cfg] = JSON.parse(localStorage[cfg]);
    }
    return _config[cfg];
  };
  
  this.setConfig = function setConfig(cfg, value) {
    _config[cfg] = value;
    localStorage[cfg] = JSON.stringify(value);
  };
  
  this.resetConfig = function resetConfig() {
    localStorage.clear();
    window.location.reload(true);
  };
  
  this.modLoad = function modLoad(name, callback) {
    var scriptElem = document.createElement('script');
    document.head.appendChild(scriptElem);
    scriptElem.src = name + '.js';
    scriptElem.className = 'mod-' + name;
    if (callback !== null) {
      scriptElem.addEventListener('load', callback, false);
    }
    // scriptElem.addEventListener('load', window[name].init, false);
  };

  this.styleLoad = function styleLoad(style) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = style + '.css';
    document.head.appendChild(css);
  };

  this.addSettingsButton = function addSettingsButton(name, className, callback) {
    var a = document.createElement('a');
    a.innerHTML = name;
    _settingsElem.appendChild(a);
    a.addEventListener('click', callback, false);
    if (className != _currentSettingsGroup) {
      _currentSettingsGroup = className;
      className += ' first-of-class';
    }
    a.className = className;
  };
  
  function _loadConfig() {
    _config = config;
    for (var cfg in _config) {
      localStorage[cfg] = JSON.stringify(_config[cfg]);
    }
  };
  
  _init();
}
