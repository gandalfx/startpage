function Style() {
  
  var _this = this,
      _styles = ['', 'white'];
  
  this.set = function set(style) {
    var id = _styles.indexOf(style);
    if (id > -1) {
      document.body.dataset.styleId = id;
      document.body.className = style;
    }
    return _this;
  }
  
  this.cycle = function cycle() {
    document.body.className
      = _styles[++document.body.dataset.styleId % _styles.length];
    return _this;
  }
  
  // init
  document.body.dataset.styleId = 0;
  document.body.className = _styles[0];
  core.addSettingsButton('style', 'style', _this.cycle);
}
