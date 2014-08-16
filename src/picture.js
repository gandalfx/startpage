/**
 * Image display box
 * @author  gandalfx
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
(function(doc) {
  
  "use strict";
  
  const gap = 50,
        configFile = "pictures.conf";
  
  var main   = doc.getElementById("main"),
      img    = doc.getElementById("myImage"),
      nav    = doc.getElementById("imgNavigation"),
      search = doc.getElementById("search"),
      preloader = new Image,
      collections = {},
      currentCollection,
      buttons,
      currentPicture,
      shuffle;
  
  config.require(configFile, parser, init);
  
  // some listeners
  img.addEventListener("load", layout, false);
  window.addEventListener("resize", layout, false);
  
  img.addEventListener("click", cycleImage, false);
  
  img.addEventListener("DOMMouseScroll", function(e) {
    if (e.detail < 0) cycleImage(1);
    else cycleImage(-1);
  }, false);
  
  nav.addEventListener("DOMMouseScroll", function(e) {
    if (e.detail < 0) cycleImage(1);
    else cycleImage(-1);
  }, false);
  
  
  /// Functions
  
  function init(cfg) {
    collections = cfg.collections;
    shuffle = cfg.hasOwnProperty("shuffle") && cfg.shuffle;
    
    if (cfg.hasOwnProperty("active_collection") && collections.hasOwnProperty(cfg.active_collection)) {
      setCollection(cfg.active_collection);
    }
    else {
      setCollection(Object.getOwnPropertyNames(collections)[0]);
    }
    
    Object.getOwnPropertyNames(collections).forEach(function(collName) {
      settingsMenu.add(collName, "collections", function() {
        setCollection(collName);
      });
    });
    
    // once again, for good measure
    layout();
  };
  
  
  function parser(text) {
    var props = {
          collections: {}
        },
        currentCollection;
    
    text.split("\n").forEach(function(line) {
      
      // kept empty lines until now for correct line numbers
      if (!line || line[0] === "#") return;
      
      var matches;
      // property = value
      if (matches = line.match(/^(\S+)\s*=\s*(.*)$/)) {
        props[matches[1]] = JSON.parse(matches[2]);
      }
      
      // [property] array definition
      else if (matches = line.match(/^\[collection_(\w+)\]$/)) {
        currentCollection = matches[1];
        if (!props.collections.hasOwnProperty(currentCollection))
          props.collections[currentCollection] = [];
      }
      
      // [property] array entry
      else if (currentCollection) {
        var arr = line.split(/\s+/);
        props.collections[currentCollection].push({
          src:   arr[0],
          style: arr.length > 1 ? arr[1] : ""
        });
      }
      
      else throw "Config: Syntax error on line " + (lineNum + 1);
    });
    
    // prefixes
    Object.getOwnPropertyNames(props.collections)
      .forEach(function(collectionName) {
        if (props.hasOwnProperty("prefix_collection_" + collectionName)) {
          var prefix = props["prefix_collection_" + collectionName];
          props.collections[collectionName].map(function(picture) {
            picture.src = prefix + picture.src;
          });
        }
      });
    
    return props;
  }
  
  /**
   * choose from an existing set of sources
   * @see  config.js
   */
  function setCollection(collectionName) {
    
    currentPicture = 0;
    nav.innerHTML  = "";
    buttons        = [];
    
    if (shuffle) {
      currentCollection = collections[collectionName].shuffle();
    } else {
      currentCollection = collections[collectionName];
    }
    
    currentCollection.forEach(function(picture, i) {
      buttons[i] = doc.createElement("a");
      
      // (function(i) {
      buttons[i].addEventListener("click", function() {
        setImage(i);
      }, false);
      // })(i);
      
      nav.appendChild(doc.createElement("li"))
         .appendChild(buttons[i]);
      
    });
    
    if (shuffle) {
      setImage(0);
    } else {
      setImage(Math.floor((Math.random() * currentCollection.length)));
    }
    
    config.store(configFile, "active_collection", collectionName);
  };
  
  /**
   * cycle through images from current sources
   * @param  {integer} offset id gap, negative values allowed
   */
  function cycleImage(offset) {
    if (!+offset) offset = 1;
    var len = currentCollection.length;
    setImage((currentPicture + offset + len) % len);
  };
  
  /**
   * Set the current image.
   * Images get pre-cached using Image array
   * @param  {integer} picId
   */
  function setImage(picId) {
    img.setAttribute("src", currentCollection[picId].src);
    img.setAttribute("title", "#" + picId + "     " + currentCollection[picId].src);
    // doc.body.className = currentCollection[picId].style;
    style.set(currentCollection[picId].style);
    buttons[currentPicture].className = "";
    buttons[picId].className = "active";
    layout();
    preloader.src = currentCollection[(picId + 1) % currentCollection.length].src;
    currentPicture = picId;
  };
  
  /**
   * render site layout:
   * -> vertical vs horizontal layout
   * -> calculate max image sizes
   */
  function layout() {
    var mainHeight = main.offsetHeight,
        mainWidth = main.offsetWidth,
        searchHeight = search.offsetHeight,
        searchWidth = search.offsetWidth,
        imgHeight = img.height,
        imgWidth = img.width,
        imgRatio = img.height / img.width,
        searchMarginTop = 0,
        imgMaxHeight, imgMaxWidth;
    
    if ((mainWidth - searchWidth - 3*gap) * imgRatio >
        Math.min(imgHeight, mainHeight - searchHeight - 3*gap)) {
      
      main.className = "horizontalLayout";
      imgMaxHeight = mainHeight - 2*gap;
      imgMaxWidth  = mainWidth - searchWidth - 3*gap;
    
    } else {
      main.className = "verticalLayout";
      imgMaxHeight = mainHeight - searchHeight - 3*gap;
      imgMaxWidth  = mainWidth - 2*gap;
      searchMarginTop = (mainHeight - searchHeight - Math.min(imgHeight, imgMaxHeight) - gap) / 2;
    }
    
    img.style.maxHeight = Math.floor(imgMaxHeight) + "px";
    img.style.maxWidth  = Math.floor(imgMaxWidth) + "px";
    search.style.marginTop = Math.floor(searchMarginTop) + "px";
  };
  
})(document);
