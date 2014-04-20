/**
 * Image display box
 */
function PictureBox() {
  
  var _this = this,
      _gap = 50,
      _main   = document.getElementById('main'),
      _img    = document.getElementById('myImage'),
      _nav    = document.getElementById('imgNavigation'),
      _search = document.getElementById('search'),
      _collections = core.getConfig('collections'),
      _pictures = [],
      _buttons = [],
      _currentId = 0,
      _preloader = new Image();
  
  function _init() {
    for ( var i = 0 ; i < _collections.length ; i++ ) {
      if (_collections[i].active) _setCollection(i);
      (function(i) {
        core.addSettingsButton(_collections[i].name, 'collection', function() {
          _setCollection(i);
        });
      })(i);
    };
    
    // some listeners
    _img.addEventListener('load', _layout, false);
    window.addEventListener('resize', _layout, false);
    
    _img.addEventListener('click', _this.cycleImage, false);
    
    _img.addEventListener('DOMMouseScroll', function(e) {
      if (e.detail < 0) _this.cycleImage(1);
      else _this.cycleImage(-1);
    }, false);
    
    _nav.addEventListener('DOMMouseScroll', function(e) {
      if (e.detail < 0) _this.cycleImage(1);
      else _this.cycleImage(-1);
    }, false);
    
    // once again, for good measure
    _layout();
  };
  
  /**
   * choose from an existing set of sources
   * @see  config.js
   */
  function _setCollection(collectionId) {
    _pictures = core.getConfig('pictures_' + _collections[collectionId].name);
    _nav.innerHTML = '';
    for ( var i = 0 ; i < _pictures.length ; i++ ) {
      _buttons[i] = document.createElement('a');
      
      (function(i) {
        _buttons[i].addEventListener('click', function() {
          _setImage(i);
        }, false);
      })(i);
      
      _nav
        .appendChild(document.createElement('li'))
        .appendChild(_buttons[i]);
    }
    
    _setImage(Math.floor((Math.random() * _pictures.length)));
    
    for ( var i = 0 ; i <_collections.length ; i++ ) {
      _collections[i].active = i === collectionId;
    }
    core.setConfig('collections', _collections);
  };
  
  /**
   * cycle through images from current sources
   * @param  {integer} offset id gap, negative values allowed
   */
  this.cycleImage = function(offset) {
    if (isNaN(offset)) offset = 1;
    _setImage((_currentId + offset + _pictures.length) % _pictures.length);
  };
  
  /**
   * Set the current image.
   * Images get pre-cached using Image array
   * @param  {integer} imgId
   */
  function _setImage(imgId) {
    _img.setAttribute('src', _pictures[imgId].src);
    _img.setAttribute('title', '#' + imgId + '     ' + _pictures[imgId].src);
    // document.body.className = _pictures[imgId].style;
    style.set(_pictures[imgId].style);
    _buttons[_currentId].className = '';
    _buttons[imgId].className = 'active';
    _layout();
    _preloader.src = _pictures[(imgId + 1) % _pictures.length].src;
    _currentId = imgId;
  };
  
  /**
   * render site layout:
   * -> vertical vs horizontal layout
   * -> calculate max image sizes
   */
  function _layout() {
    var mainHeight = _main.offsetHeight,
        mainWidth = _main.offsetWidth,
        searchHeight = _search.offsetHeight,
        searchWidth = _search.offsetWidth,
        imgHeight = _img.height,
        imgWidth = _img.width,
        imgRatio = _img.height / _img.width,
        searchMarginTop = 0,
        imgMaxHeight, imgMaxWidth;
    
    if ((mainWidth - searchWidth - 3*_gap) * imgRatio >
        Math.min(imgHeight, mainHeight - searchHeight - 3*_gap)) {
      
      _main.className = 'horizontalLayout';
      imgMaxHeight = mainHeight - 2*_gap;
      imgMaxWidth  = mainWidth - searchWidth - 3*_gap;
    
    } else {
      _main.className = 'verticalLayout';
      imgMaxHeight = mainHeight - searchHeight - 3*_gap;
      imgMaxWidth  = mainWidth - 2*_gap;
      searchMarginTop = (mainHeight - searchHeight - Math.min(imgHeight, imgMaxHeight) - _gap) / 2;
    }
    
    _img.style.maxHeight = Math.floor(imgMaxHeight) + 'px';
    _img.style.maxWidth  = Math.floor(imgMaxWidth) + 'px';
    _search.style.marginTop = Math.floor(searchMarginTop) + 'px';
  };
  
  _init();
};
