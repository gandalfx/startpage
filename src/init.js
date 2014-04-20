
// start loading missing config right away
if (!localStorage.length) {
  var configScript = document.createElement('script');
  configScript.src = 'config.js';
  document.head.appendChild(configScript);
}

// init
var core, style;

window.addEventListener('load', function init() {
  core = new Core();
  style = new Style();
  new SearchBox();
  new PictureBox();
  new Menu('links');
}, false);
